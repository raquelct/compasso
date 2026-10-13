import { useEffect, useRef, useState } from 'react';
import { IconPlay, IconPause } from '../icons.jsx';

const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

/** Se video.src existir, usa <video>; senão simula a reprodução (protótipo). */
export default function VideoPlayer({ video }) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const ref = useRef(null);
  const D = video.duration;

  useEffect(() => {
    if (!playing || video.src) return;
    const iv = setInterval(() => setT((x) => {
      if (x + 1 >= D) { setPlaying(false); return D; }
      return x + 1;
    }), 1000);
    return () => clearInterval(iv);
  }, [playing, video.src, D]);

  const toggle = () => {
    if (video.src && ref.current) { playing ? ref.current.pause() : ref.current.play(); }
    if (!playing && t >= D) setT(0);
    setPlaying((p) => !p);
  };
  const seek = (sec) => { setT(sec); if (ref.current) ref.current.currentTime = sec; };

  return (
    <section className="panel panel--video">
      <div className="video">
        {video.src && <video ref={ref} src={video.src} onTimeUpdate={(e) => setT(e.target.currentTime)} className="video-el" />}
        <div className="video-glow" />
        <span className="video-tag">Vídeo para o professor · {fmt(D)}</span>
        <button className="video-play" onClick={toggle} aria-label={playing ? 'Pausar' : 'Reproduzir'}>
          {playing ? <IconPause /> : <IconPlay />}
        </button>
        <div className="video-bottom">
          <span className="video-title">{video.title}</span>
          <div className="video-progress">
            <span>{fmt(t)}</span>
            <div className="video-track"><div style={{ width: `${(t / D) * 100}%` }} /></div>
            <span>{fmt(D)}</span>
          </div>
        </div>
      </div>
      <div className="chapters">
        {video.chapters.map((c, i) => {
          const next = video.chapters[i + 1]?.t ?? D + 1;
          const on = t > 0 && t >= c.t && t < next;
          return (
            <button key={c.t} className={'chapter' + (on ? ' is-on' : '')} onClick={() => seek(c.t)}>
              <span className="muted small chapter-t">{fmt(c.t)}</span><span>{c.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
