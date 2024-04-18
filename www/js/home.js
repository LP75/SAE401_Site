/**
 * Initializes the map and retrieves store information from the API to display markers.
 * @function initializeMap
 */
$(document).ready(function() {

    // Map creation
    var map = L.map('map');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Array to store store latitude and longitude
    let storeLTLG = [];
    let nbStore = 0;
    let butStore = {};

    /**
     * Retrieves store data and creates buttons and markers for each store.
     * @function getStoreData
     */
    $.getJSON("https://dev-plantiv221.users.info.unicaen.fr/bikestores/stores", async function(data) {

        for (let store of data) {
            $("#but_stores").append("<button type=\"button\" id=but" + nbStore + " class=\"btn btn-primary mx-1\">" + store["store_name"] + "</button>");
            await storeData(store);
        }

        // Event listeners for the buttons
        for (let i = 0; i < 3; i++) {
            butStore["listener" + i] = $("#but" + i).on("click", function() {
                map.setView(butStore["marker" + i].getLatLng(), 18);
            });
        }
    });

    /**
     * Retrieves data for each store and creates markers on the map.
     * @function storeData
     * @param {Object} store - The store object.
     */
    async function storeData(store) {
        return new Promise((resolve) => {

            $.getJSON("https://nominatim.openstreetmap.org/search?format=json&q=" + encodeURIComponent(store["street"]) + " " + encodeURIComponent(store["zip_code"]), async function(OSMdata) {

                butStore["marker" + nbStore] = L.marker([OSMdata[0]["lat"], OSMdata[0]["lon"]]);
                butStore["marker" + nbStore].addTo(map);

                nbStore++;
                resolve();
            });
        });
    }

    /**
     * Retrieves visitor IP and coordinates to create a marker on the map.
     * @function getUserLocation
     */
    $.getJSON("https://api-bdc.net/data/client-ip", function(data) {

        let ip = data["ipString"];

        $.getJSON("https://api.apibundle.io/ip-lookup?apikey=85ab91ee4fc2466d98e7a000e8277443&ip=" + ip, function(data) {
            let userMarker = L.marker([data["latitude"], data["longitude"]]);
            userMarker.bindTooltip("Your location (based on your public IP)", {
                permanent: true,
                direction: 'top'
            }).openTooltip();
            userMarker.addTo(map);
            map.setView(userMarker.getLatLng(), 18);

        });
    });
});
