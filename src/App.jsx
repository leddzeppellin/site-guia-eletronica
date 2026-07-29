import { LanguageProvider } from './components/LanguageProvider.jsx';
import { ThemeProvider } from './components/ThemeProvider.jsx';
import { Header } from './components/Header.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { ComponentCategories } from './components/ComponentCategories.jsx';
import { QuickCalculators } from './components/QuickCalculators.jsx';
import { AdvancedCalculators } from './components/AdvancedCalculators.jsx';
import { ComponentDetail } from './components/ComponentDetail.jsx';
import { Footer } from './components/Footer.jsx';
import { catalogComponents } from './data/components.js';
import { useState } from 'react';
import './App.css';

function App() {
  const [selectedComponent, setSelectedComponent] = useState(null);

  const showCatalog = () => {
    setSelectedComponent(null);
    requestAnimationFrame(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  const showCalculators = () => {
    setSelectedComponent(null);
    requestAnimationFrame(() => {
      document.getElementById('advanced-calculators')?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header onLogoClick={showCatalog} />
          <main>
            {selectedComponent ? (
              <ComponentDetail
                component={selectedComponent}
                onBack={showCatalog}
                onShowCalculators={showCalculators}
              />
            ) : (
              <>
                <HeroSection />
                <ComponentCategories
                  components={catalogComponents}
                  onSelectComponent={setSelectedComponent}
                />
                <QuickCalculators />
                <AdvancedCalculators />
              </>
            )}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
