import { IconSparkle, IconCheck } from '../icons.jsx';
import { TIPO_BG, ADAPT_COLOR } from '../data.js';

export function OriginBadge({ origem }) {
  return origem === 'ia'
    ? <span className="origin origin--ia"><IconSparkle size={13} sw={2} />Gerada por IA</span>
    : <span className="origin origin--equipe"><IconCheck size={13} sw={2.2} />Equipe Compasso</span>;
}

export default function ResultCard({ item }) {
  const open = () => { if (item.lessonId) window.location.hash = `#/aula/${item.lessonId}`; };
  return (
    <article className="card result" tabIndex={0} onClick={open} onKeyDown={(e) => e.key === 'Enter' && open()}>
      <div className="result-top">
        <OriginBadge origem={item.origem} />
        <span className="tipo" style={{ background: TIPO_BG[item.tipo] }}>{item.tipo}</span>
      </div>
      <h3 className="result-title">{item.title}</h3>
      <p className="result-desc">{item.desc}</p>
      {item.adapt.length > 0 && (
        <div className="result-adapts">
          {item.adapt.map((a) => (
            <span key={a} className="adapt"><span className="dot" style={{ background: ADAPT_COLOR[a] }} />{a}</span>
          ))}
        </div>
      )}
      <div className="result-foot">
        <span>{item.code} · {item.ano} ano</span>
        <span>{item.dur}</span>
      </div>
    </article>
  );
}
