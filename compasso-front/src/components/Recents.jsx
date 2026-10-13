export default function Recents({ items }) {
  return (
    <div className="card recents">
      <span className="recents-title">Continue de onde parou</span>
      {items.map((r) => (
        <a key={r.title} href="#" className="recent">
          <span className="recent-ano">{r.ano}</span>
          <span className="recent-text">
            <span className="recent-name">{r.title}</span>
            <span className="muted small">{r.when}</span>
          </span>
        </a>
      ))}
      <button className="btn-outline">+ Ver todos os planos</button>
    </div>
  );
}
