## in-facto website

https://in-facto.jp

## Development

```bash
pnpm install
pnpm dev
```

=> [http://localhost:3000](http://localhost:3000)

## Deploy

mainにマージされると自動で発火する

https://dash.cloudflare.com/b9d9f39f61032e736a07fa0653d76c23/pages/view/in-facto

### 記事生成

- google documentに書く (markdown互換)
- posts.list に生成するmarkdownファイル名と、google document idを明記
- 画像を対応する public/post_assets/{postId}/* に配置する
- 以下のdocsyncを実施
- Next.jsの getStaticPropsで処理される

#### docsync

- credentials.jsonを https://console.cloud.google.com/apis/credentials?hl=ja&project=jupyter-325512 のin-factoのものを落とす。(1passwordに入っている)
- posts.list に生成するmarkdownファイル名と、google document idを明記
- 特定のmdファイルだけ対象にする場合 `TARGET=xx.md pnpm docsync`
- 先頭のmdファイルだけ対象にする場合 `TOP=true pnpm docsync`

## ミラーリング

https://github.com/ykpythemind/in-facto-tools にソースコードが同期されます

## License

MIT
すべての記事の著作権はin-factoに属します
