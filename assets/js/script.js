// Установка года в футере
document.addEventListener('DOMContentLoaded', () => {
    var y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();

  // Mobile menu toggle
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  });
  
  // Intersection Observer: lazy show секций + lazy images
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
          // Lazy images внутри секции
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
      var phoneRe = /^[\d+()\s-]{6,}$/;
      if (!phone.value || !phoneRe.test(phone.value.trim())) { valid = false; showError(phone, true); } else { showError(phone, false); }
      if (!message.value || message.value.trim().length < 10) { valid = false; showError(message, true); } else { showError(message, false); }
  
      if (!valid) {
        setStatus('Проверьте поля формы', true);
        return;
      }
  
      // Проверяем наличие функции отправки EmailJS
      if (typeof window.sendEmailViaEmailJS !== 'function') {
        setStatus('Ошибка: EmailJS не загружен', true);
        return;
      }
  
      // Блокируем кнопку и показываем статус отправки
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
  
    // live validation
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
    var cards = document.querySelectorAll('.service-card');

    var serviceData = {
      contracts: {
        title: 'Контракты и увольнение',
        description: 'Оспаривание условий, досрочное расторжение, восстановление прав.',
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>',
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
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l4 8h8l-6 6 2 8-8-4-8 4 2-8-6-6h8l4-8z"/></svg>',
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
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>',
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
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 3.694 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 3.694 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-3.694 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-3.694 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138z"/></svg>',
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
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
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
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 0 0 1 1h3m10-11l2 2m-2-2v10a1 1 0 0 1-1 1h-3m-6 0a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1m-6 0h6"/></svg>',
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
        icon: '<svg width="32" height="32" fill="none" stroke="#f9fafb" stroke-width="2" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 0 0 2-2V9.414a1 1 0 0 0-.293-.707l-5.414-5.414A1 1 0 0 0 12.586 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/></svg>',
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
        '</div>' +
        '<div class="mt-8 flex flex-col sm:flex-row gap-3">' +
        '<a href="#contacts" class="btn-consult" onclick="document.getElementById(\'serviceModal\').classList.remove(\'open\')">Записаться на консультацию</a>' +
        '<a href="tel:+79531190323" class="btn-call"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.59a1 1 0 0 1-.25 1.01l-2.2 2.19Z"/></svg><span>Позвонить</span></a>' +
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