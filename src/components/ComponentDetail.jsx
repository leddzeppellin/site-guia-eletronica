import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  Calculator,
  Download,
  Heart,
  Settings,
  Share2,
  Zap,
} from 'lucide-react';

export function ComponentDetail({ component, onBack, onShowCalculators }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFavorite, setIsFavorite] = useState(false);

  const tabs = useMemo(() => [
    { id: 'overview', label: 'Visão geral', icon: BookOpen },
    { id: 'specs', label: 'Especificações', icon: Settings },
    { id: 'applications', label: 'Aplicações', icon: Zap },
    { id: 'warnings', label: 'Cuidados', icon: AlertTriangle },
  ], []);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200';
      default: return 'bg-muted text-muted-foreground';
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
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Voltar ao catálogo
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFavorite((current) => !current)}
            aria-label="Favoritar componente"
            className={isFavorite ? 'text-red-500' : 'text-muted-foreground'}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Compartilhar">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" aria-label="Baixar recursos">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mb-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-8 text-center">
            <div className="mx-auto mb-6 flex h-56 max-w-md items-center justify-center rounded-lg bg-muted">
              <ComponentIllustration categoryId={component.categoryId} />
            </div>
            <p className="text-sm text-muted-foreground">Representação didática do componente</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 font-semibold">Símbolo esquemático</h3>
            <div className="flex h-20 items-center justify-center text-foreground">
              <SchematicSymbol categoryId={component.categoryId} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold">{component.name}</h1>
              <Badge className={getDifficultyColor(component.difficulty)}>
                {getDifficultyText(component.difficulty)}
              </Badge>
            </div>
            <p className="mb-4 text-muted-foreground">{component.category}</p>
            <p className="text-lg leading-relaxed text-muted-foreground">{component.description}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {component.quickSpecs.map(([label, value]) => (
              <div key={label} className="rounded-lg border bg-card p-4">
                <div className="text-sm font-medium text-muted-foreground">{label}</div>
                <div className="text-xl font-bold">{value}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="mb-3 font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {component.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="flex-1">
              <a
                href="#advanced-calculators"
                onClick={(event) => {
                  event.preventDefault();
                  onShowCalculators();
                }}
              >
                <Calculator className="mr-2 h-4 w-4" />
                Calculadoras relacionadas
              </a>
            </Button>
            <Button variant="outline" className="flex-1">
              <BookOpen className="mr-2 h-4 w-4" />
              Ver guia didático
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8 border-b">
        <nav className="-mb-px flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-300'
                  : 'border-transparent text-muted-foreground hover:border-muted-foreground/50'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Visão geral</h2>
              <p className="leading-7 text-muted-foreground">
                {component.description} Use esta ficha como referência rápida de bancada:
                identifique o componente, confira os limites principais e escolha uma
                calculadora relacionada antes de aplicar no circuito.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">Especificações técnicas</h2>
              <div className="overflow-hidden rounded-lg border bg-card">
                <table className="w-full">
                  <tbody>
                    {Object.entries(component.specifications).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                        <td className="px-6 py-4 font-medium">{key}</td>
                        <td className="px-6 py-4 text-muted-foreground">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">Aplicações comuns</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {component.applications.map((application) => (
                  <div key={application} className="rounded-lg border bg-card p-5">
                    <div className="mb-2 flex items-center gap-2 font-semibold">
                      <Zap className="h-5 w-5 text-blue-600" />
                      {application}
                    </div>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Aplicação frequente em projetos didáticos, protótipos e manutenção.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'warnings' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold">Cuidados</h2>
              <div className="space-y-4">
                {component.warnings.map((warning) => (
                  <div key={warning} className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-900 dark:border-yellow-900/60 dark:bg-yellow-950/30 dark:text-yellow-100">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                      <p>{warning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 font-semibold">Componentes relacionados</h3>
            <div className="space-y-3">
              {component.relatedComponents.map((related) => (
                <div key={related.name} className="flex items-center justify-between gap-3 rounded-lg bg-muted/60 p-3">
                  <span className="text-sm font-medium">{related.name}</span>
                  <Badge variant="outline" className="text-xs">
                    {related.type === 'similar' ? 'Similar' : 'Complementar'}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 dark:border-blue-900/60 dark:bg-blue-950/30">
            <h3 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">Dica rápida</h3>
            <p className="text-sm leading-6 text-blue-800 dark:text-blue-200">
              Antes de montar no circuito final, simule a condição principal na protoboard
              e meça tensão/corrente com multímetro.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ComponentIllustration({ categoryId }) {
  if (categoryId === 'leds') {
    return (
      <div className="flex items-center gap-3">
        <div className="h-24 w-24 rounded-full border-4 border-red-300 bg-red-500/80 shadow-lg shadow-red-500/20" />
        <div className="h-2 w-20 bg-slate-400" />
      </div>
    );
  }

  if (categoryId === 'capacitors') {
    return (
      <div className="flex items-center gap-5">
        <div className="h-32 w-6 rounded bg-sky-500" />
        <div className="h-32 w-6 rounded bg-sky-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-20 bg-slate-400" />
      <div className="h-10 w-36 rounded-full bg-yellow-700 shadow-inner">
        <div className="mx-auto flex h-full w-24 justify-around">
          <span className="h-full w-2 bg-amber-900" />
          <span className="h-full w-2 bg-black" />
          <span className="h-full w-2 bg-red-600" />
          <span className="h-full w-2 bg-yellow-400" />
        </div>
      </div>
      <div className="h-2 w-20 bg-slate-400" />
    </div>
  );
}

function SchematicSymbol({ categoryId }) {
  if (categoryId === 'leds') {
    return (
      <svg width="150" height="60" viewBox="0 0 150 60" aria-hidden="true">
        <line x1="10" y1="30" x2="45" y2="30" stroke="currentColor" strokeWidth="2" />
        <polygon points="45,15 45,45 75,30" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="78" y1="15" x2="78" y2="45" stroke="currentColor" strokeWidth="2" />
        <line x1="78" y1="30" x2="130" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="88" y1="13" x2="105" y2="2" stroke="currentColor" strokeWidth="2" />
        <line x1="99" y1="18" x2="116" y2="7" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (categoryId === 'capacitors') {
    return (
      <svg width="150" height="60" viewBox="0 0 150 60" aria-hidden="true">
        <line x1="10" y1="30" x2="62" y2="30" stroke="currentColor" strokeWidth="2" />
        <line x1="62" y1="12" x2="62" y2="48" stroke="currentColor" strokeWidth="3" />
        <line x1="88" y1="12" x2="88" y2="48" stroke="currentColor" strokeWidth="3" />
        <line x1="88" y1="30" x2="140" y2="30" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg width="150" height="60" viewBox="0 0 150 60" aria-hidden="true">
      <line x1="10" y1="30" x2="35" y2="30" stroke="currentColor" strokeWidth="2" />
      <rect x="35" y="20" width="80" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="115" y1="30" x2="140" y2="30" stroke="currentColor" strokeWidth="2" />
      <text x="75" y="53" textAnchor="middle" fontSize="12" fill="currentColor">R</text>
    </svg>
  );
}
