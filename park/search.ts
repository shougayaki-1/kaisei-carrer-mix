import { findSearchItems } from './search-data';
import { favoriteButton, getFavorites } from './favorites';
import './search.css';
const form=document.querySelector<HTMLFormElement>('#site-search-form')!;
const input=document.querySelector<HTMLInputElement>('#site-search-query')!;
const results=document.querySelector<HTMLElement>('#search-results')!;
const count=document.querySelector<HTMLElement>('#search-count')!;
const favoriteOnly=document.querySelector<HTMLInputElement>('#favorites-only')!;
const esc=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
function render():void {
 const selected=getFavorites(); const items=findSearchItems(input.value).filter(i=>!favoriteOnly.checked||selected.includes(i.id));
 count.textContent=`${items.length}件の結果`;
 results.innerHTML=items.map(i=>`<article class="search-card"><p class="search-category">${esc(i.category)}</p><h2><a href="${esc(i.href)}">${esc(i.title)}</a></h2><p>${esc(i.description)}</p><a href="${esc(i.href)}">詳細を見る →</a>${i.favorite?favoriteButton(i.id,i.title):''}</article>`).join('')||'<p>該当する結果がありません。キーワードを短くするか、お気に入りの絞り込みを解除して再検索してください。</p>';
}
const params=new URLSearchParams(location.search); input.value=params.get('q')||''; favoriteOnly.checked=params.get('favorites')==='1';
form.addEventListener('submit',e=>{e.preventDefault();const p=new URLSearchParams();if(input.value.trim())p.set('q',input.value.trim());if(favoriteOnly.checked)p.set('favorites','1');history.replaceState(null,'',location.pathname+(p.size?'?'+p:''));render();});
favoriteOnly.addEventListener('change',()=>form.requestSubmit());
window.addEventListener('favorites-changed',()=>{if(favoriteOnly.checked)render();});
render();
