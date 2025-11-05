// Конфигурация EmailJS
(function () {
  'use strict';

  var EMAILJS_CONFIG = {
    PUBLIC_KEY: 'sBm3uarHdpSau7Box',
    SERVICE_ID: 'service_ksd0pfo',
    TEMPLATE_ID: 'template_35q42lq',
    TO_EMAIL: 'voenniy-advokat-voronej@yandex.ru'
  };

  function initEmailJS() {
    if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY) {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }

  function isEmailJSConfigured() {
    return EMAILJS_CONFIG.PUBLIC_KEY && 
           EMAILJS_CONFIG.SERVICE_ID && 
           EMAILJS_CONFIG.TEMPLATE_ID;
  }

  window.sendEmailViaEmailJS = function(data, callbacks) {
    if (!isEmailJSConfigured()) {
      const error = 'EmailJS не настроен';
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

    return emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, templateParams)
      .then(function(response) {
        if (callbacks && callbacks.onSuccess) {
          callbacks.onSuccess(response);
        }
        return response;
      }, function(error) {
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

})();