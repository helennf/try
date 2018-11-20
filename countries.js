var express = require('express');
var router = express.Router();

// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var countriesSQL = require('./db/countriessql');

// 使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
pool.getConnection(function(err,connect){//通过getConnection()方法进行数据库连接
    if(err){
        console.log(`mysql链接失败${err}`);
    }else{
        pool.query(countriesSQL.queryAll,function(err,result){
            if(err){
                console.log(`SQL error:${err}`)
            }else{
                console.log(result);
                pool.release();//释放连接池中的数据库连接
                pool.end();//关闭连接池
            }
        });
    }
});
module.exports = router;