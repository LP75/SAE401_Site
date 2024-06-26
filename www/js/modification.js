/**
 * Executes the provided function when the DOM is fully loaded and ready for manipulation.
 * @callback readyCallback
 */

/**
 * Executes the provided function when the DOM is fully loaded and ready for manipulation.
 * @function
 * @param {readyCallback} callback - The function to execute when the DOM is ready.
 */
$(document).ready(function(){

    /**
     * Checks the user's role cookie and adds an option to add an employee if the user is IT or Chief.
     */
    if(getCookie("role")=="it" || getCookie("role")=="chief") {
        let option = $("<option>");
        option.attr("value","employees");
        option.text("Employee");
        $(selectType).append(option);
    }
    
    /**
     * Retrieves data for stores, products, brands, categories, stocks, and employees from the server.
     */
    let storesData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/stores", function(data){
        for (store of data){
            storesData[store["store_id"]] = store["store_name"];
        }
    });

    let productsData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/products/store/"+getCookie("storeName"), function(data){
        for (product of data){
            productsData[product["product_id"]] = product["product_name"];
        }
    });

    let brandsData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/brands", function(data){
        for (brand of data){
            brandsData[brand["brand_id"]] = brand["brand_name"];
        }
    });

    let categoriesData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/categories", function(data){
        for (categorie of data){
            categoriesData[categorie["category_id"]] = categorie["category_name"];
        }
    });

    let stocksData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/stocks", function(data){
        for (stock of data){
            stocksData[stock["stock_id"]] = [stock["store"]["store_id"], stock["quantity"], stock["product"]["product_id"]];
        }
    });

    let employeesData = {};
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/employees", function(data){
        for (employee of data){
            employeesData[employee["employee_id"]] = employee["employee_name"];
        }
    });

    /**
     * Object containing all the retrieved data.
     * @type {object}
     */
    let allData = {
        "employees": employeesData,
        "categories": categoriesData,
        "brands": brandsData,
        "products": productsData,
        "stores": storesData,
        "stocks": stocksData
    };

    /**
     * Event handler for the change event on the selectType element.
     */
    $(selectType).change(function(){

        $(selectItemDiv).attr("class","container");
        $(selectStoreDiv).attr("class","d-none");
        $(form).attr("class","d-none");

        // Clear previous list of options
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
                        option.attr("value",Id);
                        option.text("Stock N°"+Id+" - Product : "+allData["products"][Id]+" - Quantity : "+allData["stocks"][Id][1]);
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
    });

    /**
     * Event handler for the change event on the selectStore element.
     */
    $(selectStore).change(function(){

        // Clear success message
        $(form).children("p").remove();

        $(selectItemDiv).attr("class","container");

        // Clear previous list of options
        $(selectItem).children().not(':first-child').remove();

        for(let Id in allData["stocks"]){

            if ($(selectStore).val()==allData["stocks"][Id][0]) {
                let option = $("<option>");
                option.attr("value",Id);
                option.text("Stock N°"+Id+" - Product : "+allData["products"][Id]+" - Quantity : "+allData["stocks"][Id][1]);
                $(selectItem).append(option);
            }
        }
    });

    /**
     * Event handler for the change event on the selectItem element.
     */
    $(selectItem).change(function(){

        // Clear success message
        $(form).children('p').remove();
        
        $(add).prop("disabled", "true");

        // Display Addition form depending on selected type
        let type = $(selectType).val();
        $(form).attr("class", "container center-container");
        switch(type){
            case "brands":
                $(".type").attr("class","d-none type");
                $(brands).attr("class","container type");

                // Check if all entries are filled
                $("#brands .required").change(function(){
                    checkFill("brands");
                });

                break;
            case "categories":
                $(".type").attr("class","d-none type");
                $(categories).attr("class","container type");

                // Check if all entries are filled
                $("#categories .required").change(function(){
                    checkFill("categories");
                });

                break;
            case "stores":
                $(".type").attr("class","d-none type");
                $(stores).attr("class","container type");

                // Check if all entries are filled
                $("#stores .required").change(function(){
                    checkFill("stores");
                });

                break;
            case "products":
                $(".type").attr("class","d-none type");
                $(products).attr("class","container type");

                // Add the appropriate selection of brands and categories based on the API data
                $(brandProduct).children().slice(1).remove();
                for(let brandId in brandsData){
                    let option = $("<option>");
                    option.attr("value",brandId);
                    option.text(brandsData[brandId]);
                    $(brandProduct).append(option);
                }

                $(catProduct).children().slice(1).remove();
                for(let catId in categoriesData){
                    let option = $("<option>");
                    option.attr("value",catId);
                    option.text(categoriesData[catId]);
                    $(catProduct).append(option);
                }

                // Check if all entries are filled
                $("#products .required").change(function(){
                    checkFill("products");
                });

                break;
            case "stocks":
                $(".type").attr("class","d-none type");
                $(stocks).attr("class","container type");

                // Add the appropriate value of store and product
                let storeId = allData["stocks"][$(selectItem).val()][0];
                $(store_id).attr("value",storeId);

                let productId = allData["stocks"][$(selectItem).val()][2];
                $(product_id).attr("value",productId);

                // Check if all entries are filled
                $("#stocks .required").change(function(){
                    checkFill("stocks");
                });

                break;
            case "employees":
                $(".type").attr("class","d-none type");
                $(employees).attr("class","container type");

                // Add the option to select another role if the user is an IT employee

                if (getCookie("role")=="it") {
                    $(role).children().slice(2).remove();
                    let option = $("<option>");
                    option.attr("value","chief");
                    option.text("Chief");
                    $(role).append(option);
                }

                // Adjust the selection of Stores depending on the user connected (it or chief)
                $(storeEmployee).children().slice(1).remove();
                if (getCookie("role")=="chief") {
                    let storeId = getCookie("storeId");
                    let option = $("<option>");
                    option.attr("value",storeId);
                    option.text(storesData[storeId]);
                    $(storeEmployee).append(option);
                } else {
                    for(let storeId in storesData){
                        let option = $("<option>");
                        option.attr("value",storeId);
                        option.text(storesData[storeId]);
                        $(storeEmployee).append(option);
                    }
                }

                // Check if all entries are filled
                $("#employees .required").change(function(){
                    checkFill("employees");
                });
                break;
        }
    });

    /**
     * Event handler for the click event on the add button.
     */
    $(add).click(function(){

        // Check the format of each entry
        if (!checkFormat($(selectType).val())) {
            return;
        };
        let table = $(selectType).val();
        let id = $(selectItem).val();

        let selector = "#"+table+" .required";
        let url = "https://dev-plantiv221.users.info.unicaen.fr/bikestores/"+table+"/"+id;
        let data = {};

        $(selector).each(function(){
            data[$(this).attr("name")] = $(this).val();
        });

        let dataPUTJson = JSON.stringify(data);
        let headers = {
            "Authorization": "Bearer e8f1997c763",
            "Content-type": "application/json; charset=UTF-8"
        };

        let putRequest = $.ajax({
            url: url,
            type: 'PUT',
            data: dataPUTJson,
            headers: headers,
        });

        let success = $("<p>");
        success.text("Modification successful");
        success.css("color", "green");
        $(form).append(success);
    });

});

/**
 * Checks if all required entries are filled before submitting the form.
 * @param {string} name - The name of the form section.
 */
function checkFill(name){
    let selector = "#"+name+" .required";
    let required = true;
    $(selector).each(function(){
        if(!$(this).val()){
            required = false;
            return;
        }
    });
    if (required) {
        $(add).removeAttr("disabled");
    } else {
        $(add).prop("disabled", "true");
    }
}

/**
 * Checks if all entries are in the correct format.
 * @param {string} name - The name of the form section.
 * @returns {boolean} - True if all entries are in the correct format, otherwise false.
 */
function checkFormat(name){
    switch(name){
        case "stores":
            // phone
            $(".phone").children('p').remove();
            let regexPhone = /^.{1,25}$/;
            if(!regexPhone.test($(phone).val())) {
                let error = $("<p>");
                error.text("Wrong entry, you must enter a valid phone number of less than 25 characters");
                error.css("color", "red");
                $(".phone").append(error);
                return false;
            }
            // zip_code
            $(".zip_code").children('p').remove();
            let regexZipCode = /^.{1,5}$/;
            if(!regexZipCode.test($(zip_code).val())) {
                let error = $("<p>");
                error.text("Wrong entry, you must enter a valid zip code of less than 6 characters");
                error.css("color", "red");
                $(".zip_code").append(error);
                return false;
            }
            // state
            $(".state").children('p').remove();
            let regexState = /^.{1,10}$/;
            if(!regexState.test($(state).val())) {
                let error = $("<p>");
                error.text("Wrong entry, you must enter a valid state number of less than 11 characters");
                error.css("color", "red");
                $(".state").append(error);
                return false;
            }
            break;
        case "products":
            // model_year
            $(".model_year").children('p').remove();
            let regexYear = /^(?:[0-9]{1,4}|10000)$/;
            if(!regexYear.test($(model_year).val())) {

                let error = $("<p>");
                error.text("Wrong entry, you must enter a valid year of type YYYY");
                error.css("color", "red");
                $(".model_year").append(error);
                return false;
            }
            // list_price
            $(".list_price").children('p').remove();
            let regexPrice = /^\d{1,5}(?:\.\d{2})?$/;
            if(!regexPrice.test($(list_price).val())) {

                let error = $("<p>");
                error.text("Wrong entry, you must enter a valid price of type Number.Number");
                error.css("color", "red");
                $(".list_price").append(error);
                return false;
            }
            break;
        case "stocks":
            // quantity
            $(".quantity").children('p').remove();
            let regexQuantity = /^-?\d+$/;
            if(!regexQuantity.test($(quantity).val())) {

                let error = $("<p>");
                error.text("Wrong entry, you must enter a valid quantity (an integer)");
                error.css("color", "red");
                $(".quantity").append(error);
                return false;
            }
            break;
        default:
            return true;     
    }
    return true;
}

/**
 * Returns the singular name of a table.
 * @param {string} table - The plural name of the table.
 * @returns {string} - The singular name of the table.
 */
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
