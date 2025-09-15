import { Button } from '@/components/ui/button.jsx';
import { ArrowRight, BookOpen, Calculator, Search } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Aprenda sobre
                <span className="block text-blue-200">
                  componentes eletrônicos
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Recurso educacional completo para compreender e utilizar componentes eletrônicos. 
                Ideal para estudantes, hobbystas e técnicos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
              >
                Explorar Catálogo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Ver Calculadoras
              </Button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-blue-500">
              <div className="text-center">
                <div className="text-2xl font-bold">200+</div>
                <div className="text-blue-200 text-sm">Componentes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-blue-200 text-sm">Calculadoras</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50+</div>
                <div className="text-blue-200 text-sm">Tutoriais</div>
              </div>
            </div>
          </div>

          {/* Right content - Circuit illustration */}
          <div className="relative">
            <div className="bg-blue-500/20 rounded-2xl p-8 backdrop-blur-sm border border-blue-400/30">
              {/* Simplified circuit board illustration */}
              <div className="relative h-80 w-full">
                {/* Circuit traces */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                  {/* Horizontal traces */}
                  <line x1="20" y1="60" x2="280" y2="60" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  <line x1="20" y1="120" x2="280" y2="120" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  <line x1="20" y1="180" x2="280" y2="180" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  <line x1="20" y1="240" x2="280" y2="240" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  
                  {/* Vertical traces */}
                  <line x1="60" y1="20" x2="60" y2="280" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  <line x1="120" y1="20" x2="120" y2="280" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  <line x1="180" y1="20" x2="180" y2="280" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  <line x1="240" y1="20" x2="240" y2="280" stroke="currentColor" strokeWidth="2" opacity="0.6" />
                  
                  {/* Component representations */}
                  {/* Resistor */}
                  <rect x="110" y="50" width="20" height="20" fill="currentColor" opacity="0.8" rx="2" />
                  
                  {/* Capacitor */}
                  <rect x="170" y="110" width="20" height="20" fill="currentColor" opacity="0.8" rx="2" />
                  
                  {/* IC */}
                  <rect x="110" y="170" width="40" height="20" fill="currentColor" opacity="0.8" rx="2" />
                  
                  {/* LED */}
                  <circle cx="240" cy="180" r="10" fill="currentColor" opacity="0.8" />
                  
                  {/* Connection points */}
                  <circle cx="60" cy="60" r="3" fill="currentColor" />
                  <circle cx="120" cy="120" r="3" fill="currentColor" />
                  <circle cx="180" cy="180" r="3" fill="currentColor" />
                  <circle cx="240" cy="240" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>

            {/* Floating feature cards */}
            <div className="absolute -top-4 -right-4 bg-white text-gray-800 rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Didático</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 bg-white text-gray-800 rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <Calculator className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Interativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

