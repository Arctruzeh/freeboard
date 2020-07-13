(function () {

    freeboard.addStyle('.wd-top', "width: 100%; height: 40px; background-image: linear-gradient(-180deg, #48A5D8 0%, #006090 100%); box-shadow: 0 2px 4px 0 rgba(0,0,0,0.29);")
    freeboard.addStyle('.wd-title', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white; font-weight: 400; font-size: 15px; letter-spacing: 0; position: absolute; left: 25.5px; top: 10px;")
    freeboard.addStyle('.wd-bottom', "width: 100%; height: 200px; background-image: radial-gradient(#48a7d9, #0c6494);")
    freeboard.addStyle('#wd-one', "position: absolute; left: 19px; top: 52px;")
    freeboard.addStyle('#wd-two', "position: absolute; left: 89px; top: 52px;")
    freeboard.addStyle('#wd-three', "position: absolute; left: 159px; top: 52px;")
    freeboard.addStyle('#wd-four', "position: absolute; left: 225px; top: 58px;")
    freeboard.addStyle('.wd-label', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; font-weight: 600; font-size: 15px; color: white; letter-spacing: 0; text-align: center; line-height: 15px; width: 40px; margin-left: 3.8px; margin-bottom: 5px;")
    freeboard.addStyle('.wd-btn', "width: 45px; height: 45px; background: radial-gradient(circle, rgba(108,108,108,1) 0%, rgba(76,76,78,1) 100%); border: 1px solid #000000; box-shadow: 0 1px 3px 0 rgba(0,0,0,0.47); margin-left: 1px; transition: top 1.01s linear;")
    freeboard.addStyle('.wd-btn:active', "background: radial-gradient(circle, rgb(70, 70, 71) 0%, rgba(76,76,78,1) 100%);")
    freeboard.addStyle('.wd-btn:hover', "box-shadow: 0 1px 3px 0 rgba(0,0,0,0.97);")
    freeboard.addStyle('.wd-up', "border-radius: 4px 4px 0px 0px;")
    freeboard.addStyle('.wd-down', "border-radius: 0px 0px 4px 4px;")
    freeboard.addStyle('.wd-plus', "margin-top: 15px; margin-left: 15px; display:inline-block; width: 15px; height: 15px; background: linear-gradient(#fff,#fff), linear-gradient(#fff,#fff); background-position:center; background-size: 100% 2px,2px 100%; background-repeat:no-repeat;")
    freeboard.addStyle('.wd-minus', "margin-top: 15px; margin-left: 15px; display:inline-block; width: 15px; height: 15px; background: linear-gradient(#fff,#fff), linear-gradient(#fff,#fff); background-position:center; background-size: 100% 2px; background-repeat:no-repeat;")
    freeboard.addStyle('.wd-box', "border: 1px solid #4c4c4e; width: 45px; height: 36px; margin-left: 1px; margin-top: 5px; margin-bottom: 5px;")
    freeboard.addStyle('.wd-number', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; margin-top: 6px; font-weight: 700; font-size: 17px; color: #ffffff; letter-spacing: 0; text-align: center;")
    freeboard.addStyle('.wd-power', "border: 1px solid #000000; background: #555557; box-shadow: 0 3px 6px 0 rgba(0,0,0,0.11); width: 58px; height: 170px; border-radius: 30px; display: flex; flex-wrap: wrap; align-content: center; justify-content: center;")
    freeboard.addStyle('.wd-inner', "width: 44px; height: 156px; background: #545456; border: 1px solid #909091; box-shadow: 0 0 6px 0 rgba(0,0,0,0.11), inset 0 0 3px 0 rgba(0,0,0,0.20); border-radius: 30px; display: flex; flex-wrap: wrap; align-content: center; justify-content: center;")
    freeboard.addStyle('.wd-on', "margin-bottom: 0.5px; background-image: linear-gradient(0deg, #8F8F8F 43%, #6B6B6B 100%); border-radius: 30px 30px 0px 0px; width: 42px; height: 77px; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 15px; color: #000; letter-spacing: 0; text-align: center; line-height: 15px;")
    freeboard.addStyle('.wd-off', "margin-top: 0.5px; background-image: linear-gradient(0deg, #8F8F8F 43%, #6B6B6B 100%); border-radius: 0px 0px 30px 30px; width: 42px; height: 76px; display: flex; justify-content: center; align-items: center; font-weight: 600; font-size: 15px; color: #000; letter-spacing: 0; text-align: center; line-height: 15px;")
    freeboard.addStyle('.wd-on:active', "background-image: linear-gradient(-180deg, #3D3D3D 1%, #595959 99%);")
    freeboard.addStyle('.wd-off:active', "background-image: linear-gradient(180deg, #595959 1%, #3D3D3D 99%);")

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "mmWatchdog",

        display_name: "MM Watchdog",

        description: "Consolidated Watchdog Controls",

        fill_size: true,

        settings: [
            {
                name: "wd_power_status",
                display_name: "Power Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "wd_power_send",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "wd_maxout_status",
                display_name: "Max Out Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "wd_maxout_send",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "wd_minout_status",
                display_name: "Min Out Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "wd_minout_send",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "wd_minin_status",
                display_name: "Min Inlet Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "wd_minin_send",
                display_name: "Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmWatchdog(settings));

        }

    });

    //Implementation

    var mmWatchdog = function (settings) {

        var self = this;

        var currentSettings = settings;

        var wdTop = $('<div class="wd-top"></div>');
        var wdTitle = $('<div class="wd-title">WATCHDOG</div>');
        var wdBottom = $('<div class="wd-bottom"></div>');
        var wdOne = $('<div id="wd-one"></div>');
        var wdTwo = $('<div id="wd-two"></div>');
        var wdThree = $('<div id="wd-three"></div>');
        var wdFour = $('<div id="wd-four"></div>');
        var wdLabelUno = $('<div class="wd-label">MAX<br>OUT</div>');
        var wdLabelDos = $('<div class="wd-label">MIN<br>OUT</div>');
        var wdLabelTres = $('<div class="wd-label">MIN<br>INLET</div>');
        var wdBtnUpUno = $('<div class="wd-btn wd-up wd-btn-up-uno"><div class="wd-plus wd-btn-up-uno"></div></div>');
        var wdBtnUpDos = $('<div class="wd-btn wd-up wd-btn-up-dos"><div class="wd-plus wd-btn-up-dos"></div></div>');
        var wdBtnUpTres = $('<div class="wd-btn wd-up wd-btn-up-tres"><div class="wd-plus wd-btn-up-tres"></div></div>');
        var wdBoxUno = $('<div class="wd-box"></div>');
        var wdBoxDos = $('<div class="wd-box"></div>');
        var wdBoxTres = $('<div class="wd-box"></div>');
        var wdNumberUno = $('<div class="wd-number"></div>');
        var wdNumberDos = $('<div class="wd-number"></div>');
        var wdNumberTres = $('<div class="wd-number"></div>');
        var wdBtnDownUno = $('<div class="wd-btn wd-down wd-btn-down-uno"><div class="wd-minus wd-btn-down-uno"></div></div>');
        var wdBtnDownDos = $('<div class="wd-btn wd-down wd-btn-down-dos"><div class="wd-minus wd-btn-down-dos"></div></div>');
        var wdBtnDownTres = $('<div class="wd-btn wd-down wd-btn-down-tres"><div class="wd-minus wd-btn-down-tres"></div></div>');
        var wdPower = $('<div class="wd-power"></div>');
        var wdInner = $('<div class="wd-inner"></div>');
        var wdOn = $('<div class="wd-on">ON</div>');
        var wdOff = $('<div class="wd-off">OFF</div>');

        this.onPowerClicked = function (e) {
            e.preventDefault();
            let payloadpower;
            switch (e.target.className) {
                case 'wd-on':
                    payloadpower = '{"button_1":1, "button_2":0}';
                    break;
                case 'wd-off':
                    payloadpower = '{"button_1":0, "button_2":1}';
                    break;
            }
            let plpower = JSON.stringify(payloadpower);
            this.sendValue(currentSettings.wd_power_send, plpower);
        }

        this.onMaxOutClicked = function (e) {
            e.preventDefault();
            let payloadmaxout;
            switch (e.target.className) {
                case 'wd-btn wd-up wd-btn-up-uno':
                    payloadmaxout = '{"button_1":0, "button_2":1}';
                    break;
                case 'wd-plus wd-btn-up-uno':
                    payloadmaxout = '{"button_1":0, "button_2":1}';
                    break;
                case 'wd-btn wd-down wd-btn-down-uno':
                    payloadmaxout = '{"button_1":1, "button_2":0}';
                    break;
                case 'wd-minus wd-btn-down-uno':
                    payloadmaxout = '{"button_1":1, "button_2":0}';
                    break;
            }
            let plmaxout = JSON.stringify(payloadmaxout);
            this.sendValue(currentSettings.wd_maxout_send, plmaxout);
        }

        this.onMinOutClicked = function (e) {
            e.preventDefault();
            let payloadminout;
            switch (e.target.className) {
                case 'wd-btn wd-up wd-btn-up-dos':
                    payloadminout = '{"button_1":0, "button_2":1}';
                    break;
                case 'wd-plus wd-btn-up-dos':
                    payloadminout = '{"button_1":0, "button_2":1}';
                    break;
                case 'wd-btn wd-down wd-btn-down-dos':
                    payloadminout = '{"button_1":1, "button_2":0}';
                    break;
                case 'wd-minus wd-btn-down-dos':
                    payloadminout = '{"button_1":1, "button_2":0}';
                    break;
            }
            let plminout = JSON.stringify(payloadminout);
            this.sendValue(currentSettings.wd_minout_send, plminout);
        }

        this.onMinInClicked = function (e) {
            e.preventDefault();
            let payloadmininlet;
            switch (e.target.className) {
                case 'wd-btn wd-up wd-btn-up-tres':
                    payloadmininlet = '{"button_1":0, "button_2":1}';
                    break;
                case 'wd-plus wd-btn-up-tres':
                    payloadmininlet = '{"button_1":0, "button_2":1}';
                    break;
                case 'wd-btn wd-down wd-btn-down-tres':
                    payloadmininlet = '{"button_1":1, "button_2":0}';
                    break;
                case 'wd-minus wd-btn-down-tres':
                    payloadmininlet = '{"button_1":1, "button_2":0}';
                    break;
            }
            let plmininlet = JSON.stringify(payloadmininlet);
            this.sendValue(currentSettings.wd_minin_send, plmininlet);
        }

        self.render = function (containerElement) {

            $(containerElement).css({
                "background-color": "white",
                "width": "100%",
                "height": "100%",
            });

            $(containerElement).empty();

            $(wdOn).click(self.onPowerClicked.bind(self));
            $(wdOff).click(self.onPowerClicked.bind(self));

            $(wdBtnUpUno).click(self.onMaxOutClicked.bind(self));
            $(wdBtnDownUno).click(self.onMaxOutClicked.bind(self));

            $(wdBtnUpDos).click(self.onMinOutClicked.bind(self));
            $(wdBtnDownDos).click(self.onMinOutClicked.bind(self));

            $(wdBtnUpTres).click(self.onMinInClicked.bind(self));
            $(wdBtnDownTres).click(self.onMinInClicked.bind(self));

            $(wdTop).append(wdTitle);
            $(wdBoxUno).append(wdNumberUno);
            $(wdBoxDos).append(wdNumberDos);
            $(wdBoxTres).append(wdNumberTres);
            $(wdOne).append(wdLabelUno).append(wdBtnUpUno).append(wdBoxUno).append(wdBtnDownUno);
            $(wdTwo).append(wdLabelDos).append(wdBtnUpDos).append(wdBoxDos).append(wdBtnDownDos);
            $(wdThree).append(wdLabelTres).append(wdBtnUpTres).append(wdBoxTres).append(wdBtnDownTres);
            $(wdInner).append(wdOn).append(wdOff);
            $(wdPower).append(wdInner);
            $(wdFour).append(wdPower);
            $(wdBottom).append(wdOne).append(wdTwo).append(wdThree).append(wdFour);
            $(containerElement).append(wdTop).append(wdBottom);

        }

        self.onSettingsChanged = function (newSettings) {

            currentSettings = newSettings;

        }

        self.onCalculatedValueChanged = function (settingName, newValue) {

            //console.log("valueChanged:", settingName, newValue);

            if (settingName == "wd_power_status") {

                if (newValue == "1") {

                    $(wdOn).css({ "color": "#ffffff" });
                    $(wdOff).css({ "color": "#000000" });

                }

                else {

                    $(wdOn).css({ "color": "#000000" });
                    $(wdOff).css({ "color": "#ffffff" });

                }

            }

            if (settingName == "wd_maxout_status") { $(wdNumberUno).html(newValue); }
            if (settingName == "wd_minout_status") { $(wdNumberDos).html(newValue); }
            if (settingName == "wd_minin_status") { $(wdNumberTres).html(newValue); }

        }

        self.onDispose = function () {

        }

        this.getHeight = function () {
            return 4;
        }

        self.onSettingsChanged(settings);

    };

}());
