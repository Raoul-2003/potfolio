(() => {
    "use strict";

    document.documentElement.classList.add("js-ready");

    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const backToTop = document.getElementById("backToTop");
    const modal = document.getElementById("projectModal");
    const modalClose = document.getElementById("modalClose");
    const modalTitle = document.getElementById("modalTitle");
    const modalGallery = document.getElementById("modalGallery");
    let lastFocusedElement = null;

    const projectMedia = {
        platforme: {
            title: "Site de transfert Wave",
            media: [
                { type: "image", url: "assets/img/p1.jpg" },
                { type: "image", url: "assets/img/p2.jpg" },
                { type: "image", url: "assets/img/p3.jpg" },
                { type: "image", url: "assets/img/p4.jpg" },
                { type: "image", url: "assets/img/p5.jpg" },
                { type: "image", url: "assets/img/p6.jpg" }
            ]
        },
        caddy: {
            title: "Caddie intelligent",
            media: [{ type: "image", url: "assets/img/project_caddy.png" }]
        },
        poubelle: {
            title: "Poubelle intelligente",
            media: [
                { type: "video", url: "assets/videos/v1.mp4" },
                { type: "video", url: "assets/videos/v2.mp4" }
            ]
        },
        energy: {
            title: "Supervision & contrôle énergétique",
            media: [{ type: "image", url: "assets/img/project_energy.png" }]
        },
        raspberry: {
            title: "Projet Raspberry Pi",
            media: [
                { type: "image", url: "assets/img/r1.jpg" },
                { type: "image", url: "assets/img/r2.jpg" },
                { type: "image", url: "assets/img/r3.jpg" },
                { type: "image", url: "assets/img/r4.jpg" },
                { type: "image", url: "assets/img/r5.jpg" }
            ]
        },
        telecom: {
            title: "Simulation de réseau informatique",
            media: [
                { type: "image", url: "assets/img/sim_1.png" },
                { type: "image", url: "assets/img/sim_2.png" }
            ]
        },
        gnote: {
            title: "Gestion d'étudiant de l'ESI",
            media: [{ type: "image", url: "assets/img/project_gnote.png" }]
        },
        supert: {
            title: "Application SuperGest",
            media: [{ type: "image", url: "assets/img/project_supert.png" }]
        }
    };

    function updateHeader() {
        const pastHero = window.scrollY > 25;
        header.classList.toggle("is-scrolled", pastHero);
        backToTop.classList.toggle("is-visible", window.scrollY > 560);
    }

    function setMenu(open) {
        mobileMenu.hidden = !open;
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
        menuToggle.innerHTML = `<i class="fa-solid fa-${open ? "xmark" : "bars"}"></i>`;
    }

    function openProject(projectId, trigger) {
        const project = projectMedia[projectId];
        if (!project) return;

        lastFocusedElement = trigger || document.activeElement;
        modalTitle.textContent = project.title;
        modalGallery.replaceChildren();

        project.media.forEach((item, index) => {
            if (item.type === "image") {
                const image = document.createElement("img");
                image.src = item.url;
                image.alt = `${project.title} — aperçu ${index + 1}`;
                image.loading = "lazy";
                modalGallery.appendChild(image);
                return;
            }

            const video = document.createElement("video");
            video.src = item.url;
            video.controls = true;
            video.preload = "metadata";
            video.setAttribute("aria-label", `${project.title} — vidéo ${index + 1}`);
            modalGallery.appendChild(video);
        });

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
        modalGallery.querySelectorAll("video").forEach((video) => video.pause());
        modalGallery.replaceChildren();

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    function animateCounter(counter) {
        const target = Number(counter.dataset.counter || 0);
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

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    menuToggle.addEventListener("click", () => setMenu(mobileMenu.hidden));
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenu(false));
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.querySelectorAll("[data-project]").forEach((button) => {
        button.addEventListener("click", () => openProject(button.dataset.project, button));
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

    const filterButtons = document.querySelectorAll(".filter-button");
    const projectCards = document.querySelectorAll(".project-card");
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
            projectCards.forEach((card) => {
                card.hidden = filter !== "all" && card.dataset.category !== filter;
            });
        });
    });

    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px" });
    revealElements.forEach((element) => revealObserver.observe(element));

    const statsSection = document.querySelector(".stats-section");
    let countersHaveRun = false;
    const statsObserver = new IntersectionObserver((entries, observer) => {
        if (!entries[0].isIntersecting || countersHaveRun) return;
        countersHaveRun = true;
        statsSection.querySelectorAll("[data-counter]").forEach(animateCounter);
        observer.disconnect();
    }, { threshold: 0.45 });
    statsObserver.observe(statsSection);

    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".desktop-nav a");
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => {
                link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));

    const contactForm = document.getElementById("contactForm");
    const submitButton = document.getElementById("submitButton");
    contactForm.addEventListener("submit", () => {
        submitButton.disabled = true;
        submitButton.innerHTML = "<span>Envoi en cours…</span><i class=\"fa-solid fa-spinner fa-spin\"></i>";
    });
})();
