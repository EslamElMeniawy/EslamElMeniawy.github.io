// noinspection CssUnknownTarget
let appTemp = '<div class="mdl-cell mdl-cell--{{width}}-col mdl-cell--4-col-tablet mdl-card mdl-shadow--4dp">' +
    '<div class="mdl-card__title mdl-card--expand portfolio-blog-card-strip-bg mdl-color-text--white"' +
    ' style="background-image: url({{icon}});"></div>' +
    '<div class="mdl-card__supporting-text">' +
    '<h2 class="mdl-card__title-text app-title">{{name}}</h2>{{description}}</div>' +
    '<div class="mdl-card__actions mdl-card--border">' +
    '<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--primary" ' +
    'href="details.html?app={{query_string}}">View Details</a></div></div>';

$.getJSON("../json/portfolio.json", function (apps) {
    apps.forEach(function (app) {
        $("#container").append(appTemp.replace("{{width}}", app["width"])
            .replace("{{icon}}", app["icon"])
            .replace("{{name}}", app["name"])
            .replace("{{description}}", app["description"])
            .replace("{{query_string}}", app["query_string"]));
    });
});