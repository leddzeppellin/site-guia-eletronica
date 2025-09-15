import { Github, Mail, BookOpen, Calculator, Search, Globe } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Navegação',
      links: [
        { name: 'Catálogo', href: '#catalog', icon: <BookOpen className="h-4 w-4" /> },
        { name: 'Calculadoras', href: '#calculators', icon: <Calculator className="h-4 w-4" /> },
        { name: 'Busca', href: '#search', icon: <Search className="h-4 w-4" /> },
        { name: 'Sobre', href: '#about', icon: <Globe className="h-4 w-4" /> }
      ]
    },
    {
      title: 'Categorias',
      links: [
        { name: 'Resistores', href: '#resistors' },
        { name: 'Capacitores', href: '#capacitors' },
        { name: 'LEDs', href: '#leds' },
        { name: 'Transistores', href: '#transistors' }
      ]
    },
    {
      title: 'Recursos',
      links: [
        { name: 'Tutoriais', href: '#tutorials' },
        { name: 'Glossário', href: '#glossary' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Downloads', href: '#downloads' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                ComponentesEDU
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Plataforma educacional dedicada ao ensino de eletrônica através 
                de um catálogo interativo e didático de componentes eletrônicos.
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Navigation sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2"
                    >
                      {link.icon && <span>{link.icon}</span>}
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">200+</div>
              <div className="text-gray-400 text-sm">Componentes</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">15+</div>
              <div className="text-gray-400 text-sm">Calculadoras</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">50+</div>
              <div className="text-gray-400 text-sm">Tutoriais</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">2</div>
              <div className="text-gray-400 text-sm">Idiomas</div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ComponentesEDU. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition-colors">
                Privacidade
              </a>
              <a href="#terms" className="text-gray-400 hover:text-blue-400 transition-colors">
                Termos de Uso
              </a>
              <div className="flex items-center space-x-2 text-gray-400">
                <Globe className="h-4 w-4" />
                <span>🇧🇷 Português | 🇺🇸 English</span>
              </div>
            </div>
          </div>
        </div>

        {/* Educational note */}
        <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/30">
          <p className="text-blue-200 text-sm text-center">
            📚 Este é um projeto educacional open-source. Contribuições são bem-vindas!
          </p>
        </div>
      </div>
    </footer>
  );
}

