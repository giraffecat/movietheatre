/**
 * Created by letra on 17-8-3.
 */

$(document).ready(function () {
    init();
});


function init() {
    let searchButton = $('#searchButton');
    searchButton.on('submit', function (event) {
        event.preventDefault();
        let searchContent;//searchContent读取搜索的内容
        searchContentInsqlite(searchContent);
    });
}

function loadTheSearching(data) {

    if(typeof(data)==="object"){
        //是电影数组即显示到页面上
        showTheSearchMovies(data);
    }
    else {
        //不是是数组即data返回到界面上
    }
}

function showTheSearchMovies(moviesArray) {
    //显示电影数组函数
}