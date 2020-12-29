### Windowsパッケージのビルド

macOSでWindowsパッケージを作成する方法を解説します。ビルドには`wine`と`mono`が必要になります。

#### 2020/12/23現在では、macOS10.15でWindowsパッケージのビルドに失敗します。
現状ではSquirrel.Windowsパッケージに問題があり、macOS10.15ではWindowsパッケージの作成に失敗します。

https://github.com/Squirrel/Squirrel.Windows/issues/1605

回避策としては、WindowsVMを使う必要があります。以下の手順は、この問題が解決した場合の方法です。

#### wineのインストール

Homebrew経由でwineをインストールします。

公式ドキュメント : https://wiki.winehq.org/MacOS

wineの実行のために、[X Windows System](https://www.xquartz.org/) が必要になります。

```shell script
brew install --cask xquartz
```

インストール中にパスワードが要求されます。
パッケージサイズが大きいため、インストールには時間がかかります。パスワードを入力してからしばらく待ちましょう。

```shell script
brew install --cask --no-quarantine wine-devel 
```

次にwineの64ビットサポート版をインストールします。

#### monoのインストール

monoフレームワークをインストールします。

```shell script
brew install mono
```

##### brew linkでエラーが出た場合の対処方法

以下のように`brew link`のエラーが発生する事があります。

```shell script
Error: An unexpected error occurred during the `brew link` step
The formula built, but is not symlinked into /usr/local
Permission denied @ dir_s_mkdir - /usr/local/Frameworks
```

brew doctorコマンドを実行すると、以下のように解決策を提示されます。

```shell script
You should create these directories and change their ownership to your account.
  sudo mkdir -p /usr/local/Frameworks /usr/local/sbin
  sudo chown -R $(whoami) /usr/local/Frameworks /usr/local/sbin
```

アドバイスに従い`/usr/local/Frameworks`の作成とパーミッションの追加を行います。成功したらpythonをリンクします。

```shell script
sudo mkdir -p /usr/local/Frameworks
sudo chown -R $(whoami) /usr/local/Frameworks
brew link python
```

#### ビルドコマンドを実行

makeコマンドにプラットフォームオプションを追加して実行すれば、OUTディレクトリにWindowsパッケージが出力されます。

```shell script
electron-forge make --platform win32
```