/**
 * Executes the provided function when the DOM is fully loaded.
 * @callback readyCallback
 */

/**
 * Executes a callback function when the DOM is fully loaded.
 * @param {readyCallback} callback - The function to execute.
 */
$(document).ready(function(callback) {

    /**
     * Click event handler for the modification button.
     * @callback modifyClickCallback
     */

    /**
     * Handles the click event on the modify button.
     * Verifies the old password and updates employee information accordingly.
     * @param {modifyClickCallback} callback - The function to execute on click.
     */
    $(modify).click(function(callback) {

        // Verify old password
        let urlAPI = "https://dev-plantiv221.users.info.unicaen.fr/bikestores/employees/" + getCookie("id");
        let putRequest;

        /**
         * Callback function for handling the response of the GET request.
         * @callback getJSONCallback
         * @param {Object} data - The data received from the API.
         */
        $.getJSON(urlAPI, function(data) {
            $("#form p").remove();
            if (data["employee_password"] == $(oldPwd).val()) {
                let dataPUT = {
                    "employee_email": $(newEmail).val(),
                    "employee_password": $(newPwd).val(),
                    "employee_name": data["employee_name"],
                    "employee_role": data["employee_role"],
                    "store_id": data["store"]["store_id"]
                };

                let dataPUTJson = JSON.stringify(dataPUT);

                let headers = {
                    "Authorization": "Bearer e8f1997c763"
                };
                // Send PUT request
                putRequest = $.ajax({
                    url: urlAPI,
                    type: 'PUT',
                    data: dataPUTJson,
                    headers: headers
                });

                $(newEmail).val("");
                $(newPwd).val("");
                $(oldPwd).val("");

                let success = $("<p>");
                success.text("Changes successful");
                success.css("color", "green");
                $(form).append(success);

                return;
            } else {

                let error = $("<p>");
                error.text("Wrong password");
                error.css("color", "red");
                $(form).append(error);

            }
        });

    });

});
