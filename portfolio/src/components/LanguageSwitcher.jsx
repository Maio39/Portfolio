import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="flex gap-2 items-center">
            <button
                onClick={() => changeLanguage('it')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${i18n.language === 'it' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
                IT
            </button>
            <span className="text-neutral-600">|</span>
            <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-colors ${i18n.language === 'en' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;
