$.getJSON("../json/about.json", function (paragraphs) {
    paragraphs.forEach(function (paragraph) {
        $("#container").append('<p>' + paragraph + '</p>');
    });
});