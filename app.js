/**
 * NODUX NX-7 PHEV - Interactive Script
 * Handles Gallery, Color Picker, Driving Modes, Sticky Nav, and Quote Form
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. GALLERY INTERACTION & LIGHTBOX
  // =========================================================================
  const mainGalleryImg = document.getElementById('mainGalleryImage');
  const galleryCaption = document.getElementById('galleryCaption');
  const thumbBtns = document.querySelectorAll('.thumb-item');
  const prevGalleryBtn = document.getElementById('prevGalleryBtn');
  const nextGalleryBtn = document.getElementById('nextGalleryBtn');
  const expandGalleryBtn = document.getElementById('expandGalleryBtn');
  
  const galleryModal = document.getElementById('galleryModal');
  const modalGalleryImg = document.getElementById('modalGalleryImg');
  const modalGalleryCaption = document.getElementById('modalGalleryCaption');
  const closeGalleryModal = document.getElementById('closeGalleryModal');

  const galleryData = [
    {
      src: "assets/nodux_vehicle_27.jpg",
      caption: "Vista frontal de la NX-7 PHEV mostrando la moderna parrilla delantera y corbatín negro."
    },
    {
      src: "assets/nodux_vehicle_29.jpg",
      caption: "Vista en detalle del volante ergonómico y los controles digitales y multimedia."
    },
    {
      src: "assets/nodux_vehicle_14.jpg",
      caption: "Vista lateral de la NX-7 PHEV abasteciéndose de energía mediante su puerto de carga rápida."
    },
    {
      src: "assets/nodux_vehicle_2.jpg",
      caption: "Vista de los asientos premium de ecocuero con costuras de alta precisión."
    },
    {
      src: "assets/nodux_vehicle_3.jpg",
      caption: "Pantalla táctil LCD Full HD de 15,6 pulgadas con conectividad Apple CarPlay y Android Auto."
    },
    {
      src: "assets/nodux_vehicle_4.jpg",
      caption: "Aros de aleación de aluminio de 18 pulgadas con acabado bitono diamantado."
    }
  ];

  let currentGalleryIndex = 0;

  function updateGallery(index) {
    if (index < 0) index = galleryData.length - 1;
    if (index >= galleryData.length) index = 0;
    currentGalleryIndex = index;

    // Fade out slightly
    mainGalleryImg.style.opacity = '0.3';
    setTimeout(() => {
      mainGalleryImg.src = galleryData[currentGalleryIndex].src;
      galleryCaption.textContent = galleryData[currentGalleryIndex].caption;
      mainGalleryImg.style.opacity = '1';
    }, 150);

    // Update active thumbnail
    thumbBtns.forEach((btn, idx) => {
      if (idx === currentGalleryIndex) {
        btn.classList.add('active');
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        btn.classList.remove('active');
      }
    });
  }

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      updateGallery(idx);
    });
  });

  if (prevGalleryBtn) {
    prevGalleryBtn.addEventListener('click', () => {
      updateGallery(currentGalleryIndex - 1);
    });
  }

  if (nextGalleryBtn) {
    nextGalleryBtn.addEventListener('click', () => {
      updateGallery(currentGalleryIndex + 1);
    });
  }

  // Lightbox Modal
  if (expandGalleryBtn && galleryModal) {
    expandGalleryBtn.addEventListener('click', () => {
      modalGalleryImg.src = galleryData[currentGalleryIndex].src;
      modalGalleryCaption.textContent = galleryData[currentGalleryIndex].caption;
      galleryModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    closeGalleryModal.addEventListener('click', () => {
      galleryModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });

    galleryModal.addEventListener('click', (e) => {
      if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // Keyboard navigation for gallery
  document.addEventListener('keydown', (e) => {
    if (galleryModal && galleryModal.style.display === 'flex') {
      if (e.key === 'Escape') {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    } else {
      if (e.key === 'ArrowLeft') updateGallery(currentGalleryIndex - 1);
      if (e.key === 'ArrowRight') updateGallery(currentGalleryIndex + 1);
    }
  });


  // =========================================================================
  // 2. EXTERIOR COLOR SELECTOR
  // =========================================================================
  const colorCarImage = document.getElementById('colorCarImage');
  const currentColorLabel = document.getElementById('currentColorLabel');
  const currentColorDot = document.getElementById('currentColorDot');
  const currentColorName = document.getElementById('currentColorName');
  const swatchBtns = document.querySelectorAll('.color-swatch-btn');

  swatchBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      swatchBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const colorName = btn.getAttribute('data-color');
      const colorBg = btn.getAttribute('data-bg');
      const colorImg = btn.getAttribute('data-img');

      currentColorName.textContent = colorName;
      currentColorDot.style.background = colorBg;

      colorCarImage.style.opacity = '0.3';
      setTimeout(() => {
        colorCarImage.src = colorImg;
        colorCarImage.alt = `NODUX NX-7 PHEV ${colorName}`;
        colorCarImage.style.opacity = '1';
      }, 150);
    });
  });


  // =========================================================================
  // 3. DRIVING MODES & REGENERATION TABS
  // =========================================================================
  const drivingModes = {
    eco: {
      title: "Modo Eco",
      desc: "Prioriza la eficiencia energética optimizando la entrega eléctrica y reduciendo el consumo de gasolina para maximizar el kilometraje en tráfico urbano."
    },
    standard: {
      title: "Modo Estándar",
      desc: "Equilibrio ideal entre potencia suave, confort de marcha y consumo optimizado. El vehículo gestiona automáticamente cuándo encender el motor de combustión."
    },
    sport: {
      title: "Modo Deportivo",
      desc: "Ofrece una respuesta inmediata del acelerador combinando ambos motores (eléctrico y turbo) para aceleraciones contundentes y adelantamientos dinámicos."
    }
  };

  const modeBtns = document.querySelectorAll('.mode-tab-btn');
  const modeTitle = document.getElementById('modeTitle');
  const modeDesc = document.getElementById('modeDesc');

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const modeKey = btn.getAttribute('data-mode');
      if (drivingModes[modeKey]) {
        modeTitle.textContent = drivingModes[modeKey].title;
        modeDesc.textContent = drivingModes[modeKey].desc;
      }
    });
  });

  const regenLevels = {
    max: {
      title: "Máxima Regeneración (Frenado Activo)",
      desc: "Ideal para el tráfico de Lima y bajadas de montaña. Reduce notablemente el uso del pedal de freno tradicional al desacelerar con fuerza y recargar activamente la batería."
    },
    mid: {
      title: "Regeneración Estándar",
      desc: "Busca el equilibrio óptimo entre desaceleración progresiva y retención confortable sin tirones para los acompañantes."
    },
    min: {
      title: "Mínima Regeneración (Navegación a Vela)",
      desc: "Sensación de planeo libre similar a un auto tradicional a gasolina. Recomendado para autopistas despejadas a velocidad crucero constante."
    }
  };

  const regenBtns = document.querySelectorAll('.regen-tab-btn');
  const regenTitle = document.getElementById('regenTitle');
  const regenDesc = document.getElementById('regenDesc');

  regenBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      regenBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const rKey = btn.getAttribute('data-regen');
      if (regenLevels[rKey]) {
        regenTitle.textContent = regenLevels[rKey].title;
        regenDesc.textContent = regenLevels[rKey].desc;
      }
    });
  });


  // =========================================================================
  // 4. STICKY SUBNAV SCROLL SPY & SMOOTH SCROLL
  // =========================================================================
  const subnavLinks = document.querySelectorAll('.subnav-link');
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateSubnavActive() {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(sec => {
      const sectionHeight = sec.offsetHeight;
      const sectionTop = sec.offsetTop;
      const sectionId = sec.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        subnavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateSubnavActive);


  // =========================================================================
  // 5. COTIZADOR / LEAD FORM SUBMISSION
  // =========================================================================
  const quoteForm = document.getElementById('leadQuoteForm');
  const successBox = document.getElementById('formSuccessMessage');
  const resetFormBtn = document.getElementById('resetFormBtn');

  if (quoteForm && successBox) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = quoteForm.querySelector('.form-submit-btn');
      const originalBtnText = submitBtn.innerHTML;

      // Show loading indicator
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> PROCESANDO COTIZACIÓN...';

      // Simulate API call to GM lead server
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Hide form and show success
        quoteForm.style.display = 'none';
        successBox.style.display = 'block';

        // Scroll to success box smoothly
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1000);
    });

    if (resetFormBtn) {
      resetFormBtn.addEventListener('click', () => {
        quoteForm.reset();
        successBox.style.display = 'none';
        quoteForm.style.display = 'flex';
        quoteForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  // DNI input auto-formatting / numbers only
  const docNumberInput = document.getElementById('docNumber');
  const docTypeSelect = document.getElementById('docType');

  if (docNumberInput && docTypeSelect) {
    docNumberInput.addEventListener('input', (e) => {
      if (docTypeSelect.value === 'DNI') {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 8);
      }
    });

    docTypeSelect.addEventListener('change', () => {
      if (docTypeSelect.value === 'DNI') {
        docNumberInput.placeholder = "8 dígitos para DNI";
        docNumberInput.maxLength = 8;
      } else if (docTypeSelect.value === 'RUC') {
        docNumberInput.placeholder = "11 dígitos para RUC";
        docNumberInput.maxLength = 11;
      } else {
        docNumberInput.placeholder = "N° de documento";
        docNumberInput.maxLength = 15;
      }
    });
  }

  // Phone input formatting
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^\d\s+]/g, '');
    });
  }

  // =========================================================================
  // 6. MOBILE HAMBURGER MENU TOGGLE
  // =========================================================================
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const desktopNav = document.querySelector('.desktop-main-nav');

  if (menuToggleBtn && desktopNav) {
    menuToggleBtn.addEventListener('click', () => {
      const isExpanded = desktopNav.classList.toggle('mobile-open');
      if (isExpanded) {
        desktopNav.style.display = 'block';
        desktopNav.style.position = 'absolute';
        desktopNav.style.top = '100%';
        desktopNav.style.left = '0';
        desktopNav.style.width = '100%';
        desktopNav.style.background = '#15171d';
        desktopNav.style.padding = '20px';
        desktopNav.style.borderBottom = '1px solid #333846';
      } else {
        desktopNav.style.display = '';
      }
    });
  }

  console.log('NODUX NX-7 PHEV website loaded successfully.');
});
