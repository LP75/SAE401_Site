$(document).ready(function(){

    //Client log in
    $(clientAccess).click(function(){

        //Cookie creation for client
        let cookieClient = "role=client;";
        document.cookie = cookieClient;

        window.location.href = "index.php?action=home";

    })

    //Employee log in
    $(employeeAccess).click(function(){

        //Email and password verification
        $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/employees",function(data){
            for(employee of data){
                if (employee["employee_email"]==$(email).val() && employee["employee_password"]==$(pwd).val()) {

                    //Cookie creation for employee
                    let cookieEmployeeRole = "role="+employee["employee_role"]+"; SameSite=strict;";
                    document.cookie = cookieEmployeeRole;
                    let cookieEmployeeId = "id="+employee["employee_id"]+"; SameSite=strict;";
                    document.cookie = cookieEmployeeId;
                    let cookieEmployeeStoreId = "storeId="+employee["store"]["store_id"]+"; SameSite=strict;"
                    document.cookie = cookieEmployeeStoreId;
                    let cookieEmployeeStoreName = "storeName="+employee["store"]["store_name"]+"; SameSite=strict;"
                    document.cookie = cookieEmployeeStoreName;

                    window.location.href = "index.php?action=home";
                    return;
                }
            } 

            //Error message
            $("#form p").remove();
            let error = $("<p>");
            error.text("Wrong credentials");
            $(form).append(error);

        })

    })

})