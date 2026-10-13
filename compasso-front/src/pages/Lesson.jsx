import { useState } from 'react';
import Header from '../components/Header.jsx';
import LessonSteps from '../components/LessonSteps.jsx';
import VideoPlayer from '../components/VideoPlayer.jsx';
import { OriginBadge } from '../components/ResultCard.jsx';
import { IconArrowLeft, IconBookmark, IconDownload, IconPlus, IconCheck } from '../icons.jsx';
import { LESSONS } from '../lessons.js';
import { ADAPT_COLOR, TIPO_BG } from '../data.js';

export default function Lesson({ id }) {
  const lesson = LESSONS[id];
  const [saved, setSaved] = useState(false);
  const [sent, setSent] = useState([]);

  if (!lesson) {
    return (
      <div className="page"><div className="shell">
        <Header active="Biblioteca" user={{ name: 'Ana Souza', initials: 'AS' }} />
        <div className="card empty"><div className="empty-title">Aula não encontrada</div><a href="#/">Voltar ao início</a></div>
      </div></div>
    );
  }

  const toggleSent = (i) => setSent((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  return (
    <div className="page">
      <div className="shell">
        <Header active="Biblioteca" user={{ name: 'Ana Souza', initials: 'AS' }} />

        <section className="lesson-hero">
          <div className="crumbs">
            <a href="#/" className="icon-btn icon-btn--sm" aria-label="Voltar"><IconArrowLeft /></a>
            <a href="#/" className="muted">Início</a><span>/</span><span>{lesson.unidade}</span><span>/</span><span className="ink">Frações</span>
          </div>
          <div className="lesson-hero-row">
            <div className="lesson-hero-text">
              <div className="badges">
                <OriginBadge origem={lesson.origem} />
                <span className="tipo" style={{ background: TIPO_BG[lesson.tipo] }}>{lesson.tipo}</span>
                <span className="tipo tipo--outline">{lesson.code} · {lesson.ano} ano</span>
                <span className="tipo tipo--outline">{lesson.dur}</span>
                {lesson.adapt.map((a) => (
                  <span key={a} className="adapt"><span className="dot" style={{ background: ADAPT_COLOR[a] }} />{a}</span>
                ))}
              </div>
              <h1 className="lesson-title">{lesson.title}</h1>
              <p className="lesson-summary">{lesson.resumo}</p>
            </div>
            <div className="lesson-actions">
              <button className="btn-outline btn-lg" onClick={() => setSaved((v) => !v)} aria-pressed={saved}>
                <IconBookmark size={15} fill={saved ? 'currentColor' : 'none'} />{saved ? 'Salva' : 'Salvar'}
              </button>
              <button className="btn-outline btn-lg"><IconDownload size={15} />Baixar PDF</button>
              <button className="btn-dark btn-lg"><IconPlus size={15} sw={2} />Usar com minha turma</button>
            </div>
          </div>
        </section>

        <div className="lesson-layout">
          <main className="lesson-main">
            <LessonSteps steps={lesson.steps} />

            <section className="results">
              <div className="section-head">
                <h2>Atividades para depois da aula</h2>
                <span className="muted small">Envie para a turma ou imprima</span>
              </div>
              <div className="results-grid results-grid--sm">
                {lesson.posAula.map((p, i) => {
                  const on = sent.includes(i);
                  return (
                    <article key={p.title} className="card result">
                      <div className="result-top">
                        <span className="tipo" style={{ background: p.bg }}>{p.tipo}</span>
                        <span className="muted small">{p.dur}</span>
                      </div>
                      <h3 className="result-title">{p.title}</h3>
                      <p className="result-desc">{p.desc}</p>
                      <button className={on ? 'btn-dark btn-sm self-start' : 'btn-outline btn-sm self-start'} onClick={() => toggleSent(i)}>
                        {on && <IconCheck size={13} sw={2.4} />}{on ? 'Enviada para a turma' : 'Enviar para a turma'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </main>

          <aside className="lesson-aside">
            <VideoPlayer video={lesson.video} />

            <section className="panel panel--tight">
              <h2 className="panel-title">Ao final, o aluno deve</h2>
              <ul className="check-list">
                {lesson.competencias.map((c) => (
                  <li key={c}><span className="check-dot"><IconCheck size={12} sw={3} /></span><span>{c}</span></li>
                ))}
              </ul>
              <span className="muted small panel-foot">Habilidade BNCC {lesson.code} · Unidade temática {lesson.unidade}</span>
            </section>

            <section className="panel panel--tight">
              <h2 className="panel-title">Como medir os resultados</h2>
              {lesson.metricas.map((m) => (
                <div key={m.title} className="metric">
                  <div className="metric-head">
                    <span className="metric-title">{m.title}</span>
                    <span className="meta-pill">Meta {m.meta}</span>
                  </div>
                  <span className="metric-desc">{m.desc}</span>
                  <span className="muted small">Instrumento: {m.inst}</span>
                </div>
              ))}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
