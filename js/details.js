// noinspection HtmlUnknownTarget
let screen = '<div class="mdl-cell mdl-cell--6-col"><img src="{{image}}" class="screen" alt="App image"></div>';

$.getJSON("../json/apps.json", function(apps) {
	let app = apps[GetDataValue('app')];
	$("#icon").attr("src", app.icon);
	$("#title").html(app.name);

	// noinspection JSUnresolvedVariable
	if (!app.android && !app.ios) {
		$("#download").hide();
	} else { 
		if (app.android) {
			$("#android").attr("href", app.android).css("display", "inline-block");
		}

		if (app.ios) {
			$("#ios").attr("href", app.ios).css("display", "inline-block");
		}
	}

	$("#lang").html("Developed using: " + app.lang + ".");

	if (app.source) {
		$("#source").attr("href", app.source).css("display", "block");
	}

	$("#details").html(app.details);

	app.screens.forEach(function(url) {
		$("#container").append(screen.replace("{{image}}", url));
	});
});

/**
 * @return {string}
 */
function GetDataValue(VarSearch) {
	let SearchString = window.location.search.substring(1);
	let VariableArray = SearchString.split('&');
	for (let i = 0; i < VariableArray.length; i++) {
		let KeyValuePair = VariableArray[i].split('=');
		if (KeyValuePair[0] === VarSearch) {
			return KeyValuePair[1];
		}
	}
}