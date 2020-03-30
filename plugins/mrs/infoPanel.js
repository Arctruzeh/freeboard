//INFOPANEL
var infoPanelId = 0;
var infoPanel = function(settings) {
	var self = this;
	var thisWidgetId = "infoPanelWidget-" + infoPanelId++;
	var widgetElement;
	var imageURL;
	var currentSettings = settings;
	var notActive = "#9E9E9E";
	var titleElement = $('<div class="section-title"></div>');
	var box = $('<div class="info-widget-box" id="' + thisWidgetId + '"></div>');
	var topRow = $('<div class="infoPanel"></div>');
	var middleRow = $('<div class="infoPanel middleRow"></div>');
	var bottomRow = $('<div class="infoPanel"></div>');

	var warning = $('<div class="opsBam opsBam-warning" style="float:left;margin:20px;"></div>');
	var wifi = $('<div class="opsBam opsBam-wifi" style="float:right;margin:20px;margin-left:80px;"></div>');
	var checkedBox = $('<div class="opsBam opsBam-checkedBox" style="float:right;margin:20px;"></div>');
	var gasPump = $('<div class="opsBam opsBam-gasPump" style="float:left;margin:20px;"></div>');
	var gear = $('<div class="opsBam opsBam-gear" style="float:left;margin:20px;"></div>');
	var meter = $('<div class="opsBam opsBam-meter" style="float:right;margin:20px;"></div>');
	var watchdog = $('<div class="opsBam opsBam-watchdog" style="float:right;margin:20px;"></div>');

	var ltext = $('<div class="topText"></div>');
	var ldata = $('<div class="dataText"></div>');
	var lunit = $('<div class="unitText"></div>');

	var mtext = $('<div class="topText"></div>');
	var mdata = $('<div class="dataText"></div>');
	var munit = $('<div class="unitText"></div>');

	var rtext = $('<div class="topText"></div>');
	var rdata = $('<div class="dataText"></div>');
	var runit = $('<div class="unitText"></div>');



	function statusColor(className, newColor) {
		document.getElementById(thisWidgetId).getElementsByClassName(className)[0].style.color = newColor;
	}

	function updateImage() {
		if (widgetElement && imageURL) {
			var cacheBreakerURL = imageURL + (imageURL.indexOf("?") == -1 ? "?" : "&") + Date.now();

			$(widgetElement).css({
				"background-image": "url(" + imageURL + ")"
			});
		}
	}

	this.render = function(element) {
		$(element).css({
			width: "100%",
			height: "100%",
			"background-size": "cover",
			"background-position": "center"
		});

		bottomRow.prependTo(box);
		middleRow.prependTo(box);
		topRow.prependTo(box);

		checkedBox.prependTo(topRow);
		wifi.prependTo(topRow);
		warning.prependTo(topRow);

		middleRow.append($('<div class="leftInfoWidget"></div>').append(ltext).append(ldata).append(lunit));
		middleRow.append($('<div class="middleInfoWidget"></div>').append(mtext).append(mdata).append(munit));
		middleRow.append($('<div class="rightInfoWidget"></div>').append(rtext).append(rdata).append(runit));

		watchdog.prependTo(bottomRow);
		meter.prependTo(bottomRow);
		gear.prependTo(bottomRow);
		gasPump.prependTo(bottomRow);

		$(element).append(titleElement).append(box);

		widgetElement = element;
	}

	this.onSettingsChanged = function(newSettings) {
		currentSettings = newSettings;
		titleElement.html((_.isUndefined(newSettings.title) ? "" : newSettings.title));
		ltext.html((_.isUndefined(newSettings.ltext) ? "" : newSettings.ltext));
		mtext.html((_.isUndefined(newSettings.mtext) ? "" : newSettings.mtext));
		rtext.html((_.isUndefined(newSettings.rtext) ? "" : newSettings.rtext));
		lunit.html((_.isUndefined(newSettings.lunit) ? "" : newSettings.lunit));
		munit.html((_.isUndefined(newSettings.munit) ? "" : newSettings.munit));
		runit.html((_.isUndefined(newSettings.runit) ? "" : newSettings.runit));
	}

	this.onCalculatedValueChanged = function(settingName, newValue) {
		let sendSettingName = 'opsBam-';
		switch (settingName) {
			case 'ldata':
				ldata.html(newValue);;
				break;
			case 'mdata':
				mdata.html(newValue);
				break;
			case 'rdata':
				rdata.html(newValue);
				break;
			case 'imgSrc':
				imageURL = newValue;
				updateImage();
				break;
			default:
				sendSettingName += settingName;
				statusColor(sendSettingName, newValue);
		}
	}

	this.onDispose = function() {}

	this.getHeight = function() {
		return 4;
	}

	this.onSettingsChanged(settings);
};


freeboard.loadWidgetPlugin({
	type_name: "infoPanel",
	display_name: "Info Panel Widget",
	description: "Check statuses of device",
	settings: [{
			name: "title",
			display_name: "Title",
			type: "text",
			default: " ",
			required: true
		},
		{
			name: "imgSrc",
			display_name: "Background Image URL",
			type: "calculated"
		},
		{
			name: "ltext",
			display_name: "Left Text",
			type: "text"
		},
		{
			name: "ldata",
			display_name: "Left Data",
			type: "calculated"
		},
		{
			name: "lunit",
			display_name: "Left Unit",
			type: "text"
		},
		{
			name: "mtext",
			display_name: "Middle Text",
			type: "text"
		},
		{
			name: "mdata",
			display_name: "Middle Data",
			type: "calculated"
		},
		{
			name: "munit",
			display_name: "Middle Unit",
			type: "text"
		},
		{
			name: "rtext",
			display_name: "Right Text",
			type: "text"
		},
		{
			name: "rdata",
			display_name: "Right Data",
			type: "calculated"
		},
		{
			name: "runit",
			display_name: "Right Unit",
			type: "text"
		},
		{
			name: "warning",
			display_name: "Warning",
			type: "calculated"
		},
		{
			name: "wifi",
			display_name: "Wifi Signal",
			type: "calculated"
		},
		{
			name: "checkedBox",
			display_name: "Checked Box",
			type: "calculated"
		},
		{
			name: "gasPump",
			display_name: "Gas Pump",
			type: "calculated"
		},
		{
			name: "gear",
			display_name: "Gear",
			type: "calculated"
		},
		{
			name: "meter",
			display_name: "Gauge",
			type: "calculated"
		},
		{
			name: "watchdog",
			display_name: "Watchdog",
			type: "calculated"
		}
	],
	newInstance: function(settings, newInstanceCallback) {
		newInstanceCallback(new infoPanel(settings));
	}
});