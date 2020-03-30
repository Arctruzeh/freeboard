(function () {

	//freeboard.addStyle('.class', "color: white;");

	//Definition

	freeboard.loadWidgetPlugin({

		type_name: "",

		display_name: "",

		description: "",

		fill_size: false,

		settings: [
			{
				name: "",
				display_name: "",
				type: "",
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

		var titleElement = $('<div class=""></div>');

		self.render = function (containerElement) {

			$(containerElement).css({
				"": "",
            });

			$(containerElement).empty();

			$(gridContainer).append(titleElement).append(dataElement).append(unitElement);

			$(containerElement).append(gridContainer);

		}

		self.onSettingsChanged = function (newSettings) {

			currentSettings = newSettings;

			titleElement.html((_.isUndefined(newSettings.the_title) ? "" : newSettings.the_title));

		}

		self.onCalculatedValueChanged = function (settingName, newValue) {

			if (settingName == "the_data") {

				$(dataElement).html(newValue);

			}

		}

		self.onDispose = function () {

		}

		self.onSettingsChanged(settings);

	};

}());
