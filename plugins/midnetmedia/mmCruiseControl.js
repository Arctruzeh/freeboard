(function () {

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "mmCruiseControl",

        display_name: "MM Cruise Control",

        description: "Consolidated Cruise Control",

        fill_size: true,

        settings: [
            {
                name: "cc_power_status",
                display_name: "Power Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "cc_power_send",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "cc_setpoint_status",
                display_name: "Set Point Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "cc_setpoint_send",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmCruiseControl(settings));

        }

    });

    //Implementation

    var mmCruiseControl = function (settings) {

        var self = this;

        var currentSettings = settings;

        var ccTop = $('<div class="cc-top"></div>');
        var ccTitle = $('<div class="cc-title">CRUISE CONTROL</div>');
        var ccBottom = $('<div class="cc-bottom"></div>');
        var ccPower = $('<div class="cc-power"></div>');
        var ccInner = $('<div class="cc-power-inner"></div>');
        var ccOn = $('<div class="cc-on">ON</div>');
        var ccOff = $('<div class="cc-off">OFF</div>');
        var ccSpeed = $('<div class="cc-speed"></div>');
        var ccMinus = $('<div class="cc-minus"></div>');
        var ccMinusIcon = $('<div class="cc-minus-icon"></div>');
        var ccStatus = $('<div class="cc-status"></div>');
        var ccPlus = $('<div class="cc-plus"></div>');
        var ccPlusIcon = $('<div class="cc-plus-icon"></div>');

        this.onPowerClicked = function (e) {
            e.preventDefault();
            let payloadpower;
            switch (e.target.className) {
                case 'cc-on':
                    payloadpower = '{"button_1":1, "button_2":0}';
                    break;
                case 'cc-off':
                    payloadpower = '{"button_1":0, "button_2":1}';
                    break;
            }
            let plpower = JSON.stringify(payloadpower);
            this.sendValue(currentSettings.cc_power_send, plpower);
        }

        this.onSetPointClicked = function (e) {
            e.preventDefault();
            let payloadsetpoint;
            switch (e.target.className) {
                case 'cc-plus':
                    payloadsetpoint = '{"button_1":0, "button_2":1}';
                    break;
                case 'cc-plus-icon':
                    payloadsetpoint = '{"button_1":0, "button_2":1}';
                    break;
                case 'cc-minus':
                    payloadsetpoint = '{"button_1":1, "button_2":0}';
                    break;
                case 'cc-minus-icon':
                    payloadsetpoint = '{"button_1":1, "button_2":0}';
                    break;
            }
            let plsetpoint = JSON.stringify(payloadsetpoint);
            this.sendValue(currentSettings.cc_setpoint_send, plsetpoint);
        }

        self.render = function (containerElement) {

            $(containerElement).css({
                "background-color": "white",
                "width": "100%",
                "height": "100%",
            });

            $(containerElement).empty();

            $(ccOn).click(self.onPowerClicked.bind(self));
            $(ccOff).click(self.onPowerClicked.bind(self));
            $(ccPlus).click(self.onSetPointClicked.bind(self));
            $(ccMinus).click(self.onSetPointClicked.bind(self));

            $(ccTop).append(ccTitle);

            $(ccInner).append(ccOn).append(ccOff);
            $(ccPower).append(ccInner);

            $(ccMinus).append(ccMinusIcon);
            $(ccPlus).append(ccPlusIcon);
            $(ccSpeed).append(ccMinus).append(ccStatus).append(ccPlus);

            $(ccBottom).append(ccPower).append(ccSpeed);

            $(containerElement).append(ccTop).append(ccBottom);

        }

        self.onSettingsChanged = function (newSettings) {

            currentSettings = newSettings;

        }

        self.onCalculatedValueChanged = function (settingName, newValue) {

            //console.log("valueChanged:", settingName, newValue);

            if (settingName == "cc_power_status") {

                if (newValue == "1") {

                    $(ccOn).css({ 
                        "color": "#ffffff", 
                        "text-shadow": "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000", 
                    });
                    $(ccOff).css({ "color": "#555557" });

                }

                else {

                    $(ccOn).css({ "color": "#555557" });
                    $(ccOff).css({ 
                        "color": "#ffffff", 
                        "text-shadow": "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000", 
                    });

                }

            }

            if (settingName == "cc_setpoint_status") { $(ccStatus).html(newValue); }

        }

        self.onDispose = function () {

        }

        this.getHeight = function () {
            return 2;
        }

        self.onSettingsChanged(settings);

    };

}());