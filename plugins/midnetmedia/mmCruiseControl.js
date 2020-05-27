(function () {

    freeboard.addStyle('.cc-top', "width: 100%; height: 40px; background-image: linear-gradient(-180deg, #48A5D8 0%, #006090 100%); box-shadow: 0 2px 4px 0 rgba(0,0,0,0.29); display: flex;")
    freeboard.addStyle('.cc-title', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white; font-weight: 400; font-size: 15px; letter-spacing: 0; padding-left: 6.5%; align-self: center;")
    freeboard.addStyle('.cc-bottom', "user-select: none; width: 100%; height: 80px; background-image: radial-gradient(#48a7d9, #0c6494); display: flex; justify-content: center; align-items: center;")
    freeboard.addStyle('.cc-power', "color: #555557; display: flex; justify-content: center; align-items: center; width: 115px; height: 47px; background: #555557; border: 1px solid #000000; box-shadow: 0 3px 6px 0 rgba(0,0,0,0.11); border-radius: 4px; margin-right: 8px;")
    freeboard.addStyle('.cc-power-inner', "display: flex; align-items: center; width: 105px; height: 38px; background: #545456; border: 1px solid #909091; box-shadow: 0 0 6px 0 rgba(0,0,0,0.11), inset 0 0 3px 0 rgba(0,0,0,0.20); border-radius: 4px;")
    freeboard.addStyle('.cc-on', "display: flex; justify-content: center; align-items: center; width: 51px; height: 36px; background-image: linear-gradient(0deg, #8F8F8F 43%, #6B6B6B 100%); border-radius: 3px 0px 0px 3px; margin-left: 1px; margin-top: 0.5px;")
    freeboard.addStyle('.cc-off', "display: flex; justify-content: center; align-items: center; width: 51px; height: 36px; background-image: linear-gradient(0deg, #8F8F8F 43%, #6B6B6B 100%); border-radius: 0px 3px 3px 0px; margin-left: 1px; margin-top: 0.5px;")
    freeboard.addStyle('.cc-on:active', "background-image: linear-gradient(-180deg, #3D3D3D 1%, #595959 99%);")
    freeboard.addStyle('.cc-off:active', "background-image: linear-gradient(180deg, #595959 1%, #3D3D3D 99%);")
    freeboard.addStyle('.cc-speed', "display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: center; width: 147px; height: 47px;")
    freeboard.addStyle('.cc-minus', "display: flex; align-items: center; justify-content: center; width: 45px; height: 47px; background: radial-gradient(circle, rgba(108,108,108,1) 0%, rgba(76,76,78,1) 100%); border: 1px solid #000000; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.47); border-radius: 4px 0 0 4px;")
    freeboard.addStyle('.cc-minus:active', "background: radial-gradient(circle, rgb(70, 70, 71) 0%, rgba(76,76,78,1) 100%);")
    freeboard.addStyle('.cc-minus-icon', "display:inline-block; width: 15px; height: 15px; background: linear-gradient(#fff,#fff), linear-gradient(#fff,#fff); background-position:center; background-size: 100% 2px; background-repeat:no-repeat;")
    freeboard.addStyle('.cc-status', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; font-weight: 700; font-size: 17px; color: #ffffff; width: 47px; height: 47px; justify-self: center; display: flex; align-items: center; justify-content: center; border: 1px solid #000000;")
    freeboard.addStyle('.cc-plus', "display: flex; justify-self: end; align-items: center; justify-content: center; width: 45px; height: 47px; background: radial-gradient(circle, rgba(108,108,108,1) 0%, rgba(76,76,78,1) 100%); border: 1px solid #000000; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.47); border-radius: 0 4px 4px 0;")
    freeboard.addStyle('.cc-plus:active', "background: radial-gradient(circle, rgb(70, 70, 71) 0%, rgba(76,76,78,1) 100%);")
    freeboard.addStyle('.cc-plus-icon', "display:inline-block; width: 15px; height: 15px; background: linear-gradient(#fff,#fff), linear-gradient(#fff,#fff); background-position:center; background-size: 100% 2px,2px 100%; background-repeat:no-repeat;")

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