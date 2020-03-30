(function () {

	freeboard.addStyle('.mg-container-grid', "display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: 1fr 1fr; align-items: space-evenly; height: 100%; width: 100%;");

	freeboard.addStyle('.mg-monitor1', "display: grid; grid-template-areas: 'title title' 'data unit'; ")
	freeboard.addStyle('.mg-monitor2', "display: grid; grid-template-areas: 'title title' 'data unit'; ")
	freeboard.addStyle('.mg-monitor3', "display: grid; grid-template-areas: 'title title' 'data unit'; ")
	freeboard.addStyle('.mg-monitor4', "display: grid; grid-template-areas: 'title title' 'data unit'; ")
	freeboard.addStyle('.mg-monitor5', "display: grid; grid-template-areas: 'title title' 'data unit'; ")
	freeboard.addStyle('.mg-monitor6', "display: grid; grid-template-areas: 'title title' 'data unit'; ")

	freeboard.addStyle('.mg-title1', "grid-area: title; justify-self: center; align-self: end;")
	freeboard.addStyle('.mg-title2', "grid-area: title; justify-self: center; align-self: end;")
	freeboard.addStyle('.mg-title3', "grid-area: title; justify-self: center; align-self: end;")
	freeboard.addStyle('.mg-title4', "grid-area: title; justify-self: center; align-self: end;")
	freeboard.addStyle('.mg-title5', "grid-area: title; justify-self: center; align-self: end;")
	freeboard.addStyle('.mg-title6', "grid-area: title; justify-self: center; align-self: end;")

	freeboard.addStyle('.mg-data1', "grid-area: data; font-size: 2em; justify-self: end;")
	freeboard.addStyle('.mg-data2', "grid-area: data; font-size: 2em; justify-self: end;")
	freeboard.addStyle('.mg-data3', "grid-area: data; font-size: 2em; justify-self: end;")
	freeboard.addStyle('.mg-data4', "grid-area: data; font-size: 2em; justify-self: end;")
	freeboard.addStyle('.mg-data5', "grid-area: data; font-size: 2em; justify-self: end;")
	freeboard.addStyle('.mg-data6', "grid-area: data; font-size: 2em; justify-self: end;")

	freeboard.addStyle('.mg-unit1', "grid-area: unit; padding-left: 0.25em; padding-top: 0.3em;")
	freeboard.addStyle('.mg-unit2', "grid-area: unit; padding-left: 0.25em; padding-top: 0.3em;")
	freeboard.addStyle('.mg-unit3', "grid-area: unit; padding-left: 0.25em; padding-top: 0.3em;")
	freeboard.addStyle('.mg-unit4', "grid-area: unit; padding-left: 0.25em; padding-top: 0.3em;")
	freeboard.addStyle('.mg-unit5', "grid-area: unit; padding-left: 0.25em; padding-top: 0.3em;")
	freeboard.addStyle('.mg-unit6', "grid-area: unit; padding-left: 0.25em; padding-top: 0.3em;")

	//Definition

	freeboard.loadWidgetPlugin({

		type_name: "monitor_grid",

		display_name: "Monitor Grid",

		description: "A grid of monitors.",

		fill_size: true,

		settings: [
			{
				name: "mg_title1",
				display_name: "Title 1",
				type: "text",
			},
			{
				name: "mg_data1",
				display_name: "Data 1",
				type: "calculated",
			},
			{
				name: "mg_unit1",
				display_name: "Unit 1",
				type: "text",
			},
			{
				name: "mg_bg1",
				display_name: "Background Color 1",
				type: "calculated",
			},
			{
				name: "mg_title2",
				display_name: "Title 2",
				type: "text",
			},
			{
				name: "mg_data2",
				display_name: "Data 2",
				type: "calculated",
			},
			{
				name: "mg_unit2",
				display_name: "Unit 2",
				type: "text",
			},
			{
				name: "mg_bg2",
				display_name: "Background Color 2",
				type: "calculated",
			},
			{
				name: "mg_title3",
				display_name: "Title 3",
				type: "text",
			},
			{
				name: "mg_data3",
				display_name: "Data 3",
				type: "calculated",
			},
			{
				name: "mg_unit3",
				display_name: "Unit 3",
				type: "text",
			},
			{
				name: "mg_bg3",
				display_name: "Background Color 3",
				type: "calculated",
			},
			{
				name: "mg_title4",
				display_name: "Title 4",
				type: "text",
			},
			{
				name: "mg_data4",
				display_name: "Data 4",
				type: "calculated",
			},
			{
				name: "mg_unit4",
				display_name: "Unit 4",
				type: "text",
			},
			{
				name: "mg_bg4",
				display_name: "Background Color 4",
				type: "calculated",
			},
			{
				name: "mg_title5",
				display_name: "Title 5",
				type: "text",
			},
			{
				name: "mg_data5",
				display_name: "Data 5",
				type: "calculated",
			},
			{
				name: "mg_unit5",
				display_name: "Unit 5",
				type: "text",
			},
			{
				name: "mg_bg5",
				display_name: "Background Color 5",
				type: "calculated",
			},
			{
				name: "mg_title6",
				display_name: "Title 6",
				type: "text",
			},
			{
				name: "mg_data6",
				display_name: "Data 6",
				type: "calculated",
			},
			{
				name: "mg_unit6",
				display_name: "Unit 6",
				type: "text",
			},
			{
				name: "mg_bg6",
				display_name: "Background Color 6",
				type: "calculated",
			},
		],

		newInstance: function (settings, newInstanceCallback) {

			newInstanceCallback(new monitorGrid(settings));

		}

	});

	//Implementation

	var monitorGrid = function (settings) {

		var self = this;

		var currentSettings = settings;

		var mgContainerGrid = $('<div class="mg-container-grid"></div>')

		var mgMonitor1 = $('<div class="mg-monitor1"></div>')
		var mgMonitor2 = $('<div class="mg-monitor2"></div>')
		var mgMonitor3 = $('<div class="mg-monitor3"></div>')
		var mgMonitor4 = $('<div class="mg-monitor4"></div>')
		var mgMonitor5 = $('<div class="mg-monitor5"></div>')
		var mgMonitor6 = $('<div class="mg-monitor6"></div>')

		var mgTitle1 = $('<div class="mg-title1"></div>')
		var mgTitle2 = $('<div class="mg-title2"></div>')
		var mgTitle3 = $('<div class="mg-title3"></div>')
		var mgTitle4 = $('<div class="mg-title4"></div>')
		var mgTitle5 = $('<div class="mg-title5"></div>')
		var mgTitle6 = $('<div class="mg-title6"></div>')

		var mgData1 = $('<div class="mg-data1"></div>')
		var mgData2 = $('<div class="mg-data2"></div>')
		var mgData3 = $('<div class="mg-data3"></div>')
		var mgData4 = $('<div class="mg-data4"></div>')
		var mgData5 = $('<div class="mg-data5"></div>')
		var mgData6 = $('<div class="mg-data6"></div>')

		var mgUnit1 = $('<div class="mg-unit1"></div>')
		var mgUnit2 = $('<div class="mg-unit2"></div>')
		var mgUnit3 = $('<div class="mg-unit3"></div>')
		var mgUnit4 = $('<div class="mg-unit4"></div>')
		var mgUnit5 = $('<div class="mg-unit5"></div>')
		var mgUnit6 = $('<div class="mg-unit6"></div>')

		self.render = function (containerElement) {

			$(containerElement).css({
				//"background-color": "red",
				"background-image": "radial-gradient(#48a7d9, #0c6494)",
				"text-shadow": "1px 1px 1px #000, -1px -1px 1px #000, 1px -1px 1px #000, -1px 1px 1px #000",
				"color": "white",
            });

			$(containerElement).empty();

			$(mgMonitor1).append(mgTitle1).append(mgData1).append(mgUnit1);
			$(mgMonitor2).append(mgTitle2).append(mgData2).append(mgUnit2);
			$(mgMonitor3).append(mgTitle3).append(mgData3).append(mgUnit3);
			$(mgMonitor4).append(mgTitle4).append(mgData4).append(mgUnit4);
			$(mgMonitor5).append(mgTitle5).append(mgData5).append(mgUnit5);
			$(mgMonitor6).append(mgTitle6).append(mgData6).append(mgUnit6);

			$(mgContainerGrid).append(mgMonitor1).append(mgMonitor2).append(mgMonitor3).append(mgMonitor4).append(mgMonitor5).append(mgMonitor6);

			$(containerElement).append(mgContainerGrid);

		}

        self.getHeight = function () {
            return 2;
		}
		
		self.onSettingsChanged = function (newSettings) {

			currentSettings = newSettings;

			mgTitle1.html((_.isUndefined(newSettings.mg_title1) ? "" : newSettings.mg_title1));
			mgTitle2.html((_.isUndefined(newSettings.mg_title2) ? "" : newSettings.mg_title2));
			mgTitle3.html((_.isUndefined(newSettings.mg_title3) ? "" : newSettings.mg_title3));
			mgTitle4.html((_.isUndefined(newSettings.mg_title4) ? "" : newSettings.mg_title4));
			mgTitle5.html((_.isUndefined(newSettings.mg_title5) ? "" : newSettings.mg_title5));
			mgTitle6.html((_.isUndefined(newSettings.mg_title6) ? "" : newSettings.mg_title6));

			mgUnit1.html((_.isUndefined(newSettings.mg_unit1) ? "" : newSettings.mg_unit1));
			mgUnit2.html((_.isUndefined(newSettings.mg_unit2) ? "" : newSettings.mg_unit2));
			mgUnit3.html((_.isUndefined(newSettings.mg_unit3) ? "" : newSettings.mg_unit3));
			mgUnit4.html((_.isUndefined(newSettings.mg_unit4) ? "" : newSettings.mg_unit4));
			mgUnit5.html((_.isUndefined(newSettings.mg_unit5) ? "" : newSettings.mg_unit5));
			mgUnit6.html((_.isUndefined(newSettings.mg_unit6) ? "" : newSettings.mg_unit6));

		}

		self.onCalculatedValueChanged = function (settingName, newValue) {

			if (settingName == "mg_data1") {$(mgData1).html(newValue);}
			if (settingName == "mg_data2") {$(mgData2).html(newValue);}
			if (settingName == "mg_data3") {$(mgData3).html(newValue);}
			if (settingName == "mg_data4") {$(mgData4).html(newValue);}
			if (settingName == "mg_data5") {$(mgData5).html(newValue);}
			if (settingName == "mg_data6") {$(mgData6).html(newValue);}

			if (settingName == "mg_bg1") {$(mgMonitor1).css({"background-color": newValue});}
			if (settingName == "mg_bg2") {$(mgMonitor2).css({"background-color": newValue});}
			if (settingName == "mg_bg3") {$(mgMonitor3).css({"background-color": newValue});}
			if (settingName == "mg_bg4") {$(mgMonitor4).css({"background-color": newValue});}
			if (settingName == "mg_bg5") {$(mgMonitor5).css({"background-color": newValue});}
			if (settingName == "mg_bg6") {$(mgMonitor6).css({"background-color": newValue});}

		}

		self.onDispose = function () {

		}

		self.onSettingsChanged(settings);

	};

}());
