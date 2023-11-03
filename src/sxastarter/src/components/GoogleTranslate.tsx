import React, { useEffect } from 'react';

function GoogleTranslate(props) {
  const googleTranslateElementInit = () => {
    new google.translate.TranslateElement(
      {
        pageLanguage: props.pageLanguage,
        includedLanguages: props.languageList,
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      'google_translate_element'
    );
  };
  useEffect(() => {
    return () => {
      const addScript = document.createElement('script');
      addScript.setAttribute(
        'src',
        '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      );
      document.body.appendChild(addScript);
      window.googleTranslateElementInit = googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element"></div>;
}

export default GoogleTranslate;
