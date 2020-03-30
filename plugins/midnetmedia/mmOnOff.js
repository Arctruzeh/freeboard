(function () {

    freeboard.addStyle('.oo-btn', "position: relative; display: inline-block; font-size; 16px; padding: 16px 63px; color: white; text-align: center; transition: top .01s linear; text-shadow: 0 1px 0 rgba(0,0,0,0.15; background-color: #48a7d9;");

	freeboard.addStyle('.oo-btn:hover', "background-color: #45a1d1;");

	freeboard.addStyle('.oo-btn:active', "background-color: #4095c2;");

    freeboard.addStyle('.oo-down', "top: 9px; box-shadow: 0 0 0 1px #4095c2 inset, 0 0 0 2px rgba(255,255,255,0.15) inset, 0 0 0 1px rgba(0,0,0,0.4);")
    
    freeboard.addStyle('.oo-up', "box-shadow: 0 0 0 1px #439dcc inset,0 0 0 2px rgba(255,255,255,0.15) inset, 0 8px 0 0 rgb(72, 169, 219, .7), 0 8px 0 1px rgba(0,0,0,.4), 0 8px 8px 1px rgba(0,0,0,0.5);")

    freeboard.addStyle('.oo-left', "border-radius: 15px 0px 0px 15px;")

    freeboard.addStyle('.oo-right', "border-radius: 0px 15px 15px 0px;")

    //Definition
    freeboard.loadWidgetPlugin({

        type_name: "mmOnOff",

        display_name: "On Off Control Widget",

        description: "Send messages and receive a status",

        settings: [{
            name: "oo_title",
            display_name: "Title",
            type: "text",
            default: " ",
            required: true
        },
        {
            name: "oo_value",
            display_name: "Current Status",
            description: 'Subscribe to this topic for status updates.',
            type: "calculated"
        },
        {
            name: "oo_callback",
            display_name: "Send",
            description: "Publish messages to this topic",
            type: "calculated"
        },
        {
            name: "oo_status_text",
            display_name: "Default Status Text",
            type: "text",
            default_value: "Status"
        },
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new mmOnOff(settings));
        }
    });

    var mmOnOff = 0;

    //Implementation

    var twoAction = function (settings) {

        var self = this;
        var thisWidgetId = "twoActionControl-" + mmOnOff++;
        var currentSettings = settings;
        var notActive = "#9E9E9E";
        var titleElement = $('<div class="section-title"></div>');
        var box = $('<div class="two-action-box" id="' + thisWidgetId + '"></div>');

        var upSquare = $('<div class="control-icon"><span class="opsBam opsBam-openSquare"><span class="openText vertCenter"></span></span></div>');
        var downSquare = $('<div class="control-icon"><span class="opsBam opsBam-closeSquare"><span class="closeText vertCenter"></span></span></div>');
        var statusRect = $('<div class="rectangle"><div class="twoActText"></div></div>');

        var oo_btn_left_up = $('<div class="oo-btn oo-left oo-on"></div>');
        var oo_btn_left_down = $('<div class="oo-btn oo-left oo-on"></div>');
        var oo_btn_right_up = $('<div class="oo-btn oo-left oo-on"></div>');
        var oo_btn_right_down = $('<div class="oo-btn oo-left oo-on"></div>');

        this.onClick = function (e) {

            e.preventDefault();

            let payload;

            // the text element and the icons both need to be clicky
            switch (e.target.className) {
                case 'oo-btn oo-left oo-up':
                    payload = '{"button_1":0, "button_2":1}';
                    break;
                case 'oo-btn oo-right oo-up':
                    payload = '{"button_1":1, "button_2":0}';
                    break;
            }

            let pl = JSON.stringify(payload);
            
            this.sendValue(currentSettings.callback, pl);

        }


        this.render = function (element) {
            $(element).append(titleElement).append(box);
            // add the elements to the widget

        }

        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;
            titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
        }

        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName == "value") {
                if (currentSettings.has_lookup && currentSettings.variables != "Off") {
                    let statElem;
                    let valArray = JSON.parse(currentSettings.variables);
                    statElem = valArray.filter(function (x) { return x.value == newValue });
                    statusText(statElem[0].text, statElem[0].color, statElem[0].textColor);
                } else {
                    let statElem = JSON.parse(newValue);
                    statusText(statElem.text, statElem.color, statElem.textColor);
                }
            }
        }

        this.onDispose = function () { }

        this.getHeight = function () {
            return 2;
        }

        this.onSettingsChanged(settings);
    };


}());