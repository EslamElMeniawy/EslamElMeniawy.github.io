$.getJSON("../json/portfolio.json", function (apps) {
    for (let app of apps) {
        if (app["query_string"] === getDataValue('app')) {
            fillAppData(app);
            break;
        }
    }
});

/**
 * Extract value of given query string from the page URL.
 *
 * @param {String} varSearch The query string key to extract value for.
 */
function getDataValue(varSearch) {
    let searchString = window.location.search.substring(1);
    let variableArray = searchString.split('&');

    for (let i = 0; i < variableArray.length; i++) {
        let keyValuePair = variableArray[i].split('=');

        if (keyValuePair[0] === varSearch) {
            return keyValuePair[1];
        }
    }
}

/**
 * Extract required data for display and add them to HTML.
 *
 * @param {JSON} app The app JSON object to extract data from.
 */
function fillAppData(app) {
    $("#icon").attr("src", app["icon"]);
    $("#title").html(app["name"]);
    fillAppLinks(app);
    $("#lang").html("Developed using: " + app["lang"] + ".");
    fillAppDetails(app["details"]);
    fillAppScreens(app["screens"]);
}

/**
 * Extract app links data for display and add them to HTML.
 *
 * @param {JSON} app The app JSON object to extract data from.
 */
function fillAppLinks(app) {
    let android = app["android"];
    let ios = app["ios"];

    if (!android && !ios) {
        $("#download").hide();
    } else {
        if (android) {
            $("#android").attr("href", android).css("display", "inline-block");
        }

        if (ios) {
            $("#ios").attr("href", ios).css("display", "inline-block");
        }
    }
}

/**
 * Add details to HTML for display.
 *
 * @param {Array} details JSON array for details.
 */
function fillAppDetails(details) {
    details.forEach(function (details) {
        $("#details").append('<p>' + details + '</p>');
    });
}

/**
 * Add screens to HTML for display.
 *
 * @param {Array} screens JSON array for screens.
 */
function fillAppScreens(screens) {
    screens.forEach(function (screen) {
        $("#container").append('<div class="mdl-cell mdl-cell--6-col"><img src="' +
            screen + '" class="screen" alt="App image"></div>');
    });
}