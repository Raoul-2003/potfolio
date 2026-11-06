(() => {
    "use strict";

    document.documentElement.classList.add("js-ready");

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const languageToggle = document.getElementById("languageToggle");
    const backToTop = document.getElementById("backToTop");
    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalGallery = document.getElementById("modalGallery");
    const projectsGrid = document.getElementById("projectsGrid");
    const projectFilters = document.querySelectorAll(".filter-button");
    const contactForm = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    let currentLanguage = "fr";
    let activeFilter = "all";
    let lastFocusedElement = null;

    const categoryLabels = {
        innovation: {
            fr: "IoT, IA & innovation",
            en: "IoT, AI & innovation"
        },
        web: {
            fr: "Applications web & gestion",
            en: "Web apps & management"
        },
        robotics: {
            fr: "Robotique & simulation",
            en: "Robotics & simulation"
        }
    };

    const projects = [
        {
            id: "smartenergy",
            name: "SmartEnergy",
            category: "innovation",
            description: {
                fr: "Plateforme IoT de supervision énergétique et de suivi de la consommation électrique à l’aide de dispositifs connectés.",
                en: "IoT platform for energy monitoring and electricity-consumption tracking using connected devices."
            },
            status: "complete",
            technologies: ["React.js", "Node.js", "Express", "ESP32"],
            image: "assets/img/project_smartenergy.svg",
            isIllustration: true,
            icon: "fa-bolt"
        },
        {
            id: "geoguard",
            name: "GeoGuard",
            category: "innovation",
            description: {
                fr: "Solution d’analyse de données satellitaires pour détecter les changements et générer des alertes.",
                en: "Satellite-data analysis solution for detecting change and generating alerts."
            },
            status: "progress",
            technologies: [],
            image: "assets/img/project_geoguard.png",
            icon: "fa-satellite"
        },
        {
            id: "ia-imprim",
            name: "IA_Imprim / IntelImprim",
            category: "innovation",
            description: {
                fr: "Application en développement intégrant l’intelligence artificielle pour assister la correction de copies.",
                en: "Application in development using artificial intelligence to assist with grading papers."
            },
            status: "progress",
            technologies: [],
            image: "assets/img/project_ia_imprim.png",
            icon: "fa-brain"
        },
        {
            id: "fleetpro",
            name: "FleetPro — Gestion de flotte",
            category: "web",
            description: {
                fr: "Application de gestion des véhicules, des conducteurs et des missions, avec suivi des opérations et maintenance prévisionnelle.",
                en: "Vehicle-fleet app for managing vehicles, drivers and assignments, with operations tracking and preventive maintenance."
            },
            status: "progress",
            technologies: [],
            image: "assets/img/project_fleetpro.png",
            icon: "fa-truck-fast"
        },
        {
            id: "ourya",
            name: "Boutique-Rose / OURYA",
            category: "web",
            description: {
                fr: "Site e-commerce de vente de vêtements et de montres.",
                en: "E-commerce website for clothing and watches."
            },
            status: "complete",
            technologies: [],
            image: "assets/img/project_ourya.png",
            url: "https://ourya.vercel.app/",
            icon: "fa-bag-shopping"
        },
        {
            id: "bolikro",
            name: "Bolikro Chez Wolf",
            category: "web",
            description: {
                fr: "Site de restaurant présentant l’établissement et son menu.",
                en: "Restaurant website presenting the establishment and its menu."
            },
            status: "complete",
            technologies: [],
            image: "assets/img/project_bolikro.png",
            url: "https://bolikro.vercel.app/",
            icon: "fa-utensils"
        },
        {
            id: "supermarche",
            name: "Supermarché",
            category: "web",
            description: {
                fr: "Application de gestion de supermarché pour les produits, les ventes, les stocks et les clients.",
                en: "Supermarket management application for products, sales, inventory and customers."
            },
            status: "complete",
            technologies: ["PHP", "PostgreSQL", "JavaScript"],
            image: "assets/img/project_supert.png",
            url: "https://supert.page.gd",
            icon: "fa-store"
        },
        {
            id: "simulateur-robot",
            name: "Simulateur de robot",
            category: "robotics",
            description: {
                fr: "Prototype de simulation 2D permettant de visualiser les mouvements d’un bras robotique et d’étudier sa cinématique.",
                en: "2D simulation prototype for visualizing a robotic arm’s movements and studying its kinematics."
            },
            status: "prototype",
            technologies: [],
            image: "assets/img/project_robot_simulator.svg",
            isIllustration: true,
            icon: "fa-robot"
        },
        {
            id: "catalogue-soutarah",
            name: "Catalogue de véhicules Soutarah",
            category: "web",
            description: {
                fr: "Application web de présentation et de consultation d’un catalogue de véhicules.",
                en: "Web application for showcasing and browsing a vehicle catalogue."
            },
            status: "complete",
            technologies: [],
            image: "assets/img/project_soutarah.png",
            url: "https://ceremonie-omega.vercel.app/",
            icon: "fa-car"
        },
        {
            id: "ivoiredomi",
            name: "IvoireDomi",
            category: "web",
            description: {
                fr: "Plateforme en cours de développement pour présenter et rechercher des biens immobiliers.",
                en: "Platform in development for presenting and searching property listings."
            },
            status: "progress",
            technologies: [],
            image: "assets/img/project_ivoiredomi.svg",
            isIllustration: true,
            icon: "fa-house"
        }
    ];

    const statusLabels = {
        complete: {
            fr: "Terminé et fonctionnel",
            en: "Complete and working"
        },
        progress: {
            fr: "En cours de développement",
            en: "In development"
        },
        prototype: {
            fr: "Prototype / démonstration",
            en: "Prototype / demonstration"
        }
    };

    function createElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    }

    function localize(element, translations) {
        element.dataset.fr = translations.fr;
        element.dataset.en = translations.en;
        element.textContent = translations[currentLanguage];
    }

    function getProjectImageAlt(project, language = currentLanguage) {
        if (project.isIllustration) {
            return language === "fr"
                ? `Illustration conceptuelle du projet ${project.name}`
                : `Concept illustration of ${project.name}`;
        }

        return language === "fr"
            ? `Capture du projet ${project.name}`
            : `${project.name} project screenshot`;
    }

    function getProjectImageAction(project, language = currentLanguage) {
        if (project.isIllustration) {
            return language === "fr" ? "Voir l’illustration" : "View illustration";
        }

        return language === "fr" ? "Voir la capture" : "View screenshot";
    }

    function createProjectCard(project) {
        const card = createElement("article", "project-card reveal is-visible");
        card.dataset.category = project.category;

        const imageArea = createElement("div", "project-image");
        if (project.image) {
            const image = document.createElement("img");
            image.src = project.image;
            image.alt = getProjectImageAlt(project);
            image.loading = "lazy";
            image.decoding = "async";
            imageArea.appendChild(image);
        } else {
            const placeholder = createElement("div", "project-image-placeholder");
            placeholder.setAttribute("aria-label", currentLanguage === "fr"
                ? `Capture du projet ${project.name} à ajouter`
                : `Project screenshot for ${project.name} to be added`);
            placeholder.setAttribute("role", "img");
            const icon = createElement("i", `fa-solid ${project.icon}`);
            icon.setAttribute("aria-hidden", "true");
            placeholder.append(
                icon,
                createElement("span", "", currentLanguage === "fr"
                    ? "Capture réelle du projet à ajouter"
                    : "Add a real screenshot of this project")
            );
            imageArea.appendChild(placeholder);
        }

        if (project.isIllustration) {
            const visualLabel = createElement("span", "project-visual-label");
            localize(visualLabel, {
                fr: "Illustration conceptuelle",
                en: "Concept illustration"
            });
            imageArea.appendChild(visualLabel);
        }

        const category = createElement("span", "project-category");
        localize(category, categoryLabels[project.category]);
        imageArea.appendChild(category);

        const body = createElement("div", "project-body");
        const status = createElement("span", `project-status is-${project.status}`);
        localize(status, statusLabels[project.status]);

        const title = createElement("h3", "", project.name);
        const description = createElement("p", "project-description");
        localize(description, project.description);

        body.append(status, title, description);
        if (project.technologies.length > 0) {
            const technologies = createElement("div", "project-tech");
            technologies.setAttribute("aria-label", "Technologies");
            project.technologies.forEach((technology) => {
                technologies.appendChild(createElement("span", "", technology));
            });
            body.appendChild(technologies);
        }

        if (project.url || project.image) {
            const actions = createElement("div", "project-actions");
            if (project.image) {
                const previewButton = createElement("button", "project-link");
                previewButton.type = "button";
                previewButton.dataset.project = project.id;
                previewButton.setAttribute("aria-label", currentLanguage === "fr"
                    ? `${getProjectImageAction(project)} de ${project.name}`
                    : `${getProjectImageAction(project)} of ${project.name}`);
                const previewLabel = createElement("span", "", getProjectImageAction(project));
                const previewIcon = createElement("i", "fa-solid fa-images");
                previewIcon.setAttribute("aria-hidden", "true");
                previewButton.append(previewLabel, previewIcon);
                actions.appendChild(previewButton);
            }
            if (project.url) {
                const projectLink = createElement("a", "project-link");
                projectLink.href = project.url;
                projectLink.target = "_blank";
                projectLink.rel = "noreferrer";
                projectLink.setAttribute("aria-label", currentLanguage === "fr"
                    ? `Découvrir ${project.name} (s’ouvre dans un nouvel onglet)`
                    : `Visit ${project.name} (opens in a new tab)`);
                const linkLabel = createElement("span", "", currentLanguage === "fr" ? "Découvrir le projet" : "Visit project");
                const linkIcon = createElement("i", "fa-solid fa-arrow-up-right-from-square");
                linkIcon.setAttribute("aria-hidden", "true");
                projectLink.append(linkLabel, linkIcon);
                actions.appendChild(projectLink);
            }
            body.appendChild(actions);
        }

        card.append(imageArea, body);
        return card;
    }

    function renderProjects() {
        projectsGrid.replaceChildren(...projects.map(createProjectCard));
        applyProjectFilter(activeFilter);
    }

    function applyProjectFilter(filter) {
        activeFilter = filter;
        projectFilters.forEach((button) => {
            const isActive = button.dataset.filter === filter;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
        });

        projectsGrid.querySelectorAll(".project-card").forEach((card) => {
            card.hidden = filter !== "all" && card.dataset.category !== filter;
        });
    }

    function translatePage(language) {
        currentLanguage = language;
        document.documentElement.lang = language;

        document.querySelectorAll("[data-fr][data-en]").forEach((element) => {
            element.textContent = element.dataset[language];
        });

        document.querySelectorAll("[data-fr-aria-label][data-en-aria-label]").forEach((element) => {
            element.setAttribute("aria-label", element.dataset[`${language}AriaLabel`]);
        });

        document.querySelectorAll("[data-fr-alt][data-en-alt]").forEach((element) => {
            element.alt = element.dataset[`${language}Alt`];
        });

        document.querySelectorAll("[data-fr-placeholder][data-en-placeholder]").forEach((element) => {
            element.setAttribute("placeholder", element.dataset[`${language}Placeholder`]);
        });

        document.querySelectorAll("[data-fr-value][data-en-value]").forEach((element) => {
            element.value = element.dataset[`${language}Value`];
        });

        const isFrench = language === "fr";
        languageToggle.textContent = isFrench ? "EN" : "FR";
        languageToggle.lang = isFrench ? "en" : "fr";
        languageToggle.setAttribute("aria-label", isFrench ? "Switch to English" : "Passer en français");
        languageToggle.title = isFrench ? "Switch to English" : "Passer en français";
        menuToggle.setAttribute("aria-label", getMenuLabel(!mobileMenu.hidden));
        const heroCvLink = document.querySelector(".hero-actions a[href*='CV_KOFFI_NGUESSAN_RAOUL']");
        if (heroCvLink) {
            heroCvLink.href = isFrench
                ? "assets/docs/CV/CV_KOFFI_NGUESSAN_RAOUL_FR.pdf"
                : "assets/docs/CV/CV_KOFFI_NGUESSAN_RAOUL_EN.pdf";
        }
        document.title = isFrench
            ? "KOFFI N'GUESSAN RAOUL | Portfolio"
            : "KOFFI N'GUESSAN RAOUL | Portfolio";
        document.querySelector('meta[name="description"]').content = isFrench
            ? "Portfolio de KOFFI N'GUESSAN RAOUL, étudiant TS EIT 3 à l'INP-HB : développement logiciel, systèmes, réseaux, IoT et intelligence artificielle."
            : "Portfolio of KOFFI N'GUESSAN RAOUL, TS EIT 3 student at INP-HB: software development, systems, networks, IoT and artificial intelligence.";
        document.querySelector('meta[property="og:description"]').content = isFrench
            ? "Étudiant TS EIT 3 à l'INP-HB — développement logiciel, systèmes, réseaux et IoT."
            : "TS EIT 3 student at INP-HB — software development, systems, networks and IoT.";

        projectsGrid.querySelectorAll(".project-card").forEach((card, index) => {
            const project = projects[index];
            const image = card.querySelector(".project-image img");
            if (image) {
                image.alt = getProjectImageAlt(project, language);
            }
            const placeholder = card.querySelector(".project-image-placeholder");
            if (placeholder) {
                const label = isFrench
                    ? `Capture du projet ${project.name} à ajouter`
                    : `Project screenshot for ${project.name} to be added`;
                placeholder.setAttribute("aria-label", label);
                placeholder.querySelector("span").textContent = isFrench
                    ? "Capture réelle du projet à ajouter"
                    : "Add a real screenshot of this project";
            }
            const previewButton = card.querySelector("[data-project]");
            if (previewButton) {
                previewButton.setAttribute("aria-label", isFrench
                    ? `${getProjectImageAction(project, language)} de ${project.name}`
                    : `${getProjectImageAction(project, language)} of ${project.name}`);
                previewButton.querySelector("span").textContent = getProjectImageAction(project, language);
            }
            const projectLink = card.querySelector(".project-actions a");
            if (projectLink) {
                projectLink.setAttribute("aria-label", isFrench
                    ? `Découvrir ${project.name} (s’ouvre dans un nouvel onglet)`
                    : `Visit ${project.name} (opens in a new tab)`);
                projectLink.querySelector("span").textContent = isFrench ? "Découvrir le projet" : "Visit project";
            }
        });

        const modalPreview = modalGallery.querySelector("img");
        if (modalPreview) {
            const project = projects.find((item) => item.id === modalPreview.dataset.project);
            if (project) {
                modalTitle.textContent = project.name;
                modalPreview.alt = getProjectImageAlt(project, language);
            }
        }

        modal.querySelector(".eyebrow").textContent = isFrench ? "Aperçu du projet" : "Project preview";
        if (contactForm.dataset.submitted === "true") {
            submitButton.querySelector("span").textContent = isFrench ? "Envoi en cours…" : "Sending…";
        }
    }

    function updateHeader() {
        header.classList.toggle("is-scrolled", window.scrollY > 25);
        backToTop.classList.toggle("is-visible", window.scrollY > 560);
    }

    function setMenu(open) {
        mobileMenu.hidden = !open;
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", getMenuLabel(open));
        menuToggle.innerHTML = `<i class="fa-solid fa-${open ? "xmark" : "bars"}"></i>`;
    }

    function getMenuLabel(open) {
        return currentLanguage === "fr"
            ? (open ? "Fermer le menu" : "Ouvrir le menu")
            : (open ? "Close menu" : "Open menu");
    }

    function openProject(projectId, trigger) {
        const project = projects.find((item) => item.id === projectId);
        if (!project || !project.image) return;

        lastFocusedElement = trigger || document.activeElement;
        modalTitle.textContent = project.name;
        modalGallery.replaceChildren();

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = getProjectImageAlt(project);
        image.dataset.project = project.id;
        image.loading = "eager";
        modalGallery.appendChild(image);

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        modalClose.focus();
    }

    function closeProject() {
        if (!modal.classList.contains("is-open")) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        modalGallery.replaceChildren();

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    function animateCounter(counter) {
        const target = Number(counter.dataset.counter || 0);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            counter.textContent = String(target);
            return;
        }

        const duration = 900;
        const startedAt = performance.now();

        function tick(now) {
            const progress = Math.min((now - startedAt) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = String(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    renderProjects();
    translatePage(currentLanguage);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    menuToggle.addEventListener("click", () => setMenu(mobileMenu.hidden));
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    languageToggle.addEventListener("click", () => {
        translatePage(currentLanguage === "fr" ? "en" : "fr");
        if (!mobileMenu.hidden) setMenu(true);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    projectsGrid.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const trigger = event.target.closest("[data-project]");
        if (trigger) openProject(trigger.dataset.project, trigger);
    });

    modalClose.addEventListener("click", closeProject);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeProject();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (!mobileMenu.hidden) setMenu(false);
            closeProject();
        }
    });

    projectFilters.forEach((button) => {
        button.addEventListener("click", () => applyProjectFilter(button.dataset.filter));
    });

    const revealElements = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -24px" });
        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    }

    const statsSection = document.querySelector(".stats-section");
    if ("IntersectionObserver" in window) {
        let countersHaveRun = false;
        const statsObserver = new IntersectionObserver((entries, observer) => {
            if (!entries[0].isIntersecting || countersHaveRun) return;
            countersHaveRun = true;
            statsSection.querySelectorAll("[data-counter]").forEach(animateCounter);
            observer.disconnect();
        }, { threshold: 0.45 });
        statsObserver.observe(statsSection);
    } else {
        statsSection.querySelectorAll("[data-counter]").forEach((counter) => {
            counter.textContent = counter.dataset.counter;
        });
    }

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");
    if ("IntersectionObserver" in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
        sections.forEach((section) => navObserver.observe(section));
    }

    contactForm.addEventListener("submit", () => {
        contactForm.dataset.submitted = "true";
        submitButton.disabled = true;
        submitButton.querySelector("span").textContent = currentLanguage === "fr"
            ? "Envoi en cours…"
            : "Sending…";
        submitButton.querySelector("i").className = "fa-solid fa-spinner fa-spin";
    });
})();
