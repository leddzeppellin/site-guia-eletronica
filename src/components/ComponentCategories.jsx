import { Button } from '@/components/ui/button.jsx';
import { ArrowRight } from 'lucide-react';

export function ComponentCategories() {
  const categories = [
    {
      id: 'resistors',
      name: 'Resistores',
      description: 'Componentes que limitam a corrente elétrica',
      icon: '🔧',
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      count: '45 componentes'
    },
    {
      id: 'capacitors',
      name: 'Capacitores',
      description: 'Armazenam energia elétrica temporariamente',
      icon: '⚡',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600',
      count: '32 componentes'
    },
    {
      id: 'leds',
      name: 'LEDs',
      description: 'Diodos emissores de luz para sinalização',
      icon: '💡',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100',
      iconColor: 'text-yellow-600',
      count: '28 componentes'
    },
    {
      id: 'transistors',
      name: 'Transistores',
      description: 'Amplificam sinais e controlam corrente',
      icon: '🔌',
      color: 'bg-green-50 border-green-200 hover:bg-green-100',
      iconColor: 'text-green-600',
      count: '38 componentes'
    },
    {
      id: 'ics',
      name: 'Circuitos Integrados',
      description: 'Chips com múltiplas funções integradas',
      icon: '🖥️',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600',
      count: '42 componentes'
    },
    {
      id: 'sensors',
      name: 'Sensores',
      description: 'Detectam mudanças no ambiente',
      icon: '📡',
      color: 'bg-indigo-50 border-indigo-200 hover:bg-indigo-100',
      iconColor: 'text-indigo-600',
      count: '25 componentes'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Categorias de Componentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossa coleção organizada de componentes eletrônicos, 
            desde os mais básicos até os mais avançados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} border-2 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer group`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`text-4xl ${category.iconColor}`}>
                  {category.icon}
                </div>
                <div className="text-sm text-gray-500 font-medium">
                  {category.count}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {category.name}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="group-hover:text-blue-600 p-0 h-auto font-semibold"
                >
                  Explorar
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-gray-500">Ativo</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Ver Todas as Categorias
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

