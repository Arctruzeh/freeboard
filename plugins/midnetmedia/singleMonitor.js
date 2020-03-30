(function () {

	freeboard.addStyle('.sm-title-text', "");

	freeboard.addStyle('.sm-data-text', "grid-column-start: 2; grid-row-start: 2; font-size: 2em");

	freeboard.addStyle('.sm-unit-text', "grid-column-start: 3; grid-row-start: 2; padding-left: 0.25em; padding-top: 0.3em");

	freeboard.addStyle('.sm-grid-container', "display: grid; grid-template-columns: 1fr auto 1fr; grid-template-rows: 1fr auto; color: white;")

	//Definition

	freeboard.loadWidgetPlugin({

		type_name: "single_monitor",

		display_name: "Single Monitor",

		description: "A single datasource monitor",

		fill_size: false,

		settings: [
			{
				name: "sm_Title",
				display_name: "Title",
				type: "text",
			},
			{
				name: "sm_Data",
				display_name: "Data",
				type: "calculated",
			},
			{
				name: "sm_Unit",
				display_name: "Unit",
				type: "text",
			},
		],

		newInstance: function (settings, newInstanceCallback) {

			newInstanceCallback(new singleMonitor(settings));

		}

	});

	//Implementation

	var singleMonitor = function (settings) {

		var self = this;

		var currentSettings = settings;

		var smTitleElement = $('<div class="sm-title-text"></div>');

		var smDataElement = $('<div class="sm-data-text"></div>');

		var smUnitElement = $('<div class="sm-unit-text"></div>');

		var smGridContainer = $('<div class="sm-grid-container"></div>')

		self.render = function (containerElement) {

			$(containerElement).css({
				"background-image": "radial-gradient(#48a7d9, #0c6494)",
				"text-shadow": "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000",
            });

			$(containerElement).empty();

			$(smGridContainer).append(smTitleElement).append(smDataElement).append(smUnitElement);

			$(containerElement).append(smGridContainer);

		}

		self.onSettingsChanged = function (newSettings) {

			currentSettings = newSettings;

			smTitleElement.html((_.isUndefined(newSettings.sm_Title) ? "" : newSettings.sm_Title));

			smUnitElement.html((_.isUndefined(newSettings.sm_Unit) ? "" : newSettings.sm_Unit));

		}

		self.onCalculatedValueChanged = function (settingName, newValue) {

			if (settingName == "sm_Data") {

				$(smDataElement).html(newValue);

			}

		}

		self.onDispose = function () {

		}

		self.onSettingsChanged(settings);

	};

}());
