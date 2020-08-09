// noinspection HtmlUnknownAttribute
let contactTemp = '<div class="contact-item">' +
    '<div class="icon material-icons round-btn-left-small icon-contact">' +
    '<img src="{{icon}}" alt="{{alt}}" /></div><div class="left-data-text text-contact">' +
    '<a href="{{url}}" {{target}}>{{data}}</a></div></div>';

$.getJSON("../json/contact.json", function (contactData) {
    let email = contactData["email"];
    let mobile = contactData["mobile"];
    let github = contactData["github"];
    let linkedin = contactData["linkedin"];

    $("#container").append(contactTemp.replace("{{icon}}", email["icon"])
        .replace("{{alt}}", email["alt"])
        .replace("{{url}}", email["url"])
        .replace("{{target}}", email["target"])
        .replace("{{data}}", email["email"]))
        .append(contactTemp.replace("{{icon}}", mobile["icon"])
            .replace("{{alt}}", mobile["alt"])
            .replace("{{url}}", mobile["url"])
            .replace("{{target}}", mobile["target"])
            .replace("{{data}}", mobile["mobile"]))
        .append(contactTemp.replace("{{icon}}", github["icon"])
            .replace("{{alt}}", github["alt"])
            .replace("{{url}}", github["url"])
            .replace("{{target}}", github["target"])
            .replace("{{data}}", github["username"]))
        .append(contactTemp.replace("{{icon}}", linkedin["icon"])
            .replace("{{alt}}", linkedin["alt"])
            .replace("{{url}}", linkedin["url"])
            .replace("{{target}}", linkedin["target"])
            .replace("{{data}}", linkedin["username"]));
});