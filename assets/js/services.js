// Данные услуг
const servicesData = [
  {
    id: 'military-mortgage',
    title: 'Военная ипотека и НИС',
    category: 'military',
    description: 'Комплексное сопровождение военной ипотеки от А до Я. Помогаем военнослужащим реализовать право на жилье через накопительно-ипотечную систему (НИС). Проверяем договоры, консультируем по выбору недвижимости, защищаем от рисков при досрочном увольнении.',
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />',
    featured: true,
    badge: 'Популярная услуга',
    details: {
      included: [
        'Консультации по программе НИС',
        'Проверка договоров с банками',
        'Анализ рисков при покупке жилья',
        'Защита при досрочном увольнении',
        'Судебные споры с Росвоенипотекой'
      ],
      result: 'Безопасная сделка, защита от мошенничества, сохранение права на жилье при любых обстоятельствах.'
    }
  },
  {
    id: 'contracts',
    title: 'Контракты и увольнение',
    category: 'military',
    description: 'Юридическое сопровождение на всех этапах военной службы...',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" />',
    items: [
      'Анализ условий контракта на соответствие законодательству',
      'Оспаривание незаконных условий контракта',
      'Досрочное расторжение по здоровью или семейным обстоятельствам',
      'Восстановление на службе при неправомерном увольнении',
      'Обжалование приказов об увольнении в суде'
    ]
  },
  {
    id: 'payments',
    title: 'Денежное довольствие и выплаты',
    category: 'military',
    description: 'Взыскание задолженностей по зарплате...',
    icon: '<path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>',
    items: [
      'Взыскание невыплаченных окладов, надбавок и премий',
      'Перерасчет денежного довольствия за предыдущие периоды',
      'Компенсация за задержку выплат и нарушение сроков',
      'Оформление подъемных, суточных и других выплат',
      'Защита прав на индексацию и повышение содержания'
    ]
  },
  {
    id: 'disciplinary',
    title: 'Дисциплинарные взыскания',
    category: 'military',
    description: 'Защита при служебных проверках...',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />',
    items: [
      'Обжалование незаконных дисциплинарных взысканий',
      'Юридическое сопровождение на заседаниях и проверках',
      'Защита при служебных расследованиях',
      'Подача жалоб в прокуратуру и вышестоящие инстанции',
      'Судебная защита при серьезных проступках'
    ]
  },
  {
    id: 'housing',
    title: 'Жилищные вопросы',
    category: 'military',
    description: 'Полное сопровождение жилищных вопросов военнослужащих...',
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />',
    items: [
      'Оформление и получение жилищных субсидий',
      'Предоставление служебного жилья',
      'Включение в списки очередников',
      'Решение споров с наймодателями',
      'Взыскание компенсаций за наем жилья'
    ]
  },
  {
    id: 'insurance',
    title: 'Страховые случаи',
    category: 'military',
    description: 'Помощь при наступлении страховых случаев...',
    icon: '<path d="M9 12l2 2 4-4" /><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.62 1.98" />',
    items: [
      'Оформление страховых требований при травмах',
      'Взыскание страховых выплат',
      'Разрешение споров со страховыми компаниями',
      'Оформление повышенных выплат при рисках службы',
      'Обжалование отказа в страховой выплате'
    ]
  },
  {
    id: 'benefits',
    title: 'Льготы и социальные гарантии',
    category: 'military',
    description: 'Защита прав на льготы и социальное обеспечение...',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />',
    items: [
      'Оформление статуса участника боевых действий и СВО',
      'Получение компенсаций для членов семей',
      'Организация санаторно-курортного лечения',
      'Пенсионное обеспечение и оформление военных пенсий',
      'Льготы по налогам, ЖКХ и другим платежам'
    ]
  },
  {
    id: 'medical',
    title: 'Военно-врачебная экспертиза',
    category: 'military',
    description: 'Правовая поддержка при прохождении ВВЭ...',
    icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>',
    items: [
      'Подготовка документов для прохождения ВВК',
      'Обжалование заключений ВВК в вышестоящих инстанциях',
      'Установление категории годности и связи заболеваний со службой',
      'Сопровождение при независимой медицинской экспертизе',
      'Оформление инвалидности и соответствующих выплат'
    ]
  },
  // Гражданский адвокат
  {
    id: 'civil-family',
    title: 'Семейные споры',
    category: 'civil',
    description: 'Разрешение семейных споров: развод, раздел имущества, алименты, определение места жительства детей.',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />',
    items: [
      'Расторжение брака и раздел имущества',
      'Взыскание алиментов на детей и супруга',
      'Определение места жительства детей',
      'Установление и оспаривание отцовства',
      'Лишение и восстановление родительских прав'
    ]
  },
  {
    id: 'civil-labor',
    title: 'Трудовые споры',
    category: 'civil',
    description: 'Защита прав работников: незаконное увольнение, невыплата зарплаты, восстановление на работе.',
    icon: '<path d="M21 13.255A23.931 23.931 0 0 1 12 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m4 6h.01M5 20h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />',
    items: [
      'Восстановление на работе после незаконного увольнения',
      'Взыскание невыплаченной заработной платы',
      'Компенсация за неиспользованный отпуск',
      'Защита при сокращении штата',
      'Оспаривание дисциплинарных взысканий'
    ]
  },
  {
    id: 'civil-inheritance',
    title: 'Наследственные дела',
    category: 'civil',
    description: 'Оформление наследства, оспаривание завещаний, раздел наследственного имущества.',
    icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />',
    items: [
      'Оформление наследства у нотариуса',
      'Оспаривание завещаний',
      'Признание наследника недостойным',
      'Раздел наследственного имущества',
      'Восстановление срока принятия наследства'
    ]
  },
  {
    id: 'civil-consumer',
    title: 'Защита прав потребителей',
    category: 'civil',
    description: 'Защита прав потребителей: возврат товаров, компенсация ущерба, расторжение договоров.',
    icon: '<path d="M16 11V7a4 4 0 0 0-8 0v4M5 9h14l1 12H4L5 9z" />',
    items: [
      'Возврат некачественного товара',
      'Компенсация морального вреда',
      'Расторжение договоров на невыгодных условиях',
      'Защита от навязанных услуг',
      'Взыскание неустойки и штрафов'
    ]
  },
  // Юрист
  {
    id: 'lawyer-consultation',
    title: 'Юридические консультации',
    category: 'lawyer',
    description: 'Устные и письменные консультации по различным вопросам права.',
    icon: '<path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />',
    items: [
      'Устные консультации по правовым вопросам',
      'Письменные юридические заключения',
      'Анализ документов и договоров',
      'Оценка правовых рисков',
      'Разработка правовой стратегии'
    ]
  },
  {
    id: 'lawyer-documents',
    title: 'Составление документов',
    category: 'lawyer',
    description: 'Подготовка исковых заявлений, жалоб, договоров, претензий и других юридических документов.',
    icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />',
    items: [
      'Исковые заявления в суд',
      'Жалобы в государственные органы',
      'Договоры и соглашения',
      'Претензии и уведомления',
      'Ходатайства и заявления'
    ]
  },
  {
    id: 'lawyer-expertise',
    title: 'Правовая экспертиза',
    category: 'lawyer',
    description: 'Проверка документов на соответствие законодательству, выявление правовых рисков.',
    icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />',
    items: [
      'Проверка договоров на соответствие закону',
      'Выявление правовых рисков в сделках',
      'Анализ судебной практики',
      'Экспертиза нормативных актов',
      'Оценка правовых последствий'
    ]
  },
  {
    id: 'lawyer-settlement',
    title: 'Досудебное урегулирование',
    category: 'lawyer',
    description: 'Медиация, переговоры, претензионная работа для решения споров без суда.',
    icon: '<path d="M17 20h5v-2a3 3 0 0 0-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 0 1 5.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 0 1 9.288 0M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM7 10a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />',
    items: [
      'Проведение переговоров',
      'Медиация и примирение сторон',
      'Претензионная работа',
      'Заключение мировых соглашений',
      'Урегулирование конфликтов'
    ]
  },
  // Риелтор
  {
    id: 'realtor-buy-sell',
    title: 'Покупка и продажа недвижимости',
    category: 'realtor',
    description: 'Полное сопровождение сделок купли-продажи недвижимости: от поиска до регистрации.',
    icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M9 22V12h6v10" />',
    items: [
      'Поиск и подбор недвижимости',
      'Проверка документов и прав собственности',
      'Оценка рыночной стоимости',
      'Подготовка договоров купли-продажи',
      'Сопровождение сделки до регистрации'
    ]
  },
  {
    id: 'realtor-rent',
    title: 'Аренда жилья',
    category: 'realtor',
    description: 'Помощь в аренде и сдаче в аренду жилых и нежилых помещений.',
    icon: '<path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5m-4 0h4" />',
    items: [
      'Поиск арендного жилья',
      'Проверка арендодателя и документов',
      'Составление договоров аренды',
      'Защита прав арендатора',
      'Сопровождение сделок аренды'
    ]
  },
  {
    id: 'realtor-documents',
    title: 'Проверка документов на недвижимость',
    category: 'realtor',
    description: 'Юридическая проверка документов на недвижимость перед сделкой.',
    icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />',
    items: [
      'Проверка права собственности',
      'Выявление обременений и арестов',
      'Проверка кадастровых документов',
      'Анализ технической документации',
      'Выявление рисков при покупке'
    ]
  },
  {
    id: 'realtor-support',
    title: 'Сопровождение сделок',
    category: 'realtor',
    description: 'Полное юридическое сопровождение сделок с недвижимостью.',
    icon: '<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9l2 2 4-4" />',
    items: [
      'Подготовка всех необходимых документов',
      'Сопровождение в Росреестре',
      'Контроль расчетов между сторонами',
      'Решение возникающих проблем',
      'Защита от мошенничества'
    ]
  }
];

// Функция создания featured карточки
function createFeaturedCard(service) {
  const categoryClass = service.category ? `data-category="${service.category}"` : '';
  return `
    <article class="card-gradient-border p-8" ${categoryClass}>
      <div class="flex flex-col md:flex-row items-start gap-6">
        <div class="icon-gradient shrink-0 w-16 h-16">
          <svg width="32" height="32" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
            ${service.icon}
          </svg>
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-3">
            <h2 class="text-2xl font-bold text-gradient">${service.title}</h2>
            ${service.badge ? `<span class="badge-premium">${service.badge}</span>` : ''}
          </div>
          <p class="text-base text-gray-300 leading-relaxed mb-4">${service.description}</p>
          <details class="mt-4">
            <summary class="cursor-pointer text-accent font-semibold hover:text-accent-secondary transition">Подробнее о услуге →</summary>
            <div class="mt-4 grid md:grid-cols-2 gap-4">
              <div>
                <h4 class="font-semibold text-theme mb-2">Что входит:</h4>
                <ul class="space-y-2 text-sm text-gray-300">
                  ${service.details.included.map(item => `
                    <li class="flex items-start gap-2">
                      <span class="text-accent">✓</span>
                      <span>${item}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-theme mb-2">Результат:</h4>
                <p class="text-sm text-gray-300">${service.details.result}</p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </article>
  `;
}

// Функция создания обычной карточки
function createServiceCard(service) {
  const hasDetails = !!service.details;
  const categoryClass = service.category ? `data-category="${service.category}"` : '';

  return `
    <article class="service-card-enhanced p-6" ${categoryClass}>
      <div class="flex items-start gap-4 mb-4">
        <div class="icon-gradient shrink-0">
          <svg width="24" height="24" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
            ${service.icon}
          </svg>
        </div>
        <div class="flex-1">
          <h2 class="text-xl font-bold text-theme mb-2">${service.title}</h2>
          <p class="text-gray-300 mb-4">${service.description}</p>

          <details>
            <summary class="cursor-pointer text-accent text-sm font-semibold hover:text-accent-secondary transition">
              ${hasDetails ? 'Подробнее о услуге' : 'Что включаем'} →
            </summary>

            ${hasDetails ? `
              <div class="mt-4 grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="font-semibold text-theme mb-2">Что входит:</h4>
                  <ul class="space-y-2 text-sm text-gray-300">
                    ${service.details.included.map(item => `
                      <li class="flex items-start gap-2">
                        <span class="text-accent">✓</span>
                        <span>${item}</span>
                      </li>
                    `).join('')}
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-theme mb-2">Результат:</h4>
                  <p class="text-sm text-gray-300">${service.details.result}</p>
                </div>
              </div>
            ` : `
              <ul class="mt-3 space-y-2 text-sm text-gray-300">
                ${service.items.map(item => `
                  <li class="flex items-start gap-2">
                    <span class="text-accent">•</span>
                    <span>${item}</span>
                  </li>
                `).join('')}
              </ul>
            `}
          </details>
        </div>
      </div>
    </article>
  `;
}

// Инициализация услуг
function initServices() {
  const container = document.getElementById('servicesContainer');
  if (!container) return;

  let currentCategory = 'all';

  function renderServices(category = 'all') {
    const filtered = category === 'all' 
      ? servicesData 
      : servicesData.filter(s => {
          if (category === 'military') {
            return !s.category || s.category === 'military';
          }
          return s.category === category;
        });

    container.innerHTML = filtered
      .map(s => s.featured ? createFeaturedCard(s) : createServiceCard(s))
      .join('');
  }

  // Обработчики фильтров
  const filterBtns = document.querySelectorAll('.service-tab-btn[data-category]');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderServices(currentCategory);
    });
  });

  // Инициализация
  renderServices(currentCategory);
}

// Запуск
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServices);
} else {
  initServices();
}
