require('dotenv').config();     //データベースのURLを公開しないため.envから環境変数を読み込む

var express = require('express');
var router = express.Router();

var {MongoClient} = require("mongodb");
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

router.get('/',async(req,res)=>{
    //データベースコレクションを指定
    const database = client.db('notes');
    const notes = database.collection('notes');

    //idが1の時のドキュメントを取得
    const query = {id:1};
    const note = await notes.findOne(query);

    res.json(note);
})

module.exports = router;

// レスポンスのデータ（ノート全件）
const responseObjectDataAll = {
textObject1 : {
id: 1,
title: 'ノート１のタイトルです',
subTitle: 'ノート１のサブタイトルです',
bodyText: 'ノート１の本文です'
},
textObject2 : {
id: 2,
title: 'ノート２のタイトルです',
subTitle: 'ノート２のサブタイトルです',
bodyText: 'ノート２の本文です'
},
};

/**
*メモを全件取得するAPI
*@returns {Object[]} data
*@returns {number} data.id - ID
*@returns {string} data.title - タイトル
*@returns {string} data.text - 内容
*/
router.get('/', function (req, res, next) {
// 全件取得して返す
res.json(responseObjectDataAll);
})
module.exports = router;