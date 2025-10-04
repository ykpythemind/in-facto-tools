import fs from "fs/promises";
import path from "path";
import process from "process";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import type { OAuth2Client } from "google-auth-library";

const SCOPES = [
  "https://www.googleapis.com/auth/documents.readonly",
  // "https://www.googleapis.com/auth/drive.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");
const POST_DEF_PATH = path.join(process.cwd(), "posts.list");

async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH, { encoding: "utf-8" });
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

async function saveCredentials(client: OAuth2Client) {
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

async function authorize(): Promise<A> {
  let client: A | null = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

type A = Parameters<typeof google.docs>[0]["auth"];

async function fetchDoc(auth: A, documentID: string) {
  const docs = google.docs({ version: "v1", auth });

  const res = await docs.documents.get({
    documentId: documentID,
  });
  let buf = ``;

  for (const content of res.data.body?.content ?? []) {
    for (const element of content.paragraph?.elements ?? []) {
      if (element.inlineObjectElement?.inlineObjectId) {
        const inlineObjectId = element.inlineObjectElement?.inlineObjectId;
        if (
          inlineObjectId &&
          res.data.inlineObjects &&
          res.data.inlineObjects[inlineObjectId]
        ) {
          console.log(`downloading image: ${inlineObjectId}`);

          const inlineObj = res.data.inlineObjects[inlineObjectId];
          const embeddedObj = inlineObj.inlineObjectProperties?.embeddedObject;
          const imageProps = embeddedObj?.imageProperties;
          if (imageProps && embeddedObj?.imageProperties?.contentUri) {
            const https = require("https");
            const os = require("os");
            const url = embeddedObj.imageProperties.contentUri;
            const fileName = `${inlineObjectId}.jpg`; // 仮ぎめでjpg
            const downloadDir = require("path").join(
              os.homedir(),
              "Downloads",
              "in-facto-posts"
            );
            await fs.mkdir(downloadDir, { recursive: true });
            const filePath = require("path").join(downloadDir, fileName);
            console.log(`filePath: ${filePath}`);

            if (
              await fs
                .access(filePath)
                .then(() => true)
                .catch(() => false)
            ) {
              console.log(`file already exists: ${filePath}`);
              continue;
            }

            // create blank file for filepath
            await fs.writeFile(filePath, "");

            await new Promise((resolve, reject) => {
              const file = require("fs").createWriteStream(filePath);
              https
                .get(url, (response: any) => {
                  response.pipe(file);
                  file.on("finish", async () => {
                    file.close(resolve);
                    resolve(undefined);
                  });
                })
                .on("error", (err: any) => {
                  console.error(err);
                  reject(err);
                });
            });
          }
        }

        continue; // ignore inline object (like image)
      }

      const text = element.textRun?.content;
      if (text === undefined) {
        console.log(element);
        throw "unexpected undefined";
      }
      buf += text;
    }
  }

  return buf;
}

async function saveDoc(auth: A, filename: string, documentID: string) {
  console.log(`processing... ${filename}(${documentID})`);
  const r = await fetchDoc(auth, documentID);
  fs.writeFile(path.join(process.cwd(), "_posts", filename), r);
  const dirname = filename.replace(/\.md$/, "");
  await fs.mkdir(path.join(process.cwd(), "public", "post_assets", dirname), {
    recursive: true,
  });
  console.log(`done\n`);
}

authorize()
  .then(async (auth) => {
    const list = await fs.readFile(POST_DEF_PATH, { encoding: "utf-8" });
    const lines = list.split(/\r?\n/);
    const target = process.env["TARGET"];
    const top = process.env["TOP"];
    if (target !== undefined) {
      console.warn(`process only target: ${target}`);
    }
    if (top !== undefined) {
      console.warn(`process only top`);
    }

    let processOne = false;

    for (const line of lines.slice(0, -1)) {
      if (top !== undefined && processOne) {
        continue;
      }

      const [filename, docId] = line.split(",");
      if (target) {
        if (filename !== target) {
          continue;
        }
      }
      const r = await saveDoc(auth, filename, docId);
      processOne = true;
      // console.log(r);
    }
  })
  .catch(console.error);
