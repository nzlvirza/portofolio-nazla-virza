import { ref, computed } from 'vue';
import { portfolio } from '../data/portfolio';

const STORAGE_KEY = 'portfolio_lang';

// Default to saved language or 'en'
const initialLang = typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'id' ? 'id' : 'en';

const currentLang = ref(initialLang);

export function useLanguage() {
    const setLang = (lang) => {
        if (lang === 'en' || lang === 'id') {
            currentLang.value = lang;
            if (typeof window !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, lang);
            }
        }
    };

    const toggleLang = () => {
        setLang(currentLang.value === 'en' ? 'id' : 'en');
    };

    // Returns data corresponding to the active language, with fallbacks
    const portfolioData = computed(() => {
        const langData = portfolio[currentLang.value] || portfolio.en;
        return {
            ...portfolio,
            ...langData,
        };
    });

    return {
        currentLang,
        setLang,
        toggleLang,
        portfolioData,
    };
}
