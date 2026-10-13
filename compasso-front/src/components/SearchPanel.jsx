import { useState } from 'react';
import FilterDropdown from './FilterDropdown.jsx';
import { IconSearch } from '../icons.jsx';
import { ANOS, TIPOS, ADAPTS, ADAPT_COLOR, UNIDADES, ITEMS } from '../data.js';

export default function SearchPanel({ filters, setFilter, hasFilters, onClear }) {
  const [openDD, setOpenDD] = useState(null);
  const openFor = (k) => ({ open: openDD === k, onOpenChange: (v) => setOpenDD(v ? k : null) });

  return (
    <section className="panel">
      <div className="search">
        <IconSearch size={18} />
        <input
          value={filters.query}
          onChange={(e) => setFilter('query', e.target.value)}
          placeholder="Busque um tema ou código da BNCC (ex.: frações, EF07MA18)"
          aria-label="Buscar"
        />
        {hasFilters && <button className="chip-btn" onClick={onClear}>Limpar filtros</button>}
      </div>

      <div className="filters">
        <FilterDropdown label="Ano escolar" options={ANOS} value={filters.ano} onChange={(v) => setFilter('ano', v)}
          emptyText="Todos os anos" formatOption={(o) => o + ' ano'} {...openFor('ano')} />
        <FilterDropdown label="Tipo de conteúdo" options={TIPOS} value={filters.tipos} onChange={(v) => setFilter('tipos', v)}
          multi emptyText="Todos os tipos" {...openFor('tipos')} />
        <FilterDropdown label="Conteúdo adaptado" options={ADAPTS} value={filters.adapts} onChange={(v) => setFilter('adapts', v)}
          multi emptyText="Sem adaptação específica" dots={ADAPT_COLOR} {...openFor('adapts')} />
      </div>

      <div className="unidades-block">
        <span className="field-label">Unidades temáticas da BNCC</span>
        <div className="unidades">
          {UNIDADES.map((u) => {
            const on = filters.unidade === u.label;
            return (
              <button key={u.label} className={'unidade' + (on ? ' is-on' : '')} aria-pressed={on}
                onClick={() => setFilter('unidade', on ? null : u.label)}>
                <span className="dot dot--lg" style={{ background: u.dot }} />
                <span className="unidade-label">{u.label}</span>
                <span className="unidade-count">{ITEMS.filter((i) => i.unidade === u.label).length} materiais</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
