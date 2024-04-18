$(document).ready(function() {
    
    //Show links according to role of visitor
    if (getCookie("role")=="client") {
        $(".client").attr("class","d-none");
    }
    if (getCookie("role")=="employee" || getCookie("role")=="chief" || getCookie("role")=="it") {
        $(".employees").attr("class","d-none");
    }
    if (getCookie("role")=="employee") {
        $(".employee").attr("class","d-none");
    }

    //Clear session cookie
    $(".logout").click(function(){
        document.cookie = "role=; expires=Mon, 01 Jan 2000 00:00:00 UTC;";
        document.cookie = "storeId=; expires=Mon, 01 Jan 2000 00:00:00 UTC;";
        document.cookie = "PHPSESSID=; expires=Mon, 01 Jan 2000 00:00:00 UTC;";
        document.cookie = "storeName=; expires=Mon, 01 Jan 2000 00:00:00 UTC;";
    })

});