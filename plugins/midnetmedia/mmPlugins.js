var mmDomain = window.location.href 

$.getScript(mmDomain + "plugins/midnetmedia/mmEngineControl.js")
$.getScript(mmDomain + "plugins/midnetmedia/mmInfoPanel.js")
$.getScript(mmDomain + "plugins/midnetmedia/mmValveControl.js")
$.getScript(mmDomain + "plugins/midnetmedia/mmWatchdog.js")
$.getScript(mmDomain + "plugins/midnetmedia/monitorGrid.js")
$.getScript(mmDomain + "plugins/midnetmedia/singleMonitor.js")
$.getScript(mmDomain + "plugins/midnetmedia/mmMomentaryPB.js")
$("<link/>", {
    rel: "stylesheet",
    type: "text/css",
    href: mmDomain + "plugins/midnetmedia/mmPlugins.css"
 }).appendTo("head")