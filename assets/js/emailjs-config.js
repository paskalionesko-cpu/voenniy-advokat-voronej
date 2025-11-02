// Конфигурация EmailJS
(function () {
  'use strict';

  // Конфигурация EmailJS - ВАШИ РЕАЛЬНЫЕ ДАННЫЕ
  var EMAILJS_CONFIG = {
    PUBLIC_KEY: 'Z5OihQQFa1QwaKgwi',
    SERVICE_ID: 'service_xiwhbub',
    TEMPLATE_ID: 'template_hcyxmyz',
    TO_EMAIL: 'ba.batya2018@yandex.ru'
  };

  // УДАЛИТЕ ВСЮ ПРОВЕРКУ НА ДЕМО-ЗНАЧЕНИЯ - ЗАМЕНИТЕ НА ПРОСТУЮ ПРОВЕРКУ
  function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('EmailJS инициализирован');
    }
  }

  // Простая проверка конфигурации
  function isEmailJSConfigured() {
    return EMAILJS_CONFIG.PUBLIC_KEY && 
           EMAILJS_CONFIG.SERVICE_ID && 
           EMAILJS_CONFIG.TEMPLATE_ID;
  }

  // Остальной код без изменений...
  window.sendEmailViaEmailJS = function(data, callbacks) {
    if (!isEmailJSConfigured()) {
      const error = 'EmailJS не настроен';
      console.error(error);
      if (callbacks && callbacks.onError) {
        callbacks.onError(error);
      }
      return Promise.reject(new Error(error));
    }

    var templateParams = {
      from_name: data.from_name || '',
      from_phone: data.from_phone || '',
      message: data.message || '',
      to_email: EMAILJS_CONFIG.TO_EMAIL,
      date: new Date().toLocaleString('ru-RU')
    };

    console.log('Отправка письма...');
    return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
      .then(function(response) {
        console.log('Успешно отправлено!', response);
        if (callbacks && callbacks.onSuccess) {
          callbacks.onSuccess(response);
        }
        return response;
      }, function(error) {
        console.error('Ошибка EmailJS:', error);
        if (callbacks && callbacks.onError) {
          callbacks.onError('Ошибка отправки: ' + error.text);
        }
        return Promise.reject(error);
      });
  };

  window.isEmailJSConfigured = isEmailJSConfigured;

  // Инициализация
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmailJS);
  } else {
    initEmailJS();
  }
  setTimeout(initEmailJS, 100);

  console.log('EmailJS настроен:', isEmailJSConfigured());
})();