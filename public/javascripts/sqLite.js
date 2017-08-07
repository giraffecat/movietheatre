/**
 * Created by letra on 17-8-3.
 */
const BASE_URL="http://localhost:9998"
function searchContentInsqlite(searchContent) {
    if(parseInt(searchContent)===NaN){
        let searchName = searchContent;
        $.ajax({
            type: 'GET',
            url: BASE_URL+"/movies/"+searchName,
            crossDomain: true,
            success:function () {
                loadTheSearching(data);//成功
            }
        });
    }
    else {
        let searchId = searchContent;
        $.ajax({
            type: 'GET',
            url: BASE_URL+"/movies/"+searchId,
            crossDomain: true,
            success:function () {
                addSuccess();//成功
            },
            error:function (data) {
                requestFailed(data.responseText);//失败
            }
        });
    }
}