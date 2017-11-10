var screen = '<div class="mdl-cell mdl-cell--6-col"><img src="{{image}}" class="screen"></div>';

$.getJSON("../json/apps.json", function(apps) {
	let app = apps[GetDataValue('app')];
	$("#icon").attr("src", app.icon);
	$("#title").html(app.name);

	if (!app.android && !app.ios) {
		$("#download").hide();
	} else { 
		if (app.android) {
			$("#android").attr("href", app.android);
			$("#android").show();
		}

		if (app.ios) {
			$("#ios").attr("href", app.ios);
			$("#ios").show();
		}
	}

	$("#lang").html("Developed using: " + app.lang + ".");

	if (app.source) {
		$("#source").attr("href", app.source);
		$("#source").show();
	}

	$("#details").html(app.details);

	app.screens.forEach(function(url) {
		$("#container").append(screen.replace("{{image}}", url));
	});
});

function GetDataValue(VarSearch) {
	var SearchString = window.location.search.substring(1);
	var VariableArray = SearchString.split('&');
	for (var i = 0; i < VariableArray.length; i++) {
		var KeyValuePair = VariableArray[i].split('=');
		if (KeyValuePair[0] == VarSearch) {
			return KeyValuePair[1];
		}
	}
}