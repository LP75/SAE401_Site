$(document).ready(function(){

    //Add the option to add an employee if IT or Chief is logged in
    if(getCookie("role")=="it" || getCookie("role")=="chief") {
        let option = $("<option>");
        option.attr("value","employees");
        option.text("Employee");
        $(selectType).append(option);
    }
    
    //Get stocks, employees, stores, products, brands and categories to create their selections
    let storesData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/stores", function(data){
        for (store of data){
            storesData[store["store_id"]]=store["store_name"];
        }
    })

    let productsData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/products/store/"+getCookie("storeName"), function(data){
        for (product of data){
            productsData[product["product_id"]]=product["product_name"];
        }
    })

    let brandsData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/brands", function(data){
        for (brand of data){
            brandsData[brand["brand_id"]]=brand["brand_name"];
        }
    })

    let categoriesData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/categories", function(data){
        for (categorie of data){
            categoriesData[categorie["category_id"]]=categorie["category_name"];
        }
    })

    let stocksData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/stocks", function(data){
        for (stock of data){
            stocksData[stock["stock_id"]]=[stock["store"]["store_id"],stock["quantity"],stock["product"]["product_id"]];
        }
    })

    let employeesData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/employees", function(data){
        for (employee of data){
            employeesData[employee["employee_id"]]=employee["employee_name"];
        }
    })

    let allData = {
        "employees": employeesData,
        "categories": categoriesData,
        "brands": brandsData,
        "products": productsData,
        "stores": storesData,
        "stocks": stocksData
    }

    //Display list of items depending on selected type
    $(selectType).change(function(){

        //Clear success message
        $(selectItemDiv).children("p").remove();

        $(selectItemDiv).attr("class","container");
        $(selectStoreDiv).attr("class","d-none");

        //Clear previous list of options
        $(selectItem).children().not(':first-child').remove();

        $("#selectItemDiv h2").text("Select the "+singular($(selectType).val())+" you want to modify");
        $(firstSelectItem).text("Select a "+singular($(selectType).val()));

        if($(selectType).val()=="stocks"){
            if (getCookie("role")=="it") {
                $(selectItemDiv).attr("class","d-none");
                $(selectStoreDiv).attr("class","container");
                for(let Id in allData["stores"]){
                    let option = $("<option>");
                    option.attr("value",Id);
                    option.text(allData["stores"][Id]);
                    $(selectStore).append(option); 
                }
            } else {
                for(let Id in allData[$(selectType).val()]){
                    if (getCookie("storeId")==allData[$(selectType).val()][Id][0]){
                        let option = $("<option>");
                        let product_id = allData["stocks"][Id][2];
                        option.attr("value",Id);
                        option.text("Stock N°"+Id+" - Product : "+allData["products"][product_id]+" - Quantity : "+allData["stocks"][Id][1]);
                        $(selectItem).append(option);
                    }
                }
            }
        } else {
            for(let Id in allData[$(selectType).val()]){
                let option = $("<option>");
                option.attr("value",Id);
                option.text(allData[$(selectType).val()][Id]);
                $(selectItem).append(option);
            }
        }
    })

    //Additional selection for Stock selection when "it" is connected
    $(selectStore).change(function(){

        //Clear success message
        $(selectItemDiv).children("p").remove();

        $(selectItemDiv).attr("class","container");

        //Clear previous list of options
        $(selectItem).children().not(':first-child').remove();

        for(let Id in allData["stocks"]){

            if ($(selectStore).val()==allData["stocks"][Id][0]) {
                let option = $("<option>");
                let product_id = allData["stocks"][Id][2];
                option.attr("value",Id);
                option.text("Stock N°"+Id+" - Product : "+allData["products"][product_id]+" - Quantity : "+allData["stocks"][Id][1]);
                $(selectItem).append(option);
            }
        }
    })


    //When item is selected, allow the deletion
    $(selectItem).change(function(){
        
        $(add).prop("disabled", "true");

        if ($(selectItem).val()!=null) {
            $(add).removeAttr("disabled");
        };
        
    })

    //Adding the content to the database
    $(add).click(function(){


        let table = $(selectType).val();
        let id = $(selectItem).val();

        let selector = "#"+table+" .required";
        let url = "https://dev-plantiv221.users.info.unicaen.fr/bikestores/"+table+"/"+id;

        let headers = {
            "Authorization": "Bearer e8f1997c763",
            "Content-type": "application/json; charset=UTF-8"
        };

        let deleteRequest = $.ajax({
            url: url,
            type: 'DELETE',
            headers: headers,
        });

        let success = $("<p>");
        success.text("Deletion successful");
        success.css("color", "green");
        $(selectItemDiv).append(success);
    })

})





//Function that returns the singular name of a table
function singular(table){
    switch(table){
        case "brands":
            return "brand";
        case "categories":
            return "category";
        case "employees":
            return "employee";
        case "stocks":
            return "stock";
        case "stores":
            return "store";
        case "products":
            return "product";
    }
}