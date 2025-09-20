# Discord-ServerProfile-Changer
Discord BOTのサーバープロフィール（アイコン / バナー / Bio）を更新します  
各サーバーごとにランダムな画像を選び、自己紹介(bio)を「{サーバー名}に参加しています！」と設定します。

## 環境構築
- node.js v18以上
- discord.js, dotenv

クローン&インストール
```bash
git clone https://github.com/VEDA00133912/Discord-ServerProfile-Changer.git
cd discord-serverprofile-changer
npm i
```
## 設定
**.envを作成**
```.env
TOKEN=BOTのTOKENを設定
```
**アイコンとバナー画像の設定**
今適当に4枚ずつ画像いれてるので好きに変えてください  
アイコン用は **icons/** へ、バナー用は **banners/** へ。
## 実行
```bash
node index.js
```
コンソールにこう出てたら成功です
```
BOT#0000 ログイン成功
- Server A (ID: 123456789123456789)
- Server B (ID: 987654321987654321)

更新中: Server A
→ Server A: status 200
更新中: Server B
→ Server B: status 200

全サーバープロフィール更新完了
```
## 備考
2025/9/10の[Discord APIの変更](https://discord.com/developers/docs/change-log?topic=HTTP+API#banner-avatar-and-bio-can-be-set-on-modify-current-member)により、BOTもサーバープロフィール (banner / avatar / bio) を設定可能になりました  
レート制限を避けるために、サーバーごとに1秒待機を入れています  
**実行結果**  
![chinko](./readme/Screenshot%202025-09-20%2009.55.00.png)  
![unko](./readme/Screenshot%202025-09-20%2009.55.06.png)  
![ketsuana](./readme/Screenshot%202025-09-20%2009.55.15.png)