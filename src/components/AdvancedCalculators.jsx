import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { 
  Calculator, 
  Zap, 
  Settings, 
  Activity,
  ArrowRight,
  Info,
  TrendingUp
} from 'lucide-react';

export function AdvancedCalculators() {
  const [activeCalculator, setActiveCalculator] = useState('ohm');
  const [ohmInputs, setOhmInputs] = useState({
    voltage: '',
    current: '',
    resistance: '',
    power: ''
  });
  const [dividerInputs, setDividerInputs] = useState({
    inputVoltage: '',
    r1: '',
    r2: ''
  });
  const [results, setResults] = useState(null);

  const calculators = [
    {
      id: 'ohm',
      name: 'Lei de Ohm',
      description: 'Calcule V, I, R ou P conhecendo dois valores',
      icon: <Calculator className="h-5 w-5" />,
      color: 'bg-blue-50 border-blue-200',
      difficulty: 'beginner'
    },
    {
      id: 'divider',
      name: 'Divisor de Tensão',
      description: 'Calcule a tensão de saída do divisor resistivo',
      icon: <Settings className="h-5 w-5" />,
      color: 'bg-green-50 border-green-200',
      difficulty: 'intermediate'
    },
    {
      id: 'rc',
      name: 'Filtro RC',
      description: 'Calcule a frequência de corte do filtro',
      icon: <Activity className="h-5 w-5" />,
      color: 'bg-purple-50 border-purple-200',
      difficulty: 'intermediate'
    },
    {
      id: 'power',
      name: 'Análise de Potência',
      description: 'Calcule potência dissipada e eficiência',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-orange-50 border-orange-200',
      difficulty: 'advanced'
    }
  ];

  const calculateOhm = () => {
    const V = parseFloat(ohmInputs.voltage) || null;
    const I = parseFloat(ohmInputs.current) || null;
    const R = parseFloat(ohmInputs.resistance) || null;
    const P = parseFloat(ohmInputs.power) || null;

    const filledInputs = [V, I, R, P].filter(val => val !== null).length;
    
    if (filledInputs < 2) {
      alert('Preencha pelo menos 2 campos para calcular os demais.');
      return;
    }

    let calculatedResults = {};

    // Calculate missing values based on Ohm's law and power formulas
    if (V !== null && I !== null) {
      calculatedResults.resistance = (V / I).toFixed(2);
      calculatedResults.power = (V * I).toFixed(2);
    } else if (V !== null && R !== null) {
      calculatedResults.current = (V / R).toFixed(3);
      calculatedResults.power = (Math.pow(V, 2) / R).toFixed(2);
    } else if (I !== null && R !== null) {
      calculatedResults.voltage = (I * R).toFixed(2);
      calculatedResults.power = (Math.pow(I, 2) * R).toFixed(2);
    } else if (V !== null && P !== null) {
      calculatedResults.current = (P / V).toFixed(3);
      calculatedResults.resistance = (Math.pow(V, 2) / P).toFixed(2);
    } else if (I !== null && P !== null) {
      calculatedResults.voltage = (P / I).toFixed(2);
      calculatedResults.resistance = (P / Math.pow(I, 2)).toFixed(2);
    } else if (R !== null && P !== null) {
      calculatedResults.current = Math.sqrt(P / R).toFixed(3);
      calculatedResults.voltage = Math.sqrt(P * R).toFixed(2);
    }

    setResults(calculatedResults);
  };

  const calculateDivider = () => {
    const Vin = parseFloat(dividerInputs.inputVoltage);
    const R1 = parseFloat(dividerInputs.r1);
    const R2 = parseFloat(dividerInputs.r2);

    if (Vin && R1 && R2) {
      const Vout = (Vin * R2) / (R1 + R2);
      const totalCurrent = Vin / (R1 + R2);
      const powerR1 = Math.pow(totalCurrent, 2) * R1;
      const powerR2 = Math.pow(totalCurrent, 2) * R2;
      const totalPower = powerR1 + powerR2;

      setResults({
        outputVoltage: Vout.toFixed(2),
        current: (totalCurrent * 1000).toFixed(2), // Convert to mA
        powerR1: (powerR1 * 1000).toFixed(2), // Convert to mW
        powerR2: (powerR2 * 1000).toFixed(2), // Convert to mW
        totalPower: (totalPower * 1000).toFixed(2) // Convert to mW
      });
    }
  };

  const handleOhmInputChange = (field, value) => {
    setOhmInputs(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  const handleDividerInputChange = (field, value) => {
    setDividerInputs(prev => ({ ...prev, [field]: value }));
    setResults(null);
  };

  const clearInputs = () => {
    if (activeCalculator === 'ohm') {
      setOhmInputs({ voltage: '', current: '', resistance: '', power: '' });
    } else if (activeCalculator === 'divider') {
      setDividerInputs({ inputVoltage: '', r1: '', r2: '' });
    }
    setResults(null);
  };

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

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadoras Avançadas
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramentas mais sofisticadas para análise de circuitos e cálculos precisos. 
            Ideal para projetos mais complexos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
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
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`${activeCalculator === calc.id ? 'text-blue-600' : 'text-gray-600'}`}>
                        {calc.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{calc.name}</h4>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(calc.difficulty)}>
                      {getDifficultyText(calc.difficulty)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 ml-8">{calc.description}</p>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Dica</h4>
                    <p className="text-blue-700 text-sm">
                      Use essas calculadoras para verificar seus cálculos manuais e 
                      entender melhor o comportamento dos circuitos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculator Interface */}
          <div className="lg:col-span-2 bg-white rounded-xl p-8 shadow-sm">
            {activeCalculator === 'ohm' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Calculadora da Lei de Ohm
                  </h3>
                  <p className="text-gray-600">
                    Preencha dois campos para calcular os demais valores
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tensão (V)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 12"
                      value={ohmInputs.voltage}
                      onChange={(e) => handleOhmInputChange('voltage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Corrente (A)
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      placeholder="Ex: 0.02"
                      value={ohmInputs.current}
                      onChange={(e) => handleOhmInputChange('current', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resistência (Ω)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 1000"
                      value={ohmInputs.resistance}
                      onChange={(e) => handleOhmInputChange('resistance', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Potência (W)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Ex: 0.25"
                      value={ohmInputs.power}
                      onChange={(e) => handleOhmInputChange('power', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button 
                    onClick={calculateOhm}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <Calculator className="mr-2 h-5 w-5" />
                    Calcular
                  </Button>
                  <Button 
                    onClick={clearInputs}
                    variant="outline"
                    size="lg"
                  >
                    Limpar
                  </Button>
                </div>

                {results && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-4">Resultados Calculados:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.voltage && (
                        <div className="bg-white p-3 rounded-lg">
                          <span className="text-gray-600">Tensão:</span>
                          <span className="font-semibold text-blue-600 ml-2">{results.voltage}V</span>
                        </div>
                      )}
                      {results.current && (
                        <div className="bg-white p-3 rounded-lg">
                          <span className="text-gray-600">Corrente:</span>
                          <span className="font-semibold text-green-600 ml-2">{results.current}A</span>
                        </div>
                      )}
                      {results.resistance && (
                        <div className="bg-white p-3 rounded-lg">
                          <span className="text-gray-600">Resistência:</span>
                          <span className="font-semibold text-purple-600 ml-2">{results.resistance}Ω</span>
                        </div>
                      )}
                      {results.power && (
                        <div className="bg-white p-3 rounded-lg">
                          <span className="text-gray-600">Potência:</span>
                          <span className="font-semibold text-orange-600 ml-2">{results.power}W</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Formulas reference */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Fórmulas Utilizadas:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div>V = I × R</div>
                    <div>I = V ÷ R</div>
                    <div>R = V ÷ I</div>
                    <div>P = V × I</div>
                    <div>P = V² ÷ R</div>
                    <div>P = I² × R</div>
                  </div>
                </div>
              </div>
            )}

            {activeCalculator === 'divider' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Calculadora de Divisor de Tensão
                  </h3>
                  <p className="text-gray-600">
                    Calcule a tensão de saída do divisor resistivo
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tensão de Entrada (V)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 12"
                      value={dividerInputs.inputVoltage}
                      onChange={(e) => handleDividerInputChange('inputVoltage', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resistor R1 (Ω) - Superior
                      </label>
                      <input
                        type="number"
                        step="1"
                        placeholder="Ex: 1000"
                        value={dividerInputs.r1}
                        onChange={(e) => handleDividerInputChange('r1', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Resistor R2 (Ω) - Inferior
                      </label>
                      <input
                        type="number"
                        step="1"
                        placeholder="Ex: 2000"
                        value={dividerInputs.r2}
                        onChange={(e) => handleDividerInputChange('r2', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      onClick={calculateDivider}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Calculator className="mr-2 h-5 w-5" />
                      Calcular
                    </Button>
                    <Button 
                      onClick={clearInputs}
                      variant="outline"
                      size="lg"
                    >
                      Limpar
                    </Button>
                  </div>
                </div>

                {results && (
                  <div className="mt-6 p-6 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-4">Resultados:</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Tensão de Saída:</span>
                        <span className="font-semibold text-green-600">{results.outputVoltage}V</span>
                      </div>
                      <div className="flex justify-between bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Corrente Total:</span>
                        <span className="font-semibold text-blue-600">{results.current}mA</span>
                      </div>
                      <div className="flex justify-between bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Potência em R1:</span>
                        <span className="font-semibold text-orange-600">{results.powerR1}mW</span>
                      </div>
                      <div className="flex justify-between bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Potência em R2:</span>
                        <span className="font-semibold text-orange-600">{results.powerR2}mW</span>
                      </div>
                      <div className="flex justify-between bg-white p-3 rounded-lg">
                        <span className="text-gray-600">Potência Total:</span>
                        <span className="font-semibold text-red-600">{results.totalPower}mW</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Circuit diagram */}
                <div className="mt-6 p-6 bg-white border rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-4">Circuito:</h4>
                  <div className="flex items-center justify-center h-32">
                    <div className="text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="text-sm text-gray-600">Vin</div>
                        <div className="w-1 h-6 bg-gray-400"></div>
                        <div className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center text-xs">R1</div>
                        <div className="w-1 h-6 bg-gray-400"></div>
                        <div className="flex items-center">
                          <div className="w-8 h-1 bg-gray-400"></div>
                          <div className="text-sm text-gray-600 mx-2">Vout</div>
                        </div>
                        <div className="w-1 h-6 bg-gray-400"></div>
                        <div className="w-8 h-8 border-2 border-gray-400 rounded flex items-center justify-center text-xs">R2</div>
                        <div className="w-1 h-6 bg-gray-400"></div>
                        <div className="text-sm text-gray-600">GND</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Vout = Vin × (R2 ÷ (R1 + R2))
                  </p>
                </div>
              </div>
            )}

            {(activeCalculator === 'rc' || activeCalculator === 'power') && (
              <div className="text-center py-12">
                <Calculator className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Calculadora em Desenvolvimento
                </h3>
                <p className="text-gray-600 mb-4">
                  Esta calculadora estará disponível em breve.
                </p>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Em breve
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

