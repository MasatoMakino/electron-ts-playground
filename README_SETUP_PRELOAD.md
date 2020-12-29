## preload.js

preload.jsは [BrowserWindow](https://www.electronjs.org/docs/api/browser-window) のオプションで指定する、レンダラープロセス内の隔離されたスクリプトです。

メインプロセスとレンダラープロセス間をpreload.js内の [contextBridge](https://www.electronjs.org/docs/api/context-bridge#contextbridge) で接続し、データ通信を行います。

preload.jsを利用すれば、レンダラープロセスからnode.jsのAPIを操作不能にできます。これによりレンダラープロセスからPCへの攻撃を防ぎます。

### electron-forgeにおけるpreload.jsの設定

```json
{
"config": {
    "forge": {
      "plugins": [
        [
          "@electron-forge/plugin-webpack",
          {
            "mainConfig": "./webpack.main.config.js",
            "renderer": {
              "config": "./webpack.renderer.config.js",
              "entryPoints": [
                {
                  "html": "./src/index.html",
                  "js": "./src/renderer.ts",
                  "name": "main_window",
                  "preload": {
                    "js": "./src/preload/preload.js"
                  }
                }
              ]
            }
          }
        ]
      ]
    }
  }
}
```

electron-forgeのテンプレートを利用した場合、preload.jsは"@electron-forge/plugin-webpack"プラグインの"preload"オプションで指定します。

このオプションはJavaScriptファイルしか指定できません。TypeScriptを利用したい場合はあらかじめJavaScriptにトランスパイルする必要があります。

また、このファイルはrenderer用のwebpack設定でバンドルされます。そのためモジュールの巻き上げ処理は不要です。

### preload.tsの利点

ipc通信はチャネル名を利用するため、レンダラー、プリロード、メインの間で定数として使い回すと生産性が上がります。また、通信メッセージを型付けすることでミスが抑制されます。

### electron-forgeにおけるpreload.jsのトランスパイル

TypeScriptの`tsc`コマンドでトランスパイルします。

```
"preload": "tsc src/preload/preload.ts",
"preload:watch": "yarn preload -- -w"
```

これでソースファイルと同じ階層に`preload.js`が出力されます。import先のTypeScriptファイルも同時にトランスパイルされます。

トランスパイル後のスクリプトはGitで管理する必要がありません。`.gitignore`に除外指定を追加します。

```.gitignore
src/preload/**/*.js
```

最後に`start` `package` `make`のそれぞれのスクリプトにpreloadコマンドを紐付けます。

```
"scripts": {
  "start": "yarn preload:watch & electron-forge start",
  "package": "yarn preload && electron-forge package",
  "make": "yarn preload && electron-forge make",
},
```