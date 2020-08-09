$.getJSON("../json/about.json", function (aboutParagraphs) {
    aboutParagraphs.forEach(function (aboutParagraph) {
        $("#container").append('<p>' + aboutParagraph + '</p>');
    });
});