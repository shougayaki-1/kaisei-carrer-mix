import { areaById, parkAreas, type AreaId, type ParkArea } from './areas-data';
import './area-map.css';

/**
 * Select an area without relying on the map image itself: both map pins and
 * accessible text links target the same permanent #area-... sections.
 */
const explorer = document.querySelector<HTMLElement>('#geo-explorer');
if (explorer) {
  const pins = Array.from(explorer.querySelectorAll<HTMLAnchorElement>('[data-geo-pin]'));
  const indexLinks = Array.from(explorer.querySelectorAll<HTMLAnchorElement>('[data-geo-index]'));
  const cards = Array.from(document.querySelectorAll<HTMLElement>('[data-area-card]'));
  const get = (id:string) => document.getElementById(id);

  function put(id:string, text:string):void {
    const el = get(id);
    if(el) el.textContent = text;
  }
  function select(area:ParkArea):void {
    pins.forEach(pin=>{
      const active = pin.dataset.geoPin === area.id;
      pin.classList.toggle('is-active',active);
      if(active) pin.setAttribute('aria-current','location');
      else pin.removeAttribute('aria-current');
    });
    indexLinks.forEach(link=>{
      const active = link.dataset.geoIndex === area.id;
      link.classList.toggle('is-active',active);
      if(active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
    cards.forEach(card=>card.classList.toggle('is-active',card.dataset.areaCard===area.id));
    const img = document.querySelector<HTMLImageElement>('#geo-selected-image');
    if(img){img.src=area.image;img.alt=area.imageAlt;}
    put('geo-selected-index', String(area.order).padStart(2,'0')+' / 05');
    put('geo-selected-english',area.english);
    put('geo-selected-location',area.prefecture+' ・ '+area.locationNote);
    put('geo-selected-title',area.name);
    put('geo-selected-tagline',area.tagline);
    put('geo-selected-description',area.description);
    put('geo-selected-attractions',area.attractionNames.join(' / '));
    put('geo-selected-visit',area.suggestedVisit);
    put('geo-selected-caption',area.imageCaption);
    const detail = document.querySelector<HTMLAnchorElement>('#geo-selected-detail-link');
    if(detail)detail.href='#area-'+area.id;
  }
  function idFromHash():AreaId|null{
    const match = /^#area-(komatsu|fukui|katsuyama|wakasa|echizen)$/.exec(location.hash);
    return match ? match[1] as AreaId : null;
  }
  pins.forEach(pin=>pin.addEventListener('click',event=>{
    const id = pin.dataset.geoPin as AreaId;
    if(!areaById[id])return;
    event.preventDefault();
    select(areaById[id]);
    // Keep a shareable area URL while leaving focus on the map controls.
    history.replaceState(null,'','#area-'+id);
  }));
  indexLinks.forEach(link=>link.addEventListener('click',()=>{
    const area=areaById[link.dataset.geoIndex as AreaId];
    if(area)select(area);
  }));
  document.querySelectorAll<HTMLAnchorElement>('[data-geo-select]').forEach(link=>{
    link.addEventListener('click',event=>{
      const area=areaById[link.dataset.geoSelect as AreaId];
      if(!area)return;
      event.preventDefault();
      select(area);
      history.replaceState(null,'','#area-'+area.id);
      document.querySelector('#geo-explorer')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      pins.find(pin=>pin.dataset.geoPin===area.id)?.focus({preventScroll:true});
    });
  });
  window.addEventListener('hashchange',()=>{
    const id=idFromHash();
    if(id)select(areaById[id]);
  });
  select(areaById[idFromHash() ?? 'komatsu']);
  // IDs are a stable data contract for attraction/venue/itinerary/transit modules.
  void parkAreas;
}
