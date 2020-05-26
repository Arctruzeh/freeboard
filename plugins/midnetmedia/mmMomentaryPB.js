(function () {

    freeboard.addStyle('.pb-container', "width: 100%; height: 100%; background-image: radial-gradient(#48a7d9, #0c6494); display: flex; justify-content: center; align-items: center;")
    freeboard.addStyle('.pb-button', "display: flex; justify-content: center; align-items: center; width: 50%; height: 75%; background: #555557; border: 1px solid #000000; box-shadow: 0 3px 6px 0 rgba(0,0,0,0.11); border-radius: 4px; margin-right: 8px;")
    freeboard.addStyle('.pb-button-inner', 'display: flex; align-items: center; justify-content: center; width: 93%; height: 85%; background: #545456; border: 1px solid #909091; box-shadow: 0 0 6px 0 rgba(0,0,0,0.11), inset 0 0 3px 0 rgba(0,0,0,0.20); border-radius: 4px;')
    freeboard.addStyle('.pb-button-bg', 'display: flex; justify-content: center; align-items: center; width: 97%; height: 90%; background-color: grey; border-radius: 4px 4px 4px 4px; margin-left: 1px; margin-top: 0.5px;')
    freeboard.addStyle('.pb-button-label', 'display: flex; justify-content: center; align-items: center; overflow: hidden; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(0,0,0,0.0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.0) 100%); text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white; border-radius: 4px 4px 4px 4px;')
    freeboard.addStyle('.pb-button-label:active', 'background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);')

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "mmMomentaryPB",

        display_name: "MM Momentary PB",

        description: "A single button to hold.",

        fill_size: true,

        settings: [
            {
                name: "pb_button_text",
                display_name: "Button Text",
                description: "Text on the button.",
                type: "text"
            },
            {
                name: "pb_button_text_color",
                display_name: "Button Text Color",
                description: "Color of the button text.",
                type: "calculated"
            },
            {
                name: "pb_button_color",
                display_name: "Button Color",
                description: 'Color of button.',
                type: "calculated"
            },
            {
                name: "pb_send",
                display_name: "Button Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmMomentaryPB(settings));

        }

    });

    //Implementation

    var mmMomentaryPB = function (settings) {

        var pbButtonLabel = $('<div class="pb-button-label"></div>');
        var pbButtonBg = $('<div class="pb-button-bg"></div>');
        var pbButtonInner = $('<div class="pb-button-inner"></div>');
        var pbButton = $('<div class="pb-button"></div>');

        var pbContainer = $('<div class="pb-container"></div>')

        this.onButtonDown = function (e) {
            e.preventDefault();
            let payloadSend = '{"button_1":1, "button_2":0}';
            let plSend = JSON.stringify(payloadSend);
            this.sendValue(settings.pb_send, plSend);
        }

        this.onButtonUp = function (e) {
            e.preventDefault();
            let payloadSend = '{"button_1":0, "button_2":1}';
            let plSend = JSON.stringify(payloadSend);
            this.sendValue(settings.pb_send, plSend);
        }

        this.render = function (containerElement) {

            $(containerElement).css({
                "background-color": "white",
                "width": "100%",
                "height": "100%",
                "user-select": "none",
            });

            $(containerElement).empty();

            $(pbButton).mousedown(this.onButtonDown.bind(this));
            $(pbButton).mouseup(this.onButtonUp.bind(this));
            //$(pbButton).on('mousedown touchstart', this.onButtonDown)
            //$(pbButton).on('mouseup touchend', this.onButtonUp)

            $(pbButtonBg).append(pbButtonLabel);
            $(pbButtonInner).append(pbButtonBg);
            $(pbButton).append(pbButtonInner);

            $(pbContainer).append(pbButton);

            $(containerElement).append(pbContainer);

        }

        this.onSettingsChanged = function (newSettings) {

            settings = newSettings;

            pbButtonLabel.html((_.isUndefined(newSettings.pb_button_text) ? "" : newSettings.pb_button_text));

        }

        this.onCalculatedValueChanged = function (settingName, newValue) {

            if (settingName == "pb_button_color") { $(pbButtonBg).css({ "background-color": newValue }); }

            if (settingName == "pb_button_text_color") { $(pbButtonLabel).css({ "color": newValue }); }

        }

        this.onDispose = function () {

        }

        this.getHeight = function () {
            return 1;
        }

        this.onSettingsChanged(settings);

    };

}());
