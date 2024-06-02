//第8回レポート提出用 QRコードを生成するAPI
var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/',async(req,res)=>{
    const size = '150x150'; // QRコードのサイズ
    const data = 'https://www.cyber-u.ac.jp/'; // QRコード化するデータ(サイバー大学のURL)
    const uri = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${data}`; // QRコードのAPI

    // 外部APIにリクエストを送信してQRコードを生成
    request({ url: uri, encoding: null }, (error, response, body) => {
        if(!error && response.statusCode == 200){
            // レスポンスヘッダーにContent-Typeを設定
            res.setHeader('Content-Type', 'image/png');
            // 取得した画像データ (body) をバイナリ形式でレスポンスとして送信し、レスポンスを終了する
            res.end(body, 'binary');
        }
    });
})

module.exports = router;