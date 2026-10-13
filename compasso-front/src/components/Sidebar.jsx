import { IconGrid, IconSearch, IconSparkle, IconCalendar, IconSliders } from '../icons.jsx';

const ITEMS = [
  { label: 'Início', Icon: IconGrid, active: true },
  { label: 'Buscar', Icon: IconSearch },
  { label: 'IA', Icon: IconSparkle },
  { label: 'Calendário', Icon: IconCalendar },
  { label: 'Configurações', Icon: IconSliders },
];

export default function Sidebar() {
  return (
    <aside className="rail">
      {ITEMS.map(({ label, Icon, active }) => (
        <button key={label} aria-label={label} className={'icon-btn' + (active ? ' icon-btn--active' : '')}>
          {active ? <Icon filled /> : <Icon />}
        </button>
      ))}
    </aside>
  );
}
