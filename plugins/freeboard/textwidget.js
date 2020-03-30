(function () {

	freeboard.addStyle('.tw-display', 'width: 100%; height:100%; display:table; table-layout:fixed;');

	freeboard.addStyle('.tw-tr',
		'display:table-row;');

	freeboard.addStyle('.tw-tg',
		'display:table-row-group;');

	freeboard.addStyle('.tw-tc',
		'display:table-caption;');

	freeboard.addStyle('.tw-td',
		'display:table-cell;');

	freeboard.addStyle('.tw-value',
		valueStyle +
		'overflow: hidden;' +
		'display: inline-block;' +
		'text-overflow: ellipsis;');

	freeboard.addStyle('.tw-unit',
		'display: inline-block;' +
		'padding-left: 10px;' +
		'padding-bottom: 1.1em;' +
		'vertical-align: bottom;');

	freeboard.addStyle('.tw-value-wrapper',
		'position: relative;' +
		'vertical-align: middle;' +
		'height:100%;');

	freeboard.addStyle('.tw-sparkline',
		'height:20px;');

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "text_widget",

        display_name: "Text",

        settings: [

            {
                name: "title",
                display_name: "Title",
                type: "text"
            },
            {
                name: "value",
                display_name: "Value",
                type: "calculated"
            },
            {
                name: "units",
                display_name: "Units",
                type: "text"
            }

        ],

        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new textWidget(settings));
        }

    });

    //Implementation
    var textWidget = function (settings) {

        var self = this;

        var currentSettings = settings;

        var displayElement = $('<div class="tw-display"></div>');

        var titleElement = $('<h2 class="section-title tw-title tw-td"></h2>');

        var valueElement = $('<div class="tw-value"></div>');

        var unitsElement = $('<div class="tw-unit"></div>');

        //
        this.render = function (element) {
            
            $(element).empty();

            $(displayElement)
                .append($('<div class="tw-tr"></div>').append(titleElement))
                .append($('<div class="tw-tr"></div>').append($('<div class="tw-value-wrapper tw-td"></div>').append(valueElement).append(unitsElement)))

            $(element).append(displayElement);

        }
        //
        this.onSettingsChanged = function (newSettings) {
            currentSettings = newSettings;

            var shouldDisplayTitle = (!_.isUndefined(newSettings.title) && newSettings.title != "");
            var shouldDisplayUnits = (!_.isUndefined(newSettings.units) && newSettings.units != "");


            if (shouldDisplayTitle) {
                titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
                titleElement.attr("style", null);
            }
            else {
                titleElement.empty();
                titleElement.hide();
            }

            if (shouldDisplayUnits) {
                unitsElement.html((_.isUndefined(newSettings.units) ? "" : newSettings.units));
                unitsElement.attr("style", null);
            }
            else {
                unitsElement.empty();
                unitsElement.hide();
            }

            var valueFontSize = 30;

            if (newSettings.size == "big") {
                valueFontSize = 75;

                if (newSettings.sparkline) {
                    valueFontSize = 60;
                }
            }

            valueElement.css({ "font-size": valueFontSize + "px" });

            updateValueSizing();
        }
        //
        this.onCalculatedValueChanged = function (settingName, newValue) {
            if (settingName == "value") {
                valueElement.text(newValue);
            }
        }
        //
        this.onDispose = function () {

        }
        //
        this.onSettingsChanged(settings);
    };

}());
