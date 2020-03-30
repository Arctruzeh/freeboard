(function () {

    freeboard.addStyle('.sb-top', "width: 100%; height: 40px; background-image: linear-gradient(-180deg, #48A5D8 0%, #006090 100%); box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.29); display: flex; align-items: center;")

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "mmSingleButton",

        display_name: "MM Single Button",

        description: "A single button.",

        fill_size: true,

        settings: [
            {
                name: "title",
                display_name: "Title",
                type: "text",
                default: " ",
                required: true
            },
            {
                name: "value",
                display_name: "Current Status",
                description: 'Subscribe to this topic for status updates. If not using lookup table, return a value like "{"text": "CLOSED", "color": "#F5F5F5", "textColor": "red"}"',
                type: "calculated"
            },
            {
                name: "callback",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "status_text",
                display_name: "Default Status Text",
                type: "text",
                default_value: "Status"
            },
            {
                name: "show_buttons",
                display_name: "Show Control Buttons",
                type: "option",
                options: [{ name: "Triangles", value: "triangle" }, { name: "Squares", value: "square" }, { name: "Hide Buttons", value: "hide" }],
                default_value: "hide"
            },
            {
                name: "left_button",
                display_name: "Left Button Color",
                type: "option",
                options: [{ name: "Red", value: "red" }, { name: "Orange", value: "orange" }, { name: "Yellow", value: "yellow" }, { name: "Green", value: "green" }, { name: "Blue", value: "blue" }, { name: "Purple", value: "purple" }, { name: "Gray", value: "#9E9E9E" }, { name: "Black", value: "black" }],
                default_value: "blue"
            },
            {
                name: "left_button_text",
                display_name: "Left Button Text",
                type: "text",
                default_value: "-"
            },
            {
                name: "right_button",
                display_name: "Right Button Color",
                type: "option",
                options: [{ name: "Red", value: "red" }, { name: "Orange", value: "orange" }, { name: "Yellow", value: "yellow" }, { name: "Green", value: "green" }, { name: "Blue", value: "blue" }, { name: "Purple", value: "purple" }, { name: "Gray", value: "#9E9E9E" }, { name: "Black", value: "black" }],
                default_value: "green"
            },
            {
                name: "right_button_text",
                display_name: "Right Button Text",
                type: "text",
                default_value: "+"
            },
            {
                name: "has_lookup",
                display_name: "Use Lookup Table?",
                type: "boolean",
                default_value: true
            },
            {
                name: "variables",
                display_name: "Lookup Table",
                description: '[{"value": 1, "text": "CLOSED", "color": "#F5F5F5", "textColor": "red"}, {...}]',
                type: "json",
                default_value: 'Off'
            }
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmSingleButton(settings));

        }

    });

    //Implementation

    var mmSingleButton = function (settings) {

        var sbTop = $('<div class="sb-top"></div>');

        this.onButtonClicked = function (e) {
            e.preventDefault();
            let payloadSend = '{"button_1":1, "button_2":0}';
            let plSend = JSON.stringify(payloadSend);
            this.sendValue(settings.sb_send, plSend);
        }

        this.render = function (containerElement) {

            $(containerElement).css({
                "background-color": "white",
                "width": "100%",
                "height": "100%",
                "user-select": "none",
            });

            $(containerElement).empty();

            $(sbButton).click(this.onButtonClicked.bind(this));

            $(containerElement).append(sbTop).append(sbBottom);

        }

        this.onSettingsChanged = function (newSettings) {

            settings = newSettings;

            sbTitle.html((_.isUndefined(newSettings.sb_title) ? "" : newSettings.sb_title));

            sbButtonLabel.html((_.isUndefined(newSettings.sb_button_text) ? "" : newSettings.sb_button_text));

        }

        this.onCalculatedValueChanged = function (settingName, newValue) {

            if (settingName == "sb_button_color") { $(sbButtonBg).css({ "background-color": newValue }); }

            if (settingName == "sb_button_text_color") { $(sbButtonLabel).css({ "color": newValue }); }

            //if (settingName == "sb_button_text_shadow_color") {$(sbButtonLabel).css({"color": newValue});}

        }

        this.onDispose = function () {

        }

        this.getHeight = function () {
            return 2;
        }

        this.onSettingsChanged(settings);

    };

}());
