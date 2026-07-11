import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google, sheets_v4 } from "googleapis";

// video.tsvの元になるスプレッドシート。
// docsync(Docsのpost同期)とはスコープが異なるので、トークンも別ファイルにしている。
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const TOKEN_PATH = path.join(process.cwd(), "token.sheets.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const OUT_PATH = path.join(process.cwd(), "video.tsv");

const SPREADSHEET_ID =
  process.env["SPREADSHEET_ID"] ??
  "1BZgnB3L8Nq-49n319-O7OIlZCw1q8znt5aCEV9214Is";

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, { encoding: "utf-8" });
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(
  client: Awaited<ReturnType<typeof authenticate>>
) {
  const content = await fs.readFile(CREDENTIALS_PATH, { encoding: "utf-8" });
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  const oauth2Client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (oauth2Client.credentials) {
    await saveCredentials(oauth2Client);
  }
  return oauth2Client;
}

// TSV1セル分のエスケープ。タブ・改行・引用符を含む場合はcsv-parseと同じRFC4180形式でクォートする。
function escapeField(value: unknown): string {
  const v = value == null ? "" : String(value);
  if (/[\t\n\r"]/.test(v)) {
    return `"${v.replace(/"/g, '""')}"`;
  }
  return v;
}

function toTsv(rows: unknown[][]): string {
  // Sheetsは末尾の空セルを省くため行ごとに列数がバラつく。csv-parse({columns:true})が
  // 列数不一致で落ちないよう、全行を最大列数にパディングして揃える。
  const width = Math.max(...rows.map((r) => r.length));
  return (
    rows
      .map((row) => {
        const padded = [...row];
        while (padded.length < width) padded.push("");
        return padded.map(escapeField).join("\t");
      })
      .join("\n") + "\n"
  );
}

authorize()
  .then(async (auth) => {
    // @ts-expect-error docsyncと同様、authの型がgoogleapis側と噛み合わないため抑制
    const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });

    // 対象タブ。未指定なら先頭シートを使う(env SHEETで上書き可)。
    let range = process.env["SHEET"];
    if (!range) {
      const meta = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
      const title = meta.data.sheets?.[0]?.properties?.title;
      if (!title) {
        throw "no sheet found";
      }
      range = title;
    }
    console.log(`fetching... ${SPREADSHEET_ID} [${range}]`);

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range,
    });
    const rows = res.data.values ?? [];
    if (rows.length === 0) {
      throw "no rows found";
    }

    await fs.writeFile(OUT_PATH, toTsv(rows));
    console.log(`wrote ${rows.length} rows -> ${OUT_PATH}`);
  })
  .catch(console.error);
