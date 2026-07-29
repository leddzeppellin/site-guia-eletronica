import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Calculator, Zap, Settings, ArrowRight } from 'lucide-react';
import { useLanguage } from './LanguageProvider.jsx';

export function QuickCalculators() {
  const { t } = useLanguage();
  const [activeCalculator, setActiveCalculator] = useState('led');
  const [ledInputs, setLedInputs] = useState({
    supplyVoltage: '',
    ledVoltage: '',
    current: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculators = [
    {
      id: 'led',
      name: t('ledResistorCalc'),
      description: t('ledResistorDesc'),
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'ohm',
      name: t('ohmLawCalc'),
      description: t('availableBelow'),
      icon: <Calculator className="h-5 w-5" />,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'divider',
      name: t('voltageDividerCalc'),
      description: t('availableBelow'),
      icon: <Settings className="h-5 w-5" />,
      color: 'bg-green-50 border-green-200'
    }
  ];

  const selectCalculator = (id) => {
    setActiveCalculator(id);
    setResult(null);
    setError('');

    if (id !== 'led') {
      requestAnimationFrame(() => {
        document.getElementById('advanced-calculators')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  };

  const calculateLedResistor = () => {
    const supply = parseFloat(ledInputs.supplyVoltage);
    const ledV = parseFloat(ledInputs.ledVoltage);
    const current = parseFloat(ledInputs.current) / 1000; // Convert mA to A

    if (Number.isFinite(supply) && Number.isFinite(ledV) && Number.isFinite(current) && supply > ledV && current > 0) {
      const resistance = (supply - ledV) / current;
      const power = Math.pow(supply - ledV, 2) / resistance;
      
      setResult({
        resistance: resistance.toFixed(1),
        power: (power * 1000).toFixed(2), // Convert to mW
        commercial: getCommercialResistor(resistance)
      });
      setError('');
      return;
    }

    setResult(null);
    setError(t('invalidInputs'));
  };

  const getCommercialResistor = (resistance) => {
    const baseValues = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82];
    const standardValues = [];
    for (let decade = 1; decade <= 100000; decade *= 10) {
      standardValues.push(...baseValues.map((value) => value * decade));
    }
    const closest = standardValues.reduce((prev, curr) => 
      Math.abs(curr - resistance) < Math.abs(prev - resistance) ? curr : prev
    );
    return closest >= 1000 ? `${(closest/1000).toFixed(1)}kΩ` : `${closest}Ω`;
  };

  const handleInputChange = (field, value) => {
    setLedInputs(prev => ({ ...prev, [field]: value }));
    setResult(null);
    setError('');
  };

  return (
    <section id="calculators" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('calculatorsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('calculatorsDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Selection */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">
              {t('chooseCalculator')}
            </h3>
            
            <div className="space-y-3">
              {calculators.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => selectCalculator(calc.id)}
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
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{calc.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{calc.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t">
              <Button asChild className="w-full" size="lg">
                <a href="#advanced-calculators">
                {t('viewAllCalculators')}
                <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-muted/60 rounded-xl p-8">
            {activeCalculator === 'led' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {t('ledCalculatorTitle')}
                  </h3>
                  <p className="text-muted-foreground">
                    {t('ledCalculatorSubtitle')}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('supplyVoltage')}
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
                      {t('ledVoltage')}
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
                      {t('desiredCurrent')}
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
                    {t('calculate')}
                  </Button>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
                    {error}
                  </div>
                )}

                {result && (
                  <div className="mt-6 p-6 bg-card rounded-lg border">
                    <h4 className="font-semibold mb-4">{t('results')}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('requiredResistor')}</span>
                        <span className="font-semibold text-blue-600">{result.resistance}Ω</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('powerDissipated')}</span>
                        <span className="font-semibold">{result.power}mW</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">{t('commercialValue')}</span>
                        <span className="font-semibold text-green-600">{result.commercial}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-6 bg-card rounded-lg border">
                  <h4 className="font-semibold mb-4">{t('circuit')}</h4>
                  <div className="flex items-center justify-center h-24 bg-muted rounded-lg">
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
                <h3 className="text-xl font-semibold mb-2">
                  {t('inDevelopment')}
                </h3>
                <p className="text-muted-foreground">
                  {t('availableBelow')}
                </p>
                <Button asChild className="mt-6">
                  <a href="#advanced-calculators">{t('advancedCalculators')}</a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

