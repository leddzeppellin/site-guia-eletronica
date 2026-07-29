import { Button } from '@/components/ui/button.jsx';
import { ArrowRight, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLanguage } from './LanguageProvider.jsx';
import { categories } from '@/data/components.js';

export function ComponentCategories({ components, onSelectComponent }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDifficulty, setActiveDifficulty] = useState('all');
  const featured = components.slice(0, 3);
  const countByCategory = components.reduce((counts, component) => ({
    ...counts,
    [component.categoryId]: (counts[component.categoryId] || 0) + 1,
  }), {});
  const difficultyOptions = ['beginner', 'intermediate', 'advanced'];
  const filteredComponents = useMemo(() => {
    const normalizedQuery = normalizeText(query);

    return components.filter((component) => {
      const matchesCategory = activeCategory === 'all' || component.categoryId === activeCategory;
      const matchesDifficulty = activeDifficulty === 'all' || component.difficulty === activeDifficulty;
      const searchableText = normalizeText([
        component.name,
        component.category,
        component.description,
        component.difficulty,
        component.tags.join(' '),
        component.applications.join(' '),
      ].join(' '));

      return matchesCategory && matchesDifficulty && searchableText.includes(normalizedQuery);
    });
  }, [activeCategory, activeDifficulty, components, query]);

  const hasFilters = query || activeCategory !== 'all' || activeDifficulty !== 'all';

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('all');
    setActiveDifficulty('all');
  };

  const filterByCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveDifficulty('all');
    requestAnimationFrame(() => {
      document.getElementById('catalog-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section id="catalog" className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('categoriesTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('categoriesDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.color} group rounded-xl border-2 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="rounded-lg bg-white/70 p-3 dark:bg-black/20">
                  <category.icon className="h-7 w-7" />
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {countByCategory[category.id] || 0} {t('components').toLowerCase()}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">
                {t(category.nameKey)}
              </h3>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t(category.descriptionKey)}
              </p>

              <div className="flex items-center justify-between">
                <Button
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-300"
                  onClick={() => filterByCategory(category.id)}
                >
                  {t('explore')}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-muted-foreground">{t('active')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-bold">{t('featuredComponents')}</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {featured.map((component) => (
              <button
                key={component.id}
                type="button"
                onClick={() => {
                  onSelectComponent(component);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="rounded-lg border bg-card p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-400 hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">{component.category}</div>
                    <div className="text-lg font-semibold">{component.name}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm leading-6 text-muted-foreground">{component.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div id="catalog-results" className="mt-16 scroll-mt-24">
          <div className="mb-8 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="h-11 w-full rounded-md border bg-background pl-10 pr-10 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={t('clearSearch')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {hasFilters && (
                <Button variant="outline" onClick={clearFilters} className="h-11">
                  <X className="h-4 w-4" />
                  {t('clearFilters')}
                </Button>
              )}
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                  {t('filterByCategory')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    isActive={activeCategory === 'all'}
                    onClick={() => setActiveCategory('all')}
                  >
                    {t('allCategories')}
                  </FilterButton>
                  {categories.map((category) => (
                    <FilterButton
                      key={category.id}
                      isActive={activeCategory === category.id}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {t(category.nameKey)}
                    </FilterButton>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs font-medium uppercase text-muted-foreground">
                  {t('filterByDifficulty')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    isActive={activeDifficulty === 'all'}
                    onClick={() => setActiveDifficulty('all')}
                  >
                    {t('allLevels')}
                  </FilterButton>
                  {difficultyOptions.map((difficulty) => (
                    <FilterButton
                      key={difficulty}
                      isActive={activeDifficulty === difficulty}
                      onClick={() => setActiveDifficulty(difficulty)}
                    >
                      {t(difficulty)}
                    </FilterButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-2xl font-bold">{t('registeredComponents')}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {filteredComponents.length} {t('of')} {components.length} {t('components').toLowerCase()}.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredComponents.map((component) => (
              <button
                key={component.id}
                type="button"
                onClick={() => {
                  onSelectComponent(component);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex min-h-32 flex-col justify-between rounded-lg border bg-card p-4 text-left shadow-sm transition hover:border-blue-400 hover:shadow-md"
              >
                <div>
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {component.category}
                      </div>
                      <div className="mt-1 font-semibold">{component.name}</div>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {component.description}
                  </p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {component.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {filteredComponents.length === 0 && (
            <div className="rounded-lg border border-dashed bg-card p-10 text-center">
              <Search className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
              <h4 className="font-semibold">{t('noComponentsFound')}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{t('tryDifferentFilters')}</p>
              <Button variant="outline" className="mt-5" onClick={clearFilters}>
                {t('clearFilters')}
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <a href="#calculators">
            {t('viewCalculators')}
            <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FilterButton({ children, isActive, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md border px-3 py-2 text-sm font-medium transition ${
        isActive
          ? 'border-blue-500 bg-blue-600 text-white shadow-sm'
          : 'border-border bg-background text-muted-foreground hover:border-blue-300 hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
