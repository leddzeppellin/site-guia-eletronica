import { useState } from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import {
  Activity,
  Calculator,
  Info,
  RotateCcw,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from './LanguageProvider.jsx';

const initialInputs = {
  ohm: { voltage: '', current: '', resistance: '', power: '' },
  divider: { inputVoltage: '', r1: '', r2: '' },
  rc: { resistance: '', capacitance: '', mode: 'lowpass' },
  power: { inputVoltage: '', loadVoltage: '', current: '', dutyCycle: '100' },
};

export function AdvancedCalculators() {
  const { t } = useLanguage();
  const [activeCalculator, setActiveCalculator] = useState('ohm');
  const [inputs, setInputs] = useState(initialInputs);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const calculators = [
    {
      id: 'ohm',
      name: 'Lei de Ohm',
      description: 'Calcule V, I, R ou P conhecendo dois valores',
      icon: Calculator,
      color: 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900',
      difficulty: 'beginner',
    },
    {
      id: 'divider',
      name: 'Divisor de Tensão',
      description: 'Calcule saída, corrente e dissipação nos resistores',
      icon: Settings,
      color: 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900',
      difficulty: 'intermediate',
    },
    {
      id: 'rc',
      name: 'Filtro RC',
      description: 'Calcule frequência de corte e constante de tempo',
      icon: Activity,
      color: 'bg-purple-50 border-purple-200 dark:bg-purple-950/30 dark:border-purple-900',
      difficulty: 'intermediate',
    },
    {
      id: 'power',
      name: 'Análise de Potência',
      description: 'Estime consumo, dissipação, eficiência e margem',
      icon: TrendingUp,
      color: 'bg-orange-50 border-orange-200 dark:bg-orange-950/30 dark:border-orange-900',
      difficulty: 'advanced',
    },
  ];

  const active = inputs[activeCalculator];

  const updateInput = (field, value) => {
    setInputs((current) => ({
      ...current,
      [activeCalculator]: {
        ...current[activeCalculator],
        [field]: value,
      },
    }));
    setResults(null);
    setError('');
  };

  const selectCalculator = (id) => {
    setActiveCalculator(id);
    setResults(null);
    setError('');
  };

  const clearInputs = () => {
    setInputs((current) => ({
      ...current,
      [activeCalculator]: initialInputs[activeCalculator],
    }));
    setResults(null);
    setError('');
  };

  const calculate = () => {
    const calculatorsById = {
      ohm: calculateOhm,
      divider: calculateDivider,
      rc: calculateRc,
      power: calculatePower,
    };

    calculatorsById[activeCalculator]();
  };

  const calculateOhm = () => {
    const V = parseNumber(active.voltage);
    const I = parseNumber(active.current);
    const R = parseNumber(active.resistance);
    const P = parseNumber(active.power);
    const filledInputs = [V, I, R, P].filter((value) => value !== null).length;

    if (filledInputs < 2 || [I, R, P].some((value) => value !== null && value <= 0)) {
      showError(t('fillTwoFields'));
      return;
    }

    if (R === 0 || I === 0 || V === 0) {
      showError(t('invalidInputs'));
      return;
    }

    let calculated = {};

    if (V !== null && I !== null) {
      calculated = {
        resistance: formatNumber(V / I, 'Ω'),
        power: formatNumber(V * I, 'W'),
      };
    } else if (V !== null && R !== null) {
      calculated = {
        current: formatNumber(V / R, 'A'),
        power: formatNumber((V * V) / R, 'W'),
      };
    } else if (I !== null && R !== null) {
      calculated = {
        voltage: formatNumber(I * R, 'V'),
        power: formatNumber(I * I * R, 'W'),
      };
    } else if (V !== null && P !== null) {
      calculated = {
        current: formatNumber(P / V, 'A'),
        resistance: formatNumber((V * V) / P, 'Ω'),
      };
    } else if (I !== null && P !== null) {
      calculated = {
        voltage: formatNumber(P / I, 'V'),
        resistance: formatNumber(P / (I * I), 'Ω'),
      };
    } else if (R !== null && P !== null) {
      calculated = {
        current: formatNumber(Math.sqrt(P / R), 'A'),
        voltage: formatNumber(Math.sqrt(P * R), 'V'),
      };
    }

    setResults([
      ['Tensão', calculated.voltage],
      ['Corrente', calculated.current],
      ['Resistência', calculated.resistance],
      ['Potência', calculated.power],
    ].filter(([, value]) => value));
    setError('');
  };

  const calculateDivider = () => {
    const Vin = parseNumber(active.inputVoltage);
    const R1 = parseNumber(active.r1);
    const R2 = parseNumber(active.r2);

    if (![Vin, R1, R2].every((value) => value !== null) || R1 <= 0 || R2 <= 0) {
      showError(t('invalidInputs'));
      return;
    }

    const totalResistance = R1 + R2;
    const current = Vin / totalResistance;
    const outputVoltage = (Vin * R2) / totalResistance;
    const powerR1 = current * current * R1;
    const powerR2 = current * current * R2;

    setResults([
      ['Tensão de saída', formatNumber(outputVoltage, 'V')],
      ['Corrente total', formatNumber(current * 1000, 'mA')],
      ['Potência em R1', formatNumber(powerR1 * 1000, 'mW')],
      ['Potência em R2', formatNumber(powerR2 * 1000, 'mW')],
      ['Potência total', formatNumber((powerR1 + powerR2) * 1000, 'mW')],
    ]);
    setError('');
  };

  const calculateRc = () => {
    const resistance = parseNumber(active.resistance);
    const capacitanceMicro = parseNumber(active.capacitance);

    if (!resistance || !capacitanceMicro || resistance <= 0 || capacitanceMicro <= 0) {
      showError(t('invalidInputs'));
      return;
    }

    const capacitance = capacitanceMicro / 1000000;
    const tau = resistance * capacitance;
    const cutoff = 1 / (2 * Math.PI * tau);

    setResults([
      ['Tipo de filtro', active.mode === 'lowpass' ? 'Passa-baixas' : 'Passa-altas'],
      ['Frequência de corte', formatFrequency(cutoff)],
      ['Constante de tempo', formatTime(tau)],
      ['Subida aproximada', formatTime(2.2 * tau)],
      ['Estabilização aproximada', formatTime(5 * tau)],
    ]);
    setError('');
  };

  const calculatePower = () => {
    const inputVoltage = parseNumber(active.inputVoltage);
    const loadVoltage = parseNumber(active.loadVoltage);
    const currentMilli = parseNumber(active.current);
    const dutyCycle = parseNumber(active.dutyCycle);

    if (
      !inputVoltage ||
      !loadVoltage ||
      !currentMilli ||
      dutyCycle === null ||
      inputVoltage <= 0 ||
      loadVoltage <= 0 ||
      currentMilli <= 0 ||
      dutyCycle <= 0 ||
      dutyCycle > 100
    ) {
      showError(t('invalidInputs'));
      return;
    }

    const current = currentMilli / 1000;
    const duty = dutyCycle / 100;
    const loadPower = loadVoltage * current * duty;
    const inputPower = inputVoltage * current * duty;
    const dissipatedPower = Math.max(inputPower - loadPower, 0);
    const efficiency = inputPower > 0 ? (loadPower / inputPower) * 100 : 0;

    setResults([
      ['Potência na carga', formatNumber(loadPower, 'W')],
      ['Potência de entrada', formatNumber(inputPower, 'W')],
      ['Dissipação estimada', formatNumber(dissipatedPower, 'W')],
      ['Eficiência estimada', formatNumber(efficiency, '%')],
      ['Margem recomendada', formatNumber(Math.max(loadPower, dissipatedPower) * 2, 'W')],
    ]);
    setError('');
  };

  const showError = (message) => {
    setResults(null);
    setError(message);
  };

  return (
    <section id="advanced-calculators" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Calculadoras Avançadas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ferramentas para validar circuitos, estimar limites e escolher componentes com mais segurança.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-6">
              Escolha uma calculadora:
            </h3>

            <div className="space-y-3">
              {calculators.map((calculator) => (
                <button
                  key={calculator.id}
                  type="button"
                  onClick={() => selectCalculator(calculator.id)}
                  className={`w-full rounded-lg border-2 p-4 text-left transition hover:shadow-md ${
                    activeCalculator === calculator.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/50'
                      : calculator.color
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <calculator.icon className={`h-5 w-5 ${activeCalculator === calculator.id ? 'text-blue-600' : 'text-muted-foreground'}`} />
                      <h4 className="font-semibold text-foreground">{calculator.name}</h4>
                    </div>
                    <Badge className={getDifficultyColor(calculator.difficulty)}>
                      {getDifficultyText(calculator.difficulty)}
                    </Badge>
                  </div>
                  <p className="ml-8 text-sm leading-6 text-muted-foreground">
                    {calculator.description}
                  </p>
                </button>
              ))}
            </div>

            <div className="pt-6 border-t">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                  <div>
                    <h4 className="mb-1 font-semibold text-blue-900 dark:text-blue-100">Dica</h4>
                    <p className="text-sm leading-6 text-blue-700 dark:text-blue-200">
                      Use uma margem de potência maior em componentes que aquecem ou ficam ligados por longos períodos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-xl bg-card p-8 shadow-sm">
            <CalculatorForm
              activeCalculator={activeCalculator}
              inputs={active}
              updateInput={updateInput}
            />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button onClick={calculate} className="flex-1 bg-blue-600 hover:bg-blue-700" size="lg">
                <Calculator className="mr-2 h-5 w-5" />
                Calcular
              </Button>
              <Button onClick={clearInputs} variant="outline" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            </div>

            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300">
                {error}
              </div>
            )}

            {results && (
              <ResultList results={results} />
            )}

            <FormulaReference activeCalculator={activeCalculator} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CalculatorForm({ activeCalculator, inputs, updateInput }) {
  if (activeCalculator === 'ohm') {
    return (
      <div className="space-y-6">
        <FormHeader
          title="Calculadora da Lei de Ohm"
          description="Preencha dois campos para calcular os demais valores."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <NumberField label="Tensão (V)" placeholder="Ex: 12" value={inputs.voltage} onChange={(value) => updateInput('voltage', value)} />
          <NumberField label="Corrente (A)" placeholder="Ex: 0.02" value={inputs.current} onChange={(value) => updateInput('current', value)} />
          <NumberField label="Resistência (Ω)" placeholder="Ex: 1000" value={inputs.resistance} onChange={(value) => updateInput('resistance', value)} />
          <NumberField label="Potência (W)" placeholder="Ex: 0.25" value={inputs.power} onChange={(value) => updateInput('power', value)} />
        </div>
      </div>
    );
  }

  if (activeCalculator === 'divider') {
    return (
      <div className="space-y-6">
        <FormHeader
          title="Calculadora de Divisor de Tensão"
          description="Calcule a tensão de saída do divisor resistivo e a dissipação em cada resistor."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberField label="Tensão de entrada (V)" placeholder="Ex: 12" value={inputs.inputVoltage} onChange={(value) => updateInput('inputVoltage', value)} />
          <NumberField label="R1 superior (Ω)" placeholder="Ex: 1000" value={inputs.r1} onChange={(value) => updateInput('r1', value)} />
          <NumberField label="R2 inferior (Ω)" placeholder="Ex: 2000" value={inputs.r2} onChange={(value) => updateInput('r2', value)} />
        </div>
      </div>
    );
  }

  if (activeCalculator === 'rc') {
    return (
      <div className="space-y-6">
        <FormHeader
          title="Calculadora de Filtro RC"
          description="Informe R em ohms e C em microfarads para obter corte e tempo de resposta."
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <NumberField label="Resistência (Ω)" placeholder="Ex: 10000" value={inputs.resistance} onChange={(value) => updateInput('resistance', value)} />
          <NumberField label="Capacitância (µF)" placeholder="Ex: 0.1" value={inputs.capacitance} onChange={(value) => updateInput('capacitance', value)} />
          <div>
            <label className="mb-2 block text-sm font-medium text-muted-foreground">Tipo</label>
            <select
              value={inputs.mode}
              onChange={(event) => updateInput('mode', event.target.value)}
              className="h-12 w-full rounded-lg border bg-background px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="lowpass">Passa-baixas</option>
              <option value="highpass">Passa-altas</option>
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FormHeader
        title="Análise de Potência"
        description="Estime potência na carga, dissipação e eficiência usando corrente média ou duty cycle."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <NumberField label="Tensão de entrada (V)" placeholder="Ex: 12" value={inputs.inputVoltage} onChange={(value) => updateInput('inputVoltage', value)} />
        <NumberField label="Tensão na carga (V)" placeholder="Ex: 5" value={inputs.loadVoltage} onChange={(value) => updateInput('loadVoltage', value)} />
        <NumberField label="Corrente da carga (mA)" placeholder="Ex: 250" value={inputs.current} onChange={(value) => updateInput('current', value)} />
        <NumberField label="Duty cycle (%)" placeholder="Ex: 100" value={inputs.dutyCycle} onChange={(value) => updateInput('dutyCycle', value)} />
      </div>
    </div>
  );
}

function FormHeader({ title, description }) {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function NumberField({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-muted-foreground">{label}</label>
      <input
        type="number"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border bg-background px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

function ResultList({ results }) {
  return (
    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/60 dark:bg-blue-950/30">
      <h4 className="mb-4 font-semibold text-blue-900 dark:text-blue-100">Resultados</h4>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {results.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-white p-3 dark:bg-background">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-1 font-semibold text-blue-700 dark:text-blue-300">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FormulaReference({ activeCalculator }) {
  const formulas = {
    ohm: ['V = I x R', 'I = V / R', 'R = V / I', 'P = V x I', 'P = V² / R', 'P = I² x R'],
    divider: ['Vout = Vin x R2 / (R1 + R2)', 'I = Vin / (R1 + R2)', 'P = I² x R'],
    rc: ['fc = 1 / (2 x pi x R x C)', 'tau = R x C', 'subida aproximada = 2.2 x tau', 'estabilização aproximada = 5 x tau'],
    power: ['P carga = V carga x I x duty', 'P entrada = V entrada x I x duty', 'eficiência = P carga / P entrada'],
  };

  return (
    <div className="mt-6 rounded-lg bg-muted p-4">
      <h4 className="mb-3 font-semibold">Fórmulas utilizadas</h4>
      <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
        {formulas[activeCalculator].map((formula) => (
          <div key={formula}>{formula}</div>
        ))}
      </div>
    </div>
  );
}

function parseNumber(value) {
  if (value === '') return null;
  const parsed = parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatNumber(value, unit) {
  const abs = Math.abs(value);
  const decimals = abs >= 100 ? 1 : abs >= 10 ? 2 : 3;
  return `${Number(value.toFixed(decimals))}${unit}`;
}

function formatFrequency(value) {
  if (value >= 1000000) return `${Number((value / 1000000).toFixed(3))}MHz`;
  if (value >= 1000) return `${Number((value / 1000).toFixed(3))}kHz`;
  return `${Number(value.toFixed(3))}Hz`;
}

function formatTime(seconds) {
  if (seconds >= 1) return `${Number(seconds.toFixed(3))}s`;
  if (seconds >= 0.001) return `${Number((seconds * 1000).toFixed(3))}ms`;
  return `${Number((seconds * 1000000).toFixed(3))}µs`;
}

function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-100';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-100';
    case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-100';
    default: return 'bg-muted text-muted-foreground';
  }
}

function getDifficultyText(difficulty) {
  switch (difficulty) {
    case 'beginner': return 'Iniciante';
    case 'intermediate': return 'Intermediário';
    case 'advanced': return 'Avançado';
    default: return 'Não definido';
  }
}
