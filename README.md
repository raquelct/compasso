# Compasso

> Assistente para professores de Matemática do 6º ao 9º ano: encontra materiais alinhados à BNCC e adapta cada conteúdo para o cotidiano dos alunos.

## 🎬 Vídeo do protótipo

https://github.com/raquelct/compasso/raw/main/video/compasso.mp4

[▶️ Assistir ao vídeo do protótipo](video/compasso.mp4)

---

## O problema

Alunos do 6º ao 9º ano rejeitam a matemática: os conteúdos são abstratos e eles não enxergam aplicação no dia a dia, principalmente quando entram álgebra e funções. O professor quer tornar a aula mais prática, mas tem várias turmas, pouco tempo de planejamento e nenhum modelo de atividade pronto, organizado por habilidade da BNCC. Por isso, volta para aulas expositivas que não engajam a turma.

## A solução

O Compasso reúne em um só fluxo a busca, a curadoria e a adaptação:

1. **Busca pela BNCC.** O professor pesquisa por tema (ex.: "frações") ou pelo código da habilidade e filtra pelo ano escolar. As habilidades vêm da [BNCC API](https://bncc.api.br).
2. **Curadoria de conteúdos.** Para a habilidade escolhida, o Compasso lista materiais do **Portal da OBMEP** e da **Khan Academy**, com nome, resumo e link.
   - Os itens da OBMEP saem do catálogo real do portal: o modelo só escolhe e resume, então todo link é verificado.
   - Os itens da Khan Academy são sugestões do modelo, marcadas como não verificadas e com link para a busca do próprio site.
3. **Adaptação pedagógica com IA.** Escolhido um conteúdo, o Compasso gera:
   - **Matemática no cotidiano:** de 3 a 5 situações práticas (compras, receitas, esportes, trajetos), cada uma com uma pergunta para a turma e uma atividade curta.
   - **Adaptações por neurodivergência:** estratégias específicas para TEA, TDAH, dislexia, discalculia e altas habilidades, além de outros perfis citados pelo professor nas observações sobre a turma.
4. **Página da aula.** O professor vê o resumo, o passo a passo, o vídeo, as competências da BNCC e as métricas da aula.

A geração usa um modelo de linguagem hospedado no **Quiver (ALIA)**, guiado pelos prompts em [compasso-back/prompts/](compasso-back/prompts/).

## Arquitetura

```
┌────────────────────┐      HTTP/JSON      ┌──────────────────────┐
│  compasso-front    │ ──────────────────▶ │  compasso-back       │
│  React + Vite      │                     │  FastAPI             │
└────────────────────┘                     └──────────┬───────────┘
                                                      │
                         ┌────────────────────────────┼────────────────────────┐
                         ▼                            ▼                        ▼
                  ┌─────────────┐            ┌─────────────────┐      ┌────────────────┐
                  │  BNCC API   │            │ Portal da OBMEP │      │ Quiver (ALIA)  │
                  │ habilidades │            │    catálogo     │      │   modelo LLM   │
                  └─────────────┘            └─────────────────┘      └────────────────┘
```

| Pasta | Descrição |
|---|---|
| [compasso-back/](compasso-back/) | API em FastAPI: busca na BNCC, listagem de conteúdos e geração das adaptações |
| [compasso-front/](compasso-front/) | Protótipo da interface em React: tela inicial, busca, filtros e página da aula |
| [video/](video/) | Vídeo de demonstração do protótipo |

## Como rodar

### Backend

```bash
cd compasso-back
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env   # preencha BNCC_API_KEY, QUIVER_API_KEY e QUIVER_MODEL
.venv/bin/uvicorn app.main:app --reload
```

A documentação interativa fica em http://localhost:8000/docs.

### Frontend

```bash
cd compasso-front
npm install
npm run dev
```

O [README do backend](compasso-back/README.md) traz os endpoints e as variáveis de ambiente, e o [README do frontend](compasso-front/README.md) traz a estrutura de componentes.

## Tecnologias

- **Backend:** Python, FastAPI, httpx, Pydantic
- **Frontend:** React 18, Vite
- **IA:** modelo Qwen via Quiver (ALIA)
- **Fontes de dados:** BNCC API, Portal da OBMEP, Khan Academy

## Limitações atuais

- O frontend ainda usa dados estáticos (`data.js` e `lessons.js`) e não está ligado à API.
- Buscas e adaptações ficam em memória no backend e se perdem quando o servidor reinicia.
- Os códigos BNCC exibidos no protótipo do frontend são ilustrativos.
