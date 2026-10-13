import { useEffect, useState } from 'react';
import Home from './pages/Home.jsx';
import Lesson from './pages/Lesson.jsx';

// Roteamento simples por hash: #/  ·  #/aula/:id
const parse = () => {
  const m = window.location.hash.match(/^#\/aula\/([\w-]+)/);
  return m ? { page: 'lesson', id: m[1] } : { page: 'home' };
};

export default function App() {
  const [route, setRoute] = useState(parse);
  useEffect(() => {
    const on = () => { setRoute(parse()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return route.page === 'lesson' ? <Lesson id={route.id} /> : <Home />;
}
