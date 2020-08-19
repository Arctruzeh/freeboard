(function () {

    //Definition
    freeboard.loadWidgetPlugin({

        type_name: "mmTwoAction",

        display_name: "MM Two Action",

        description: "Send messages and receive a status",

        fill_size: true,

        settings: [
            {
                name: "ta_title",
                display_name: "Title",
                type: "text",
            },
            {
                name: "ta_status",
                display_name: "Status",
                type: "calculated",
            },
            {
                name: "ta_send",
                display_name: "Send",
                type: "calculated",
            },
            {
                name: "ta_l_text",
                display_name: "Left Text",
                type: "calculated",
            },
            {
                name: "ta_r_text",
                display_name: "Right Text",
                type: "calculated"
            }
        ],
        newInstance: function (settings, newInstanceCallback) {
            newInstanceCallback(new mmTwoAction(settings))
        }
    })

    var mmTwoActionId = 0

    //Implementation

    var mmTwoAction = function (settings) {

        var thisWidgetId = "mmTwoAction-" + mmTwoActionId++

        var self = this

        var currentSettings = settings

        var taContainer = $('<div class="ta-container"   id="' + thisWidgetId + '"></div>')

        var taFlex = $('<div class="ta-flex"></div>')

        var taTop = $('<div class="ta-top"></div>')

        var taTitle = $('<div class="ta-title"></div>')

        var taUp = $('<svg width="70px" height="63px" viewBox="0 0 70 63" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><radialGradient cx="50%" cy="0%" fx="50%" fy="0%" r="99.6116329%" gradientTransform="translate(0.500000,0.000000),scale(0.857143,1.000000),rotate(90.000000),translate(-0.500000,-0.000000)" id="radialGradient-1"><stop stop-color="#8F8F8F" offset="0%"></stop><stop stop-color="#6B6B6B" offset="100%"></stop></radialGradient></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="+" transform="translate(0.000000, 2.000000)"><path d="M35.8727652,-1.01744235 L69.1676788,58.5118598 C69.4372712,58.9938748 69.2650687,59.6031729 68.7830538,59.8727652 C68.633887,59.9561947 68.4658264,60 68.2949136,60 L1.70508641,60 C1.15280166,60 0.705086415,59.5522847 0.705086415,59 C0.705086415,58.8290872 0.748891753,58.6610266 0.832321167,58.5118598 L34.1272348,-1.01744235 C34.3968271,-1.49945728 35.0061252,-1.6716598 35.4881402,-1.40206743 C35.6494245,-1.31186063 35.7825584,-1.17872668 35.8727652,-1.01744235 Z" id="Triangle-Copy-12" stroke="#42424E" fill="url(#radialGradient-1)"></path><text id="10" font-family="SourceSansPro-Black, Source Sans Pro" font-size="14" font-weight="700" fill="#FFFFFF"><tspan class="ta-up" text-anchor="middle" x="35" y="47.5806452"></tspan></text></g></g></svg>')

        var taStatus = $('<div class="ta-status"></div>')
        
        var taDown = $('<svg width="70px" height="62px" viewBox="0 0 70 62" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs> <radialGradient cx="50%" cy="0%" fx="50%" fy="0%" r="99.6116329%" gradientTransform="translate(0.500000,0.000000),scale(0.843091,1.000000),rotate(90.000000),translate(-0.500000,-0.000000)" id="radialGradient-1"><stop stop-color="#8F8F8F" offset="0%"></stop> <stop stop-color="#6B6B6B" offset="100%"></stop></radialGradient></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="-"><path d="M35.8692912,-0.269167672 L69.150304,58.259798 C69.4232985,58.7398942 69.2554094,59.350395 68.7753132,59.6233895 C68.6246567,59.7090565 68.4543223,59.7540984 68.2810128,59.7540984 L1.7189872,59.7540984 C1.16670245,59.7540984 0.718987203,59.3063831 0.718987203,58.7540984 C0.718987203,58.5807888 0.764029064,58.4104544 0.849696039,58.259798 L34.1307088,-0.269167672 C34.4037034,-0.749263925 35.0142041,-0.917153014 35.4943004,-0.644158449 C35.6507674,-0.555187443 35.7803202,-0.425634693 35.8692912,-0.269167672 Z" id="Triangle-Copy-13" stroke="#42424E" fill="url(#radialGradient-1)" transform="translate(35.000000, 30.245902) scale(1, -1) translate(-35.000000, -30.245902) "></path><text id="10" font-family="SourceSansPro-Black, Source Sans Pro" font-size="14" font-weight="700" fill="#FFFFFF"><tspan id="amazing1" class="ta-down" text-anchor="middle" x="36" y="18.647541"></tspan></text></g></g></svg>')

        this.onUpClicked = function (e) {
            e.preventDefault();
            let payloadSend = '{"button_1":0, "button_2":1}';
            let plSend = JSON.stringify(payloadSend);
            this.sendValue(settings.ta_send, plSend);
        }

        this.onDownClicked = function (e) {
            e.preventDefault();
            let payloadSend = '{"button_1":1, "button_2":0}';
            let plSend = JSON.stringify(payloadSend);
            this.sendValue(settings.ta_send, plSend);
        }

        this.render = function (containerElement) {

            $(containerElement).empty()

            $(taUp).click(this.onUpClicked.bind(this))

            $(taDown).click(this.onDownClicked.bind(this))

            $(taFlex).append(taDown).append(taStatus).append(taUp)

            $(taTop).append(taTitle)

            $(taContainer).append(taTop).append(taFlex)

            $(containerElement).append(taContainer)

        }

        this.onSettingsChanged = function (newSettings) {

            currentSettings = newSettings

            taTitle.html(newSettings.ta_title)
            
            //taStatus.html(newSettings.ta_status)

            //document.getElementById(thisWidgetId).getElementsByClassName('ta-down')[0].innerHTML = newSettings.ta_l_text

            //document.getElementById(thisWidgetId).getElementsByClassName('ta-up')[0].innerHTML = newSettings.ta_r_text

        }

        this.onCalculatedValueChanged = function (settingName, newValue) {

            if(settingName === "ta_status"){
                taStatus.html(newValue)
            }

            if(settingName === "ta_l_text"){
                document.getElementById(thisWidgetId).getElementsByClassName('ta-down')[0].innerHTML = newValue
            }

            if(settingName === "ta_r_text"){
                document.getElementById(thisWidgetId).getElementsByClassName('ta-up')[0].innerHTML = newValue
            }

        }

        this.onDispose = function () {

        }

        this.getHeight = function () {
            return 2
        }

        this.onSettingsChanged(settings)

    }

}())