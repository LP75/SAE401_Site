$(document).ready(function(){
    //Array for price selection
    let prices = [];

    //Selection of Sort Option
    $(selectOption).change(function(){
        let optionValue = $(this).val();

        //Case for each option
        switch(optionValue){
            case "brand":

                //Show Select Parameter
                $(selectParameter).attr("class","form-select");

                //Hide Select Price
                $(priceDiv).attr("class","d-none");

                //Clear previous selection
                $(selectParameter).empty();

                let firstOptionBr = $("<option>");
                firstOptionBr.attr("disabled", true);
                firstOptionBr.attr("selected", true);
                firstOptionBr.text("Select a Brand");
                $(selectParameter).append(firstOptionBr);

                $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/brands", function(data){

                    for (let brand of data) {
                        let option = $("<option>");
                        option.attr("value",brand["brand_name"]);
                        option.text(brand["brand_name"]);
                        $(selectParameter).append(option);
                    }
                })
                break;
            case "category":

                //Show Select Parameter
                $(selectParameter).attr("class","form-select");

                //Hide Select Price
                $(priceDiv).attr("class","d-none");

                //Clear previous selection
                $(selectParameter).empty();

                let firstOptionCat = $("<option>");
                firstOptionCat.attr("disabled", true);
                firstOptionCat.attr("selected", true);
                firstOptionCat.text("Select a Category");
                $(selectParameter).append(firstOptionCat);
                
                $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/categories", function(data){

                    for (let brand of data) {
                        let option = $("<option>");
                        option.attr("value",brand["category_name"]);
                        option.text(brand["category_name"]);
                        $(selectParameter).append(option);
                    }
                })
                break;
            case "year":

                //Show Select Parameter
                $(selectParameter).attr("class","form-select");

                //Hide Select Price
                $(priceDiv).attr("class","d-none");

                //Clear previous selection
                $(selectParameter).empty();

                let firstOptionYear = $("<option>");
                firstOptionYear.attr("disabled", true);
                firstOptionYear.attr("selected", true);
                firstOptionYear.text("Select a Year");
                $(selectParameter).append(firstOptionYear);

                //Get all the products and get a list of valid years
                $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/products", function(data){

                    let validYears = [];

                    for (product of data) {
                        if (!validYears.includes(product["model_year"])) {
                            validYears.push(product["model_year"]);
                        }
                    }

                    for (let i=0; i<validYears.length; i++) {
                        let option = $("<option>");
                        option.attr("value",validYears[i]);
                        option.text(validYears[i]);
                        $(selectParameter).append(option);
                    }
                })
                break;
            case "price":

                //Hide Select Parameter
                $(selectParameter).attr("class","d-none");

                //Show Select Price
                $(priceDiv).attr("class","container");

                let firstOptionMin = $("<option>");
                firstOptionMin.attr("disabled", true);
                firstOptionMin.attr("selected", true);
                firstOptionMin.text("Min price");
                $(selectMin).append(firstOptionMin);

                let firstOptionMax = $("<option>");
                firstOptionMax.attr("disabled", true);
                firstOptionMax.attr("selected", true);
                firstOptionMax.text("Max price");
                $(selectMax).append(firstOptionMax);

                //Get all prices
                $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/products", function(data){

                    for (product of data) {
                        if (!prices.includes(product["list_price"])) {
                            prices.push(product["list_price"]);
                        }
                    }
                    
                    //Sort prices
                    prices.sort(function(a, b) {
                        return a - b;
                    });

                    //Add prices to the select
                    for (let i=0; i<prices.length; i++) {
                        let optionMin = $("<option>");
                        optionMin.attr("value", prices[i]);
                        optionMin.text(prices[i]);
                        $(selectMin).append(optionMin);
                    
                        let optionMax = $("<option>");
                        optionMax.attr("value", prices[i]);
                        optionMax.text(prices[i]);
                        $(selectMax).append(optionMax);
                    }
                })
                break;
        }
    })

    //Selection of Sort Parameter and display of products
    $(selectParameter).change(function(){
        let parameterValue = encodeURIComponent($(this).val());
        let optionValue = $(selectOption).val();
        
        $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/products/"+optionValue+"/"+parameterValue, function(data){

            //Clear previous selection
            $(tbody).empty();

            for (product of data){
                let tr = $("<tr>");

                let name = $("<td>");
                name.text(product["product_name"]);
                tr.append(name);

                let brand = $("<td>");
                brand.text(product["brand"]["brand_name"]);
                tr.append(brand);

                let category = $("<td>");
                category.text(product["category"]["category_name"]);
                tr.append(category);

                let year = $("<td>");
                year.text(product["model_year"]);
                tr.append(year);

                let price = $("<td>");
                price.text(product["list_price"]);
                tr.append(price);

                $(tbody).append(tr);

            }

        })
    })

    //Selection of price range and display of products

        //Min
        $(selectMin).change(function(){
            let minValue = parseFloat($(selectMin).val());

            //Adjust maxSelect depending on minSelect Value
            let maxValue = parseFloat($(selectMax).val());
            $(selectMax).empty();

            for (let i=0; i<prices.length; i++) {
                
                if (parseFloat(prices[i])>minValue) {
                    let optionMax = $("<option>");
                    optionMax.attr("value", prices[i]);
                    optionMax.text(prices[i]);
                    if (parseFloat(prices[i])==maxValue){
                        optionMax.attr("selected", true);
                    }
                    $(selectMax).append(optionMax);
                }
            }

            priceResult();
        })

        //Max
        $(selectMax).change(function(){
            let maxValue = parseFloat($(selectMax).val());

            //Adjust maxSelect depending on minSelect Value
            let minValue = parseFloat($(selectMin).val());
            $(selectMin).empty();

            for (let i=0; i<prices.length; i++) {
                
                if (parseFloat(prices[i])<maxValue) {
                    let optionMin = $("<option>");
                    optionMin.attr("value", prices[i]);
                    optionMin.text(prices[i]);
                    if (parseFloat(prices[i])==minValue){
                        optionMin.attr("selected", true);
                    }
                    $(selectMin).append(optionMin);
                }
            }

            priceResult();
        })

    //Sort products depending on min and max
    function priceResult(){

        $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/products", function(data){

            //Clear previous selection
            $(tbody).empty();

            //Get min and max values
            let minValue = parseFloat($(selectMin).val());
            let maxValue = parseFloat($(selectMax).val());

            for (product of data){
                let prdctPrice = parseFloat(product["list_price"]);
                if (prdctPrice>=minValue && prdctPrice<=maxValue) {
                    let tr = $("<tr>");

                    let name = $("<td>");
                    name.text(product["product_name"]);
                    tr.append(name);
    
                    let brand = $("<td>");
                    brand.text(product["brand"]["brand_name"]);
                    tr.append(brand);
    
                    let category = $("<td>");
                    category.text(product["category"]["category_name"]);
                    tr.append(category);
    
                    let year = $("<td>");
                    year.text(product["model_year"]);
                    tr.append(year);
    
                    let price = $("<td>");
                    price.text(product["list_price"]);
                    tr.append(price);
    
                    $(tbody).append(tr);
                }
            }
        })
    }





    //Sort function for the table
    $('.table thead th').click(function(){
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
    });


})