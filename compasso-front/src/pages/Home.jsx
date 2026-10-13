import { useMemo, useState } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import SearchPanel from '../components/SearchPanel.jsx';
import ResultCard from '../components/ResultCard.jsx';
import NextLesson from '../components/NextLesson.jsx';
import Recents from '../components/Recents.jsx';
import { ITEMS, RECENTS } from '../data.js';

const EMPTY = { query: '', ano: null, tipos: [], adapts: [], unidade: null };
const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function Home({ showRecents = true }) {
  const [filters, setFilters] = useState(EMPTY);
  const setFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }));

  const results = useMemo(() => {
    const q = normalize(filters.query.trim());
    return ITEMS.filter((i) =>
      (!filters.ano || i.ano === filters.ano) &&
      (!filters.tipos.length || filters.tipos.includes(i.tipo)) &&
      (!filters.adapts.length || filters.adapts.every((a) => i.adapt.includes(a))) &&
      (!filters.unidade || i.unidade === filters.unidade) &&
      (!q || normalize(`${i.title} ${i.desc} ${i.code} ${i.unidade}`).includes(q)));
  }, [filters]);

  const hasFilters = !!(filters.query.trim() || filters.ano || filters.tipos.length || filters.adapts.length || filters.unidade);
  const resultLabel = hasFilters ? `${results.length} ${results.length === 1 ? 'resultado' : 'resultados'}` : 'Materiais em destaque';

  return (
    <div className="page">
      <div className="shell">
        <Header active="Início" user={{ name: 'Ana Souza', initials: 'AS' }} />
        <div className="layout">
          <Sidebar />
          <main className="main">
            <div className="title-row">
              <h1>Início</h1>
              <div className="muted">Olá, professora Ana · terça, 13 de outubro</div>
            </div>
            <SearchPanel filters={filters} setFilter={setFilter} hasFilters={hasFilters} onClear={() => setFilters(EMPTY)} />
            <section className="results">
              <h2>{resultLabel}</h2>
              {results.length > 0 ? (
                <div className="results-grid">
                  {results.map((item) => <ResultCard key={item.code + item.origem} item={item} />)}
                </div>
              ) : (
                <div className="card empty">
                  <div className="empty-title">Nenhum material com esses filtros</div>
                  <p className="muted">Tente outro termo de busca ou remova algum filtro.</p>
                </div>
              )}
            </section>
          </main>
          {showRecents && (
            <aside className="aside">
              <NextLesson lesson={{ when: 'amanhã, 07:30', turma: '7º ano B · Sala 12', code: 'EF07MA18', title: 'Equações do 1º grau com balança', status: 'Plano pronto · 2 aulas' }} />
              <Recents items={RECENTS} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
