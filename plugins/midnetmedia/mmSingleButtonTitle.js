(function () {

    freeboard.addStyle('.sb-top', "width: 100%; height: 40px; background-image: linear-gradient(-180deg, #48A5D8 0%, #006090 100%); box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.29); display: flex; align-items: center;")
    freeboard.addStyle('.sb-title', "text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white; font-weight: 400; font-size: 21px; letter-spacing: 0; padding-left: 6.5%; width: 100%;")
    freeboard.addStyle('.sb-bottom', "width: 100%; height: 80px; background-image: radial-gradient(#48a7d9, #0c6494); display: flex; justify-content: center; align-items: center;")
    freeboard.addStyle('.sb-button', "display: flex; justify-content: center; align-items: center; width: 50%; height: 65%; background: #555557; border: 1px solid #000000; box-shadow: 0 3px 6px 0 rgba(0,0,0,0.11); border-radius: 4px; margin-right: 8px;")
    freeboard.addStyle('.sb-button-inner', 'display: flex; align-items: center; justify-content: center; width: 93%; height: 85%; background: #545456; border: 1px solid #909091; box-shadow: 0 0 6px 0 rgba(0,0,0,0.11), inset 0 0 3px 0 rgba(0,0,0,0.20); border-radius: 4px;')
    freeboard.addStyle('.sb-button-bg', 'display: flex; justify-content: center; align-items: center; width: 97%; height: 90%; background-color: grey; border-radius: 4px 4px 4px 4px; margin-left: 1px; margin-top: 0.5px;')
    freeboard.addStyle('.sb-button-label', 'display: flex; justify-content: center; align-items: center; overflow: hidden; width: 100%; height: 100%; background: linear-gradient(0deg, rgba(0,0,0,0.0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.0) 100%); text-shadow: 1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000; color: white; border-radius: 4px 4px 4px 4px;')
    freeboard.addStyle('.sb-button-label:active', 'background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%);')

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "mmSingleButton",

        display_name: "MM Single Button",

        description: "A single button.",

        fill_size: true,

        settings: [
            {
                name: "sb_title",
                display_name: "Title",
                description: 'Title of widget',
                type: "text"
            },
            {
                name: "sb_button_text",
                display_name: "Button Text",
                description: "Text on the button.",
                type: "text"
            },
            {
                name: "sb_button_text_color",
                display_name: "Button Text Color",
                description: "Color of the button text.",
                type: "calculated"
            },
            {
                name: "sb_button_color",
                display_name: "Button Color",
                description: 'Color of button.',
                type: "calculated"
            },
            {
                name: "sb_send",
                display_name: "Button Send",
                description: "Publish messages to this topic",
                type: "calculated"
            },
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmSingleButton(settings));

        }

    });

    //Implementation

    var mmSingleButton = function (settings) {

        var sbTop = $('<div class="sb-top"></div>');
        var sbTitle = $('<div class="sb-title"></div>');
        var sbBottom = $('<div class="sb-bottom"></div>');
        var sbButtonLabel = $('<div class="sb-button-label"></div>');
        var sbButtonBg = $('<div class="sb-button-bg"></div>');
        var sbButtonInner = $('<div class="sb-button-inner"></div>');
        var sbButton = $('<div class="sb-button"></div>');

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

            $(sbButtonBg).append(sbButtonLabel);
            $(sbButtonInner).append(sbButtonBg);
            $(sbButton).append(sbButtonInner);

            $(sbBottom).append(sbButton);

            $(sbTop).append(sbTitle);

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
