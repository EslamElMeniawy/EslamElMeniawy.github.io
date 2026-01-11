// Utility Functions for Portfolio Website

/**
 * Fetch JSON data from file
 */
async function fetchJSON(filename) {
  try {
    const response = await fetch(`./json/${filename}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${filename}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return null;
  }
}

/**
 * Create a project card element
 */
function createProjectCard(project) {
  const card = document.createElement('div');
  card.className = 'project-card fade-in';

  // Image with placeholder
  const imageDiv = document.createElement('div');
  imageDiv.className = 'project-image';
  const image = document.createElement('img');
  image.alt = project.name;
  image.style.display = 'none';
  const imageHash = project.imageHash || 'Image';
  imageDiv.innerHTML = `<span style="color: #999; font-size: 0.85rem; padding: 1rem; text-align: center; word-break: break-word;">${imageHash}</span>`;
  const imageSrc = project.image;
  if (imageSrc) {
    image.onload = () => {
      imageDiv.innerHTML = '';
      imageDiv.appendChild(image);
      image.style.display = 'block';
    };
    image.onerror = () => {
      imageDiv.innerHTML = `<span style="color: #999; font-size: 0.85rem; padding: 1rem; text-align: center; word-break: break-word;">${imageHash}</span>`;
    };
    image.src = imageSrc;
  }
  imageDiv.appendChild(image);

  // Content
  const content = document.createElement('div');
  content.className = 'project-content';

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.name;

  const details = Array.isArray(project.details) ? project.details : [];

  const preview = document.createElement('p');
  preview.className = 'project-preview';
  if (details.length > 0) {
    preview.textContent = details[0];
  }

  const fullDetails = document.createElement('ul');
  fullDetails.className = 'project-details-list full-details';
  details.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    fullDetails.appendChild(li);
  });

  // Tech tags
  const techTagsDiv = document.createElement('div');
  techTagsDiv.className = 'tech-tags';
  if (project.programmingLang) {
    const langs = Array.isArray(project.programmingLang)
      ? project.programmingLang
      : [project.programmingLang];
    langs.forEach(lang => {
      const tag = document.createElement('span');
      tag.className = 'tech-tag';
      tag.textContent = lang;
      techTagsDiv.appendChild(tag);
    });
  }

  // Links section
  const links = document.createElement('div');
  links.className = 'project-links';

  if (project.androidLink) {
    const androidLink = document.createElement('a');
    androidLink.href = project.androidLink;
    androidLink.target = '_blank';
    androidLink.textContent = 'Play Store';
    links.appendChild(androidLink);
  }

  if (project.iosLink) {
    const iosLink = document.createElement('a');
    iosLink.href = project.iosLink;
    iosLink.target = '_blank';
    iosLink.textContent = 'App Store';
    links.appendChild(iosLink);
  }

  if (project.githubLink) {
    const githubLink = document.createElement('a');
    githubLink.href = project.githubLink;
    githubLink.target = '_blank';
    githubLink.textContent = 'GitHub';
    links.appendChild(githubLink);
  }

  if (project.npmLink) {
    const npmLink = document.createElement('a');
    npmLink.href = project.npmLink;
    npmLink.target = '_blank';
    npmLink.textContent = 'npm';
    links.appendChild(npmLink);
  }

  if (project.screens && project.screens.length > 0) {
    const screenshotsBtn = document.createElement('button');
    screenshotsBtn.className = 'btn-link';
    screenshotsBtn.type = 'button';
    screenshotsBtn.textContent = 'View screenshots';
    screenshotsBtn.addEventListener('click', () => openScreensModal(project));
    links.appendChild(screenshotsBtn);
  }

  content.appendChild(title);
  if (details.length > 0) {
    content.appendChild(preview);
  }
  if (details.length > 0) {
    const toggle = document.createElement('button');
    toggle.className = 'toggle-details';
    toggle.textContent = 'Show more';
    toggle.addEventListener('click', () => {
      const expanded = fullDetails.classList.toggle('expanded');
      toggle.textContent = expanded ? 'Show less' : 'Show more';
    });
    content.appendChild(toggle);
    content.appendChild(fullDetails);
  }
  content.appendChild(techTagsDiv);
  content.appendChild(links);

  card.appendChild(imageDiv);
  card.appendChild(content);
  return card;
}

/**
 * Create an experience item element
 */
function createExperienceItem(experience) {
  const item = document.createElement('div');
  item.className = 'experience-item fade-in';

  const header = document.createElement('div');
  header.className = 'experience-header';

  const titleAndCompany = document.createElement('div');
  
  const title = document.createElement('div');
  title.className = 'experience-title';
  // Support both {position} and {job}
  title.textContent = experience.position || experience.job || '';

  const company = document.createElement('div');
  company.className = 'experience-company';
  company.textContent = experience.company || '';

  titleAndCompany.appendChild(title);
  titleAndCompany.appendChild(company);

  const date = document.createElement('div');
  date.className = 'experience-date';
  // Support both {period} and {date}
  date.textContent = experience.period || experience.date || '';

  header.appendChild(titleAndCompany);
  header.appendChild(date);

  const description = document.createElement('p');
  description.className = 'experience-description';
  if (experience.description) {
    description.textContent = experience.description;
  } else if (experience.details && Array.isArray(experience.details)) {
    description.textContent = experience.details.join(' ');
  }

  item.appendChild(header);
  if (description.textContent.trim().length > 0) {
    item.appendChild(description);
  }

  return item;
}

/**
 * Create an education item element
 */
function createEducationItem(education) {
  const item = document.createElement('div');
  item.className = 'education-item fade-in';

  const degree = document.createElement('div');
  degree.className = 'education-degree';
  degree.textContent = education.degree || '';

  const school = document.createElement('div');
  school.className = 'education-school';
  // Support both {school} and {place}
  school.textContent = education.school || education.place || '';

  const date = document.createElement('div');
  date.className = 'education-date';
  // Support both {period} and {date}
  date.textContent = education.period || education.date || '';

  item.appendChild(degree);
  item.appendChild(school);
  item.appendChild(date);

  return item;
}

/**
 * Populate projects grid
 */
async function populateProjects(containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const projects = await fetchJSON('projects.json');
  if (!projects) {
    container.innerHTML = '<p>Failed to load projects</p>';
    return;
  }

  const projectsToDisplay = limit ? projects.slice(0, limit) : projects;

  projectsToDisplay.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });
}

/**
 * Populate experience section
 */
async function populateExperience(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const resume = await fetchJSON('resume.json');
  if (!resume || !resume.workExperience) {
    container.innerHTML = '<p>Failed to load experience</p>';
    return;
  }

  resume.workExperience.forEach(experience => {
    const item = createExperienceItem(experience);
    container.appendChild(item);
  });
}

/**
 * Populate education section
 */
async function populateEducation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const resume = await fetchJSON('resume.json');
  if (!resume || !resume.education) {
    container.innerHTML = '<p>Failed to load education</p>';
    return;
  }

  resume.education.forEach(edu => {
    const item = createEducationItem(edu);
    container.appendChild(item);
  });
}

/**
 * Populate skills section
 */
async function populateSkills(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const resume = await fetchJSON('resume.json');
  if (!resume || !resume.skills) {
    container.innerHTML = '<p>Failed to load skills</p>';
    return;
  }

  const skillsDiv = document.createElement('div');
  skillsDiv.className = 'skills-container';

  const skillsCategory = document.createElement('div');
  skillsCategory.className = 'skill-category fade-in';

  const categoryTitle = document.createElement('h3');
  categoryTitle.textContent = 'Technical Skills';

  const skillsList = document.createElement('div');
  skillsList.className = 'skills-list';

  resume.skills.forEach(skill => {
    const tag = document.createElement('span');
    tag.className = 'skill-tag';
    tag.textContent = skill;
    skillsList.appendChild(tag);
  });

  skillsCategory.appendChild(categoryTitle);
  skillsCategory.appendChild(skillsList);
  skillsDiv.appendChild(skillsCategory);

  // Languages section if available
  if (resume.languages && resume.languages.length > 0) {
    const languagesCategory = document.createElement('div');
    languagesCategory.className = 'skill-category fade-in';

    const langTitle = document.createElement('h3');
    langTitle.textContent = 'Languages';

    const langList = document.createElement('div');
    langList.className = 'skills-list';

    resume.languages.forEach(lang => {
      const item = document.createElement('div');
      item.style.width = '100%';
      item.style.marginBottom = '0.75rem';

      const langName = document.createElement('div');
      langName.style.fontWeight = '600';
      langName.style.marginBottom = '0.25rem';
      // Support both {language, level} and {name, experience} keys from resume.json
      langName.textContent = lang.language || lang.name || '';

      const langLevel = document.createElement('div');
      langLevel.className = 'experience-date';
      langLevel.textContent = lang.level || lang.experience || '';

      item.appendChild(langName);
      item.appendChild(langLevel);
      langList.appendChild(item);
    });

    languagesCategory.appendChild(langTitle);
    languagesCategory.appendChild(langList);
    skillsDiv.appendChild(languagesCategory);
  }

  container.appendChild(skillsDiv);
}

/**
 * Populate contact information
 */
async function populateContact(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const contact = await fetchJSON('contact.json');
  if (!contact) {
    container.innerHTML = '<p>Failed to load contact information</p>';
    return;
  }

  const contactInfo = document.createElement('div');
  contactInfo.className = 'contact-info';

  // Email
  if (contact.email) {
    const emailItem = document.createElement('div');
    emailItem.className = 'contact-item fade-in';
    emailItem.innerHTML = `
      <div class="contact-label">Email</div>
      <div class="contact-value"><a href="mailto:${contact.email}">${contact.email}</a></div>
    `;
    contactInfo.appendChild(emailItem);
  }

  // Mobile
  if (contact.mobile) {
    const mobileItem = document.createElement('div');
    mobileItem.className = 'contact-item fade-in';
    mobileItem.innerHTML = `
      <div class="contact-label">Phone</div>
      <div class="contact-value"><a href="tel:${contact.mobile}">${contact.mobile}</a></div>
    `;
    contactInfo.appendChild(mobileItem);
  }

  // GitHub
  if (contact.github) {
    const githubItem = document.createElement('div');
    githubItem.className = 'contact-item fade-in';
    githubItem.innerHTML = `
      <div class="contact-label">GitHub</div>
      <div class="contact-value"><a href="https://github.com/${contact.github}" target="_blank">@${contact.github}</a></div>
    `;
    contactInfo.appendChild(githubItem);
  }

  // LinkedIn
  if (contact.linkedin) {
    const linkedinItem = document.createElement('div');
    linkedinItem.className = 'contact-item fade-in';
    linkedinItem.innerHTML = `
      <div class="contact-label">LinkedIn</div>
      <div class="contact-value"><a href="https://linkedin.com/in/${contact.linkedin}" target="_blank">@${contact.linkedin}</a></div>
    `;
    contactInfo.appendChild(linkedinItem);
  }

  container.appendChild(contactInfo);
}

/**
 * Populate hero section with resume data
 */
async function populateHero(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const resume = await fetchJSON('resume.json');
  const about = await fetchJSON('about.json');

  if (resume) {
    const nameEl = document.createElement('h1');
    nameEl.textContent = resume.name;

    const professionEl = document.createElement('div');
    professionEl.className = 'profession';
    professionEl.textContent = resume.profession;

    container.appendChild(nameEl);
    container.appendChild(professionEl);
  }

  if (about && about.length > 0) {
    const bioEl = document.createElement('p');
    bioEl.textContent = about[0];
    container.appendChild(bioEl);
  }
}

/**
 * Set active navigation link
 */
function setActiveNav(currentPage) {
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if ((currentPage === 'index' && href === 'index.html') ||
        (currentPage !== 'index' && href === `${currentPage}.html`)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Get current page name
 */
function getCurrentPage() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  return filename.replace('.html', '');
}

// Modal state for screenshots
const modalState = {
  screens: [],
  index: 0,
  title: ''
};

function ensureModal() {
  let overlay = document.getElementById('gallery-modal');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.id = 'gallery-modal';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" aria-label="Close">&times;</button>
      <div class="modal-image-container">
        <img alt="Project screenshot" />
        <div class="modal-controls">
          <button data-action="prev">Previous</button>
          <div class="modal-counter"></div>
          <button data-action="next">Next</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Close handlers
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  overlay.querySelector('[data-action="prev"]').addEventListener('click', () => changeSlide(-1));
  overlay.querySelector('[data-action="next"]').addEventListener('click', () => changeSlide(1));

  return overlay;
}

function openScreensModal(project) {
  if (!project.screens || project.screens.length === 0) return;
  // Normalize screens to an array of image path strings
  modalState.screens = project.screens.map((s) =>
    typeof s === 'string' ? s : (s && s.image ? s.image : '')
  ).filter(Boolean);
  modalState.index = 0;
  modalState.title = project.name;

  const overlay = ensureModal();
  overlay.classList.add('active');
  renderSlide();
}

function closeModal() {
  const overlay = document.getElementById('gallery-modal');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

function changeSlide(delta) {
  if (!modalState.screens || modalState.screens.length === 0) return;
  const total = modalState.screens.length;
  modalState.index = (modalState.index + delta + total) % total;
  renderSlide();
}

function renderSlide() {
  const overlay = document.getElementById('gallery-modal');
  if (!overlay || !modalState.screens || modalState.screens.length === 0) return;

  const img = overlay.querySelector('img');
  const counter = overlay.querySelector('.modal-counter');
  const imagePath = modalState.screens[modalState.index];

  img.src = imagePath;
  img.alt = `${modalState.title} screenshot ${modalState.index + 1}`;
  counter.textContent = `${modalState.index + 1} / ${modalState.screens.length}`;
}
