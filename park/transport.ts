import { areaById, type AreaId } from './areas-data';
import { findTransportRoute } from './transport-data';

const form = document.querySelector<HTMLFormElement>('#transport-form');
const result = document.querySelector<HTMLElement>('#transport-result');
const ids: AreaId[] = ['komatsu', 'fukui', 'katsuyama', 'wakasa', 'echizen'];
const valid = (value: string | null): value is AreaId => ids.some((id) => id === value);

function show(from: AreaId, to: AreaId): void {
  if (!result) return;
  result.replaceChildren();
  const heading = document.createElement('h3');
  heading.textContent = `${areaById[from].name} → ${areaById[to].name}`;
  result.append(heading);
  if (from === to) {
    const p = document.createElement('p'); p.textContent = '同じエリアが選ばれています。異なる出発地と目的地を選んでください。'; result.append(p); return;
  }
  const list = document.createElement('ol');
  findTransportRoute(from, to).forEach(({ leg, outward }) => {
    const li = document.createElement('li');
    li.textContent = outward ? leg.outward : leg.returnTrip;
    const link = document.createElement('a'); link.href = leg.source.url; link.textContent = ` ${leg.source.label}`; link.target = '_blank'; link.rel = 'noopener noreferrer'; li.append(link); list.append(li);
  });
  result.append(list);
  const note = document.createElement('p');
  note.textContent = '福井駅経由の計画例です。より適した経路は行き先や運行状況で変わります。架空施設の所在地は未定です。'; result.append(note);
}
if (form && result) {
  const from = form.elements.namedItem('from') as HTMLSelectElement;
  const to = form.elements.namedItem('to') as HTMLSelectElement;
  const params = new URLSearchParams(location.search);
  if (valid(params.get('from'))) from.value = params.get('from')!;
  if (valid(params.get('to'))) to.value = params.get('to')!;
  const update = () => { if (valid(from.value) && valid(to.value)) show(from.value, to.value); };
  form.addEventListener('submit', (event) => { event.preventDefault(); update(); });
  update();
}
