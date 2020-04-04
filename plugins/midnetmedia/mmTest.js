(function () {

    freeboard.loadWidgetPlugin({

        type_name: "mmTest",

        display_name: "MM Test",

        description: "Test",

        fill_size: true,

        settings: [
            {
                name: "test",
                display_name: "test",
                description: 'Subscribe to this topic for status updates.',
                type: "calculated"
            },
        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmTest(settings));

        }

    });

    //Implementation

    var mmTest = function (settings) {

        var self = this;

        var currentSettings = settings;

        var testDiv = $('<div class="test-div"></div>');

        self.render = function (containerElement) {

            $(containerElement).empty()

            $(containerElement).append(testDiv)

        }

        self.onSettingsChanged = function (newSettings) {

            currentSettings = newSettings;

        }

        self.onCalculatedValueChanged = function (settingName, newValue) {

        }

        self.onDispose = function () {

        }

        this.getHeight = function () {
            return 4;
        }

        self.onSettingsChanged(settings);

    };

}());
