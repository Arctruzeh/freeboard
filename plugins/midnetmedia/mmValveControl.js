(function () {

    freeboard.addStyle('.vc-top', "width: 100%; height: 40px; background-image: linear-gradient(-180deg, #48A5D8 0%, #006090 100%); box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.29); display: flex; align-items: center;")
    freeboard.addStyle('.vc-title', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white; font-weight: 400; font-size: 21px; letter-spacing: 0; padding-left: 6.5%; width: 100%;")
    freeboard.addStyle('.vc-bottom', "width: 100%; height: 200px; background-image: radial-gradient(#48a7d9, #0c6494); display: grid; justify-content: center; align-items: center; padding-top: 10px; padding-bottom: 10px; box-sizing: border-box;")
    freeboard.addStyle('.vc-section', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white;")
    freeboard.addStyle('.vc-valve', "color: white;")
    freeboard.addStyle('.vc-control', "display: flex;")
    freeboard.addStyle('.vc-button', "background: #555557; border: 1px solid #000000; border-radius: 4px; box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.11); width: 63px; height: 34px; display: flex; align-items: center; justify-content: center;")
    freeboard.addStyle('.vc-button-two', "background: #545456; border: 1px solid #909091; border-radius: 4px; box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.11), inset 0 0 3px 0 rgba(0, 0, 0, 0.20); width: 56px; height: 28px; display: flex; justify-content: center; align-items: center;")
    freeboard.addStyle('.vc-button-three', "width: 54px; height: 26px; display: flex; align-items: center; justify-content: center; border-radius: 4px; background-image: radial-gradient(50% 105%, #8F8F8F 50%, #6B6B6B 100%);")
    freeboard.addStyle('.vc-button-three:active', "background-image: linear-gradient(-220deg, #3D3D3D 16%, #595959 47%);")
    freeboard.addStyle('.vc-status', "border: 1px solid #4c4c4e; display: flex; justify-content: center; align-items: center; width: 134px; height: 34px; margin-left: 2px; margin-right: 2px;")

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "mmValveControl",

        display_name: "MM Valve Control",

        description: "Consolidated Valve Controls",

        fill_size: true,

        settings: [
            {
                name: "vc_inlet_status",
                display_name: "Inlet Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "vc_inlet_send",
                display_name: "Inlet Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "vc_outlet_status",
                display_name: "Outlet Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "vc_outlet_send",
                display_name: "Outlet Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
            {
                name: "vc_bypass_status",
                display_name: "Bypass Current Status",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
            {
                name: "vc_bypass_send",
                display_name: "Bypass Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmValveControl(settings));

        }

    });

    //Implementation

    var mmValveControl = function (settings) {

        var vcTop = $('<div class="vc-top"></div>');
        var vcTitle = $('<div class="vc-title">VALVE CONTROL</div>');
        var vcBottom = $('<div class="vc-bottom"></div>');

        var vcInlet = $('<div class="vc-inlet vc-section"></div>');
        var vcInletValve = $('<div class="vc-inlet vc-valve">INLET</div>');
        var vcInletControl = $('<div class="vc-inlet vc-control"></div>');
        var vcInletButtonOpen = $('<div class="vc-button"><div class="vc-button-two"><div class="vc-inlet vc-open vc-button-three">OPEN</div></div></div>');
        var vcInletButtonClose = $('<div class="vc-button"><div class="vc-button-two"><div class="vc-inlet vc-close vc-button-three">CLOSE</div></div></div>');
        var vcInletStatus = $('<div class="vc-inlet vc-status"></div>');

        var vcOutlet = $('<div class="vc-outlet vc-section"></div>');
        var vcOutletValve = $('<div class="vc-outlet vc-valve">OUTLET</div>');
        var vcOutletControl = $('<div class="vc-outlet vc-control"></div>');
        var vcOutletButtonOpen = $('<div class="vc-button"><div class="vc-button-two"><div class="vc-outlet vc-open vc-button-three">OPEN</div></div></div>');
        var vcOutletButtonClose = $('<div class="vc-button"><div class="vc-button-two"><div class="vc-outlet vc-close vc-button-three">CLOSE</div></div></div>');
        var vcOutletStatus = $('<div class="vc-outlet vc-status"></div>');

        var vcBypass = $('<div class="vc-bypass vc-section"></div>');
        var vcBypassValve = $('<div class="vc-bypass vc-valve">BYPASS</div>');
        var vcBypassControl = $('<div class="vc-bypass vc-control"></div>');
        var vcBypassButtonOpen = $('<div class="vc-button"><div class="vc-button-two"><div class="vc-bypass vc-open vc-button-three">OPEN</div></div></div>');
        var vcBypassButtonClose = $('<div class="vc-button"><div class="vc-button-two"><div class="vc-bypass vc-close vc-button-three">CLOSE</div></div></div>');
        var vcBypassStatus = $('<div class="vc-bypass vc-status"></div>');

        this.onInletClicked = function (e) {
            e.preventDefault();
            let payloadInlet;
            switch (e.target.className) {
                case 'vc-inlet vc-open vc-button-three':
                    payloadInlet = '{"button_1":1, "button_2":0}';
                    break;
                case 'vc-inlet vc-close vc-button-three':
                    payloadInlet = '{"button_1":0, "button_2":1}';
                    break;
            }
            let plInlet = JSON.stringify(payloadInlet);
            this.sendValue(settings.vc_inlet_send, plInlet);
        }

        this.onOutletClicked = function (e) {
            e.preventDefault();
            let payloadOutlet;
            switch (e.target.className) {
                case 'vc-outlet vc-open vc-button-three':
                    payloadOutlet = '{"button_1":1, "button_2":0}';
                    break;
                case 'vc-outlet vc-close vc-button-three':
                    payloadOutlet = '{"button_1":0, "button_2":1}';
                    break;
            }
            let plOutlet = JSON.stringify(payloadOutlet);
            this.sendValue(settings.vc_outlet_send, plOutlet);
        }

        this.onBypassClicked = function (e) {
            e.preventDefault();
            let payloadBypass;
            switch (e.target.className) {
                case 'vc-bypass vc-open vc-button-three':
                    payloadBypass = '{"button_1":1, "button_2":0}';
                    break;
                case 'vc-bypass vc-close vc-button-three':
                    payloadBypass = '{"button_1":0, "button_2":1}';
                    break;
            }
            let plBypass = JSON.stringify(payloadBypass);
            this.sendValue(settings.vc_bypass_send, plBypass);
        }

        this.render = function (containerElement) {

            $(containerElement).css({
                "background-color": "white",
                "width": "100%",
                "height": "100%",
                "user-select": "none",
            });

            $(containerElement).empty();

            $(vcInletButtonOpen).click(this.onInletClicked.bind(this));
            $(vcInletButtonClose).click(this.onInletClicked.bind(this));
            $(vcOutletButtonOpen).click(this.onOutletClicked.bind(this));
            $(vcOutletButtonClose).click(this.onOutletClicked.bind(this));
            $(vcBypassButtonOpen).click(this.onBypassClicked.bind(this));
            $(vcBypassButtonClose).click(this.onBypassClicked.bind(this));

            $(vcTop).append(vcTitle);

            $(vcInletControl).append(vcInletButtonOpen).append(vcInletStatus).append(vcInletButtonClose);
            $(vcOutletControl).append(vcOutletButtonOpen).append(vcOutletStatus).append(vcOutletButtonClose);
            $(vcBypassControl).append(vcBypassButtonOpen).append(vcBypassStatus).append(vcBypassButtonClose);

            $(vcInlet).append(vcInletValve).append(vcInletControl);
            $(vcOutlet).append(vcOutletValve).append(vcOutletControl);
            $(vcBypass).append(vcBypassValve).append(vcBypassControl);

            $(vcBottom).append(vcInlet).append(vcOutlet).append(vcBypass);

            $(containerElement).append(vcTop).append(vcBottom);

        }

        this.onSettingsChanged = function (newSettings) {

            settings = newSettings;

        }

        this.onCalculatedValueChanged = function (settingName, newValue) {

            if (settingName == "vc_inlet_status") {
                if (newValue == "1") { $(vcInletStatus).html("OPENED"); }
                if (newValue == "2") { $(vcInletStatus).html("CLOSED"); }
                if (newValue == "3") { $(vcInletStatus).html("OPENING"); }
                if (newValue == "4") { $(vcInletStatus).html("CLOSING"); }
                if (newValue == "5") { $(vcInletStatus).html("MID"); }
                if (newValue == "6") { $(vcInletStatus).html("CHECK PROXES"); }
                if (newValue == "-1") { $(vcInletStatus).html("DISCONNECTED"); }
            }

            if (settingName == "vc_outlet_status") {
                if (newValue == "1") { $(vcOutletStatus).html("OPENED"); }
                if (newValue == "2") { $(vcOutletStatus).html("CLOSED"); }
                if (newValue == "3") { $(vcOutletStatus).html("OPENING"); }
                if (newValue == "4") { $(vcOutletStatus).html("CLOSING"); }
                if (newValue == "5") { $(vcOutletStatus).html("MID"); }
                if (newValue == "6") { $(vcOutletStatus).html("CHECK PROXES"); }
                if (newValue == "-1") { $(vcOutletStatus).html("DISCONNECTED"); }
            }

            if (settingName == "vc_bypass_status") {
                if (newValue == "1") { $(vcBypassStatus).html("OPENED"); }
                if (newValue == "2") { $(vcBypassStatus).html("CLOSED"); }
                if (newValue == "3") { $(vcBypassStatus).html("OPENING"); }
                if (newValue == "4") { $(vcBypassStatus).html("CLOSING"); }
                if (newValue == "5") { $(vcBypassStatus).html("MID"); }
                if (newValue == "6") { $(vcBypassStatus).html("CHECK PROXES"); }
                if (newValue == "-1") { $(vcBypassStatus).html("DISCONNECTED"); }
            }

        }

        this.onDispose = function () {

        }

        this.getHeight = function () {
            return 4;
        }

        this.onSettingsChanged(settings);

    };

}());
