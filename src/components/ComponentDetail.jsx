import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  ArrowLeft, 
  Star, 
  AlertTriangle, 
  Zap, 
  Settings, 
  BookOpen,
  Calculator,
  Heart,
  Share2,
  Download
} from 'lucide-react';

export function ComponentDetail({ component, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data for demonstration
  const mockComponent = {
    id: 'resistor-1k',
    name: 'Resistor 1kΩ',
    category: 'Resistores',
    description: 'Resistor de filme de carbono de 1kΩ com tolerância de ±5%. Ideal para circuitos de propósito geral, limitação de corrente e divisores de tensão.',
    difficulty: 'beginner',
    image: '/api/placeholder/300/200',
    schematic: '/api/placeholder/150/100',
    specifications: {
      'Resistência': '1kΩ ±5%',
      'Potência': '1/4W (0.25W)',
      'Tensão máxima': '250V',
      'Temperatura': '-55°C a +155°C',
      'Material': 'Filme de carbono',
      'Encapsulamento': 'Axial'
    },
    applications: [
      'Limitação de corrente para LEDs',
      'Divisores de tensão',
      'Pull-up e pull-down em circuitos digitais',
      'Filtros RC simples',
      'Circuitos de temporização'
    ],
    contraindications: [
      'Não usar em aplicações de alta potência (>0.25W)',
      'Evitar em ambientes com alta umidade sem proteção',
      'Não adequado para aplicações de precisão (<1% tolerância)',
      'Temperatura de operação limitada a 155°C'
    ],
    relatedComponents: [
      { name: 'Resistor 2.2kΩ', type: 'similar' },
      { name: 'Resistor 470Ω', type: 'similar' },
      { name: 'LED Vermelho 5mm', type: 'complementary' },
      { name: 'Capacitor 100nF', type: 'complementary' }
    ],
    tags: ['básico', 'comum', 'iniciante', 'filme-carbono'],
    availability: 'common',
    price: 'R$ 0,10'
  };

  const comp = component || mockComponent;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return 'Não definido';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'specs', label: 'Especificações', icon: <Settings className="h-4 w-4" /> },
    { id: 'applications', label: 'Aplicações', icon: <Zap className="h-4 w-4" /> },
    { id: 'warnings', label: 'Cuidados', icon: <AlertTriangle className="h-4 w-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar ao Catálogo</span>
        </Button>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite(!isFavorite)}
            className={isFavorite ? 'text-red-500' : 'text-gray-500'}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Component Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Image and basic info */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-gray-500">
                <div className="w-32 h-8 bg-yellow-600 rounded-full mb-2 mx-auto"></div>
                <div className="flex space-x-1 justify-center">
                  <div className="w-3 h-6 bg-red-500"></div>
                  <div className="w-3 h-6 bg-red-500"></div>
                  <div className="w-3 h-6 bg-brown-500"></div>
                  <div className="w-3 h-6 bg-gold-500"></div>
                </div>
                <p className="text-sm mt-2">Resistor 1kΩ</p>
              </div>
            </div>
            <p className="text-sm text-gray-600">Clique para ampliar</p>
          </div>

          {/* Schematic symbol */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Símbolo Esquemático</h3>
            <div className="flex items-center justify-center h-20">
              <svg width="120" height="40" viewBox="0 0 120 40">
                <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="2"/>
                <rect x="30" y="15" width="60" height="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="90" y1="20" x2="110" y2="20" stroke="currentColor" strokeWidth="2"/>
                <text x="60" y="35" textAnchor="middle" className="text-xs">R</text>
              </svg>
            </div>
          </div>
        </div>

        {/* Component info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{comp.name}</h1>
              <Badge className={getDifficultyColor(comp.difficulty)}>
                {getDifficultyText(comp.difficulty)}
              </Badge>
            </div>
            <p className="text-gray-600 mb-4">{comp.category}</p>
            <p className="text-lg text-gray-700 leading-relaxed">{comp.description}</p>
          </div>

          {/* Quick specs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">Resistência</div>
              <div className="text-xl font-bold text-blue-900">1kΩ ±5%</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">Potência</div>
              <div className="text-xl font-bold text-green-900">1/4W</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Disponibilidade</div>
              <div className="text-xl font-bold text-purple-900">Comum</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="text-sm text-orange-600 font-medium">Preço aprox.</div>
              <div className="text-xl font-bold text-orange-900">{comp.price}</div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {comp.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1">
              <Calculator className="mr-2 h-4 w-4" />
              Calculadoras Relacionadas
            </Button>
            <Button variant="outline" className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Ver Tutoriais
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Visão Geral</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {comp.description} Este componente é amplamente utilizado em projetos eletrônicos 
                  devido à sua versatilidade e baixo custo. É um dos componentes mais básicos e 
                  essenciais para qualquer kit de eletrônica.
                </p>
                
                <h3 className="text-lg font-semibold mb-3">Características Principais</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Componente passivo que limita a corrente elétrica</li>
                  <li>Valor fixo de resistência com tolerância especificada</li>
                  <li>Fácil identificação através do código de cores</li>
                  <li>Amplamente disponível e de baixo custo</li>
                  <li>Ideal para aprendizado de eletrônica básica</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Como Identificar</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    Este resistor de 1kΩ pode ser identificado pelas seguintes faixas de cores:
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-1">
                      <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
                      <div className="w-4 h-8 bg-black rounded-sm"></div>
                      <div className="w-4 h-8 bg-red-500 rounded-sm"></div>
                      <div className="w-4 h-8 bg-yellow-500 rounded-sm"></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Marrom (1) - Preto (0) - Vermelho (×100) - Dourado (±5%)</div>
                      <div className="font-semibold">= 1.000Ω = 1kΩ ±5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Especificações Técnicas</h2>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(comp.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium text-gray-900">{key}</td>
                        <td className="px-6 py-4 text-gray-700">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Aplicações Comuns</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {comp.applications.map((application, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <Zap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-900 mb-2">{application}</h3>
                        <p className="text-blue-700 text-sm">
                          Aplicação comum em circuitos eletrônicos básicos e avançados.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Contraindicações e Cuidados</h2>
              <div className="space-y-4">
                {comp.contraindications.map((warning, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="text-red-800">{warning}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="font-semibold text-yellow-900 mb-3">Dicas de Segurança</h3>
                <ul className="list-disc list-inside space-y-2 text-yellow-800">
                  <li>Sempre verifique a potência antes de usar em circuitos</li>
                  <li>Use um multímetro para confirmar o valor antes da instalação</li>
                  <li>Mantenha em local seco para evitar oxidação dos terminais</li>
                  <li>Não force a inserção em protoboards para evitar danos</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related components */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Componentes Relacionados</h3>
            <div className="space-y-3">
              {comp.relatedComponents.map((related, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{related.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {related.type === 'similar' ? 'Similar' : 'Complementar'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Quick calculator */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-4">Calculadora Rápida</h3>
            <p className="text-blue-700 text-sm mb-4">
              Calcule a corrente que passará por este resistor:
            </p>
            <div className="space-y-3">
              <input
                type="number"
                placeholder="Tensão (V)"
                className="w-full px-3 py-2 border border-blue-300 rounded-lg text-sm"
              />
              <Button size="sm" className="w-full">
                <Calculator className="mr-2 h-4 w-4" />
                Calcular Corrente
              </Button>
            </div>
          </div>

          {/* Download resources */}
          <div className="bg-gray-50 border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Recursos para Download</h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Datasheet PDF
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Símbolo CAD
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Download className="mr-2 h-4 w-4" />
                Modelo 3D
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

