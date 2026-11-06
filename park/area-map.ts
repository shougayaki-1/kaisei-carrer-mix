import { areaById, parkAreas, type AreaId, type ParkArea } from './areas-data';
import './area-map.css';
import { getLanguage } from './language';
const en = getLanguage() === 'en' && document.documentElement.lang === 'en';
const english:Record<AreaId,{name:string;location:string;tagline:string;description:string;attractions:string;visit:string;caption:string}> = {
 komatsu:{name:'Komatsu Airport',location:'Ishikawa Prefecture, outside Fukui',tagline:'Begin your imagined adventure.',description:'Skyport is a fictional simulator, not actual airport transport.',attractions:'Dinosaur Skyport',visit:'Plan actual transport to Fukui Station.',caption:'A fictional ride concept, not a transport service.'},
 fukui:{name:'Fukui Station',location:'Fukui Prefecture',tagline:'The imagined city gateway.',description:'Explore a dinosaur, a pterosaur flight and a night show in the fictional city.',attractions:'Inside the Dinosaur / Sky Over Fukui / Night of the Giants',visit:'Use real transport to reach other areas.',caption:'An imagined Fukui Station area.'},
 katsuyama:{name:'Katsuyama',location:'Fukui Prefecture',tagline:'Discover fossils and geology.',description:'A simulated fossil lab inspired by Katsuyama’s fossil sites.',attractions:'Fossil Frontier',visit:'Check rail and local transport connections.',caption:'A simulated excavation concept.'},
 wakasa:{name:'Wakasa Bay',location:'Fukui Prefecture, near Obama',tagline:'Discover ancient seas.',description:'A fictional exhibit introduces marine reptiles, including plesiosaurs and mosasaurs, which were not dinosaurs.',attractions:'Dino Ocean',visit:'Plan onward and return transport around the broad bay.',caption:'An imagined marine exhibit.'},
 echizen:{name:'Echizen Coast',location:'Fukui Prefecture',tagline:'Explore the coast through time.',description:'A planned outdoor walk combines coastal landforms and imagined AR.',attractions:'Jurassic Coast',visit:'Check weather, waves and return transport.',caption:'A fictional coastal experience.'}
};

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
    const translated = english[area.id];
    const img = document.querySelector<HTMLImageElement>('#geo-selected-image');
    if(img){img.src=area.image;img.alt=en ? translated.caption : area.imageAlt;}
    put('geo-selected-index', String(area.order).padStart(2,'0')+' / 05');
    put('geo-selected-english',area.english);
    put('geo-selected-location',en ? translated.location : area.prefecture+' ・ '+area.locationNote);
    put('geo-selected-title',en ? translated.name : area.name);
    put('geo-selected-tagline',en ? translated.tagline : area.tagline);
    put('geo-selected-description',en ? translated.description : area.description);
    put('geo-selected-attractions',en ? translated.attractions : area.attractionNames.join(' / '));
    put('geo-selected-visit',en ? translated.visit : area.suggestedVisit);
    put('geo-selected-caption',en ? translated.caption : area.imageCaption);
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
    if (location.hash !== '#area-'+id) history.pushState(null,'','#area-'+id);
  }));
  indexLinks.forEach(link=>link.addEventListener('click',event=>{
    const area=areaById[link.dataset.geoIndex as AreaId];
    if(!area)return;
    event.preventDefault();
    select(area);
    if (location.hash !== '#area-'+area.id) history.pushState(null,'','#area-'+area.id);
  }));
  document.querySelectorAll<HTMLAnchorElement>('[data-geo-select]').forEach(link=>{
    link.addEventListener('click',event=>{
      const area=areaById[link.dataset.geoSelect as AreaId];
      if(!area)return;
      event.preventDefault();
      select(area);
      if (location.hash !== '#area-'+area.id) history.pushState(null,'','#area-'+area.id);
      document.querySelector('#geo-explorer')?.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
      pins.find(pin=>pin.dataset.geoPin===area.id)?.focus({preventScroll:true});
    });
  });
  window.addEventListener('hashchange',()=>{
    const id=idFromHash();
    select(areaById[id ?? 'komatsu']);
  });
  select(areaById[idFromHash() ?? 'komatsu']);
  // IDs are a stable data contract for attraction/venue/itinerary/transit modules.
  void parkAreas;
}
