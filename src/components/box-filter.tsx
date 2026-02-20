export type BoxFilterType = 'all' | 'empty' | 'using' | 'broken';

type FilterButton = {
  key: BoxFilterType;
  label: string;
};

const FILTER_BUTTONS: FilterButton[] = [
  { key: 'all', label: '전체' },
  { key: 'empty', label: '비어있음' },
  { key: 'using', label: '사용중' },
  { key: 'broken', label: '고장' },
];

type BoxFilterProps = {
  activeFilters: BoxFilterType[];
  onToggle: (filter: BoxFilterType) => void;
};

export default function BoxFilter({ activeFilters, onToggle }: BoxFilterProps) {
  return (
    <header className="flex items-center gap-2 border bg-white px-3 py-2">
      {FILTER_BUTTONS.map((button) => (
        <button
          key={button.key}
          type="button"
          aria-pressed={activeFilters.includes(button.key)}
          className={[
            'rounded-md border px-3 py-1 text-sm font-medium transition-colors',
            activeFilters.includes(button.key)
              ? 'border-zinc-900 bg-zinc-900 text-white'
              : 'border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100',
          ].join(' ')}
          onClick={() => onToggle(button.key)}
        >
          {button.label}
        </button>
      ))}
    </header>
  );
}
