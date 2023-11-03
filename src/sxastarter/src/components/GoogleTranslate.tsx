import React, { useEffect, useState } from 'react';

function GoogleTranslate() {
  const [count, setCount] = useState(0);
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false,
      },
      'google_translate_element'
    );
  };
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, [count]);

  return <div id="google_translate_element"></div>;
}

export default GoogleTranslate;
