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
  if (resume.email) contact.appendChild(safeLink(`mailto:${resume.email}`, resume.email));
  if (resume.website) contact.appendChild(safeLink(resume.website, resume.website));
  (resume.socials || []).forEach(s => contact.appendChild(safeLink(s.url, s.label)));
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
  const modal = document.getElementById("client-modal");
  modal.setAttribute("aria-hidden", "false");
  document.getElementById("modal-title").textContent = client.name || "Client";
  document.getElementById("modal-logo").src = logoUrlForClient(client);
  const website = document.getElementById("modal-website");
  if (client.website) {
    website.href = client.website;
    website.textContent = new URL(client.website).hostname;
    website.style.display = "inline";
  } else {
    website.removeAttribute("href");
    website.style.display = "none";
  }

  const docs = document.getElementById("modal-documents");
  docs.innerHTML = "";
  const docItems = (client.documents || []).map(d => `<li><a class="link" target="_blank" rel="noopener" href="${d.url}">${d.title || d.url}</a></li>`).join("");
  if (docItems) {
    docs.innerHTML = `<h4>Documents</h4><ul>${docItems}</ul>`;
  }

  const repos = document.getElementById("modal-repos");
  repos.innerHTML = "";
  const repoItems = (client.repos || []).map(r => `<li><a class="link" target="_blank" rel="noopener" href="${r.url}">${r.title || r.url}</a></li>`).join("");
  if (repoItems) {
    repos.innerHTML = `<h4>Repositories</h4><ul>${repoItems}</ul>`;
  }

  const videos = document.getElementById("modal-videos");
  videos.innerHTML = "";
  (client.videos || []).forEach(v => {
    const embed = youtubeToEmbed(v.url);
    if (embed) {
      const title = v.title ? `<div class="muted" style="margin: 6px 0 6px;">${v.title}</div>` : "";
      videos.insertAdjacentHTML("beforeend", `${title}<iframe class="embed" src="${embed}" title="${v.title || client.name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`);
    } else {
      const item = createEl("div");
      const a = safeLink(v.url, v.title || v.url);
      item.appendChild(a);
      videos.appendChild(item);
    }
  });

  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.onclick = () => closeClientModal();
  });
}

function closeClientModal() {
  const modal = document.getElementById("client-modal");
  modal.setAttribute("aria-hidden", "true");
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

async function init() {
  const [resume, clients] = await Promise.all([
    loadJson("data/resume.json", defaultResume),
    loadJson("data/clients.json", defaultClients)
  ]);

  renderResume(resume);
  renderClients(clients);
  setupClientSearch(clients);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeClientModal();
});

document.addEventListener("DOMContentLoaded", init);
// Ensure initialization after Angular renders as well
window.addEventListener("load", () => {
  // If main sections are missing (Angular render may be async), retry once
  if (!document.getElementById("about") || !document.getElementById("clients")) {
    setTimeout(init, 0);
  }
  initStarfield();
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


