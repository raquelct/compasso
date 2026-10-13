export default function NextLesson({ lesson }) {
  return (
    <>
      <div className="aside-head">
        <h2>Próxima aula</h2>
        <span className="muted">{lesson.when}</span>
      </div>
      <a href="#" className="next-card">
        <div className="next-glow" />
        <div className="next-top">
          <span>{lesson.turma}</span>
          <span className="next-code">{lesson.code}</span>
        </div>
        <div className="next-bottom">
          <span className="next-title">{lesson.title}</span>
          <div className="next-meta"><span>{lesson.status}</span><span>Abrir →</span></div>
        </div>
      </a>
    </>
  );
}
