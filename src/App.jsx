import { LanguageProvider } from './components/LanguageProvider.jsx';
import { Header } from './components/Header.jsx';
import { HeroSection } from './components/HeroSection.jsx';
import { ComponentCategories } from './components/ComponentCategories.jsx';
import { QuickCalculators } from './components/QuickCalculators.jsx';
import { AdvancedCalculators } from './components/AdvancedCalculators.jsx';
import { Footer } from './components/Footer.jsx';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <ComponentCategories />
          <QuickCalculators />
          <AdvancedCalculators />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
