(function () {

    //Definition

    freeboard.loadWidgetPlugin({

        type_name: "info_panel",

        display_name: "MM Info Panel",

        description: "An info panel.",

        fill_size: true,

        settings: [
            {
                name: "ip_warning",
                display_name: "Warning",
                type: "calculated",
            },
            {
                name: "ip_wifi",
                display_name: "Wifi Signal",
                type: "calculated",
            },
            {
                name: "ip_check",
                display_name: "Checked Box",
                type: "calculated",
            },
            {
                name: "ip_inlet_psi",
                display_name: "Inlet PSI",
                type: "calculated",
            },
            {
                name: "ip_outlet_psi",
                display_name: "Outlet PSI",
                type: "calculated",
            },
            {
                name: "ip_rpm",
                display_name: "RPM",
                type: "calculated",
            },
            {
                name: "ip_gpm",
                display_name: "GPM",
                type: "calculated",
            },
            {
                name: "ip_inlet_status",
                display_name: "Inlet Current Status",
                type: "calculated"
            },
            {
                name: "ip_outlet_status",
                display_name: "Outlet Current Status",
                type: "calculated"
            },
            {
                name: "ip_bypass_status",
                display_name: "Bypass Current Status",
                type: "calculated"
            },
            {
                name: "ip_gas_pump",
                display_name: "Gas Pump",
                type: "calculated",
            },
            {
                name: "ip_gear",
                display_name: "Gear",
                type: "calculated",
            },
            {
                name: "ip_gauge",
                display_name: "Gauge",
                type: "calculated",
            },
            {
                name: "ip_watchdog",
                display_name: "Watchdog",
                type: "calculated",
            },

        ],

        newInstance: function (settings, newInstanceCallback) {

            newInstanceCallback(new mmInfoPanel(settings));

        }

    });

    //Implementation

    var mmInfoPanelId = 0

    var mmInfoPanel = function (settings) {

        var thisWidgetId = "mmInfoPanel-" + mmInfoPanelId++
        var ipContainer = $('<div class="ip-container" id="' + thisWidgetId + '"></div>')

        var ipDiv1 = $('<div class="ip-div1"></div>')
        var ipWarningSvg = $('<svg width="25px" height="24px" viewBox="0 0 25 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-warning-fill" transform="translate(-32.000000, -24.000000)" fill="rgba(173, 173, 173, 0.5)" fill-rule="nonzero"><g id="alert" transform="translate(32.000000, 24.000000)"><path d="M23.927493,17.6558575 L15.2957139,1.78844601 C13.9088736,-0.546307881 10.528179,-0.549410005 9.13947743,1.78844601 L0.508127895,17.6558575 C-0.909590452,20.0415817 0.806838563,23.0626685 3.58553025,23.0626685 L20.8493747,23.0626685 C23.6257279,23.0626685 25.3452113,20.0440156 23.927493,17.6558575 Z M12.2175957,20.1991696 C11.4283199,20.1991696 10.7858462,19.5566958 10.7858462,18.7674201 C10.7858462,17.9781443 11.4283199,17.3356706 12.2175957,17.3356706 C13.0068714,17.3356706 13.6493452,17.9781443 13.6493452,18.7674201 C13.6493452,19.5566958 13.0068714,20.1991696 12.2175957,20.1991696 Z M13.6493452,14.4721716 C13.6493452,15.2614474 13.0068714,15.9039211 12.2175957,15.9039211 C11.4283199,15.9039211 10.7858462,15.2614474 10.7858462,14.4721716 L10.7858462,7.31342413 C10.7858462,6.52414836 11.4283199,5.88167464 12.2175957,5.88167464 C13.0068714,5.88167464 13.6493452,6.52414836 13.6493452,7.31342413 L13.6493452,14.4721716 Z" id="Shape"></path></g></g></g></svg>')

        var ipDiv2 = $('<div class="ip-div2"></div>')
        var ipWifi = $('<svg width="32px" height="24px" viewBox="0 0 32 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-wifi-fill" transform="translate(-134.000000, -24.000000)" fill="rgba(173, 173, 173, 0.5)" fill-rule="nonzero"><g id="wifi-(1)" transform="translate(134.000000, 24.000000)"><path d="M28.4188924,10.771811 C28.1789717,10.771811 27.9390509,10.6802549 27.7560012,10.4972052 C24.6155953,7.35673678 20.4401366,5.62723243 15.9988839,5.62723243 C11.5576312,5.62723243 7.38217251,7.35673678 4.24170409,10.4972052 C4.06590385,10.6730054 3.82748299,10.771811 3.57881284,10.771811 C3.33014268,10.771811 3.09172182,10.6730679 2.91598408,10.4972052 L0.274605843,7.85582696 C0.0988056071,7.68002673 -5.68434189e-14,7.44160586 -5.68434189e-14,7.19293571 C-5.68434189e-14,6.94426555 0.0987431115,6.70584469 0.274605843,6.53010695 C2.39708277,4.40763002 4.8722226,2.76411967 7.63140512,1.64526022 C10.2958442,0.5647731 13.1111478,0.0168738228 15.9988839,0.0168738228 C18.8866199,0.0168738228 21.7019235,0.5647731 24.3664252,1.64526022 C27.1256077,2.76411967 29.6007475,4.40763002 31.7232244,6.53010695 C32.0893239,6.89614391 32.0893239,7.48966501 31.7232869,7.85582696 L29.0817837,10.4972677 C28.898734,10.6802549 28.6588132,10.771811 28.4188924,10.771811 Z" id="Shape"></path><path d="M22.9470242,16.2238682 C22.698354,16.2238682 22.4599332,16.1251251 22.2841954,15.9493248 C20.60525,14.270442 18.3730933,13.345819 15.9988839,13.345819 C13.624612,13.345819 11.3924552,14.270442 9.71363486,15.9492623 C9.53783462,16.1250626 9.29941375,16.2238057 9.0508061,16.2238057 C8.80219844,16.2238057 8.56371508,16.1250626 8.38797734,15.9492623 L5.74647411,13.3076966 C5.38043715,12.9416597 5.38049965,12.3481386 5.74653661,11.9820391 C8.48503307,9.24354265 12.1260916,7.73533537 15.9989464,7.73533537 C19.8718012,7.73533537 23.5127972,9.24354265 26.2513562,11.9820391 C26.6173931,12.3480761 26.6174556,12.9416597 26.2514186,13.3077591 L23.6099779,15.9492623 C23.4341152,16.1250626 23.1956318,16.2238682 22.9470242,16.2238682 Z" id="Shape"></path> <path d="M15.9988839,23.2315043 C13.8563459,23.2315043 12.11328,21.5058122 12.11328,19.3845227 C12.11328,17.2632957 13.8563459,15.5375411 15.9988839,15.5375411 C18.1414219,15.5375411 19.8844878,17.2632332 19.8844878,19.3845227 C19.8844878,21.5058122 18.1414219,23.2315043 15.9988839,23.2315043 Z" id="Shape"></path></g></g></g></svg>')

        var ipDiv3 = $('<div class="ip-div3"></div>')
        var ipCheck = $('<svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-check-fill" transform="translate(-237.000000, -23.000000)" fill="rgba(173, 173, 173, 0.5)"><path d="M239,23 L259.076172,23 C260.180741,23 261.076172,23.8954305 261.076172,25 L261.076172,45.0761719 C261.076172,46.1807414 260.180741,47.0761719 259.076172,47.0761719 L239,47.0761719 C237.895431,47.0761719 237,46.1807414 237,45.0761719 L237,25 C237,23.8954305 237.895431,23 239,23 Z M244.210347,34.0317227 L241.789653,35.9682773 L246.98646,42.464286 L257.199634,29.9815185 L254.800366,28.0184815 L247.01354,37.535714 L244.210347,34.0317227 Z" id="Combined-Shape"></path></g></g></svg>')

        var ipDiv4 = $('<div class="ip-div4"></div>')
        var ipInlet = $('<div class="ip-font-size-19">INLET</div>')
        var ipInletNumber = $('<div class="ip-font-size-26">-</div>')
        var ipInletPsi = $('<div class="ip-font-size-19">PSI</div>')

        var ipDiv5 = $('<div class="ip-div5"></div>')
        var ipPumpRpmNumber = $('<div class="ip-rpm ip-font-size-26">-</div>')
        var ipPumpRpm = $('<div class="ip-rpm ip-font-size-19" style="margin-bottom: 12px;">RPM</div>')
        var ipPumpGpmNumber = $('<div class="ip-gpm ip-font-size-26">-</div>')
        var ipPumpGpm = $('<div class="ip-gpm ip-font-size-19">GPM</div>')
        var ipPump = $('<svg class="ip-pump" width="120px" height="116px" viewBox="0 0 120 116" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="pump-copy" transform="translate(-95.000000, -46.000000)"><g id="PumpIconMaster3_300x250" transform="translate(95.000000, 46.000000)"><path d="M114.197053,34.7418947 L114.197053,30.1806316 L102.165474,30.1806316 C107.753684,38.8383158 111.012632,49.1330526 111.012632,60.1793684 C111.012632,90.7768421 86.1221053,115.666105 55.5296842,115.666105 C24.9322105,115.666105 0.0416842105,90.7768421 0.0416842105,60.1806316 C0.0416842105,29.8231579 24.5557895,5.09052632 54.8286316,4.71284211 L54.8286316,4.69263158 L114.197053,4.69263158 L114.197053,0.133894737 L119.536421,0.133894737 L119.536421,4.69263158 L119.536421,30.1806316 L119.536421,34.7418947 L114.197053,34.7418947 Z" id="ip-pump-layer1" fill="#d9d9d9"></path><path d="M91.1494737,25.2315789 C99.9915789,34.2467368 105.461053,46.584 105.461053,60.1793684 C105.461053,87.7162105 83.0602105,110.114526 55.5296842,110.114526 C27.9915789,110.114526 5.592,87.7162105 5.592,60.1806316 C5.592,33.2665263 26.9987368,11.2673684 53.6791579,10.2909474 L53.6791579,10.2442105 L114.197053,10.2442105 L114.197053,25.2315789 L91.1494737,25.2315789 Z" id="ip-pump-layer2" fill="#ededed"></path><g id="Group" transform="translate(10.105263, 15.157895)"><circle id="ip-pump-layer3" fill="#d9d9d9" cx="45.7528421" cy="45.2071579" r="44.7461053"></circle><path d="M86.592,26.9242105 C83.4833684,38.6665263 72.7882105,47.3254737 60.0669474,47.3254737 C56.5275789,47.3254737 53.1461053,46.6484211 50.04,45.4269474 C50.04,45.4282105 50.04,45.432 50.04,45.4345263 C50.0425263,45.3587368 50.0513684,45.2842105 50.0513684,45.2071579 C50.0513684,42.8311579 48.1275789,40.9073684 45.7528421,40.9073684 C44.0867368,40.9073684 42.648,41.8585263 41.9330526,43.2404211 C38.6753684,41.9873684 35.1397895,41.2926316 31.44,41.2926316 C18.6732632,41.2926316 7.824,49.4791579 3.83873684,60.8867368 C4.16842105,61.7684211 4.53094737,62.6336842 4.91494737,63.4888421 C8.02357895,51.7477895 18.7187368,43.0888421 31.44,43.0888421 C34.9793684,43.0888421 38.3595789,43.7671579 41.4669474,44.9873684 C41.4669474,44.9861053 41.4669474,44.9861053 41.4669474,44.9861053 C41.4631579,45.0593684 41.4555789,45.1326316 41.4555789,45.2084211 C41.4555789,47.5818947 43.3793684,49.5056842 45.7541053,49.5056842 C47.4227368,49.5056842 48.8652632,48.5507368 49.5802105,47.1625263 C49.5776842,47.1663158 49.5764211,47.1701053 49.5738947,47.1713684 C52.8315789,48.4269474 56.3684211,49.1216842 60.0682105,49.1216842 C72.8349474,49.1216842 83.6829474,40.9364211 87.6707368,29.5275789 C87.3385263,28.6446316 86.9747368,27.7793684 86.592,26.9242105 Z" id="ip-pump-layer4" fill="#ededed" fill-rule="nonzero"></path></g></g></g></g></svg>')

        var ipDiv6 = $('<div class="ip-div6"></div>')
        var ipOutlet = $('<div class="ip-font-size-19">OUTLET</div>')
        var ipOutletNumber = $('<div class="ip-font-size-26">-</div>')
        var ipOutletPsi = $('<div class="ip-font-size-19">PSI</div>')

        var ipDiv7 = $('<div class="ip-div7"></div>')
        var ipValveBox1 = $('<div class="ip-valve-box1">INLET</div>')

        var ipDiv8 = $('<div class="ip-div8"></div>')
        var ipValveBox2 = $('<div class="ip-valve-box2">BYPASS</div>')

        var ipDiv9 = $('<div class="ip-div9"></div>')
        var ipValveBox3 = $('<div class="ip-valve-box3">OUTLET</div>')

        var ipDiv10 = $('<div class="ip-div10"></div>')
        var ipFuel = $('<svg width="22px" height="23px" viewBox="0 0 22 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-fuel-fill" transform="translate(-34.000000, -193.000000)" fill="rgba(173, 173, 173, 0.5)" fill-rule="nonzero"><g id="fuel" transform="translate(34.000000, 193.000000)"> <path d="M20.1460637,5.40378979 L20.1652261,5.38462741 L15.4065496,0.638765799 L14.0524284,1.99288701 L16.7479159,4.68837449 C15.5470937,5.14827149 14.6911343,6.30442142 14.6911343,7.66495005 C14.6911343,9.42788857 16.121905,10.8586593 17.8848435,10.8586593 C18.3383331,10.8586593 18.7727202,10.7628474 19.1623152,10.590386 L19.1623152,19.801081 C19.1623751,20.5037414 18.5875039,21.0786126 17.8849034,21.0786126 C17.182303,21.0786126 16.6074317,20.5037414 16.6074317,19.8011409 L16.6074317,14.0524284 C16.6074317,12.6408201 15.4640966,11.4974251 14.0524284,11.4974251 L12.7749567,11.4974251 L12.7749567,2.55500331 C12.7748968,1.14333509 11.6315617,0 10.2199534,0 L2.55500331,0 C1.14333509,0 0,1.14333509 0,2.55500331 L0,22.9948502 L12.7748968,22.9948502 L12.7748968,13.4136626 L14.6911343,13.4136626 L14.6911343,19.8011409 C14.6911343,21.5640794 16.121905,22.9948502 17.8848435,22.9948502 C19.647782,22.9948502 21.0785528,21.5640794 21.0785528,19.8011409 L21.0785528,7.66495005 C21.0786126,6.7834808 20.7209349,5.98506846 20.1460637,5.40378979 Z M10.2199534,8.94242177 L2.55500331,8.94242177 L2.55500331,2.55500331 L10.2199534,2.55500331 L10.2199534,8.94242177 Z M17.8849034,8.94242177 C17.182303,8.94242177 16.6074317,8.36755051 16.6074317,7.66495005 C16.6074317,6.96234959 17.182303,6.38747834 17.8849034,6.38747834 C18.5875039,6.38747834 19.1623751,6.96234959 19.1623751,7.66495005 C19.1623751,8.36755051 18.5875039,8.94242177 17.8849034,8.94242177 Z" id="Shape"></path> </g> </g> </g> </svg>')

        var ipDiv11 = $('<div class="ip-div11"></div>')
        var ipGear = $('<svg width="23px" height="23px" viewBox="0 0 23 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-gear-fill" transform="translate(-100.000000, -193.000000)" fill="rgba(173, 173, 173, 0.5)" fill-rule="nonzero"><g id="gear" transform="translate(100.000000, 193.000000)"> <path d="M22.1620524,8.76383565 L20.4176661,8.38462125 C20.2659803,7.92021344 20.0781047,7.46723402 19.8562902,7.03087771 L20.8219883,5.5287384 C20.9944529,5.26034465 20.9565315,4.9079696 20.7310807,4.68251882 L18.0135506,1.96498868 C17.7880998,1.73953794 17.4357248,1.70161648 17.167331,1.87408112 L15.6651917,2.83977919 C15.2288354,2.61796475 14.775856,2.43008908 14.3114482,2.27840335 L13.9322338,0.534017014 C13.8645293,0.222333932 13.5885166,0 13.2695609,0 L9.42650852,0 C9.10755281,0 8.83154015,0.222333932 8.76383565,0.534017014 L8.38462125,2.27840335 C7.92021344,2.43008908 7.46723402,2.61796475 7.03087771,2.83977919 L5.5287384,1.87408112 C5.26034465,1.70161648 4.9079696,1.73953794 4.68251882,1.96498868 L1.96498868,4.68251882 C1.73953794,4.9079696 1.70161648,5.26034465 1.87408112,5.5287384 L2.83977919,7.03087771 C2.61796475,7.46723402 2.43008908,7.92021344 2.27840335,8.38462125 L0.534017014,8.76383565 C0.222333932,8.83171329 1.42108547e-13,9.10755281 1.42108547e-13,9.42650852 L1.42108547e-13,13.2695609 C1.42108547e-13,13.5885166 0.222333932,13.8643561 0.534017014,13.9322338 L2.27840335,14.3114482 C2.43008908,14.775856 2.61796475,15.2288354 2.83977919,15.6651917 L1.87408112,17.167331 C1.70161648,17.4357248 1.73953794,17.7880998 1.96498868,18.0135506 L4.68251882,20.7310807 C4.9079696,20.9565315 5.26034465,20.9944529 5.5287384,20.8219883 L7.03087771,19.8562902 C7.46723402,20.0781047 7.92021344,20.2659803 8.38462125,20.4176661 L8.76383565,22.1620524 C8.83154015,22.4737355 9.10755281,22.6960694 9.42650852,22.6960694 L13.2695609,22.6960694 C13.5885166,22.6960694 13.8645293,22.4737355 13.9322338,22.1620524 L14.3114482,20.4176661 C14.775856,20.2659803 15.2288354,20.0781047 15.6651917,19.8562902 L17.167331,20.8219883 C17.4357248,20.9944529 17.7880998,20.9567047 18.0135506,20.7310807 L20.7310807,18.0135506 C20.9565315,17.7880998 20.9944529,17.4357248 20.8219883,17.167331 L19.8562902,15.6651917 C20.0781047,15.2288354 20.2659803,14.775856 20.4176661,14.3114482 L22.1620524,13.9322338 C22.4737355,13.8643561 22.6960694,13.5885166 22.6960694,13.2695609 L22.6960694,9.42650852 C22.6960694,9.10755281 22.4737355,8.83171329 22.1620524,8.76383565 Z M15.4170574,11.3480347 C15.4170574,13.5916334 13.5916334,15.4170574 11.3480347,15.4170574 C9.104436,15.4170574 7.27901206,13.5916334 7.27901206,11.3480347 C7.27901206,9.104436 9.104436,7.27901206 11.3480347,7.27901206 C13.5916334,7.27901206 15.4170574,9.104436 15.4170574,11.3480347 Z" id="Shape"></path> </g> </g> </g> </svg>')

        var ipDiv12 = $('<div class="ip-div12"></div>')
        var ipGauge = $('<svg width="27px" height="23px" viewBox="0 0 27 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-gauge-fill" transform="translate(-167.000000, -193.000000)" fill="rgba(173, 173, 173, 0.5)" fill-rule="nonzero"><g id="speedometer" transform="translate(167.000000, 193.000000)"> <path d="M13.3829098,14.1647408 C13.8152219,14.1647408 14.1669361,13.8130266 14.1669361,13.3807146 C14.1669361,12.9484025 13.8151696,12.5966883 13.3829098,12.5966883 C12.9505978,12.5966883 12.5988836,12.9484025 12.5988836,13.3807146 C12.5988836,13.8130266 12.9505455,14.1647408 13.3829098,14.1647408 Z" id="Shape"></path> <path d="M22.8423433,3.91913812 C20.3150085,1.39180339 16.9547766,0 13.38061,0 C9.82745536,5.22684163e-05 6.43157635,1.40664762 3.91908585,3.91913812 C1.39185566,6.44647285 0,9.80660026 0,13.3807146 C0,16.5257574 1.11363088,19.5821531 3.13563456,21.9869184 C3.28465182,22.164056 3.5042837,22.2663453 3.73572825,22.2663453 L7.94783084,22.2663453 C8.01112789,22.2663453 8.03339424,22.1832385 7.97924416,22.1504663 C7.97861694,22.1501004 7.97804199,22.1497345 7.9775193,22.1494209 C6.50982217,21.2432956 5.28261203,19.9729118 4.42865064,18.4756307 C3.54745741,16.9307331 3.08164129,15.1689739 3.08164129,13.3807146 C3.08164129,11.4821166 3.60260059,9.6316056 4.59387111,8.01436853 C5.47919354,6.56998312 6.72088204,5.35129273 8.18178427,4.49341121 C9.32714208,3.82082123 10.6008711,3.3737172 11.9158399,3.1857077 C12.4008386,3.11634751 12.8907504,3.08164129 13.3806623,3.08164129 C17.7794677,3.08164129 21.8906922,6.10406246 23.2090062,10.2994914 C23.5218327,11.2949957 23.6797356,12.3373324 23.6797356,13.3806623 C23.6797356,15.1688694 23.2139717,16.9306809 22.3327785,18.4755784 C21.4787648,19.9728595 20.251607,21.2432433 18.7839098,22.1493686 L18.7821327,22.1504663 C18.7282962,22.1833954 18.7516079,22.2662931 18.8146959,22.2662931 L23.0255963,22.2662931 C23.2570932,22.2662931 23.476725,22.1640038 23.6256378,21.9868661 C25.6477983,19.5821531 26.7614291,16.5257574 26.7614291,13.3807146 C26.7614291,9.80660026 25.3695735,6.44642058 22.8423433,3.91913812 Z" id="Shape"></path> <path d="M7.20917358,17.8491415 L6.23682423,18.4105565 C6.86613597,19.301733 7.66782893,20.080062 8.61691884,20.6982928 L18.1445626,20.6982928 C19.0936525,20.080062 19.8952932,19.301733 20.5246572,18.4105565 L19.5522555,17.8491415 C19.1772819,17.6326457 19.0487539,17.1531352 19.2653019,16.7781616 C19.4817977,16.4031357 19.9612559,16.27466 20.3362818,16.491208 L21.3094674,17.0530935 C21.7251581,16.1537109 21.987232,15.1792185 22.0767155,14.1647931 L20.9596349,14.1647931 C20.5266434,14.1647931 20.1756087,13.8137584 20.1756087,13.3807668 C20.1756087,12.9477753 20.5266434,12.5967406 20.9596349,12.5967406 L22.0761406,12.5967406 C21.9847231,11.5748408 21.7166907,10.6031709 21.3025157,9.71241257 L20.3362295,10.2702734 C20.2127715,10.3415675 20.0779713,10.3754374 19.9449482,10.3754374 C19.6739887,10.3754374 19.4104513,10.2348354 19.2652497,9.98331978 C19.0487016,9.60834616 19.1772297,9.12883571 19.5522033,8.91233993 L20.5165556,8.35557676 C19.9387282,7.5374715 19.2240099,6.82275318 18.4059046,6.24492584 L17.8491415,7.20922585 C17.7039398,7.46074147 17.4404025,7.60134351 17.169443,7.60134351 C17.0364199,7.60134351 16.9016196,7.56747358 16.7781616,7.49617946 C16.4031357,7.27968368 16.27466,6.80017322 16.491208,6.42519961 L17.0490688,5.45896566 C16.1583105,5.044843 15.1866406,4.77675829 14.1647408,4.6853931 L14.1647408,5.80179421 C14.1647408,6.23478577 13.8137061,6.58582045 13.3807146,6.58582045 C12.947723,6.58582045 12.5966883,6.23478577 12.5966883,5.80179421 L12.5966883,4.68534083 C11.5747885,4.77670603 10.6031187,5.04479073 9.71236031,5.45891339 L10.2702211,6.42514734 C10.4867169,6.80012096 10.3582411,7.27963141 9.98326751,7.49612719 C9.85980951,7.56742131 9.72500926,7.60129124 9.59198614,7.60129124 C9.3209744,7.60129124 9.05748932,7.4606892 8.91228766,7.20917358 L8.35552449,6.24487357 C7.53741924,6.82270091 6.82270091,7.53741924 6.24487357,8.35552449 L7.20917358,8.91228766 C7.5841472,9.12878344 7.71262297,9.60829389 7.49612719,9.98326751 C7.35092553,10.2347831 7.08738817,10.3753852 6.8164287,10.3753852 C6.68340558,10.3753852 6.54860534,10.3415152 6.42514734,10.2702211 L5.45891339,9.71236031 C5.04479073,10.6031187 4.77670603,11.5747885 4.68534083,12.5966883 L5.80179421,12.5966883 C6.23478577,12.5966883 6.58582045,12.947723 6.58582045,13.3807146 C6.58582045,13.8137061 6.23478577,14.1647408 5.80179421,14.1647408 L4.68476588,14.1647408 C4.77430168,15.1791662 5.03632325,16.1536586 5.45201396,17.0530412 L6.42514734,16.491208 C6.80017322,16.27466 7.27963141,16.4031357 7.49612719,16.7781616 C7.71267524,17.1531352 7.58419947,17.6326457 7.20917358,17.8491415 Z M13.3829098,11.0285836 C13.7450254,11.0285836 14.0881676,11.1110109 14.3948786,11.2577806 L16.7344652,8.91814172 C17.0406013,8.61195334 17.5370468,8.61195334 17.8432351,8.91814172 C18.1493713,9.2243301 18.1494235,9.72072325 17.8432351,10.0269116 L15.5044326,12.3657142 C15.6520909,12.673157 15.7349886,13.0173968 15.7349886,13.3806623 C15.7349886,14.6775985 14.6797938,15.732741 13.3829098,15.732741 C12.0859736,15.732741 11.0308311,14.6775985 11.0308311,13.3806623 C11.0308311,12.0837261 12.0859214,11.0285836 13.3829098,11.0285836 Z M11.1331727,17.5621356 L15.6282565,17.5621356 C16.061248,17.5621356 16.4122827,17.9131703 16.4122827,18.3461618 C16.4122827,18.7791534 16.061248,19.1301881 15.6282565,19.1301881 L11.1331727,19.1301881 C10.7001811,19.1301881 10.3491464,18.7791534 10.3491464,18.3461618 C10.3491464,17.9131703 10.7001811,17.5621356 11.1331727,17.5621356 Z" id="Shape"></path> </g> </g> </g> </svg>')

        var ipDiv13 = $('<div class="ip-div13"></div>')
        var ipWatchdog = $('<svg width="22px" height="23px" viewBox="0 0 22 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g class="ip-watchdog-fill" transform="translate(-238.000000, -193.000000)" fill="rgba(173, 173, 173, 0.5)" fill-rule="nonzero"><g id="dog" transform="translate(249.000000, 204.500000) scale(-1, 1) translate(-249.000000, -204.500000) translate(238.000000, 193.000000)"> <path d="M21.4144298,19.4091 L14.0204869,0 L11.2477583,0 L11.2477583,4.71363858 L5.70230116,6.56212429 L5.70230116,8.41061001 L0.0644197272,10.2590957 L0.0644197272,12.1075814 L4.68563402,15.8045529 L9.3992726,15.8045529 L9.3992726,22.9212229 C12.868449,20.3333429 16.8735014,19.1626353 21.4144298,19.4091 Z" id="Shape"></path> </g> </g> </g> </svg>')

        this.render = function (containerElement) {

            $(containerElement).empty();

            $(ipDiv1).append(ipWarningSvg)
            $(ipDiv2).append(ipWifi)
            $(ipDiv3).append(ipCheck)
            $(ipDiv4).append(ipInlet).append(ipInletNumber).append(ipInletPsi)
            $(ipDiv5).append(ipPumpRpmNumber).append(ipPumpRpm).append(ipPumpGpmNumber).append(ipPumpGpm).append(ipPump)
            $(ipDiv6).append(ipOutlet).append(ipOutletNumber).append(ipOutletPsi)
            $(ipDiv7).append(ipValveBox1)
            $(ipDiv8).append(ipValveBox2)
            $(ipDiv9).append(ipValveBox3)
            $(ipDiv10).append(ipFuel)
            $(ipDiv11).append(ipGear)
            $(ipDiv12).append(ipGauge)
            $(ipDiv13).append(ipWatchdog)

            $(ipContainer).append(ipDiv1).append(ipDiv2).append(ipDiv3).append(ipDiv4).append(ipDiv5).append(ipDiv6).append(ipDiv7).append(ipDiv8).append(ipDiv9).append(ipDiv10).append(ipDiv11).append(ipDiv12).append(ipDiv13)

            $(containerElement).append(ipContainer);

        }

        this.getHeight = function () {
            return 4;
        }

        this.onSettingsChanged = function (newSettings) {

            currentSettings = newSettings;

        }

        this.onCalculatedValueChanged = function (settingName, newValue) {

            if (settingName == "ip_warning") {
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-warning-fill')[0].style.fill = 'red' }
                if (newValue == "2") { document.getElementById(thisWidgetId).getElementsByClassName('ip-warning-fill')[0].style.fill = 'orange' }
                if (newValue == "3") { document.getElementById(thisWidgetId).getElementsByClassName('ip-warning-fill')[0].style.fill = 'black' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-warning-fill')[0].style.fill = 'grey' }
            }
            if (settingName == "ip_wifi") {
                if (newValue == "0") { document.getElementById(thisWidgetId).getElementsByClassName('ip-wifi-fill')[0].style.fill = 'black' }
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-wifi-fill')[0].style.fill = '#C4DEB5' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-wifi-fill')[0].style.fill = 'grey' }
            }
            if (settingName == "ip_check") {
                if (newValue == "0") { document.getElementById(thisWidgetId).getElementsByClassName('ip-check-fill')[0].style.fill = 'red' }
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-check-fill')[0].style.fill = '#C4DEB5' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-check-fill')[0].style.fill = 'grey' }
            }

            //Middle
            if (settingName == "ip_inlet_psi") { $(ipInletNumber).html(newValue); }

            if (settingName == "ip_rpm") { $(ipPumpRpmNumber).html(newValue); }
            if (settingName == "ip_gpm") { $(ipPumpGpmNumber).html(newValue); }
            if (settingName == "ip_rpm") {
                if (newValue > "0") {
                    document.getElementById('ip-pump-layer1').style.fill = '#C4DEB5'
                    document.getElementById('ip-pump-layer2').style.fill = '#E1EEDA'
                    document.getElementById('ip-pump-layer3').style.fill = '#C4DEB5'
                    document.getElementById('ip-pump-layer4').style.fill = '#E1EEDA'
                }
            }

            if (settingName == "ip_outlet_psi") { $(ipOutletNumber).html(newValue); }

            //Valves
            if (settingName == "ip_inlet_status") {
                if (newValue == "1") { $(ipValveBox1).html("OPENED"); $(ipValveBox1).css({ "background-color": "#c5e0b4" }); }
                if (newValue == "2") { $(ipValveBox1).html("CLOSED"); $(ipValveBox1).css({ "background-color": "#b4c7e7" }); }
                if (newValue == "3") { $(ipValveBox1).html("OPENING"); $(ipValveBox1).css({ "background-color": "green" }); }
                if (newValue == "4") { $(ipValveBox1).html("CLOSING"); $(ipValveBox1).css({ "background-color": "blue" }); }
                if (newValue == "5") { $(ipValveBox1).html("MID"); $(ipValveBox1).css({ "background-color": "orange" }); }
                if (newValue == "6") { $(ipValveBox1).html("CHECK PROXES"); $(ipValveBox1).css({ "background-color": "red", "font-size": "10px" }); }
                if (newValue == "-1") { $(ipValveBox1).html("DISCONNECTED"); $(ipValveBox1).css({ "background-color": "grey", "font-size": "10px" }); }
            }

            if (settingName == "ip_bypass_status") {
                if (newValue == "1") { $(ipValveBox2).html("OPENED"); $(ipValveBox2).css({ "background-color": "#c5e0b4" }); }
                if (newValue == "2") { $(ipValveBox2).html("CLOSED"); $(ipValveBox2).css({ "background-color": "#b4c7e7" }); }
                if (newValue == "3") { $(ipValveBox2).html("OPENING"); $(ipValveBox2).css({ "background-color": "green" }); }
                if (newValue == "4") { $(ipValveBox2).html("CLOSING"); $(ipValveBox2).css({ "background-color": "blue" }); }
                if (newValue == "5") { $(ipValveBox2).html("MID"); $(ipValveBox2).css({ "background-color": "orange" }); }
                if (newValue == "6") { $(ipValveBox2).html("CHECK PROXES"); $(ipValveBox2).css({ "background-color": "red", "font-size": "10px" }); }
                if (newValue == "-1") { $(ipValveBox2).html("DISCONNECTED"); $(ipValveBox2).css({ "background-color": "grey", "font-size": "10px" }); }
            }

            if (settingName == "ip_outlet_status") {
                if (newValue == "1") { $(ipValveBox3).html("OPENED"); $(ipValveBox3).css({ "background-color": "#c5e0b4" }); }
                if (newValue == "2") { $(ipValveBox3).html("CLOSED"); $(ipValveBox3).css({ "background-color": "#b4c7e7" }); }
                if (newValue == "3") { $(ipValveBox3).html("OPENING"); $(ipValveBox3).css({ "background-color": "green" }); }
                if (newValue == "4") { $(ipValveBox3).html("CLOSING"); $(ipValveBox3).css({ "background-color": "blue" }); }
                if (newValue == "5") { $(ipValveBox3).html("MID"); $(ipValveBox3).css({ "background-color": "orange" }); }
                if (newValue == "6") { $(ipValveBox3).html("CHECK PROXES"); $(ipValveBox3).css({ "background-color": "red", "font-size": "10px" }); }
                if (newValue == "-1") { $(ipValveBox3).html("DISCONNECTED"); $(ipValveBox3).css({ "background-color": "grey", "font-size": "10px" }); }
            }

            //Bottom Icons
            if (settingName == "ip_gas_pump") {
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-fuel-fill')[0].style.fill = '#C4DEB5' }
                if (newValue == "2") { document.getElementById(thisWidgetId).getElementsByClassName('ip-fuel-fill')[0].style.fill = 'orange' }
                if (newValue == "3") { document.getElementById(thisWidgetId).getElementsByClassName('ip-fuel-fill')[0].style.fill = 'red' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-fuel-fill')[0].style.fill = 'grey' }
            }
            if (settingName == "ip_gear") {
                if (newValue == "0") { document.getElementById(thisWidgetId).getElementsByClassName('ip-gear-fill')[0].style.fill = 'black' }
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-gear-fill')[0].style.fill = '#C4DEB5' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-gear-fill')[0].style.fill = 'grey' }
            }
            if (settingName == "ip_gauge") {
                if (newValue == "0") { document.getElementById(thisWidgetId).getElementsByClassName('ip-gauge-fill')[0].style.fill = 'black' }
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-gauge-fill')[0].style.fill = '#C4DEB5' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-gauge-fill')[0].style.fill = 'grey' }
            }
            if (settingName == "ip_watchdog") {
                if (newValue == "0") { document.getElementById(thisWidgetId).getElementsByClassName('ip-watchdog-fill')[0].style.fill = 'black' }
                if (newValue == "1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-watchdog-fill')[0].style.fill = '#C4DEB5' }
                if (newValue == "-1") { document.getElementById(thisWidgetId).getElementsByClassName('ip-watchdog-fill')[0].style.fill = 'grey' }
            }

        }

        this.onDispose = function () {

        }

        this.onSettingsChanged(settings);

    };

}());
