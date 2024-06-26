/**
 * Function to retrieve the value of a cookie by its name.
 * @param {string} name - The name of the cookie.
 * @returns {string|null} The value of the cookie if found, otherwise null.
 */
function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        let parts = cookie.trim().split('=');
        if (parts[0] === name) {
            return parts[1];
        }
    }
    return null;
}

/**
 * Function to sort the rows of a table based on the content of a specific column.
 * This function is intended to be used as an event handler for sorting tables.
 */
function sortTable(){

    var table = $(this).closest('table');
    var index = $(this).index();
    var rows = table.find('tbody tr').get(); 

    rows.sort(function(a, b){
        var A = $(a).children('td').eq(index).text().toUpperCase();
        var B = $(b).children('td').eq(index).text().toUpperCase();

        if(!isNaN(parseFloat(A)) && !isNaN(parseFloat(B))) {
            A = parseFloat(A.replace(/[^0-9.]/g, ''));
            B = parseFloat(B.replace(/[^0-9.]/g, ''));
            return A - B;
        } else {
            return A.localeCompare(B);
        }
    });

    if($(this).hasClass('sorted')){
        rows.reverse();
        $(this).removeClass('sorted');
    } else {
        $(this).addClass('sorted').siblings().removeClass('sorted');
    }

    $.each(rows, function(index, row){
        table.children('tbody').append(row);
    });
}
