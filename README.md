# sample-playwright-lighthouse
QA engineer at a Startup vol.2
スタートアップで働くQAエンジニアの日常

のサンプルコードになります。

# インストール
カレントディレクトリで以下を実行する

```
yarn install
```

```
npx playwright install --with-deps chromium
```

# 実行方法
カレントディレクトリで以下を実行する

```
yarn test
```
or

VSCodeに[Playwright Test for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)をインストールしてVSCode上で実行する

実行結果
  - `performance-reports` ディレクトリにLighthouseのレポートが出力されます
  - `playwright-report` ディレクトリにplaywrightのレポートが出力されます
