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
     * Retrieves the list of employees from the API and populates the table accordingly.
     * @function getEmployeesList
     */
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/employees", function(data) {

        let storeName = "";

        for (let employee of data) {

            // If it's an IT employee, display all employees. If it's a chief employee, display employees from his store
            if (getCookie("role") == "it" || parseInt(getCookie("storeId")) === employee["store"]["store_id"]) {
                let tr = $("<tr>");

                let id = $("<td>");
                id.text(employee["employee_id"]);
                tr.append(id);

                let name = $("<td>");
                name.text(employee["employee_name"]);
                tr.append(name);

                let email = $("<td>");
                email.text(employee["employee_email"]);
                tr.append(email);

                let role = $("<td>");
                role.text(employee["employee_role"]);
                tr.append(role);

                let store = $("<td>");
                store.text(employee["store"]["store_name"]);
                tr.append(store);

                $("tbody").append(tr);

                storeName = employee["store"]["store_name"];
            }
        }

        // Adapt H2 based on the user's role
        if (getCookie("role") == "chief") {
            $("h2").text("Employees of store : " + storeName);
        }
    });

    /**
     * Sorts the table when a column header is clicked.
     * @function sortTable
     */
    $('.table thead th').click(sortTable);
});
