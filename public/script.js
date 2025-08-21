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
  if (client.logoUrl) return client.logoUrl;
  if (client.domain) return `https://logo.clearbit.com/${client.domain}`;
  return "https://via.placeholder.com/160x54?text=Logo";
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
  if (content !== undefined) el.innerHTML = content;
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

function getCertificationMeta(cert) {
  // Accepts string URL or { url, title }
  const url = typeof cert === "string" ? cert : cert && cert.url ? cert.url : "";
  const title = typeof cert === "object" && cert && cert.title ? cert.title : "";
  let icon = "📜";
  let label = title || url;
  try {
    const u = new URL(url);
    const host = u.hostname;
    if (host.includes("hackerrank.com")) {
      icon = "🟨"; // JS-like badge
      label = title || "JavaScript (HackerRank)";
    } else if (host.includes("credly.com")) {
      icon = "💠"; // SAP/Credly badge style
      label = title || "SAP Certification (Credly)";
    }
  } catch {
    // leave defaults
  }
  return { url, label, icon };
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
  setText("brand-name", resume.name);
  setText("hero-name", resume.name);
  setText("hero-title", resume.title);
  setText("hero-summary", resume.summary);

  const year = new Date().getFullYear();
  document.getElementById("footer-year").textContent = String(year);
  const footer = document.getElementById("footer-text");
  if (footer) {
    footer.textContent = `© ${year} ${resume.name}. ${year}. All rights reserved.`;
  }

  const socials = document.getElementById("social-links");
  socials.innerHTML = "";
  (resume.socials || []).forEach(s => {
    const a = safeLink(s.url, s.icon ? `${s.icon} ${s.label}` : s.label);
    socials.appendChild(a);
  });

  const about = document.getElementById("about-content");
  about.innerHTML = "";
  const aboutLines = [
    resume.summary,
    resume.location ? `📍 ${resume.location}` : null,
    resume.email ? `✉️ <a class="link" href="mailto:${resume.email}">${resume.email}</a>` : null,
    resume.phone ? `📞 ${resume.phone}` : null,
    resume.website ? `🌐 <a class="link" target="_blank" rel="noopener" href="${resume.website}">${resume.website}</a>` : null
  ].filter(Boolean);
  about.innerHTML = aboutLines.map(l => `<p>${l}</p>`).join("");

  const expList = document.getElementById("experience-list");
  expList.innerHTML = "";
  (resume.experience || []).forEach(item => {
    const row = createEl("div", "item card");
    row.innerHTML = `
      <div class="period">${item.period || ""}</div>
      <div>
        <h3 class="title">${item.role || ""}</h3>
        <div class="where">${item.company || ""}${item.location ? ` • ${item.location}` : ""}</div>
        ${item.summary ? `<p class="muted">${item.summary}</p>` : ""}
        ${Array.isArray(item.highlights) && item.highlights.length ? `<ul>` + item.highlights.map(h => `<li>${h}</li>`).join("") + `</ul>` : ""}
      </div>`;
    expList.appendChild(row);
  });

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
    langs.forEach(l => lang.appendChild(createEl("span", "chip", l)));
  }

  const edu = document.getElementById("education-list");
  edu.innerHTML = "";
  (resume.education || []).forEach(e => {
    const row = createEl("div", "item card");
    row.innerHTML = `
      <div class="period">${e.period || ""}</div>
      <div>
        <h3 class="title">${e.degree || ""}</h3>
        <div class="where">${e.school || ""}</div>
      </div>`;
    edu.appendChild(row);
  });

  const certGrid = document.getElementById("certifications-grid");
  if (certGrid) {
    certGrid.innerHTML = "";
    (resume.certifications || []).forEach(c => {
      const meta = getCertificationMeta(c);
      if (!meta.url) return;
      const card = createEl("a", "cert-card");
      card.href = meta.url;
      card.target = "_blank";
      card.rel = "noopener";
      const img = createEl("img");
      if (typeof c === "object" && c && c.imageUrl) {
        img.src = c.imageUrl;
      } else {
        // choose local fallback based on host
        try {
          const h = new URL(meta.url).hostname;
          if (h.includes("hackerrank")) img.src = "/assets/hackerrank.svg";
          else if (h.includes("credly") || h.includes("sap")) img.src = "/assets/sap.svg";
          else img.src = "/assets/sap.svg";
        } catch {
          img.src = "/assets/sap.svg";
        }
      }
      // onerror fallback to local icons
      img.onerror = () => {
        const h = (meta.url || "");
        if (h.includes("hackerrank")) img.src = "/assets/hackerrank.svg";
        else img.src = "/assets/sap.svg";
      };
      img.alt = meta.label;
      const title = createEl("div", "title", meta.label);
      const provider = createEl("div", "provider", meta.url.replace(/^https?:\/\//, "").split("/")[0]);
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(provider);
      certGrid.appendChild(card);
    });
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
    const img = createEl("img");
    img.src = logoUrlForClient(client);
    img.alt = `${client.name} logo`;
    const label = createEl("div", "name", client.name);
    card.appendChild(img);
    card.appendChild(label);
    card.addEventListener("click", () => openClientModal(client));
    grid.appendChild(card);
  });
}

function openClientModal(client) {
  console.log("Opening modal for client:", client); // Debug log
  const modal = document.getElementById("client-modal");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("modal-title").textContent = client.name || "Client";
  document.getElementById("modal-logo").src = logoUrlForClient(client);
  
  // Add company description if available
  const description = document.getElementById("modal-description");
  if (description && client.description) {
    description.textContent = client.description;
    description.style.display = "block";
  } else if (description) {
    description.style.display = "none";
  }
  
  const website = document.getElementById("modal-website");
  if (client.website) {
    website.href = client.website;
    website.textContent = new URL(client.website).hostname;
    website.style.display = "inline";
  } else {
    website.removeAttribute("href");
    website.style.display = "none";
  }

  // Add business divisions if available
  const businesses = document.getElementById("modal-businesses");
  if (businesses && client.businesses && client.businesses.length > 0) {
    const businessItems = client.businesses.map(b => `<li>${b}</li>`).join("");
    businesses.innerHTML = `<h4>Business Divisions</h4><ul>${businessItems}</ul>`;
    businesses.style.display = "block";
  } else if (businesses) {
    businesses.style.display = "none";
  }

  const docs = document.getElementById("modal-documents");
  docs.innerHTML = "";
  if (client.documents && client.documents.length > 0) {
    docs.innerHTML = `<h4>📄 Project Documents & PDFs</h4>`;
    client.documents.forEach(d => {
      const docItem = createEl("div", "doc-item");
      const icon = d.type === "pdf" ? "📄" : "🌐";
      const link = createEl("a", "link doc-link", `${icon} ${d.title}`);
      link.href = d.url;
      link.target = "_blank";
      link.rel = "noopener";
      docItem.appendChild(link);
      docs.appendChild(docItem);
    });
  }

  const repos = document.getElementById("modal-repos");
  repos.innerHTML = "";
  if (client.repos && client.repos.length > 0) {
    repos.innerHTML = `<h4>💻 Git Repositories & Code</h4>`;
    client.repos.forEach(r => {
      const repoItem = createEl("div", "repo-item");
      const link = createEl("a", "link repo-link", `🔗 ${r.title}`);
      link.href = r.url;
      link.target = "_blank";
      link.rel = "noopener";
      repoItem.appendChild(link);
      repos.appendChild(repoItem);
    });
  }

  const videos = document.getElementById("modal-videos");
  videos.innerHTML = "";
  if (client.videos && client.videos.length > 0) {
    videos.innerHTML = `<h4>🎥 App Demos & Videos</h4>`;
    client.videos.forEach(v => {
      const videoItem = createEl("div", "video-item");
      const title = createEl("div", "video-title", v.title);
      videoItem.appendChild(title);
      
      const embed = youtubeToEmbed(v.url);
      if (embed) {
        const iframe = createEl("iframe", "embed");
        iframe.src = embed;
        iframe.title = v.title || client.name;
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("allowfullscreen", "");
        videoItem.appendChild(iframe);
      } else {
        const link = createEl("a", "link video-link", `▶️ Watch Video`);
        link.href = v.url;
        link.target = "_blank";
        link.rel = "noopener";
        videoItem.appendChild(link);
      }
      videos.appendChild(videoItem);
    });
  }

  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.onclick = () => closeClientModal();
  });
}

function closeClientModal() {
  const modal = document.getElementById("client-modal");
  modal.setAttribute("aria-hidden", "true");
  
  // Clear all modal sections
  const description = document.getElementById("modal-description");
  if (description) description.innerHTML = "";
  
  const businesses = document.getElementById("modal-businesses");
  if (businesses) businesses.innerHTML = "";
  
  document.getElementById("modal-documents").innerHTML = "";
  document.getElementById("modal-repos").innerHTML = "";
  document.getElementById("modal-videos").innerHTML = "";
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
  
  const track = document.getElementById("logo-track");
  console.log("Found logo-track element:", track);
  
  if (!track) {
    console.error("logo-track element not found!");
    return;
  }
  
  track.innerHTML = "";
  
  // Create two sets of clients for seamless infinite scrolling
  const clientsForShowcase = [...clients, ...clients];
  console.log("Clients for showcase:", clientsForShowcase);
  
  clientsForShowcase.forEach((client, index) => {
    const item = createEl("div", "logo-item");
    
    const img = createEl("img");
    img.src = logoUrlForClient(client);
    img.alt = `${client.name} logo`;
    
    const name = createEl("div", "company-name", client.name);
    
    item.appendChild(img);
    item.appendChild(name);
    
    // Add click event to open modal
    item.addEventListener("click", () => openClientModal(client));
    
    track.appendChild(item);
    console.log(`Added logo item for ${client.name}`);
  });
  
  console.log("Final track children count:", track.children.length);
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
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeClientModal();
});

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


