var mmDomain

if (document.domain === '127.0.0.1'){
    mmDomain = ''
} else {
    mmDomain = 'https://mmfreeboard.netlify.app/'
}

//$.getScript(mmDomain + "plugins/midnetmedia/singleMonitor.js")
//$.getScript(mmDomain + "plugins/midnetmedia/monitorGrid.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmWatchdog.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmValveControl.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmCruiseControl.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmInfoPanel.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmMomentaryPB.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmSingleButton.js")
$.getScript(mmDomain + "plugins/midnetmedia/mmEngineControl.js")
//$.getScript(mmDomain + "plugins/midnetmedia/mmTwoAction.js")

$("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: mmDomain + "plugins/midnetmedia/mmPlugins.css"
 }).appendTo("head")