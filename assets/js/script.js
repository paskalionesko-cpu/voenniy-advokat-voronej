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
        onSuccess: function() {
          setStatus('Спасибо! Мы свяжемся с вами в ближайшее время.', false);
          form.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Отправить';
        },
        onError: function(errorMessage) {
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

  // Модальное окно для услуг
  (function () {
    var modal = document.getElementById('serviceModal');
    var modalContent = document.getElementById('modalContent');
    var closeBtn = document.getElementById('closeModal');
    var cards = document.querySelectorAll('.service-card-main');

    if (!modal || !modalContent) {
      console.warn('Модальное окно не найдено');
      return;
    }

    if (cards.length === 0) {
      console.warn('Карточки услуг не найдены');
      return;
    }

    var serviceData = {
      contracts: {
        title: 'Контракты и увольнение',
        description: 'Оспаривание условий, досрочное расторжение, восстановление прав.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"></svg>',
        details: [
          'Обжалование приказов об увольнении',
          'Восстановление на службе',
          'Оформление перевода',
          'Досрочное расторжение контракта',
          'Защита при незаконных действиях командования'
        ]
      },
      disciplinary: {
        title: 'Дисциплинарные взыскания',
        description: 'Жалобы, представительство, защита при разбирательствах.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        details: [
          'Снятие незаконных взысканий',
          'Жалобы в вышестоящие органы',
          'Судебная защита',
          'Представительство в разбирательствах',
          'Обжалование приказов командования'
        ]
      },
      payments: {
        title: 'Денежное довольствие',
        description: 'Задолженности, перерасчёт выплат, компенсации.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8"/><path d="M7 3v5h8"/></svg>',
        details: [
          'Недоплата окладов и надбавок',
          'Компенсация за задержку выплат',
          'Индексация и премии',
          'Перерасчёт за предыдущие периоды',
          'Взыскание задолженностей через суд'
        ]
      },
      benefits: {
        title: 'Льготы и соц. гарантии',
        description: 'Оформление, восстановление, защита прав членов семей.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
        details: [
          'Статус участника СВО/боевых действий',
          'Компенсации и выплаты семьям',
          'Санаторно-курортное лечение',
          'Медицинское обслуживание',
          'Образовательные льготы для детей'
        ]
      },
      insurance: {
        title: 'Страховые случаи',
        description: 'Страховые выплаты, травмы, увечья, гибель.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.62 1.98"/></svg>',
        details: [
          'Оформление страховых требований',
          'Споры со страховщиками',
          'Повышенные выплаты при рисках службы',
          'Страхование жизни и здоровья',
          'Компенсации при травмах и увечьях'
        ]
      },
      housing: {
        title: 'Жилищные вопросы',
        description: 'Субсидии, служебное жильё, очередность, споры.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>',
        details: [
          'Жилищные субсидии',
          'Очередь и распределение',
          'Споры с наймодателями',
          'Приватизация служебного жилья',
          'Восстановление права на жильё'
        ]
      },
      mortgage: {
        title: 'Ипотека для военнослужащих',
        description: 'НСУ, оформление, споры с банками и застройщиками.',
        icon: '<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" class="text-theme"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>',
        details: [
          'Проверка договоров и рисков',
          'Разрешение конфликтов с банком',
          'Судебные споры по НСУ',
          'Оспаривание условий кредита',
          'Защита от незаконных действий застройщиков'
        ]
      }
    };

    function openModal(serviceId) {
      var data = serviceData[serviceId];
      if (!data) return;

      modalContent.innerHTML = '<div class="flex items-start gap-4 mb-6">' +
        '<div class="shrink-0 w-16 h-16 rounded-xl bg-bright border border-theme flex items-center justify-center">' +
        data.icon +
        '</div>' +
        '<div class="flex-1">' +
        '<h2 class="text-2xl font-extrabold text-theme">' + data.title + '</h2>' +
        '<p class="mt-2 text-gray-300">' + data.description + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="space-y-3">' +
        '<h3 class="font-semibold text-theme text-lg">Что мы делаем:</h3>' +
        '<ul class="space-y-2 text-gray-300">' +
        data.details.map(function(item) {
          return '<li class="flex items-start gap-2"><span style="color: var(--accent);" class="mt-1">•</span><span>' + item + '</span></li>';
        }).join('') +
        '</ul>' +
        '</div>';

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        var serviceId = this.getAttribute('data-service');
        openModal(serviceId);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  })();

  document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
      });
      
      // Убираем сброс позиции при уходе - круг просто исчезнет
      card.addEventListener('mouseleave', function() {
        // Не устанавливаем позицию обратно в центр
      });
    });
  });

  // Маска для телефона
(function() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  phoneInput.addEventListener('input', function(e) {
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
  phoneInput.addEventListener('keydown', function(e) {
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
      e.preventDefault();
    }
  });

  // Обновляем паттерн валидации для соответствия формату
  phoneInput.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');
  
  // Добавляем подсказку при фокусе
  phoneInput.addEventListener('focus', function() {
    if (!this.value) {
      this.value = '+7 (';
    }
  });
})();


// Управление темой
(function() {
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