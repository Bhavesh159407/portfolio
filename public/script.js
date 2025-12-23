// Safe element access functions
function safeGetElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    console.warn(`Element with id "${id}" not found`);
    return null;
  }
  return element;
}

function safeSetText(id, text) {
  const element = safeGetElement(id);
  if (element) {
    element.textContent = text;
  }
}

function safeSetImage(id, src) {
  const element = safeGetElement(id);
  if (element) {
    element.src = src;
  }
}

// Client Modal Functions
function openClientModal(client) {
  const modal = document.getElementById('client-modal');
  if (!modal) return;
  
  // Set client info
  safeSetText('modal-title', client.name);
  safeSetImage('modal-logo', client.logoUrl);
  
  const websiteLink = safeGetElement('modal-website');
  if (websiteLink && client.website) {
    websiteLink.href = client.website;
    websiteLink.textContent = 'Visit website';
    websiteLink.style.display = 'inline-block';
  } else if (websiteLink) {
    websiteLink.style.display = 'none';
  }
  
  // Set description
  const descriptionDiv = safeGetElement('modal-description');
  if (descriptionDiv) {
    descriptionDiv.innerHTML = `<h4>About ${client.name}</h4><p>${client.description || 'No description available.'}</p>`;
  }
  
  // Clear and populate projects
  const projectsDiv = safeGetElement('modal-projects');
  if (projectsDiv && client.projects && client.projects.length > 0) {
    projectsDiv.style.display = 'block';
    projectsDiv.innerHTML = '<h4>Projects</h4>';
    
    client.projects.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project-block';
      projectDiv.innerHTML = `<h5>${project.name}</h5>`;
      projectsDiv.appendChild(projectDiv);
    });
  } else if (projectsDiv) {
    projectsDiv.style.display = 'none';
  }
  
  // Clear and populate documents
  const documentsDiv = safeGetElement('modal-documents-content');
  if (documentsDiv) {
    documentsDiv.innerHTML = '';
    
    if (client.projects && client.projects.length > 0) {
      client.projects.forEach(project => {
        if (project.documents && project.documents.length > 0) {
          project.documents.forEach(doc => {
            const docDiv = document.createElement('div');
            docDiv.className = 'modal-item';
            docDiv.innerHTML = `
              <h5>${doc.title}</h5>
              <a href="${doc.url}" target="_blank" rel="noopener" class="link">📄 View</a>
            `;
            documentsDiv.appendChild(docDiv);
          });
        }
      });
    }
    
    if (documentsDiv.children.length === 0) {
      documentsDiv.innerHTML = '<p style="color: var(--sapTextColor-Secondary); font-style: italic;">No presentations available.</p>';
    }
  }
  
  // Clear and populate repositories
  const reposDiv = safeGetElement('modal-repos-content');
  if (reposDiv) {
    reposDiv.innerHTML = '';
    
    if (client.projects && client.projects.length > 0) {
      client.projects.forEach(project => {
        if (project.repos && project.repos.length > 0) {
          project.repos.forEach(repo => {
            const repoDiv = document.createElement('div');
            repoDiv.className = 'modal-item';
            repoDiv.innerHTML = `
              <h5>${repo.title}</h5>
              <a href="${repo.url}" target="_blank" rel="noopener" class="link">📁 View</a>
            `;
            reposDiv.appendChild(repoDiv);
          });
        }
      });
    }
    
    if (reposDiv.children.length === 0) {
      reposDiv.innerHTML = '<p style="color: var(--sapTextColor-Secondary); font-style: italic;">No repositories available.</p>';
    }
  }
  
  // Clear and populate videos
  const videosDiv = safeGetElement('modal-videos-content');
  if (videosDiv) {
    videosDiv.innerHTML = '';
    
    if (client.projects && client.projects.length > 0) {
      client.projects.forEach(project => {
        if (project.videos && project.videos.length > 0) {
          project.videos.forEach(video => {
            const videoDiv = document.createElement('div');
            videoDiv.className = 'modal-item';
            const icon = video.type === 'presentation' ? '📊' : '🎥';
            videoDiv.innerHTML = `
              <h5>${video.title}</h5>
              <a href="${video.url}" target="_blank" rel="noopener" class="link">${icon} View</a>
            `;
            videosDiv.appendChild(videoDiv);
          });
        }
      });
    }
    
    if (videosDiv.children.length === 0) {
      videosDiv.innerHTML = '<p style="color: var(--sapTextColor-Secondary); font-style: italic;">No videos available.</p>';
    }
  }
  
  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeClientModal() {
  const modal = document.getElementById('client-modal');
  if (modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
}

// Logo Showcase Functions
function renderLogoShowcase(clients) {
  const logoTrack = safeGetElement('logo-track');
  if (!logoTrack) return;
  
  logoTrack.innerHTML = '';
  
  // Duplicate clients for seamless scrolling
  const duplicatedClients = [...clients, ...clients];
  
  duplicatedClients.forEach(client => {
    const logoCard = document.createElement('div');
    logoCard.className = 'logo-card';
    logoCard.style.cssText = 'flex-shrink: 0; min-width: 200px; cursor: pointer;';
    logoCard.onclick = () => openClientModal(client);
    
    logoCard.innerHTML = `
      <img src="${client.logoUrl}" alt="${client.name}" style="width: 100%; height: 80px; object-fit: contain; margin-bottom: 10px;" />
      <h4 style="text-align: center; font-size: 14px; color: var(--sapTextColor); margin: 0;">${client.name}</h4>
    `;
    
    logoTrack.appendChild(logoCard);
  });
}

// Mobile Menu Functions
function setupMobileMenu() {
  const toggle = safeGetElement('mobile-menu-toggle');
  const menu = safeGetElement('nav-menu');
  
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.contains('active');
      menu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', !isOpen);
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Starfield Animation
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const stars = [];
  const numStars = 100;
  
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    });
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      star.x += star.vx;
      star.y += star.vy;
      
      if (star.x < 0) star.x = canvas.width;
      if (star.x > canvas.width) star.x = 0;
      if (star.y < 0) star.y = canvas.height;
      if (star.y > canvas.height) star.y = 0;
      
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(122, 162, 255, 0.3)';
      ctx.fill();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ---------- Default Data (will be overridden by JSON files if present) ----------
const defaultResume = {
  name: "Your Name",
  title: "Full-Stack Developer",
  summary: "I build reliable, user-centric web applications with attention to performance and DX.",
  profilePhoto: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
  location: "Your City, Country",
  email: "you@example.com",
  phone: "+1 (555) 555-5555",
  website: "https://your-domain.com",
  socials: [
    { label: "GitHub", url: "https://github.com/your", icon: "🐙" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/your", icon: "🔗" },
    { label: "Twitter", url: "https://twitter.com/your", icon: "🐦" }
  ],
  skills: {
    categories: [
      {
        label: "SAP Technologies — Primary Skills",
        items: ["SAP Fiori", "SAP UI5", "SAP Build Apps", "SAP Cloud Connector Configuration", "SAP Build Workzone"]
      },
      {
        label: "SAP Technologies — Secondary Skills",
        items: ["SAP Build Code", "SAP BTP"]
      },
      {
        label: "SAP Landscape",
        items: ["SAP ECC", "SAP S/4HANA", "SAP Public Cloud", "SAP Private Cloud"]
      },
      {
        label: "Programming Languages",
        items: ["JavaScript", "Node.js (Basics)"]
      },
      {
        label: "Tools & Platforms",
        items: ["SAP Web IDE", "SAP Business Application Studio", "Git", "Visual Studio"]
      },
      {
        label: "Web Technologies",
        items: ["HTML5", "CSS3", "XML", "REST APIs", "OData Services"]
      },
      {
        label: "Database Management",
        items: ["SQL (Basics)"]
      }
    ],
    languages: ["English", "Telugu", "Hindi", "Kannada"]
  },
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Tech Corp",
      location: "Remote",
      period: "2022 — Present",
      summary: "Leading full-stack development for key product areas; mentoring engineers; improving performance and reliability.",
      highlights: [
        "Reduced page load times by 45% through code-splitting and caching.",
        "Designed and shipped a multi-tenant RBAC system.",
        "Led migration from REST to GraphQL for critical services."
      ]
    },
    {
      role: "Software Engineer",
      company: "Acme Inc.",
      location: "NY, USA",
      period: "2019 — 2022",
      summary: "Built and maintained customer-facing features in a microservices architecture.",
      highlights: [
        "Implemented CI/CD pipelines to cut deploy time by 60%.",
        "Launched growth experiments increasing activation by 12%."
      ]
    }
  ],
  projects: [
    {
      name: "Portfolio Platform",
      description: "A minimalist portfolio site generator.",
      tech: ["Vite", "Vanilla JS"],
      url: "https://your-domain.com/projects/portfolio",
      repo: "https://github.com/your/portfolio"
    },
    {
      name: "API Starter",
      description: "Production-ready Node API template with auth and testing.",
      tech: ["Node.js", "Fastify", "Prisma"],
      repo: "https://github.com/your/api-starter"
    }
  ],
  education: [
    { school: "University Name", degree: "B.S. in Computer Science", period: "2015 — 2019" }
  ]
};

const defaultClients = [
  {
    name: "Google",
    domain: "google.com",
    website: "https://google.com",
    documents: [
      { title: "Case Study (PDF)", url: "https://example.com/case-study-google.pdf" }
    ],
    repos: [
      { title: "Demo Repo", url: "https://github.com/your/google-demo" }
    ],
    videos: [
      { title: "Launch Talk", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" }
    ]
  },
  {
    name: "Microsoft",
    domain: "microsoft.com",
    website: "https://microsoft.com",
    documents: [
      { title: "Integration Doc", url: "https://example.com/ms-integration.docx" }
    ],
    repos: [
      { title: "SDK Repo", url: "https://github.com/your/ms-sdk" }
    ],
    videos: [
      { title: "Demo Video", url: "https://www.youtube.com/watch?v=ysz5S6PUM-U" }
    ]
  }
];

// ---------- Data Loading with graceful fallback ----------
async function loadJson(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.json();
  } catch (err) {
    return fallback;
  }
}

function logoUrlForClient(client) {
  console.log("logoUrlForClient called for:", client.name, "logoUrl:", client.logoUrl);
  
  if (client.logoUrl) {
    console.log("Using provided logoUrl:", client.logoUrl);
    return client.logoUrl;
  }
  
  // Create a text-based logo using the company name
  const companyName = client.name || "Company";
  const encodedName = encodeURIComponent(companyName);
  const fallbackUrl = `https://via.placeholder.com/200x200/3B82F6/FFFFFF?text=${encodedName}`;
  
  console.log("Using fallback logo URL:", fallbackUrl);
  return fallbackUrl;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && typeof text === "string") el.textContent = text;
}

function setImage(id, url) {
  const img = document.getElementById(id);
  console.log(`Setting image for ${id}:`, url);
  if (img && url) {
    img.src = url;
    console.log(`Image src set for ${id}:`, img.src);
  } else {
    console.log(`Failed to set image for ${id}:`, { img: !!img, url });
  }
}

function createEl(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content !== undefined && content !== null && content !== "undefined" && content !== "null") {
    // Use textContent for safety, or innerHTML if it contains HTML
    if (typeof content === 'string' && content.includes('<')) {
      el.innerHTML = content;
    } else {
      el.textContent = String(content);
    }
  }
  return el;
}

function safeLink(url, label) {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener";
  a.className = "link";
  a.textContent = label;
  return a;
}

// Scroll to hero section smoothly
function scrollToHero() {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Fallback: scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// Make scrollToHero available globally
window.scrollToHero = scrollToHero;

function getCertificationMeta(cert) {
  // Accepts string URL or { url, title }
  const url = typeof cert === "string" ? cert : (cert && cert.url ? cert.url : "");
  const title = typeof cert === "object" && cert && cert.title ? String(cert.title).trim() : "";
  let icon = "📜";
  let label = title || url || "Certification";
  
  try {
    if (url) {
      const u = new URL(url);
      const host = u.hostname;
      if (host.includes("hackerrank.com")) {
        icon = "🟨"; // JS-like badge
        label = title || "JavaScript (HackerRank)";
      } else if (host.includes("credly.com")) {
        icon = "💠"; // SAP/Credly badge style
        label = title || "SAP Certification (Credly)";
      }
    }
  } catch {
    // leave defaults - label already set above
  }
  
  // Ensure label is never empty or undefined
  if (!label || label === "undefined" || label === "null" || label.trim() === "") {
    label = title || "Certification";
  }
  
  // Final validation - ensure we always return a valid string
  const finalLabel = (label && typeof label === 'string' && label.trim() !== "") ? label.trim() : (title || "Certification");
  
  return { url: url || "", label: finalLabel, icon };
}

function youtubeToEmbed(url) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      return `https://www.youtube.com/embed/${u.searchParams.get("v")}`;
    }
    if (u.hostname === "youtu.be" && u.pathname.length > 1) {
      return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
    }
  } catch {}
  return null;
}

function renderResume(resume) {
  safeSetText("brand-name", resume.name);
  safeSetText("hero-name", resume.name);
  safeSetText("hero-title", resume.title);
  safeSetText("hero-summary", resume.summary);
  
  // Set profile photo if available
  if (resume.profilePhoto) {
    safeSetImage("profile-photo", resume.profilePhoto);
    safeSetImage("brand-avatar", resume.profilePhoto);
  }

  const socials = safeGetElement("social-links");
  if (socials) {
  socials.innerHTML = "";
  (resume.socials || []).forEach(s => {
    const a = safeLink(s.url, s.icon ? `${s.icon} ${s.label}` : s.label);
    socials.appendChild(a);
  });
  }

  const about = safeGetElement("about-content");
  if (about) {
  about.innerHTML = "";
  const aboutLines = [
    resume.summary,
    resume.location ? `📍 ${resume.location}` : null,
    resume.email ? `✉️ <a class="link" href="mailto:${resume.email}">${resume.email}</a>` : null,
    resume.phone ? `📞 ${resume.phone}` : null,
    resume.website ? `🌐 <a class="link" target="_blank" rel="noopener" href="${resume.website}">${resume.website}</a>` : null
  ].filter(Boolean);
  about.innerHTML = aboutLines.map(l => `<p>${l}</p>`).join("");
  }

  const expList = safeGetElement("experience-list");
  if (expList) {
  expList.innerHTML = "";
  (resume.experience || []).forEach(item => {
    const row = createEl("div", "item card");
    row.innerHTML = `
      <div class="period">${item.period || ""}</div>
      <div>
        <h3 class="title">${item.role || ""}</h3>
          <div class="where">🏢 ${item.company || ""}${item.location ? ` • 📍 ${item.location}` : ""}</div>
        ${item.summary ? `<p class="muted">${item.summary}</p>` : ""}
        ${Array.isArray(item.highlights) && item.highlights.length ? `<ul>` + item.highlights.map(h => `<li>${h}</li>`).join("") + `</ul>` : ""}
      </div>`;
    expList.appendChild(row);
  });
  }

  const projGrid = document.getElementById("projects-grid");
  projGrid.innerHTML = "";
  (resume.projects || []).forEach(p => {
    const card = createEl("div", "project-card card");
    const links = [
      p.url ? `<a class="link" target="_blank" rel="noopener" href="${p.url}">Live</a>` : null,
      p.repo ? `<a class="link" target="_blank" rel="noopener" href="${p.repo}">Repo</a>` : null
    ].filter(Boolean).join(" • ");
    card.innerHTML = `
      <h3>${p.name || "Project"}</h3>
      ${p.description ? `<p class="muted">${p.description}</p>` : ""}
      ${Array.isArray(p.tech) ? `<div class="skills">` + p.tech.map(t => `<span class="chip">${t}</span>`).join("") + `</div>` : ""}
      ${links ? `<p>${links}</p>` : ""}`;
    projGrid.appendChild(card);
  });

  const skillsCloud = document.getElementById("skills-cloud");
  skillsCloud.innerHTML = "";
  if (resume.skills && Array.isArray(resume.skills)) {
    resume.skills.forEach(s => skillsCloud.appendChild(createEl("span", "chip", s)));
  } else if (resume.skills && Array.isArray(resume.skills.categories)) {
    resume.skills.categories.forEach(cat => {
      const group = createEl("div", "card");
      group.appendChild(createEl("h3", "", cat.label));
      const wrap = createEl("div", "skills");
      cat.items.forEach(it => wrap.appendChild(createEl("span", "chip", it)));
      group.appendChild(wrap);
      skillsCloud.appendChild(group);
    });
  }

  const lang = document.getElementById("languages-list");
  if (lang) {
    lang.innerHTML = "";
    const langs = resume.skills && resume.skills.languages ? resume.skills.languages : (resume.languages || []);
    langs.forEach(l => {
      if (typeof l === 'string') {
        // Handle string format
        lang.appendChild(createEl("span", "chip", l));
      } else if (typeof l === 'object' && l.language) {
        // Handle object format (just language name)
        lang.appendChild(createEl("span", "chip", l.language));
      }
    });
  }

  const edu = document.getElementById("education-list");
  edu.innerHTML = "";
  (resume.education || []).forEach(e => {
    const row = createEl("div", "item card");
    const gpaText = e.gpa ? ` • GPA: ${e.gpa}` : "";
    const honorsText = e.honors ? ` • ${e.honors}` : "";
    
    // Place college logo in the period section before the year - much wider for visibility
    const periodWithLogo = e.logoUrl ? 
      `<div style="display: flex; align-items: center; justify-content: flex-end; gap: 10px; min-width: 0;">
        <img src="${e.logoUrl}" alt="${e.school} logo" style="width: 100px; height: 30px; object-fit: cover; object-position: left center; border-radius: 4px; opacity: 0.95; flex-shrink: 0;">
        <span style="font-size: 13px; color: var(--muted); white-space: nowrap; flex-shrink: 0;">${e.period || ""}</span>
      </div>` : 
      e.period || "";
    
    row.innerHTML = `
      <div class="period">${periodWithLogo}</div>
      <div>
        <h3 class="title">${e.degree || ""}</h3>
        <div class="where">${e.school || ""}${gpaText}${honorsText}</div>
      </div>`;
    edu.appendChild(row);
  });

  const certGrid = document.getElementById("certifications-grid");
  console.log('=== STARTING CERTIFICATION RENDERING ===');
  console.log('certGrid element found:', !!certGrid);
  console.log('certGrid element:', certGrid);
  if (!certGrid) {
    console.error('❌ CRITICAL ERROR: certifications-grid element NOT FOUND!');
    console.error('Searching for alternative selectors...');
    const altSelectors = [
      '#certifications-grid',
      '[id="certifications-grid"]',
      '.cert-grid',
      '#certifications .grid',
      'section#certifications div.grid'
    ];
    altSelectors.forEach(sel => {
      const el = document.querySelector(sel);
      console.log(`  Selector "${sel}":`, el ? 'FOUND' : 'NOT FOUND', el);
    });
    console.error('Available section IDs:', Array.from(document.querySelectorAll('section[id]')).map(s => s.id));
    return; // Exit early if element not found
  }
  
  console.log('certGrid element found:', certGrid);
  console.log('certGrid parent:', certGrid.parentElement);
  console.log('resume.certifications:', resume.certifications);
  console.log('resume.certifications type:', typeof resume.certifications);
  console.log('resume.certifications is array:', Array.isArray(resume.certifications));
  console.log('Certifications count:', (resume.certifications || []).length);
  
  certGrid.innerHTML = "";
  const certifications = resume.certifications || [];
  if (certifications.length === 0) {
    console.warn('No certifications found in resume data');
    certGrid.innerHTML = '<p class="muted">No certifications available.</p>';
  } else {
    console.log(`Processing ${certifications.length} certifications...`);
    let successCount = 0;
    let errorCount = 0;
    certifications.forEach((c, index) => {
        try {
          // Log raw certification data
          console.log(`[CERT ${index}] Raw data:`, JSON.stringify(c));
          
          const meta = getCertificationMeta(c);
          console.log(`[CERT ${index}] Meta result:`, JSON.stringify(meta));
          
          if (!meta.url) {
            console.warn(`Certification ${index} has no URL, skipping`);
            return;
          }
          // Create card as anchor element - ensure href is set correctly
          const card = document.createElement("a");
          card.className = "cert-card";
          const certUrl = meta.url || c.url || "#";
          card.href = certUrl;
          card.target = "_blank";
          card.rel = "noopener noreferrer";
          card.style.cursor = "pointer";
          card.style.textDecoration = "none";
          
          console.log(`[CERT ${index}] Card created with href: ${card.href}`);
          
          // Create image element
          const img = document.createElement("img");
          img.crossOrigin = "anonymous";
          img.loading = "lazy";
          
          // Debug logging
          console.log(`[CERT ${index}] Processing:`, { 
            cTitle: c.title, 
            cImageUrl: c.imageUrl, 
            cUrl: c.url,
            metaUrl: meta.url,
            cardHref: card.href
          });
          
          // Ensure we have a valid imageUrl
          let imageUrl = (c && typeof c === "object" && c.imageUrl) ? String(c.imageUrl).trim() : null;
          
          // Fix /blob URLs immediately - change to /image.png
          if (imageUrl && imageUrl.endsWith('/blob')) {
            imageUrl = imageUrl.replace('/blob', '/image.png');
            console.log(`[CERT ${index}] Fixed /blob URL to: ${imageUrl}`);
          }
          
          if (imageUrl && imageUrl !== "undefined" && imageUrl !== "null" && imageUrl.length > 0) {
            // Check if it's a HackerRank certificate URL (not a direct image)
            const isHackerRank = imageUrl.includes("hackerrank.com/certificates") && 
                                 !imageUrl.includes(".png") && 
                                 !imageUrl.includes(".jpg") && 
                                 !imageUrl.includes(".svg") &&
                                 !imageUrl.includes("images.credly.com");
            
            if (isHackerRank) {
              // For HackerRank, use a local asset as it's not a direct image URL
              img.src = "/assets/js.svg";
              console.log(`[CERT ${index}] HackerRank cert detected, using fallback: ${img.src}`);
            } else {
              // Set image source
              img.src = imageUrl;
              console.log(`[CERT ${index}] Setting image src to: ${img.src}`);
              
              // Error handling with fallback
              img.onerror = () => {
                console.warn(`[CERT ${index}] Failed to load image: ${imageUrl}`);
                const h = (meta.url || c.url || "");
                if (h.includes("hackerrank")) {
                  img.src = "/assets/js.svg";
                } else if (h.includes("credly") || h.includes("sap")) {
                  img.src = "/assets/sap.svg";
                } else {
                  img.src = "/assets/sap.svg";
                }
                console.log(`[CERT ${index}] Using fallback image: ${img.src}`);
              };
              
              // Log successful image load
              img.onload = () => {
                console.log(`[CERT ${index}] ✅ Successfully loaded image for: ${c.title}`);
              };
            }
          } else {
            // No imageUrl found - use fallback based on host
            console.warn(`[CERT ${index}] No imageUrl found, using fallback`);
            try {
              const h = new URL(meta.url || c.url || "").hostname;
              if (h.includes("hackerrank")) {
                img.src = "/assets/js.svg";
              } else if (h.includes("credly") || h.includes("sap")) {
                img.src = "/assets/sap.svg";
              } else {
                img.src = "/assets/sap.svg";
              }
            } catch {
              img.src = "/assets/sap.svg";
            }
            console.log(`[CERT ${index}] Using fallback image: ${img.src}`);
          }
          // SIMPLIFIED: Get title ONLY from c.title - ignore meta.label completely
          let finalTitle = "Certification"; // Safe default
          
          // Direct access to c.title - this is the ONLY source we trust
          if (c && typeof c === 'object' && c.hasOwnProperty('title')) {
            const rawTitle = c.title;
            if (rawTitle !== null && rawTitle !== undefined) {
              const titleStr = String(rawTitle).trim();
              // Only use if it's a valid non-empty string and not the literal "undefined"
              if (titleStr.length > 0 && titleStr !== "undefined" && titleStr !== "null") {
                finalTitle = titleStr;
              }
            }
          }
          
          // Get provider from URL
          let finalProvider = "";
          if (meta && meta.url && typeof meta.url === 'string') {
            try {
              finalProvider = meta.url.replace(/^https?:\/\//, "").split("/")[0];
            } catch (e) {
              console.warn(`Error parsing provider from URL: ${meta.url}`, e);
            }
          }
          
          console.log(`[CERT ${index}] Title extraction:`, {
            rawC: c,
            cTitle: c.title,
            cTitleType: typeof c.title,
            cHasTitle: c && c.hasOwnProperty('title'),
            finalTitle: finalTitle,
            finalTitleType: typeof finalTitle,
            finalTitleLength: finalTitle.length
          });
          
          // Triple-check: finalTitle MUST be a valid string
          if (typeof finalTitle !== 'string' || finalTitle === "undefined" || finalTitle === "null" || finalTitle.length === 0) {
            console.error(`[CERT ${index}] CRITICAL: Title is invalid!`, { finalTitle, c });
            finalTitle = "Certification"; // Force safe default
          }
          
          img.alt = finalTitle;
          
          // Create title element - use ONLY textContent, NEVER innerHTML
          const titleDiv = document.createElement("div");
          titleDiv.className = "title";
          // Direct assignment - no function calls, no conversions
          titleDiv.textContent = finalTitle;
          
          // Verify it was set correctly
          if (titleDiv.textContent !== finalTitle) {
            console.error(`[CERT ${index}] Title element textContent mismatch!`, {
              expected: finalTitle,
              actual: titleDiv.textContent
            });
            titleDiv.textContent = finalTitle; // Force set again
          }
          
          // Create provider element
          const providerDiv = document.createElement("div");
          providerDiv.className = "provider";
          providerDiv.textContent = finalProvider || "";
          
          card.appendChild(img);
          card.appendChild(titleDiv);
          card.appendChild(providerDiv);
          certGrid.appendChild(card);
          console.log(`✅ Added certification card ${index}: "${finalTitle}"`);
        } catch (error) {
          console.error(`Error rendering certification ${index}:`, error);
        }
      });
      console.log(`Successfully rendered ${certGrid.children.length} certification cards`);
    }
  }

  const contact = document.getElementById("contact-items");
  contact.innerHTML = "";
  
  // Email contact item
  if (resume.email) {
    const emailItem = createEl("div", "contact-item");
    emailItem.innerHTML = `
      <div class="contact-icon">✉️</div>
      <div class="contact-details">
        <div class="contact-label">Email</div>
        <a href="mailto:${resume.email}" class="contact-value">${resume.email}</a>
        <div class="contact-actions">
          <a href="mailto:${resume.email}" class="contact-action-btn primary">Send Email</a>
        </div>
      </div>
    `;
    contact.appendChild(emailItem);
  }
  
  // Phone contact item
  if (resume.phone) {
    const phoneItem = createEl("div", "contact-item");
    phoneItem.innerHTML = `
      <div class="contact-icon">📞</div>
      <div class="contact-details">
        <div class="contact-label">Phone</div>
        <a href="tel:${resume.phone}" class="contact-value">${resume.phone}</a>
        <div class="contact-actions">
          <a href="tel:${resume.phone}" class="contact-action-btn primary">Call Now</a>
        </div>
      </div>
    `;
    contact.appendChild(phoneItem);
  }
  
  // LinkedIn contact item (only if not already in socials)
  if (resume.website && !resume.socials?.some(s => s.url === resume.website)) {
    const websiteItem = createEl("div", "contact-item");
    websiteItem.innerHTML = `
      <div class="contact-icon">🔗</div>
      <div class="contact-details">
        <div class="contact-label">LinkedIn</div>
        <a href="${resume.website}" target="_blank" rel="noopener" class="contact-value">${resume.website.replace(/^https?:\/\//, '')}</a>
        <div class="contact-actions">
          <a href="${resume.website}" target="_blank" rel="noopener" class="contact-action-btn primary">Visit Profile</a>
        </div>
      </div>
    `;
    contact.appendChild(websiteItem);
  }
  
  // Social media contact items (simplified)
  (resume.socials || []).forEach(s => {
    const socialItem = createEl("div", "contact-item");
    const icon = s.icon || "🔗";
    socialItem.innerHTML = `
      <div class="contact-icon">${icon}</div>
      <div class="contact-details">
        <div class="contact-label">${s.label}</div>
        <a href="${s.url}" target="_blank" rel="noopener" class="contact-value">${s.url.replace(/^https?:\/\//, '')}</a>
        <div class="contact-actions">
          <a href="${s.url}" target="_blank" rel="noopener" class="contact-action-btn primary">Visit ${s.label}</a>
        </div>
      </div>
    `;
    contact.appendChild(socialItem);
  });
}

function renderClients(clients) {
  const grid = document.getElementById("clients-grid");
  grid.innerHTML = "";
  clients.forEach((client, index) => {
    const card = createEl("button", "logo-card");
    card.setAttribute("type", "button");
    card.setAttribute("aria-label", `Open ${client.name} details`);
    
    // Special styling for Hindware (white background)
    if (client.name === "Hindware Limited") {
      card.style.cssText = "background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; min-width: 160px; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);";
    }
    
    const img = createEl("img");
    
    // Set up error handling for the image
    img.onerror = () => {
      console.error(`Failed to load logo for ${client.name}, using fallback`);
      const companyName = client.name || "Company";
      const encodedName = encodeURIComponent(companyName);
      img.src = `https://via.placeholder.com/200x200/EF4444/FFFFFF?text=${encodedName}`;
    };
    
    img.onload = () => {
      console.log(`Successfully loaded logo for ${client.name}:`, img.src);
    };
    
    img.src = logoUrlForClient(client);
    img.alt = `${client.name} logo`;
    const label = createEl("div", "name", client.name);
    
    // Special text styling for Hindware (dark text for white background)
    if (client.name === "Hindware Limited") {
      label.style.cssText = "color: #333; font-size: 14px; text-align: center; font-weight: 500;";
    }
    
    card.appendChild(img);
    card.appendChild(label);
    card.addEventListener("click", () => openClientModal(client));
    grid.appendChild(card);
  });
}

function openClientModal(client) {
  console.log("Opening modal for client:", client);
  const modal = document.getElementById("client-modal");
  const modalLogo = document.getElementById("modal-logo");
  const modalTitle = document.getElementById("modal-title");
  const modalWebsite = document.getElementById("modal-website");
  const modalDescription = document.getElementById("modal-description");
  const modalDocumentsContent = document.getElementById("modal-documents-content");
  const modalReposContent = document.getElementById("modal-repos-content");
  const modalVideosContent = document.getElementById("modal-videos-content");
  const modalProjects = document.getElementById("modal-projects");

  // Set client info
  modalLogo.src = logoUrlForClient(client);
  modalLogo.alt = `${client.name} logo`;
  modalTitle.textContent = client.name || "Client";
  modalWebsite.href = client.website;
  modalWebsite.textContent = `Visit ${client.domain || new URL(client.website).hostname}`;

  // Set description with businesses
  modalDescription.innerHTML = `
    <h4>About ${client.name}</h4>
    <p>${client.description || 'No description available'}</p>
    <div class="businesses-list">
      ${client.businesses ? client.businesses.map(business => `<span class="business-tag">${business}</span>`).join('') : ''}
    </div>
  `;

  // If projects exist, render grouped projects and hide standalone sections
  if (client.projects && client.projects.length > 0 && modalProjects) {
    modalProjects.style.display = "block";
    const sectionsHtml = client.projects.map(p => {
      const docs = (p.documents || []).map(d => {
        const cleanTitle = (d.title || '').replace(/\s*\(PPT\)\s*$/i, '');
        return `
        <div class=\"modal-item\" style=\"display:flex;justify-content:space-between;align-items:center;gap:12px;\">
          <h5 style=\"margin:0;\">${cleanTitle}: Presentation</h5>
          <a href=\"${d.url}\" target=\"_blank\" rel=\"noopener\" class=\"link\">Open ↗</a>
        </div>`;
      }).join("");
      const repos = (p.repos || []).map(r => `
        <div class=\"modal-item\" style=\"display:flex;justify-content:space-between;align-items:center;gap:12px;\">
          <h5 style=\"margin:0;\">${r.title}: Code</h5>
          <a href=\"${r.url}\" target=\"_blank\" rel=\"noopener\" class=\"link\">Open ↗</a>
        </div>
      `).join("");
      const videos = (p.videos || []).map(v => `
        <div class=\"modal-item\" style=\"display:flex;justify-content:space-between;align-items:center;gap:12px;\">
          <h5 style=\"margin:0;\">${v.title}: Video</h5>
          <a href=\"${v.url}\" target=\"_blank\" rel=\"noopener\" class=\"link\">Open ↗</a>
        </div>
      `).join("");
      return `
        <div class=\"project-block\">
          <h4>${p.name}</h4>
          ${p.description ? `<p style=\"color:#b0b0b0;margin:0 0 10px 0;\">${p.description}</p>` : ''}
          ${docs || ''}
          ${videos || ''}
          ${repos || ''}
        </div>
      `;
    }).join("");
    modalProjects.innerHTML = sectionsHtml;

    // Hide standalone sections when projects exist
    const docsSection = document.getElementById("modal-documents");
    const reposSection = document.getElementById("modal-repos");
    const videosSection = document.getElementById("modal-videos");
    if (docsSection) docsSection.style.display = "none";
    if (reposSection) reposSection.style.display = "none";
    if (videosSection) videosSection.style.display = "none";
  } else if (modalProjects) {
    modalProjects.style.display = "none";
    modalProjects.innerHTML = "";
  }

  // Set documents
  modalDocumentsContent.innerHTML = '';
  if (client.documents && client.documents.length > 0) {
    client.documents.forEach(doc => {
      const docItem = document.createElement('div');
      docItem.className = 'modal-item';
      docItem.innerHTML = `
        <h5>${doc.title}</h5>
        <p>${doc.type === 'pdf' ? 'PDF Document' : 'Web Page'}</p>
        <a href="${doc.url}" target="_blank" rel="noopener" class="link">View Document</a>
      `;
      modalDocumentsContent.appendChild(docItem);
    });
  } else {
    modalDocumentsContent.innerHTML = '<p style="color: #666; font-style: italic;">No documents available</p>';
  }

  // Set repositories
  modalReposContent.innerHTML = '';
  if (client.repos && client.repos.length > 0) {
    client.repos.forEach(repo => {
      const repoItem = document.createElement('div');
      repoItem.className = 'modal-item';
      repoItem.innerHTML = `
        <h5>${repo.title}</h5>
        <p>GitHub Repository</p>
        <a href="${repo.url}" target="_blank" rel="noopener" class="link">View Code</a>
      `;
      modalReposContent.appendChild(repoItem);
    });
  } else {
    modalReposContent.innerHTML = '<p style="color: #666; font-style: italic;">No repositories available</p>';
  }

  // Set videos
  modalVideosContent.innerHTML = '';
  if (client.videos && client.videos.length > 0) {
    client.videos.forEach(video => {
      const videoItem = document.createElement('div');
      videoItem.className = 'modal-item';
      videoItem.innerHTML = `
        <h5>${video.title}</h5>
        <p>Video Content</p>
        <a href="${video.url}" target="_blank" rel="noopener" class="link">Watch Video</a>
      `;
      modalVideosContent.appendChild(videoItem);
    });
    } else {
    modalVideosContent.innerHTML = '<p style="color: #666; font-style: italic;">No videos available</p>';
  }

  // Show modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeClientModal() {
  const modal = document.getElementById("client-modal");
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function setupClientSearch(clients) {
  const input = document.getElementById("client-search");
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase().trim();
    const filtered = clients.filter(c => c.name.toLowerCase().includes(q));
    renderClients(filtered);
  });
}

function renderLogoShowcase(clients) {
  console.log("renderLogoShowcase called with clients:", clients);
  
  const logoTrack = document.getElementById("logo-track");
  console.log("Found logo-track element:", logoTrack);
  
  if (!logoTrack) {
    console.error("logo-track element not found!");
    return;
  }
  
  logoTrack.innerHTML = "";
  
  // Create two sets of logos for seamless scrolling
  const allLogos = [...clients, ...clients];
  
  allLogos.forEach((client, index) => {
    const card = createEl("div", "logo-card");
    
    // Special styling for Hindware (white background)
    if (client.name === "Hindware Limited") {
      card.style.cssText = "background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; min-width: 160px; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);";
    } else {
      card.style.cssText = "background: rgba(7,10,15,0.6); border: 1px solid rgba(148,163,184,0.2); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; cursor: pointer; min-width: 160px; flex-shrink: 0;";
    }
    
    const img = createEl("img");
    
    // Set up error handling for the image
    img.onerror = () => {
      console.error(`Failed to load logo for ${client.name} in showcase, using fallback`);
      const companyName = client.name || "Company";
      const encodedName = encodeURIComponent(companyName);
      img.src = `https://via.placeholder.com/200x200/EF4444/FFFFFF?text=${encodedName}`;
    };
    
    img.onload = () => {
      console.log(`Successfully loaded logo for ${client.name} in showcase:`, img.src);
    };
    
    img.src = logoUrlForClient(client);
    img.alt = `${client.name} logo`;
    img.style.cssText = "max-width: 100%; max-height: 54px; object-fit: contain;";
    
    const label = createEl("div", "name", client.name);
    label.style.cssText = "font-size: 14px; color: #9fb0c0; text-align: center;";
    
    card.appendChild(img);
    card.appendChild(label);
    
    // Add click event to open modal
    card.addEventListener("click", () => openClientModal(client));
    
    logoTrack.appendChild(card);
    console.log(`Added showcase logo card for ${client.name}`);
  });
  
  console.log("Final logo track children count:", logoTrack.children.length);
}

async function init() {
  console.log("init() function called");
  
  const [resume, clients] = await Promise.all([
    loadJson("data/resume.json", defaultResume),
    loadJson("data/clients.json", defaultClients)
  ]);
  
  console.log("Loaded data:", { resume: !!resume, clients: !!clients, clientCount: clients?.length });

  renderResume(resume);
  renderClients(clients);
  renderLogoShowcase(clients);
  setupClientSearch(clients);
  setupMobileMenu();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeClientModal();
});

// Mobile menu functionality
function setupMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
// Ensure initialization after Angular renders as well
window.addEventListener("load", () => {
  // Wait for Angular to render, then initialize
  const maxRetries = 10;
  let retryCount = 0;
  
  function tryInit() {
    console.log(`Attempt ${retryCount + 1} to initialize...`);
    
    // Check if key elements exist
    const about = document.getElementById("about");
    const clients = document.getElementById("clients");
    const logoTrack = document.getElementById("logo-track");
    
    console.log("Elements found:", { about: !!about, clients: !!clients, logoTrack: !!logoTrack });
    
    if (about && clients && logoTrack) {
      console.log("All elements found, initializing...");
      init();
      initStarfield();
    } else if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying in 500ms... (${retryCount}/${maxRetries})`);
      setTimeout(tryInit, 500);
    } else {
      console.error("Failed to initialize after maximum retries");
    }
  }
  
  tryInit();
});

// Add modal event handlers
document.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close-modal')) {
    closeClientModal();
  }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeClientModal();
  }
});

// ---------- Interactive Starfield ----------
function initStarfield() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  const numStars = Math.min(300, Math.floor((width * height) / 8000));
  const stars = Array.from({ length: numStars }, () => createStar(width, height));
  let mouse = { x: width / 2, y: height / 2 };
  // 45-degree drift (up-right)
  const ANGLE = -Math.PI / 4; // -45° in canvas coords (y increases down)
  const BASE_VX = Math.cos(ANGLE);
  const BASE_VY = Math.sin(ANGLE);

  function createStar(w, h) {
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random() * 0.8 + 0.2,
      // per-star tiny jitter
      vx: (Math.random() - 0.5) * 0.03,
      vy: (Math.random() - 0.5) * 0.03
    };
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

  function step() {
    ctx.clearRect(0, 0, width, height);
    // soft parallax glow that follows the mouse
    const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, Math.max(width, height));
    grad.addColorStop(0, "rgba(59,130,246,0.06)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      // base drift along 45° with parallax scaling
      const speedScale = 0.4 + s.z * 1.6;
      const dx = BASE_VX * speedScale + s.vx;
      const dy = BASE_VY * speedScale + s.vy;
      // draw streak (small line opposite motion)
      const trail = 6 * speedScale;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(230,237,243,${0.25 + s.z * 0.35})`;
      ctx.lineWidth = Math.max(0.6, s.z * 1.2);
      ctx.moveTo(s.x - dx * trail, s.y - dy * trail);
      ctx.lineTo(s.x, s.y);
      ctx.stroke();

      s.x += dx;
      s.y += dy;
      // decay jitter
      s.vx *= 0.995; s.vy *= 0.995;

      // wrap diagonally with margin
      const margin = 12;
      if (s.x < -margin) s.x = width + margin;
      if (s.x > width + margin) s.x = -margin;
      if (s.y < -margin) s.y = height + margin;
      if (s.y > height + margin) s.y = -margin;
    }
    requestAnimationFrame(step);
  }
  step();
}

// Main Render Functions
// NOTE: The main renderResume function is defined at line 494 - do not duplicate it here

function renderClients(clients) {
  const clientsGrid = safeGetElement("clients-grid");
  if (!clientsGrid) return;
  
  clientsGrid.innerHTML = "";
  
  clients.forEach(client => {
    const card = document.createElement("div");
    card.className = "logo-card";
    card.style.cursor = "pointer";
    card.onclick = () => openClientModal(client);
    
    card.innerHTML = `
      <img src="${client.logoUrl}" alt="${client.name}" style="width: 100%; height: 80px; object-fit: contain; margin-bottom: 10px;" />
      <h4 style="text-align: center; font-size: 14px; color: var(--sapTextColor); margin: 0;">${client.name}</h4>
    `;
    
    clientsGrid.appendChild(card);
  });
}

function renderContact(resume) {
  const contactItems = safeGetElement("contact-items");
  if (!contactItems) return;
  
  const contacts = [
    { icon: "📧", label: "Email", value: resume.email, url: `mailto:${resume.email}` },
    { icon: "📱", label: "Phone", value: resume.phone, url: `tel:${resume.phone}` },
    { icon: "🌐", label: "Website", value: resume.website, url: resume.website },
    { icon: "📍", label: "Location", value: resume.location }
  ];
  
  contactItems.innerHTML = "";
  
  contacts.forEach(contact => {
    const item = document.createElement("div");
    item.className = "contact-item";
    
    if (contact.url) {
      item.innerHTML = `
        <div class="contact-icon">${contact.icon}</div>
        <div>
          <h3>${contact.label}</h3>
          <a href="${contact.url}" target="_blank" rel="noopener">${contact.value}</a>
        </div>
      `;
    } else {
      item.innerHTML = `
        <div class="contact-icon">${contact.icon}</div>
        <div>
          <h3>${contact.label}</h3>
          <p>${contact.value}</p>
        </div>
      `;
    }
    
    contactItems.appendChild(item);
  });
}

// Utility function for creating links
function safeLink(href, text) {
  const a = document.createElement("a");
  a.href = href;
  a.textContent = text;
  a.target = "_blank";
  a.rel = "noopener";
  return a;
}

// Wait for an element to appear in the DOM (useful for Angular apps)
function waitForElement(elementId, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const element = document.getElementById(elementId);
    if (element) {
      resolve(element);
      return;
    }
    
    const observer = new MutationObserver((mutations, obs) => {
      const element = document.getElementById(elementId);
      if (element) {
        obs.disconnect();
        resolve(element);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    setTimeout(() => {
      observer.disconnect();
      const element = document.getElementById(elementId);
      if (element) {
        resolve(element);
      } else {
        console.warn(`Element ${elementId} not found after ${timeout}ms`);
        resolve(null); // Resolve anyway to continue execution
      }
    }, timeout);
  });
}

// Main initialization - wait for both DOM and Angular to be ready
async function initializePortfolio() {
  console.log('Starting portfolio initialization...');
  
  // Wait for window to be fully loaded
  if (document.readyState !== 'complete') {
    await new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve);
      }
    });
  }
  
  // Wait for Angular app to be initialized - check for app-root content
  let retries = 0;
  const maxRetries = 100; // 10 seconds max wait
  
  while (retries < maxRetries) {
    const appRoot = document.querySelector('app-root');
    // Check if Angular has rendered by looking for content
    if (appRoot) {
      const hasContent = appRoot.children.length > 0 || 
                        appRoot.shadowRoot?.children.length > 0 ||
                        appRoot.innerHTML.trim().length > 0;
      if (hasContent) {
        console.log('Angular app detected, proceeding...');
        break;
      }
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    retries++;
  }
  
  if (retries >= maxRetries) {
    console.warn('Angular app may not be fully loaded, continuing anyway...');
  }
  
  // Additional wait for specific elements
  console.log('Waiting for certifications-grid element...');
  await waitForElement('certifications-grid', 5000);
  
  try {
    console.log('Loading resume data...');
    // Load resume data
    const resumeResponse = await fetch('/data/resume.json');
    if (!resumeResponse.ok) {
      throw new Error(`Failed to load resume.json: ${resumeResponse.status} ${resumeResponse.statusText}`);
    }
    const resume = await resumeResponse.json();
    console.log('Resume data loaded:', resume);
    console.log('Certifications in resume:', resume.certifications);
    console.log('Certifications count:', resume.certifications ? resume.certifications.length : 0);
    if (resume.certifications && resume.certifications.length > 0) {
      console.log('First certification:', JSON.stringify(resume.certifications[0]));
    }
    
    // Check if certifications-grid exists before rendering
    const certGridCheck = document.getElementById("certifications-grid");
    console.log('certifications-grid element exists before renderResume:', !!certGridCheck);
    if (!certGridCheck) {
      console.error('ERROR: certifications-grid element NOT FOUND in DOM!');
      console.log('Available elements with "cert" in id:', Array.from(document.querySelectorAll('[id*="cert"]')).map(el => el.id));
    }
    
    try {
      renderResume(resume);
      console.log('renderResume() completed successfully');
      
      // Verify certifications were rendered
      setTimeout(() => {
        const certGridAfter = document.getElementById("certifications-grid");
        if (certGridAfter) {
          console.log('certifications-grid children count after render:', certGridAfter.children.length);
          console.log('certifications-grid innerHTML length:', certGridAfter.innerHTML.length);
          if (certGridAfter.children.length === 0) {
            console.error('ERROR: No certification cards were rendered!');
          }
        }
      }, 500);
    } catch (error) {
      console.error('ERROR in renderResume:', error);
      console.error('Error stack:', error.stack);
    }
    
    // Load clients data
    console.log('Loading clients data...');
    const clientsResponse = await fetch('/data/clients.json');
    if (!clientsResponse.ok) {
      throw new Error(`Failed to load clients.json: ${clientsResponse.status}`);
    }
    const clients = await clientsResponse.json();
    console.log('Clients data loaded:', clients.length, 'clients');
    renderClients(clients);
    renderLogoShowcase(clients);
    
    // Render contact section
    renderContact(resume);
    
    // Setup mobile menu
    if (typeof setupMobileMenu === 'function') {
      setupMobileMenu();
    }
    
    // Initialize starfield
    if (typeof initStarfield === 'function') {
      initStarfield();
    }
    
    // Setup modal close handlers
    const modal = document.getElementById('client-modal');
    if (modal) {
      const closeButtons = modal.querySelectorAll('[data-close-modal]');
      closeButtons.forEach(btn => {
        btn.addEventListener('click', closeClientModal);
      });
      
      // Close on backdrop click
      const backdrop = modal.querySelector('.modal-backdrop');
      if (backdrop) {
        backdrop.addEventListener('click', closeClientModal);
      }
    }
    
    console.log('✅ Portfolio initialized successfully!');
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // Fallback to default data
    if (typeof defaultResume !== 'undefined') {
      renderResume(defaultResume);
    } else {
      console.error('No default resume data available');
    }
  }
}

// Initialize when everything is ready
// Wait for both DOM and Angular to be ready
(function init() {
  let initialized = false;
  
  function tryInitialize() {
    if (initialized) return;
    
    const appRoot = document.querySelector('app-root');
    const certGrid = document.getElementById('certifications-grid');
    
    // Check if Angular has rendered AND certifications-grid exists
    if (appRoot && certGrid) {
      const hasContent = appRoot.children.length > 0 || appRoot.innerHTML.trim().length > 0;
      if (hasContent) {
        initialized = true;
        console.log('✅ Found certifications-grid, initializing portfolio...');
        // Small delay to ensure everything is ready
        setTimeout(() => {
          initializePortfolio().catch(error => {
            console.error('Failed to initialize portfolio:', error);
          });
        }, 300);
        return true;
      }
    }
    return false;
  }
  
  // Use MutationObserver to detect when Angular renders content
  const observer = new MutationObserver(function(mutations, obs) {
    if (tryInitialize()) {
      obs.disconnect();
    }
  });
  
  // Start observing
  const appRoot = document.querySelector('app-root');
  if (appRoot) {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  // Try immediately if already loaded
  if (document.readyState === 'complete') {
    if (!tryInitialize()) {
      // Keep trying every 500ms for up to 5 seconds
      let attempts = 0;
      const maxAttempts = 10;
      const interval = setInterval(() => {
        attempts++;
        if (tryInitialize() || attempts >= maxAttempts) {
          clearInterval(interval);
          observer.disconnect();
        }
      }, 500);
    }
  } else {
    window.addEventListener('load', function() {
      setTimeout(() => {
        if (!tryInitialize()) {
          // Keep trying every 500ms for up to 5 seconds
          let attempts = 0;
          const maxAttempts = 10;
          const interval = setInterval(() => {
            attempts++;
            if (tryInitialize() || attempts >= maxAttempts) {
              clearInterval(interval);
              observer.disconnect();
            }
          }, 500);
        }
      }, 1000);
    });
  }
  
  // Safety timeout - initialize after 6 seconds regardless
  setTimeout(() => {
    if (!initialized) {
      observer.disconnect();
      console.warn('⚠️ Timeout reached, initializing anyway...');
      initializePortfolio().catch(error => {
        console.error('Failed to initialize portfolio:', error);
      });
    }
  }, 6000);
})();

// Enhanced Scroll Spy with More Debugging
window.addEventListener('load', function() {
  console.log('Page loaded, initializing enhanced scroll spy...');
  
  const navLinks = document.querySelectorAll('.nav a');
  console.log('Found nav links:', navLinks.length);
  
  // Get only sections that have corresponding navigation links
  const navSections = [];
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const sectionId = href.substring(1);
      const section = document.getElementById(sectionId);
      if (section) {
        navSections.push({ id: sectionId, element: section, link: link });
        console.log('Found matching section:', sectionId);
      } else {
        console.warn('No section found for:', sectionId);
      }
    }
  });
  
  console.log('Found matching sections:', navSections.length);
  
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    console.log('Scroll event triggered, position:', scrollPos);
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    let currentSection = null;
    let minDistance = Infinity;
    
    // Find the closest section to current scroll position
    navSections.forEach(({ id, element, link }) => {
      const rect = element.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const sectionBottom = sectionTop + rect.height;
      
      console.log(`Section ${id}: top=${sectionTop}, bottom=${sectionBottom}, height=${rect.height}`);
      
      // Check if we're in this section
      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        currentSection = id;
        console.log(`Currently in section: ${id}`);
      }
      
      // Also check distance for better detection
      const distance = Math.abs(scrollPos - sectionTop);
      if (distance < minDistance) {
        minDistance = distance;
        if (!currentSection) {
          currentSection = id;
        }
      }
    });
    
    // Add active class to the corresponding nav link
    if (currentSection) {
      const activeLink = document.querySelector(`.nav a[href="#${currentSection}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
        console.log('✅ Added active class to:', currentSection, 'Scroll position:', scrollPos);
        console.log('Active link element:', activeLink);
      } else {
        console.warn('❌ No nav link found for section:', currentSection);
      }
    } else {
      console.log('❌ No current section detected');
    }
  }
  
  // Update on scroll with throttling
  let ticking = false;
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateActiveNav);
      ticking = true;
      setTimeout(() => { ticking = false; }, 16);
    }
  }
  
  window.addEventListener('scroll', requestTick);
  
  // Initial update
  setTimeout(updateActiveNav, 100);
  
  console.log('Enhanced scroll spy initialized successfully!');
});

// Initialize footer year
document.addEventListener('DOMContentLoaded', function() {
  const footerYear = document.getElementById('footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
});

