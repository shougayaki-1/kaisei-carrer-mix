import { getLanguage } from './language';
const isEnglish = ():boolean => getLanguage() === 'en' && document.documentElement.lang === 'en';
const key='fdc-favorites-v1';
export function getFavorites(): string[] { try { const value=JSON.parse(localStorage.getItem(key)||'[]'); return Array.isArray(value)?value.filter((x):x is string=>typeof x==='string'):[]; } catch { return []; } }
export function favoriteButton(id:string, title:string):string {
 const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
 const active=getFavorites().includes(id);
 return `<button type="button" class="favorite-button" data-favorite="${escape(id)}" data-favorite-title="${escape(title)}" aria-pressed="${active}" aria-label="${isEnglish() ? (active ? 'Remove '+escape(title)+' from favorites' : 'Add '+escape(title)+' to favorites') : escape(title)+'をお気に入り'+(active?'から削除':'に追加')}">${isEnglish() ? (active?'Saved':'Add to favorites') : (active?'お気に入り済み':'お気に入りに追加')}</button>`;
}
document.addEventListener('click',event=>{
 const button=(event.target as Element).closest<HTMLButtonElement>('[data-favorite]'); if(!button)return;
 const id=button.dataset.favorite; if(!id)return;
 const old=getFavorites(); const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];
 try { localStorage.setItem(key,JSON.stringify(next)); } catch { window.alert(isEnglish()?'Could not save favorites. Check your browser storage settings.':'お気に入りを保存できません。ブラウザの保存設定を確認してください。'); return; }
 document.querySelectorAll<HTMLButtonElement>('[data-favorite]').forEach(b=>{const active=next.includes(b.dataset.favorite||'');b.setAttribute('aria-pressed',String(active));b.textContent=isEnglish()?(active?'Saved':'Add to favorites'):(active?'お気に入り済み':'お気に入りに追加');b.setAttribute('aria-label',isEnglish() ? `${active?'Remove':'Add'} ${b.dataset.favoriteTitle} ${active?'from':'to'} favorites` : `${b.dataset.favoriteTitle}をお気に入り${active?'から削除':'に追加'}`);});
 window.dispatchEvent(new Event('favorites-changed'));
});
