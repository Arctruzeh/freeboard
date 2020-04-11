head.js(
    "js/freeboard_plugins.min.js",

    'https://dashboard.spoke.zone/plugins/mqtt/paho.mqtt.plugin.js',
    'https://dashboard.spoke.zone/plugins/mqtt/mqttPublisher.js',
    'https://dashboard.spoke.zone/plugins/datasources/mrsDatasource.js',

    'plugins/midnetmedia/mmPlugins.js',

    function () {
        $(function () { //DOM Ready
            freeboard.initialize(true);
            var hashpattern = window.location.hash.match(/(&|#)source=([^&]+)/);
            if (hashpattern !== null) {
                $.getJSON(hashpattern[2], function (data) {
                    freeboard.loadDashboard(data, function () {
                        freeboard.setEditing(false);
                    });
                });
            }

        });
    });