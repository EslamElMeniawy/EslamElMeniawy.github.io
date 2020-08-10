let workEducationTemp = '<div class="right-title-small">{{title}}</div>' +
    '<div class="mdl-grid no-padding"><div class="mdl-cell mdl-cell--5-col">' +
    '<div class="icon material-icons place right-place-icons">{{icon}}</div>' +
    '<div class="place right-place-text">{{place}}</div></div>' +
    '<div class="mdl-cell mdl-cell--7-col"><div class="icon material-icons place right-place-icons">date_range</div>' +
    '<div class="place right-place-text">{{from}} - {{to}}</div></div></div>' +
    '<div class="right-details">{{details}}</div>';

$.getJSON("../json/resume.json", function (resumeData) {
    fillResumeData(resumeData);
});

function fillResumeData(resumeData) {
    let name = resumeData["name"];
    let title = resumeData["title"];
    $("#name").append(name);
    $("#title").append(title);
    fillAbout();
    fillContacts();
    fillSkills(resumeData["skills"]);
    fillWorkExperiences(resumeData["work_experience"]);
    fillEducation(resumeData["education"]);
    fillLanguages(resumeData["languages"]);
}

/**
 * Load about data and add the to HTML for display.
 */
function fillAbout() {
    $.getJSON("../json/about.json", function (aboutParagraphs) {
        aboutParagraphs.forEach(function (aboutParagraph) {
            $("#about").append('<span class="mdl-color-text--white">' + aboutParagraph + '</span>' +
                (aboutParagraph === aboutParagraphs[aboutParagraphs.length - 1] ? '' : '<br><br>'));
        });
    });
}

/**
 * Load contact data and add the to HTML for display.
 */
function fillContacts() {
    $.getJSON("../json/contact.json", function (contactData) {
        let email = contactData["email"];
        let mobile = contactData["mobile"];
        $("#email").html(email["email"]);
        $("#mobile").html(mobile["mobile"]);
    });
}

/**
 * Add skills to HTML for display.
 *
 * @param {Array} skills JSON array for skills.
 */
function fillSkills(skills) {
    skills.forEach(function (skill) {
        let icon = skill["img"];
        let alt = skill["alt"];
        let title = skill["title"];
        let percent = skill["percent"];

        $("#skills").append('<div class="contact-item"><div class="icon material-icons round-btn-left-small">' +
            '<img src="' + icon + '" alt="' + alt + '" /></div><div class="mdl-color-text--white left-data-text">' +
            title + '<div class="progress progress-outer"><div class="progress progress-inner" style="width: ' +
            percent + '%;"></div></div></div></div>');
    });
}

/**
 * Add work experiences to HTML for display.
 *
 * @param {Array} workExperiences JSON array for work experiences.
 */
function fillWorkExperiences(workExperiences) {
    workExperiences.forEach(function (workExperience) {
        let title = workExperience["title"];
        let company = workExperience["company"];
        let from = workExperience["from"];
        let to = workExperience["to"];
        let details = '';

        workExperience["details"].forEach(function (detailsParagraph) {
            details += '<p>' + detailsParagraph + '</p>';
        });

        $("#work-experience").append(workEducationTemp.replace("{{title}}", title)
            .replace("{{icon}}", 'domain')
            .replace("{{place}}", company)
            .replace("{{from}}", from)
            .replace("{{to}}", to)
            .replace("{{details}}", details));
    });
}

/**
 * Add education to HTML for display.
 *
 * @param {Array} education JSON array for education.
 */
function fillEducation(education) {
    education.forEach(function (educationItem) {
        let title = educationItem["title"];
        let place = educationItem["place"];
        let from = educationItem["from"];
        let to = educationItem["to"];
        let details = '';

        educationItem["details"].forEach(function (detailsParagraph) {
            details += '<p>' + detailsParagraph + '</p>';
        });

        $("#education").append(workEducationTemp.replace("{{title}}", title)
            .replace("{{icon}}", 'account_balance')
            .replace("{{place}}", place)
            .replace("{{from}}", from)
            .replace("{{to}}", to)
            .replace("{{details}}", details));
    });
}

/**
 * Add languages to HTML for display.
 *
 * @param {Array} languages JSON array for languages.
 */
function fillLanguages(languages) {
    languages.forEach(function (language) {
        let lang = language["lang"];
        let stars = getStars(language["stars"]);

        $("#languages").append('<div class="mdl-cell mdl-cell--6-col lang-div"><div class="lang-title">' +
            lang + '</div><div class="lang-stars">' + stars + '</div></div>');
    });
}

/**
 * Get stars content (filled / half / empty).
 *
 * @param {Number} stars The float stars count.
 */
function getStars(stars) {
    let filledStarsCount = Math.floor(stars);
    let halfStarsCount = (stars % 1) > 0 ? 1 : 0;
    let emptyStarsCount = 5 - filledStarsCount - halfStarsCount;
    return (getFilledStars(filledStarsCount) + getHalfStars(halfStarsCount) + getEmptyStars(emptyStarsCount));
}

/**
 * Return stars for the given count.
 *
 * @param {Number} filledStarsCount The stars count.
 */
function getFilledStars(filledStarsCount) {
    let filledStars = '';

    for (let i = 0; i < filledStarsCount; i++) {
        filledStars += '<div class="icon material-icons">star</div>';
    }

    return filledStars;
}

/**
 * Return stars for the given count.
 *
 * @param {Number} halfStarsCount The stars count.
 */
function getHalfStars(halfStarsCount) {
    let halfStars = '';

    for (let i = 0; i < halfStarsCount; i++) {
        halfStars += '<div class="icon material-icons">star_half</div>';
    }

    return halfStars;
}

/**
 * Return stars for the given count.
 *
 * @param {Number} emptyStarsCount The stars count.
 */
function getEmptyStars(emptyStarsCount) {
    let emptyStars = '';

    for (let i = 0; i < emptyStarsCount; i++) {
        emptyStars += '<div class="icon material-icons">star_border</div>';
    }

    return emptyStars;
}