import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Calculator, Zap, Settings, ArrowRight } from 'lucide-react';

export function QuickCalculators() {
  const [activeCalculator, setActiveCalculator] = useState('led');
  const [ledInputs, setLedInputs] = useState({
    supplyVoltage: '',
    ledVoltage: '',
    current: ''
  });
  const [result, setResult] = useState(null);

  const calculators = [
    {
      id: 'led',
      name: 'Resistor para LED',
      description: 'Calcule o resistor necessário para seu LED',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'ohm',
      name: 'Lei de Ohm',
      description: 'Calcule tensão, corrente ou resistência',
      icon: <Calculator className="h-5 w-5" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'divider',
      name: 'Divisor de Tensão',
      description: 'Calcule a tensão de saída do divisor',
      icon: <Settings className="h-5 w-5" />,
      color: 'bg-green-50 border-green-200'
    }
  ];

  const calculateLedResistor = () => {
    const supply = parseFloat(ledInputs.supplyVoltage);
    const ledV = parseFloat(ledInputs.ledVoltage);
    const current = parseFloat(ledInputs.current) / 1000; // Convert mA to A

    if (supply && ledV && current && supply > ledV) {
      const resistance = (supply - ledV) / current;
      const power = Math.pow(supply - ledV, 2) / resistance;
      
      setResult({
        resistance: resistance.toFixed(1),
        power: (power * 1000).toFixed(2), // Convert to mW
        commercial: getCommercialResistor(resistance)
      });
    }
  };

  const getCommercialResistor = (resistance) => {
    const standardValues = [100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200, 10000];
    const closest = standardValues.reduce((prev, curr) => 
      Math.abs(curr - resistance) < Math.abs(prev - resistance) ? curr : prev
    );
    return closest >= 1000 ? `${(closest/1000).toFixed(1)}kΩ` : `${closest}Ω`;
  };

  const handleInputChange = (field, value) => {
    setLedInputs(prev => ({ ...prev, [field]: value }));
    setResult(null);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadoras Rápidas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramentas práticas para seus projetos eletrônicos. 
            Calcule valores rapidamente e com precisão.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Escolha uma calculadora:
            </h3>
            
            <div className="space-y-3">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                    activeCalculator === calc.id
                      ? 'border-blue-500 bg-blue-50'
                      : calc.color + ' hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${activeCalculator === calc.id ? 'text-blue-600' : 'text-gray-600'}`}>
                      {calc.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{calc.name}</h4>
                      <p className="text-sm text-gray-600">{calc.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t">
              <Button className="w-full" size="lg">
                Ver Todas as Calculadoras
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="bg-gray-50 rounded-xl p-8">
            {activeCalculator === 'led' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Calculadora de Resistor para LED
                  </h3>
                  <p className="text-gray-600">
                    Determine o resistor limitador de corrente
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tensão de Alimentação (V)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 5"
                      value={ledInputs.supplyVoltage}
                      onChange={(e) => handleInputChange('supplyVoltage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tensão do LED (V)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 2.1"
                      value={ledInputs.ledVoltage}
                      onChange={(e) => handleInputChange('ledVoltage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Corrente Desejada (mA)
                    </label>
                    <input
                      type="number"
                      step="1"
                      placeholder="Ex: 20"
                      value={ledInputs.current}
                      onChange={(e) => handleInputChange('current', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <Button 
                    onClick={calculateLedResistor}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular
                  </Button>
                </div>

                {result && (
                  <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-4">Resultados:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resistor necessário:</span>
                        <span className="font-semibold text-blue-600">{result.resistance}Ω</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Potência dissipada:</span>
                        <span className="font-semibold">{result.power}mW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valor comercial:</span>
                        <span className="font-semibold text-green-600">{result.commercial}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Circuit diagram placeholder */}
                <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-4">Circuito:</h4>
                  <div className="flex items-center justify-center h-24 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4 text-gray-600">
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-yellow-400"></div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Fonte → Resistor → LED → GND
                  </p>
                </div>
              </div>
            )}

            {activeCalculator !== 'led' && (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Calculadora em Desenvolvimento
                </h3>
                <p className="text-gray-600">
                  Esta calculadora estará disponível em breve.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

