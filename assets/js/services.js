// Данные услуг
const servicesData = [
  {
    id: 'military-mortgage',
    title: 'Военная ипотека и НИС',
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
    description: 'Правовая поддержка при прохождении ВВЭ...',
    icon: '<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/>',
    items: [
      'Подготовка документов для прохождения ВВК',
      'Обжалование заключений ВВК в вышестоящих инстанциях',
      'Установление категории годности и связи заболеваний со службой',
      'Сопровождение при независимой медицинской экспертизе',
      'Оформление инвалидности и соответствующих выплат'
    ]
  }
];

// Функция создания featured карточки
function createFeaturedCard(service) {
  return `
    <article class="card-gradient-border p-8">
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

  return `
    <article class="service-card-enhanced p-6">
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

  container.innerHTML = servicesData
    .map(s => s.featured ? createFeaturedCard(s) : createServiceCard(s))
    .join('');
}

// Запуск
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServices);
} else {
  initServices();
}
