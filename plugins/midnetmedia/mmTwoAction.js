(function () {

    //Definition
    freeboard.loadWidgetPlugin({

        type_name: "mmTwoAction",

        display_name: "MM Two Action",

        description: "Send messages and receive a status",

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
            newInstanceCallback(new mmTwoAction(settings));
        }
    });

    var mmTwoActionID = 0;

    //Implementation

    var mmTwoAction = function (settings) {

        var self = this;
        var thisWidgetId = "twoActionControl-" + mmTwoActionID++;
        var currentSettings = settings;
        var notActive = "#9E9E9E";
        var titleElement = $('<div class="section-title"></div>');
        var box = $('<div class="two-action-box" id="' + thisWidgetId + '"></div>');

        var upTriangle = $('<div class="control-icon"><span class="opsBam opsBam-openButton"><span class="openText"></span></span></div>');
        var downTriangle = $('<div class="control-icon"><span class="opsBam opsBam-closeButton"><span class="closeText"></span></span></div>');
        var upSquare = $('<div class="control-icon"><span class="opsBam opsBam-openSquare"><span class="openText vertCenter"></span></span></div>');
        var downSquare = $('<div class="control-icon"><span class="opsBam opsBam-closeSquare"><span class="closeText vertCenter"></span></span></div>');
        var statusRect = $('<div class="rectangle"><div class="twoActText"></div></div>');

        function statusText(text, color, textColor) {
            textColor = textColor || "white";
            document.getElementById(thisWidgetId).getElementsByClassName('twoActText')[0].textContent = text;
            document.getElementById(thisWidgetId).getElementsByClassName('twoActText')[0].style.color = textColor;
            document.getElementById(thisWidgetId).getElementsByClassName('rectangle')[0].style.backgroundColor = color;
        }

        function addText() {
            document.getElementById(thisWidgetId).getElementsByClassName('twoActText')[0].textContent = currentSettings.status_text;
            if (currentSettings.show_buttons != "hide") {
                document.getElementById(thisWidgetId).getElementsByClassName('closeText')[0].textContent = currentSettings.left_button_text;
                document.getElementById(thisWidgetId).getElementsByClassName('openText')[0].textContent = currentSettings.right_button_text;
            }
        }

        this.onClick = function (e) {

            e.preventDefault();

            let payload;

            // the text element and the icons both need to be clicky
            switch (e.target.className) {
                case 'opsBam opsBam-openButton':
                case 'opsBam opsBam-openSquare':
                case 'openText vertCenter':
                case 'openText':
                    payload = '{"button_1":0, "button_2":1}';
                    break;
                case 'opsBam opsBam-closeSquare':
                case 'opsBam opsBam-closeButton':
                case 'closeText vertCenter':
                case 'closeText':
                    payload = '{"button_1":1, "button_2":0}';
                    break;
            }

            let pl = JSON.stringify(payload);
            this.sendValue(currentSettings.callback, pl);
        }


        this.render = function (element) {
            $(element).append(titleElement).append(box);
            // add the elements to the widget
            if (currentSettings.show_buttons == "triangle") {
                upTriangle.prependTo(box);
                statusRect.prependTo(box);
                downTriangle.prependTo(box);
                $(upTriangle).click(this.onClick.bind(this));
                $(downTriangle).click(this.onClick.bind(this));
                $(upTriangle).on('mousedown mouseup', function (e) {
                    $(this).css('color', e.type === 'mousedown' ? currentSettings.right_button : notActive);
                });
                $(downTriangle).on('mousedown mouseup', function (e) {
                    $(this).css('color', e.type === 'mousedown' ? currentSettings.left_button : notActive);
                });
            } else if (currentSettings.show_buttons == "square") {
                upSquare.prependTo(box);
                statusRect.prependTo(box);
                downSquare.prependTo(box);
                $(upSquare).click(this.onClick.bind(this));
                $(downSquare).click(this.onClick.bind(this));
                $(upSquare).on('mousedown mouseup', function (e) {
                    $(this).css('color', e.type === 'mousedown' ? currentSettings.right_button : notActive);
                });
                $(downSquare).on('mousedown mouseup', function (e) {
                    $(this).css('color', e.type === 'mousedown' ? currentSettings.left_button : notActive);
                });
            } else {
                // the user doesn't want the buttons shown
                statusRect.addClass('loneRect');
                statusRect.prependTo(box);
            }
            addText();
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
    }

}())