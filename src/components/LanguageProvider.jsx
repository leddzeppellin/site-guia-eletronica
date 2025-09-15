import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const translations = {
  pt: {
    // Navigation
    catalog: 'Catálogo',
    calculators: 'Calculadoras',
    learn: 'Aprender',
    search: 'Busca',
    
    // Hero section
    heroTitle: 'Aprenda sobre',
    heroSubtitle: 'componentes eletrônicos',
    heroDescription: 'Recurso educacional completo para compreender e utilizar componentes eletrônicos. Ideal para estudantes, hobbystas e técnicos.',
    exploreCatalog: 'Explorar Catálogo',
    viewCalculators: 'Ver Calculadoras',
    
    // Stats
    components: 'Componentes',
    tutorials: 'Tutoriais',
    languages: 'Idiomas',
    
    // Categories
    categoriesTitle: 'Categorias de Componentes',
    categoriesDescription: 'Explore nossa coleção organizada de componentes eletrônicos, desde os mais básicos até os mais avançados.',
    
    // Component categories
    resistors: 'Resistores',
    resistorsDesc: 'Componentes que limitam a corrente elétrica',
    capacitors: 'Capacitores',
    capacitorsDesc: 'Armazenam energia elétrica temporariamente',
    leds: 'LEDs',
    ledsDesc: 'Diodos emissores de luz para sinalização',
    transistors: 'Transistores',
    transistorsDesc: 'Amplificam sinais e controlam corrente',
    ics: 'Circuitos Integrados',
    icsDesc: 'Chips com múltiplas funções integradas',
    sensors: 'Sensores',
    sensorsDesc: 'Detectam mudanças no ambiente',
    
    // Calculators
    calculatorsTitle: 'Calculadoras Rápidas',
    calculatorsDescription: 'Ferramentas práticas para seus projetos eletrônicos. Calcule valores rapidamente e com precisão.',
    chooseCalculator: 'Escolha uma calculadora:',
    ledResistorCalc: 'Resistor para LED',
    ledResistorDesc: 'Calcule o resistor necessário para seu LED',
    ohmLawCalc: 'Lei de Ohm',
    ohmLawDesc: 'Calcule tensão, corrente ou resistência',
    voltageDividerCalc: 'Divisor de Tensão',
    voltageDividerDesc: 'Calcule a tensão de saída do divisor',
    
    // LED Calculator
    ledCalculatorTitle: 'Calculadora de Resistor para LED',
    ledCalculatorSubtitle: 'Determine o resistor limitador de corrente',
    supplyVoltage: 'Tensão de Alimentação (V)',
    ledVoltage: 'Tensão do LED (V)',
    desiredCurrent: 'Corrente Desejada (mA)',
    calculate: 'Calcular',
    results: 'Resultados:',
    requiredResistor: 'Resistor necessário:',
    powerDissipated: 'Potência dissipada:',
    commercialValue: 'Valor comercial:',
    circuit: 'Circuito:',
    
    // Common
    explore: 'Explorar',
    active: 'Ativo',
    viewAll: 'Ver Todas as Categorias',
    viewAllCalculators: 'Ver Todas as Calculadoras',
    
    // Difficulty levels
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
    
    // Footer
    footerDescription: 'Plataforma educacional dedicada ao ensino de eletrônica através de um catálogo interativo e didático de componentes eletrônicos.',
    navigation: 'Navegação',
    categories: 'Categorias',
    resources: 'Recursos',
    glossary: 'Glossário',
    faq: 'FAQ',
    downloads: 'Downloads',
    privacy: 'Privacidade',
    terms: 'Termos de Uso',
    educationalNote: '📚 Este é um projeto educacional open-source. Contribuições são bem-vindas!',
    allRightsReserved: 'Todos os direitos reservados.'
  },
  
  en: {
    // Navigation
    catalog: 'Catalog',
    calculators: 'Calculators',
    learn: 'Learn',
    search: 'Search',
    
    // Hero section
    heroTitle: 'Learn about',
    heroSubtitle: 'electronic components',
    heroDescription: 'Complete educational resource to understand and use electronic components. Ideal for students, hobbyists and technicians.',
    exploreCatalog: 'Explore Catalog',
    viewCalculators: 'View Calculators',
    
    // Stats
    components: 'Components',
    tutorials: 'Tutorials',
    languages: 'Languages',
    
    // Categories
    categoriesTitle: 'Component Categories',
    categoriesDescription: 'Explore our organized collection of electronic components, from the most basic to the most advanced.',
    
    // Component categories
    resistors: 'Resistors',
    resistorsDesc: 'Components that limit electrical current',
    capacitors: 'Capacitors',
    capacitorsDesc: 'Store electrical energy temporarily',
    leds: 'LEDs',
    ledsDesc: 'Light-emitting diodes for signaling',
    transistors: 'Transistors',
    transistorsDesc: 'Amplify signals and control current',
    ics: 'Integrated Circuits',
    icsDesc: 'Chips with multiple integrated functions',
    sensors: 'Sensors',
    sensorsDesc: 'Detect changes in the environment',
    
    // Calculators
    calculatorsTitle: 'Quick Calculators',
    calculatorsDescription: 'Practical tools for your electronic projects. Calculate values quickly and accurately.',
    chooseCalculator: 'Choose a calculator:',
    ledResistorCalc: 'LED Resistor',
    ledResistorDesc: 'Calculate the required resistor for your LED',
    ohmLawCalc: 'Ohm\'s Law',
    ohmLawDesc: 'Calculate voltage, current or resistance',
    voltageDividerCalc: 'Voltage Divider',
    voltageDividerDesc: 'Calculate the output voltage of the divider',
    
    // LED Calculator
    ledCalculatorTitle: 'LED Resistor Calculator',
    ledCalculatorSubtitle: 'Determine the current limiting resistor',
    supplyVoltage: 'Supply Voltage (V)',
    ledVoltage: 'LED Voltage (V)',
    desiredCurrent: 'Desired Current (mA)',
    calculate: 'Calculate',
    results: 'Results:',
    requiredResistor: 'Required resistor:',
    powerDissipated: 'Power dissipated:',
    commercialValue: 'Commercial value:',
    circuit: 'Circuit:',
    
    // Common
    explore: 'Explore',
    active: 'Active',
    viewAll: 'View All Categories',
    viewAllCalculators: 'View All Calculators',
    
    // Difficulty levels
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    
    // Footer
    footerDescription: 'Educational platform dedicated to teaching electronics through an interactive and didactic catalog of electronic components.',
    navigation: 'Navigation',
    categories: 'Categories',
    resources: 'Resources',
    glossary: 'Glossary',
    faq: 'FAQ',
    downloads: 'Downloads',
    privacy: 'Privacy',
    terms: 'Terms of Use',
    educationalNote: '📚 This is an open-source educational project. Contributions are welcome!',
    allRightsReserved: 'All rights reserved.'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && (savedLanguage === 'pt' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        setLanguage('en');
      }
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'pt' ? 'en' : 'pt';
    setLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

