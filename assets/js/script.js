document.addEventListener('DOMContentLoaded', () => {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-observe]'));
  sections.forEach(function (el) {
    el.classList.add('reveal-init');
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
        var lazyImgs = entry.target.querySelectorAll('img[data-src]');
        lazyImgs.forEach(function (img) {
          img.src = img.getAttribute('data-src');
          img.removeAttribute('data-src');
        });
      }
    });
  }, { root: null, rootMargin: '120px', threshold: 0.1 });

  sections.forEach(function (el) { io.observe(el); });

  // Отдельный IO для картинок, если используются за пределами секций
  var imgObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '160px' });

  document.querySelectorAll('img[data-src]').forEach(function (img) {
    imgObserver.observe(img);
  });
})();

// Валидация формы
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;

  function showError(input, state) {
    var err = input.parentElement.querySelector('.form-error');
    if (!err) return;
    if (state) {
      err.classList.remove('hidden');
      input.classList.add('border-red-500', 'focus:ring-red-500');
    } else {
      err.classList.add('hidden');
      input.classList.remove('border-red-500', 'focus:ring-red-500');
    }
  }

  function setStatus(text, isError) {
    var status = document.getElementById('formStatus');
    if (!status) return;
    status.textContent = text;
    if (isError) {
      status.classList.remove('text-green-600');
      status.classList.add('text-red-600');
    } else {
      status.classList.remove('text-red-600');
      status.classList.add('text-green-600');
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('#name');
    var phone = form.querySelector('#phone');
    var message = form.querySelector('#message');
    var submitBtn = form.querySelector('button[type="submit"]');
    var valid = true;

    if (!name.value || name.value.trim().length < 2) { valid = false; showError(name, true); } else { showError(name, false); }
    var phoneRe = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    if (!phone.value || !phoneRe.test(phone.value.trim())) { valid = false; showError(phone, true); } else { showError(phone, false); }
    if (!message.value || message.value.trim().length < 10) { valid = false; showError(message, true); } else { showError(message, false); }

    if (!valid) {
      setStatus('Проверьте поля формы', true);
      return;
    }

    if (typeof window.sendEmailViaEmailJS !== 'function') {
      setStatus('Ошибка: EmailJS не загружен', true);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    setStatus('Отправка сообщения...', false);

    // Отправка через EmailJS
    window.sendEmailViaEmailJS({
      from_name: name.value.trim(),
      from_phone: phone.value.trim(),
      message: message.value.trim()
    }, {
      onSuccess: function () {
        setStatus('Спасибо! Мы свяжемся с вами в ближайшее время.', false);
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
      },
      onError: function (errorMessage) {
        setStatus(errorMessage, true);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
      }
    });
  });

  form.addEventListener('input', function (e) {
    var t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement)) return;
    if (t.id === 'name') showError(t, t.value.trim().length < 2);
    if (t.id === 'phone') showError(t, !/^[\d+()\s-]{6,}$/.test(t.value.trim()));
    if (t.id === 'message') showError(t, t.value.trim().length < 10);
  });
})();

// ========================================
// Hover-эффекты для карточек
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card-hover');

  cards.forEach(card => {
    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });

    // Убираем сброс позиции при уходе - круг просто исчезнет
    card.addEventListener('mouseleave', function () {
      // Не устанавливаем позицию обратно в центр
    });
  });
});

// Маска для телефона
(function () {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    // Убираем 7 или 8 в начале, если они есть
    if (value.startsWith('7') || value.startsWith('8')) {
      value = value.substring(1);
    }

    // Ограничиваем длину (10 цифр)
    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    // Форматируем значение
    let formattedValue = '+7 ';

    if (value.length > 0) {
      formattedValue += '(' + value.substring(0, 3);
    }
    if (value.length > 3) {
      formattedValue += ') ' + value.substring(3, 6);
    }
    if (value.length > 6) {
      formattedValue += '-' + value.substring(6, 8);
    }
    if (value.length > 8) {
      formattedValue += '-' + value.substring(8, 10);
    }

    e.target.value = formattedValue;
  });

  // Разрешаем только цифры и управляющие клавиши
  phoneInput.addEventListener('keydown', function (e) {
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
      e.preventDefault();
    }
  });

  // Обновляем паттерн валидации для соответствия формату
  phoneInput.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');

  // Добавляем подсказку при фокусе
  phoneInput.addEventListener('focus', function () {
    if (!this.value) {
      this.value = '+7 (';
    }
  });
})();


// Управление темой
(function () {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  // Функция для получения текущей темы
  function getTheme() {
    // Проверяем localStorage, затем системную тему, затем по умолчанию светлая
    return localStorage.getItem('theme') || 'light';
  }

  // Функция для установки темы
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Обновляем иконки
    if (theme === 'light') {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  // Функция для переключения темы
  function toggleTheme() {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  // Инициализация темы при загрузке (без дергания)
  function initTheme() {
    // Устанавливаем тему до того, как страница станет видимой
    const savedTheme = getTheme();
    setTheme(savedTheme);

    // Добавляем класс для плавных переходов только после загрузки
    setTimeout(() => {
      document.documentElement.classList.add('theme-transition');
    }, 100);
  }

  // Обработчики событий
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Инициализируем тему
  initTheme();
})();

// Мобильное меню
(function () {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuIcon = document.getElementById('menuIcon');
  const closeIcon = document.getElementById('closeIcon');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (!mobileMenuToggle || !mobileMenu) return;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;

    if (isOpen) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'true');
      mobileMenuToggle.setAttribute('aria-label', 'Закрыть меню');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      mobileMenuToggle.setAttribute('aria-label', 'Открыть меню');
      document.body.style.overflow = '';
    }
  }

  function closeMenu() {
    if (isOpen) {
      toggleMenu();
    }
  }

  // Обработчик клика по кнопке
  mobileMenuToggle.addEventListener('click', toggleMenu);

  // Закрытие меню при клике на ссылку
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Закрытие меню при изменении размера окна
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) {
      closeMenu();
    }
  });

  // Закрытие меню по Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });
})();

// Плавная прокрутка к якорям
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();

// Кнопка "Наверх"
(function () {
  // Создаем кнопку
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scrollToTop';
  scrollToTopBtn.className = 'fixed bottom-24 right-6 z-40 p-2 rounded-lg bg-bright border border-theme hover:bg-btn transition-all duration-300 opacity-0 pointer-events-none';
  scrollToTopBtn.setAttribute('aria-label', 'Прокрутить наверх');
  scrollToTopBtn.innerHTML = '<svg class="w-5 h-5 text-theme" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>';
  document.body.appendChild(scrollToTopBtn);

  // Показываем/скрываем кнопку при прокрутке
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      scrollToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      scrollToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
      scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  // Прокрутка наверх при клике
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();

// Карусель фотографий офиса
(function () {
  const carousel = document.querySelector('.office-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.office-slide');
  const prevBtn = carousel.querySelector('.carousel-prev');
  const nextBtn = carousel.querySelector('.carousel-next');
  const indicators = carousel.querySelectorAll('.indicator');

  let currentSlide = 0;
  let autoPlayInterval;

  function showSlide(index) {
    // Убираем active у всех слайдов и индикаторов
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Добавляем active к текущему
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Каждые 5 секунд
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Обработчики кнопок
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // Обработчики индикаторов
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      showSlide(index);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Пауза при наведении
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // Touch support для мобильных
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
  });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Запуск автопрокрутки
  startAutoPlay();
})();

// FAQ поиск и фильтрация
(function () {
  const searchInput = document.getElementById('faqSearch');
  const filterBtns = document.querySelectorAll('.faq-tab-btn');
  const faqItems = document.querySelectorAll('.faq-item');

  if (!searchInput || !filterBtns.length || !faqItems.length) return;

  let currentCategory = 'all';
  let currentSearch = '';

  // Функция фильтрации
  function filterFAQ() {
    faqItems.forEach(item => {
      const category = item.dataset.category;
      const text = item.textContent.toLowerCase();

      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      const matchesSearch = text.includes(currentSearch.toLowerCase());

      if (matchesCategory && matchesSearch) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Обработчик поиска
  searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value;
    filterFAQ();
  });

  // Обработчик фильтров
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Убираем active у всех кнопок
      filterBtns.forEach(b => b.classList.remove('active'));
      // Добавляем active к текущей
      btn.classList.add('active');

      currentCategory = btn.dataset.category;
      filterFAQ();
    });
  });

  // Инициализация: показываем категорию "general" при загрузке
  currentCategory = 'general';
  filterFAQ();
})();

// Фильтрация услуг на главной странице
(function () {
  const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
  const serviceItems = document.querySelectorAll('.service-item');
  const featuredService = document.getElementById('featured-service');

  if (!serviceTabBtns.length || !serviceItems.length) return;

  let currentCategory = 'military';

  // Функция фильтрации
  function filterServices(category) {
    serviceItems.forEach(item => {
      const itemCategory = item.dataset.category;
      
      if (itemCategory === category) {
        item.classList.remove('hidden');
        // Плавное появление
        item.style.opacity = '0';
        setTimeout(() => {
          item.style.transition = 'opacity 0.3s ease';
          item.style.opacity = '1';
        }, 10);
      } else {
        item.classList.add('hidden');
      }
    });

    // Скрываем featured карточку, если не военный адвокат
    if (featuredService) {
      if (category === 'military') {
        featuredService.style.display = '';
        featuredService.classList.remove('hidden');
      } else {
        featuredService.style.display = 'none';
        featuredService.classList.add('hidden');
      }
    }
  }

  // Обработчик табов
  serviceTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Убираем active у всех кнопок
      serviceTabBtns.forEach(b => b.classList.remove('active'));
      // Добавляем active к текущей
      btn.classList.add('active');

      currentCategory = btn.dataset.category;
      filterServices(currentCategory);
    });
  });

  // Инициализация: показываем военного адвоката при загрузке
  filterServices(currentCategory);
})();