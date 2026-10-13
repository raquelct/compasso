import { useEffect, useRef } from 'react';
import { IconChevron, IconCheck } from '../icons.jsx';

/**
 * Dropdown de filtro.
 * multi=false → value é string|null; multi=true → value é string[]
 */
export default function FilterDropdown({ label, options, value, onChange, multi = false, emptyText, open, onOpenChange, formatOption = (o) => o, dots }) {
  const ref = useRef(null);
  const selected = multi ? value : value ? [value] : [];
  const active = selected.length > 0;

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onOpenChange(false); };
    const onKey = (e) => { if (e.key === 'Escape') onOpenChange(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open, onOpenChange]);

  const summary = !active ? emptyText
    : multi ? (selected.length === 1 ? formatOption(selected[0]) : `${selected.length} selecionados`)
    : formatOption(value);

  const pick = (o) => {
    if (multi) onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
    else { onChange(value === o ? null : o); onOpenChange(false); }
  };

  return (
    <div className="dd" ref={ref}>
      <span className="field-label">{label}</span>
      <button
        type="button"
        className={'dd-trigger' + (active ? ' is-active' : '') + (open ? ' is-open' : '')}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        <span className="dd-summary">{summary}</span>
        {multi && selected.length > 1 && <span className="dd-count">{selected.length}</span>}
        <IconChevron size={16} />
      </button>
      {open && (
        <div className="dd-menu" role="listbox" aria-multiselectable={multi}>
          {options.map((o) => {
            const on = selected.includes(o);
            return (
              <button key={o} type="button" role="option" aria-selected={on} className={'dd-option' + (on ? ' is-on' : '')} onClick={() => pick(o)}>
                <span className={'dd-mark' + (multi ? ' dd-mark--box' : '')}>{on && <IconCheck size={11} sw={3.2} />}</span>
                <span className="dd-option-label">{formatOption(o)}</span>
                {dots && <span className="dot" style={{ background: dots[o] }} />}
              </button>
            );
          })}
          <div className="dd-footer">
            <button type="button" className="link-btn" onClick={() => onChange(multi ? [] : null)}>Limpar</button>
            <button type="button" className="btn-dark btn-sm" onClick={() => onOpenChange(false)}>Aplicar</button>
          </div>
        </div>
      )}
    </div>
  );
}
