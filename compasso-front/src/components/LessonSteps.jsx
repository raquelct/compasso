import { useState } from 'react';
import { IconClock, IconChevron, IconBox } from '../icons.jsx';

const TABS = ['Sequência completa', 'Aula 1', 'Aula 2'];

export default function LessonSteps({ steps }) {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState([1]);
  const list = steps.map((s, i) => ({ ...s, n: i + 1 })).filter((s) => tab === 0 || s.aula === tab);
  const total = list.reduce((a, b) => a + b.min, 0);
  const toggle = (n) => setOpen((o) => (o.includes(n) ? o.filter((x) => x !== n) : [...o, n]));

  return (
    <section className="panel">
      <div className="section-head">
        <h2>Estrutura da aula</h2>
        <div className="segmented" role="tablist">
          {TABS.map((t, i) => (
            <button key={t} role="tab" aria-selected={tab === i} className={'seg' + (tab === i ? ' is-on' : '')} onClick={() => setTab(i)}>{t}</button>
          ))}
        </div>
      </div>

      <div className="timebar">
        {list.map((s) => <div key={s.n} title={s.title} style={{ flex: s.min, background: s.color }} />)}
      </div>

      <ol className="steps">
        {list.map((s) => {
          const isOpen = open.includes(s.n);
          return (
            <li key={s.n} className="step">
              <span className="step-num"><span className="step-dot" style={{ background: s.color }} />{s.n}</span>
              <div className="step-body">
                <span className="muted small">{s.fase}</span>
                <span className="step-title">{s.title}</span>
                <span className="step-obj"><span className="ink">Objetivo:</span> {s.obj}</span>
                <button className="btn-outline btn-xs self-start" aria-expanded={isOpen} onClick={() => toggle(s.n)}>
                  {isOpen ? 'Ocultar passo a passo' : 'Como realizar'}
                  <IconChevron size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                </button>
                {isOpen && (
                  <div className="howto">
                    <ol className="howto-list">
                      {s.como.map((c, j) => <li key={j}><span className="howto-n">{j + 1}</span><span>{c}</span></li>)}
                    </ol>
                    <span className="howto-mat"><IconBox size={14} /><span><span className="ink">Materiais:</span> {s.mat}</span></span>
                  </div>
                )}
              </div>
              <span className="time-pill"><IconClock size={14} />{s.min} min</span>
            </li>
          );
        })}
      </ol>

      <div className="steps-foot"><span>{list.length} atividades</span><span>Total: {total} min</span></div>
    </section>
  );
}
