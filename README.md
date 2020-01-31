# eml-observer

[fakeSMTP](http://nilhcem.com/FakeSMTP/)が受信したメールを参照するためのアプリ  
※結合試験環境などでメール確認することを目的に作成

## 使い方
1. fakeSMTPのデータ出力先を{このプロジェクト}/dataに設定
1. `npm i && npm run start`
1. fakeSMTP起動
1. http://localhost:3000/ でfakeSMTPが受信したメールを一覧表示します。
