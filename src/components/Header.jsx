import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Menu, X, Search, Globe, Moon, Sun } from 'lucide-react';
import { useLanguage } from './LanguageProvider.jsx';
import { useTheme } from './ThemeProvider.jsx';

export function Header({ onLogoClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: t('catalog'), href: '#catalog' },
    { label: t('calculators'), href: '#calculators' },
    { label: t('advancedCalculators'), href: '#advanced-calculators' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            type="button"
            onClick={onLogoClick}
            className="text-left text-xl font-bold text-blue-600 dark:text-blue-400"
          >
            Guia Eletrônica
          </button>

          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" size="sm" className="hidden sm:flex" aria-label={t('search')}>
              <a href="#catalog-results">
                <Search className="h-4 w-4" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? t('lightTheme') : t('darkTheme')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">
                {language === 'pt' ? '🇧🇷 PT' : '🇺🇸 EN'}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="md:hidden"
              aria-label={t('menu')}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 border-t bg-background px-2 pb-3 pt-2 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 border-t">
                <Button asChild variant="ghost" className="w-full justify-start">
                  <a href="#catalog-results" onClick={() => setIsMenuOpen(false)}>
                  <Search className="h-4 w-4 mr-2" />
                  {t('search')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

