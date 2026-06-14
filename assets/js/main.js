
        // Navigation mobile
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();

                    // Fermer le menu mobile si ouvert
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                    }

                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Animation au scroll
        function handleScroll() {
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top <= window.innerHeight * 0.85) {
                    el.classList.add('visible');
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', () => {
            handleScroll();
        });

        // Formulaire (maintenant natif via FormSubmit)
        // L'envoi du formulaire est gÃ©rÃ© automatiquement par formsubmit.co

        // (La fonction downloadCV a Ã©tÃ© supprimÃ©e au profit des liens HTML 'download' natifs)

        // Clavier ESC pour fermer menu mobile
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });

        // Filtrage des projets
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });

        // --- GESTION DE LA MODALE PROJETS ---
        const projetsData = {
            'platforme': {
                titre: "Site de transfert Wave",
                medias: [
                    { type: 'image', url: 'assets/img/p1.jpg' },
                    { type: 'image', url: 'assets/img/p2.jpg' },
                    { type: 'image', url: 'assets/img/p3.jpg' },
                    { type: 'image', url: 'assets/img/p4.jpg' },
                    { type: 'image', url: 'assets/img/p5.jpg' },
                    { type: 'image', url: 'assets/img/p6.jpg' }
                ]
            },
            'caddy': {
                titre: "Caddie Intelligent",
                medias: [
                    { type: 'image', url: 'assets/img/project_caddy.png' }
                ]
            },
            'poubelle': {
                titre: "Poubelle Intelligente",
                medias: [
                    { type: 'video', url: 'assets/videos/v1.mp4' },
                    { type: 'video', url: 'assets/videos/v2.mp4' }
                ]
            },
            'energy': {
                titre: "Supervision & Contrôle Énergétique",
                medias: [
                    { type: 'image', url: 'assets/img/project_energy.png' }
                ]
            },
            'raspberry': {
                titre: "Projet Raspberry Pi",
                medias: [
                    { type: 'image', url: 'assets/img/r1.jpg' },
                    { type: 'image', url: 'assets/img/r2.jpg' },
                    { type: 'image', url: 'assets/img/r3.jpg' },
                    { type: 'image', url: 'assets/img/r4.jpg' },
                    { type: 'image', url: 'assets/img/r5.jpg' }
                ]
            },
            'telecom': {
                titre: "Simulation de Réseau Informatique",
                medias: [
                    { type: 'image', url: 'assets/img/sim_1.png' },
                    { type: 'image', url: 'assets/img/sim_2.png' }
                ]
            },
            'gnote': {
                titre: "Gestion d'Étudiant de l'ESI",
                medias: [
                    { type: 'image', url: 'assets/img/project_gnote.png' }
                ]
            },
            'supert': {
                titre: "Application SuperGest",
                medias: [
                    { type: 'image', url: 'assets/img/project_supert.png' }
                ]
            }
        };

        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalGallery = document.getElementById('modalGallery');

        function ouvrirProjet(id) {
            const data = projetsData[id];
            if (!data) return alert("MÃ©dias non disponibles pour ce projet.");

            modalTitle.textContent = data.titre;
            modalGallery.innerHTML = '';

            data.medias.forEach(media => {
                if (media.type === 'image') {
                    const img = document.createElement('img');
                    img.src = media.url;
                    img.className = 'gallery-item';
                    img.alt = 'Image du projet';
                    modalGallery.appendChild(img);
                } else if (media.type === 'video') {
                    const video = document.createElement('video');
                    video.src = media.url;
                    video.className = 'gallery-video';
                    video.controls = true;
                    modalGallery.appendChild(video);
                }
            });

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function fermerProjet() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            modalGallery.innerHTML = ''; // Vide pour stopper les vidÃ©os
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) fermerProjet();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && modal.classList.contains('active')) {
                fermerProjet();
            }
        });

        console.log("%câœ… Portfolio de KOFFI Nâ€™GUESSAN RAOUL chargÃ© avec succÃ¨s !", "color: #3B82F6; font-size: 14px; font-weight: bold");
    

