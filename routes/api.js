let express = require('express');
let app = express();
let orm = require("orm");
let path = require("path");
// let sqlite3 = require("sqlite3");

let appRoot = path.join(__dirname,"../");

app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
    next();
});

app.use(orm.express(`sqlite:///${appRoot}movies.db`, {//读取数据库
    define: function (db, models, next) {
        models.movie = db.define("movie", {
            id:Number,
            alt:String,
            year:Number,
            title:String,
            rating:Number,
            original_title:String,
            directors:String,
            casts:String,
            image:String,
            summary:String
        });
        models.genre = db.define("genre",{
            id:Number,
            name:String
        });
        models.movie_genre = db.define("movie_genre",{
            id:Number,
            movie_id:Number,
            genre_id:Number
        });
        models.comment = db.define("comment",{
            id:Number,
            movie_id:Number,
            user:String,
            content:String
        });
        next();
    }
}));

app.get('/search',function (req,res) {//电影名获取电影Id数组,电影前几字也可查询
    let movieTitle = req.query.title;//chosenMoviesId=[];
    req.models.movie.find({title:orm.like(movieTitle+'%')},function (err,results) {
        console.log(results);
        if(results.length!==0){
            res.send(results);
        }
        else {
            res.send(`没有找到关于 “${movieTitle}” 的电影，换个搜索词试试吧。`);
        }
    });
});

app.get('/movies/:id',function (req,res) {//电影Id获取电影对象

    let movieId = req.params.id;
    req.models.movie.find({id:movieId},function (err,result) {
        console.log(result[0]);
        res.send(result[0]);
    })
});

app.get('/movies/:id/comments',function (req,res) {
    let movieId = req.params.id,commentArr=[];
    req.models.comment.find({movie_id:movieId},function (err,result) {
        result.forEach((item,index)=>{
            commentArr.push(item.content);
            if(index===result.length-1){
                console.log(commentArr);
                res.send(commentArr);
            }
        });
    });
});

app.get('/movies/',function (req,res) {//标签获取该标签下所有电影对象数组     Egurl:http://localhost:9998/movies?genreName=爱情
    if(!req.query.genreName){

    }
    else {
        let genreName = req.query.genreName,moviesInThisGenre=[];

        req.models.genre.find({name:genreName},function (err,result0) {
            req.models.movie_genre.find({genre_id:result0[0].id},function (err,result1) {
                result1.forEach((item,index)=>{
                    req.models.movie.find({id:item.movie_id},function (err,result2) {
                        moviesInThisGenre.push(result2[0]);
                        if(index===result1.length-1){
                            res.send(moviesInThisGenre);
                        }
                    });
                });
            });
        });
    }
});

app.get('/movies/:id/similar',function (req,res) {//获取相关电影
    let movieId = req.params.id;
    req.models.movie_genre.find({movie_id:movieId},function (err,result) {
        req.models.movie_genre.find({genre_id:result[0].genre_id},function (err,Result) {
            let similarMoviesArr=[];
            Result.forEach((idObj,index)=>{
                req.models.movie.find({id:idObj.movie_id},function (err,result) {
                    similarMoviesArr.push(result[0]);
                    if(index===Result.length-1){
                        console.log(similarMoviesArr);
                        res.send(similarMoviesArr);
                    }
                });
            });
        });
    });
});

app.get('/sortItems',function (req,res) {

});//返回所有标签，不需要提供req数据   Egurl:http://localhost:9998/sortItems


let server= app.listen(9998,function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("应用实例，访问地址为 http://localhost%s%s", host, port);
    console.log('Example app listening on port 9998!');
});