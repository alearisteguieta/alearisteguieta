// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize animations when DOM is ready
document.addEventListener("DOMContentLoaded", () => {

    // Custom Cursor (Optional polish)
    const cursor = document.createElement('div');
    cursor.classList.add('fixed', 'w-4', 'h-4', 'bg-white', 'rounded-full', 'pointer-events-none', 'z-[9999]', 'mix-blend-difference', 'transition-transform', 'duration-75', 'ease-out');
    // Only show custom cursor on non-touch if desired, or just simple integration
    // document.body.appendChild(cursor); 
    // Simple follow logic would go here if implemented

    // Hero Section - Staggered Text Reveal
    const heroTl = gsap.timeline();
    /* .hero-text removed
    heroTl.from(".hero-text", {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    })
    */
    heroTl.from(".hero-sub", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.8");

    // Portfolio Items - Kinetic & Parallax
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    portfolioItems.forEach((item) => {

        // 1. Entry Animation (Fade In Up)
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "power3.out"
        });

        // 2. Parallax Effect (Scroll Speed)
        // We get the speed from the data attribute, default to 1
        const speed = item.getAttribute("data-speed") || 1;

        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 0
            },
            y: (i, target) => {
                // Calculate displacement based on speed. 
                // Example: speed 1.2 moves -100px relative to natural scroll
                return (1 - speed) * 200;
            },
            ease: "none"
        });

        // 3. Kinetic Video Hover Interaction
        const img = item.querySelector("img");
        const video = item.querySelector("video");

        if (video) {
            item.addEventListener("mouseenter", () => {
                // Play video
                video.play().catch(e => console.log("Autoplay prevented:", e));

                // Crossfade: Image Out, Video In
                gsap.to(img, { opacity: 0, duration: 0.3 });
                gsap.to(video, { opacity: 1, duration: 0.3 });
            });

            item.addEventListener("mouseleave", () => {
                // Crossfade: Image In, Video Out
                gsap.to(img, { opacity: 1, duration: 0.3 });
                gsap.to(video, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            });
        }

    });

    // Video Section - Reveal/Expand
    gsap.from(".video-container", {
        scrollTrigger: {
            trigger: ".video-section",
            start: "top 80%",
            end: "top 20%",
            scrub: 1
        },
        scale: 0.9,
        borderRadius: "2rem",
        duration: 1
    });

    // Services Text Reveal
    gsap.utils.toArray(".reveal-text").forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Contact Form Stagger
    gsap.from(".contact-element", {
        scrollTrigger: {
            trigger: ".contact-section",
            start: "top 70%"
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out"
    });

    // Resources Section Stagger
    gsap.from(".resource-card", {
        scrollTrigger: {
            trigger: "#resources",
            start: "top 80%"
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out"
    });

});
