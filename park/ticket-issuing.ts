import './ticket-issuing.css';

// A modal keeps the page inert while the souvenir ticket is being prepared.
export function showTicketIssuing(english: boolean): Promise<void> {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dialog = document.createElement('dialog');
  dialog.className = 'ticket-issuing';
  dialog.setAttribute('aria-labelledby', 'issuing-title');
  dialog.innerHTML = `<div class="issuing-scenes" aria-hidden="true"></div><div class="issuing-content"><p class="issuing-brand">FUKUI DINOSAUR PARK</p><p class="issuing-kicker">YOUR ADVENTURE IS ALMOST READY</p><h2 id="issuing-title" role="status" aria-live="polite">${english ? 'Preparing your adventure…' : '冒険の準備中…'}</h2><button class="issuing-skip" type="button">${english ? 'Skip animation' : '演出をスキップ'}</button></div>`;
  document.body.append(dialog);
  const status = dialog.querySelector<HTMLElement>('#issuing-title')!;
  const scenes = dialog.querySelector<HTMLElement>('.issuing-scenes')!;
  const timers: number[] = [];
  return new Promise(resolve => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      dialog.close();
      dialog.remove();
      resolve();
    };
    dialog.querySelector('button')!.addEventListener('click', finish);
    dialog.addEventListener('cancel', event => { event.preventDefault(); finish(); });
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('button')!.focus();
    if (reduced) {
      timers.push(window.setTimeout(finish, 100));
      return;
    }
    ['city', 'fossil', 'ocean', 'coast', 'flight'].forEach((name, index) => {
      timers.push(window.setTimeout(() => {
        const image = document.createElement('img');
        image.alt = '';
        image.src = `/park/assets/${name}.webp`;
        image.className = `issuing-photo issuing-photo-${index + 1}`;
        scenes.append(image);
      }, index * 420));
    });
    timers.push(window.setTimeout(() => { status.textContent = english ? 'Creating your ticket…' : 'チケットを作成中…'; }, 1200));
    timers.push(window.setTimeout(() => { status.textContent = english ? 'Your ticket is ready' : '発券完了'; dialog.classList.add('is-complete'); }, 2700));
    timers.push(window.setTimeout(finish, 3400));
  });
}
