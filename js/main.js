document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  // Animate elements on scroll
  gsap.utils
    .toArray(
      ".service-card, .mv-card, .value-card, .feature-card, .testimonial-card"
    )
    .forEach((item) => {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });

  // Tab functionality
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Show corresponding content
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        document.querySelector(".nav-menu").classList.remove("active");
      }
    });
  });


  // Video fallback
  const video = document.querySelector(".hero-video");
  video.addEventListener("error", function () {
    document.querySelector(".hero").style.background =
      "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)";
  });

  // Modal functionality
  const viewButtons = document.querySelectorAll(".ps-view-details");
  const modals = document.querySelectorAll(".ps-modal");
  const closeButtons = document.querySelectorAll(".ps-close-modal");

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const serviceType = button.getAttribute("data-service");
      document.getElementById(`${serviceType}-modal`).style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".ps-modal").style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Close modal when clicking outside content
  modals.forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    });
  });

  // Close modal with ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      modals.forEach((modal) => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      });
    }
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeMenu = document.querySelector(".close-menu");

  mobileToggle.addEventListener("click", function () {
    mobileNav.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeMenu.addEventListener("click", function () {
    mobileNav.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".mobile-nav a").forEach((link) => {
    link.addEventListener("click", function () {
      mobileNav.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Service modals
  const serviceCards = document.querySelectorAll('.service-card:not(.only-bg)');
  const serviceModals = document.querySelectorAll(".modal");
  const closeModal = document.querySelectorAll(".close-modal");

  serviceCards.forEach((card) => {
    card.querySelector(".view-details").addEventListener("click", function (e) {
      e.preventDefault();
      const serviceType = card.getAttribute("data-service");
      document.getElementById(serviceType + "Modal").style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeModal.forEach((btn) => {
    btn.addEventListener("click", function () {
      serviceModals.forEach((modal) => {
        modal.style.display = "none";
      });
      document.body.style.overflow = "";
    });
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal")) {
      serviceModals.forEach((modal) => {
        modal.style.display = "none";
      });
      document.body.style.overflow = "";
    }
  });

  const features = document.querySelectorAll(".pwc-feature");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  features.forEach((feature) => {
    feature.style.opacity = "0";
    feature.style.transform = "translateY(30px)";
    feature.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(feature);
  });

  const contactForm = document.getElementById('contactForm');
  const loader = document.getElementById('formLoader');
  const alertBox = document.getElementById('formAlert');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alertBox.style.display = 'none';
    loader.style.display = 'block';

    const formData = new FormData(contactForm);

    fetch('mailSubmit.php', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        loader.style.display = 'none';
        alertBox.textContent = data.message;
        alertBox.className = '';
        alertBox.classList.add(data.success ? 'success' : 'error');
        alertBox.style.display = 'block';
        if (data.success) contactForm.reset();
      })
      .catch(() => {
        loader.style.display = 'none';
        alertBox.textContent = "An error occurred. Please try again.";
        alertBox.className = 'error';
        alertBox.style.display = 'block';
      });
  });

  const fillerImagesAll = [
    "https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070",
    "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?q=80&w=2070",
    "https://images.unsplash.com/photo-1605656816944-971cd5c1407f?q=80&w=2070",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1964",
    "https://images.unsplash.com/photo-1551836022-8b2858c9c72b?q=80&w=2070",
    "https://images.unsplash.com/photo-1592924728355-1a3b3f4d1c1c?q=80&w=1935",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
    "https://images.unsplash.com/photo-1487088678257-3a541e6e3922?q=80&w=1974",
    "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1964",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    "https://images.unsplash.com/photo-1559668206-3c1f3a0377a1?q=80&w=2069",
    "https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?q=80&w=2071",
  ];



  const fillerSets = {
    sharedImages: [
      "/panchvati/imgs/others/1.jpg",
      "/panchvati/imgs/others/2.jpg",
      "/panchvati/imgs/others/3.jpg",
    ],

    serviceFillers: [
      { type: "image", url: "/panchvati/imgs/others/4.jpg" },
      { type: "image", url: "/panchvati/imgs/others/5.jpg" },
      // { type: 'video', url: 'https://www.w3schools.com/html/mov_bbb.mp4' }, // Example video kept for variety
      { type: "quote", text: "Delivering Excellence Worldwide" },
      { type: "quote", text: "Your Trust, Our Commitment" },
      {
        type: "textcard",
        icon: "fa-shipping-fast",
        title: "Fast Logistics",
        button: { text: "Know More", url: "#contact" },
      },
      {
        type: "textcard",
        icon: "fa-warehouse",
        title: "Warehouse Solutions",
        button: { text: "Know More", url: "#contact" },
      },
    ],

    pwcFeatureFillers: [
      { type: "image", url: "/panchvati/imgs/others/6.jpg" },
      { type: "image", url: "/panchvati/imgs/others/7.jpg" },
      { type: "image", url: "/panchvati/imgs/others/8.jpg" },
      { type: "quote", text: "Innovation that Moves You Forward" },
      { type: "quote", text: "Seamless Integration of Technology" },
      {
        type: "textcard",
        icon: "fa-cogs",
        title: "Advanced Tech",
        button: { text: "Learn More", url: "#why-us" },
      },
      {
        type: "textcard",
        icon: "fa-robot",
        title: "Automation Ready",
        button: { text: "Get Started", url: "#contact" },
      },
      {
        type: "textcard",
        icon: "fa-balance-scale",
        title: "Ethics First",
        button: { text: "Read Values", url: "#about" },
      },
      {
        type: "textcard",
        icon: "fa-hands-helping",
        title: "Customer Centric",
        button: { text: "Our Promise", url: "#client-testimonial" },
      },
    ],

    paValueFillers: [
      { type: "image", url: "/panchvati/imgs/others/9.jpg" },
      { type: "image", url: "/panchvati/imgs/others/10.jpg" },
      { type: "image", url: "/panchvati/imgs/others/11.jpg" },
      { type: "quote", text: "Integrity at the Core" },
      { type: "quote", text: "Empowering Values Everyday" },
      {
        type: "textcard",
        icon: "fa-globe",
        title: "Global Reach",
        button: { text: "Know More", url: "#about" },
      },
      {
        type: "textcard",
        icon: "fa-users",
        title: "Team Strength",
        button: { text: "Meet Us", url: "#contact" },
      },
    ],
  };

  const gridConfigs = [
    {
      gridClass: ".services-grid",
      itemClass: ".service-card",
      fillerSet: "serviceFillers",
    },
    {
      gridClass: ".pwc-features-container",
      itemClass: ".pwc-feature",
      fillerSet: "pwcFeatureFillers",
    },
    {
      gridClass: ".pa-values-container",
      itemClass: ".pa-value-card",
      fillerSet: "paValueFillers",
    },
  ];

  const fillerPools = {}; // Cache to track unused fillers per set

  function getNextFiller(fillerSetName) {
    if (
      !fillerPools[fillerSetName] ||
      fillerPools[fillerSetName].length === 0
    ) {
      // Clone and shuffle new pool when empty
      fillerPools[fillerSetName] = shuffleArray([...fillerSets[fillerSetName]]);
    }
    return fillerPools[fillerSetName].pop();
  }

  // Fisher-Yates Shuffle for randomness
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  function createFillerElement(fillerData, itemStyle, itemHeight) {
    return;
    const filler = document.createElement("div");
    filler.classList.add("grid-filler");
    filler.style.visibility = "visible";
    filler.style.height = itemHeight + "px";
    filler.style.borderRadius = itemStyle.borderRadius;
    filler.style.boxShadow = itemStyle.boxShadow;
    filler.style.overflow = "hidden";
    filler.style.display = "flex";
    filler.style.alignItems = "center";
    filler.style.justifyContent = "center";
    filler.style.position = "relative";

    filler.classList.add("grid-filler", fillerData.type);

    switch (fillerData.type) {
      case "image":
        filler.style.backgroundImage = `url('${fillerData.url}')`;
        break;

      case "video":
        filler.innerHTML = `<video src="${fillerData.url}" autoplay muted loop playsinline></video>`;
        break;

      case "youtube":
        filler.innerHTML = `<iframe src="${fillerData.url}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        break;

      case "quote":
        filler.innerHTML = `<div>"${fillerData.text}"</div>`;
        break;

      case "textcard":
        filler.innerHTML = `
                        <i class="fas ${fillerData.icon}"></i>
                        <h4>${fillerData.title}</h4>
                        <a href="${fillerData.button.url}">${fillerData.button.text}</a>
                    `;
        break;
    }

    return filler;
  }

  function balanceGrid(gridElement, itemSelector, fillerSetName) {
    const items = gridElement.querySelectorAll(itemSelector);
    const existingFillers = gridElement.querySelectorAll(".grid-filler");
    existingFillers.forEach((filler) => filler.remove()); // Clean existing fillers

    if (items.length === 0) return; // No items, exit safely

    // Dynamically get actual item width including margins
    const firstItem = items[0];
    const firstItemStyle = window.getComputedStyle(firstItem);
    const itemWidth =
      firstItem.offsetWidth +
      parseFloat(firstItemStyle.marginLeft) +
      parseFloat(firstItemStyle.marginRight);

    const gridWidth = gridElement.clientWidth;
    const itemsPerRow = Math.floor(gridWidth / itemWidth);

    if (itemsPerRow <= 0) return; // Prevent division by zero

    const itemsCount = items.length;
    const fillersNeeded =
      (itemsPerRow - (itemsCount % itemsPerRow)) % itemsPerRow;

    const fillerSet = fillerSets[fillerSetName];
    if (!fillerSet) return; // Invalid set provided, exit safely

    // Get the first item in the last row to match its height and style
    const lastRowItems = Array.from(items).slice(itemsPerRow);
    const referenceItem = lastRowItems[0] || firstItem; // fallback to first item if needed
    const itemStyle = window.getComputedStyle(referenceItem);

    for (let i = 0; i < fillersNeeded; i++) {
      const fillerData = getNextFiller(fillerSetName);
      const fillerElement = createFillerElement(
        fillerData,
        itemStyle,
        referenceItem.offsetHeight
      );
      gridElement.appendChild(fillerElement);
    }
  }

  function applyGridBalancing() {
    gridConfigs.forEach((config) => {
      const gridElement = document.querySelector(config.gridClass);
      if (gridElement)
        balanceGrid(gridElement, config.itemClass, config.fillerSet);
    });
  }

  // Initial load
  // window.addEventListener("load", applyGridBalancing);

  // On resize
  // window.addEventListener("resize", applyGridBalancing);

  var swiper = new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
    },
    breakpoints: {
      1024: { slidesPerView: 3 },
      768: { slidesPerView: 2 },
      480: { slidesPerView: 1 },
    },
  });

  // Legal Modal Content
  const legalContents = {
    privacy: {
      title: "Privacy Policy",
      body: `
            <p><strong>Effective Date:</strong> July 1, 2025</p>
            <p>
            Panchvati Flowgistics ("we", "our", "us") is committed to protecting your privacy. 
            We collect basic information such as your name, email, phone, and service requests for communication and service delivery purposes. 
            Your data is not shared with third parties except as required for logistics operations or by law.
            </p>
            <p>
            We use secure systems and do not sell your personal information. By using our site or services, you consent to our privacy policy. 
            For questions or requests regarding your data, contact info@panchvatiflowgistics.com.
            </p>
        `
    },
    terms: {
      title: "Terms of Service",
      body: `
            <p><strong>Last Updated:</strong> July 1, 2025</p>
            <ol>
            <li><b>Use of Site:</b> By accessing this website, you agree to comply with all terms and applicable laws.</li>
            <li><b>Services:</b> All service offerings are subject to separate agreements and availability.</li>
            <li><b>Intellectual Property:</b> Content, branding, and images are the property of Panchvati Flowgistics. Do not copy without permission.</li>
            <li><b>Limitation of Liability:</b> While we strive for accuracy, we are not liable for damages from use of this website or our content.</li>
            <li><b>Changes:</b> Terms may be updated at any time. Continued use signifies acceptance.</li>
            </ol>
        `
    },
    disclaimer: {
      title: "Disclaimer",
      body: `
            <p>
            The information provided on this website is for general informational purposes only and does not constitute professional advice.
            Panchvati Flowgistics disclaims liability for errors, omissions, or outcomes resulting from use of the information.
            Please contact us directly for tailored advice or service quotes.
            </p>
        `
    }
  };
  // Modal functionality
  function openLegalModal(type) {
    document.getElementById('legalModalTitle').innerHTML = legalContents[type].title;
    document.getElementById('legalModalBody').innerHTML = legalContents[type].body;
    document.getElementById('legalModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
     document.getElementById('legalModal').style.display = "block";
  }
  function closeLegalModal() {
    document.getElementById('legalModal').classList.remove('active');
    document.body.style.overflow = '';
  }

  // Handle all .legal-link clicks (works for both footer and modal footer)
  document.querySelectorAll('.legal-link').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      // Use data-type to select which modal content to show
      const type = this.getAttribute('data-type');
      if (type && legalContents[type]) {
        openLegalModal(type);
      }
    });
  });

  // Close modal by clicking the close (X) button
  var closeBtn = document.getElementById('closeLegalModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLegalModal);
  }

  // Close modal by clicking outside the modal-content
  var legalModal = document.getElementById('legalModal');
  if (legalModal) {
    legalModal.addEventListener('click', function (e) {
      // Only close if click is on the background overlay itself, not inside content
      if (e.target === this) closeLegalModal();
    });
  }

  // Optional: Close modal with Esc key
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLegalModal();
  });



});
