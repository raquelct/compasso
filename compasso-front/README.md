# Compasso — Tela inicial (React)

Protótipo da tela inicial para professores de Matemática (6º ao 9º ano).

## Rodar
```
npm install
npm run dev
```

## Estrutura
- `src/App.jsx` — roteamento por hash (`#/` início · `#/aula/:id` aula)
- `src/pages/Home.jsx` — busca, filtros (dropdowns), resultados, próxima aula e recentes
- `src/pages/Lesson.jsx` — detalhe da aula: resumo, estrutura com passo a passo, vídeo, competências, métricas e pós-aula
- `src/data.js` — materiais da busca · `src/lessons.js` — conteúdo das aulas
- `src/components/` — Header, Sidebar, SearchPanel, FilterDropdown, ResultCard, NextLesson, Recents, LessonSteps, VideoPlayer
- `src/icons.jsx` — ícones · `src/styles.css` — estilos

## Integração
`ITEMS` em `data.js` é estático. Cada item tem `origem: 'equipe' | 'ia'`, que define o selo do card.
Cards com `lessonId` abrem a página da aula. Em `lessons.js`, `video.src` aceita a URL do vídeo; sem ela, o player simula a reprodução.
Os códigos BNCC são ilustrativos — validar antes de produção.
