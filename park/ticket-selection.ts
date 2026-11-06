import type { PassId } from './schedule-data';
import type { AgeType } from './ticket-data';

export interface TicketSelection { pass: PassId; quantity: Record<AgeType, number> }
const defaults: TicketSelection = {pass:'day',quantity:{adult:1,junior:0,child:0}};
const ages: readonly AgeType[] = ['adult','junior','child'];

/** Only accept the same pass IDs and 0–9 guest counts as the simulator. */
export function readTicketSelection(params: URLSearchParams): TicketSelection {
 const candidate = params.get('pass');
 const pass: PassId = candidate === 'two' || candidate === 'night' ? candidate : 'day';
 const quantity = {...defaults.quantity};
 for (const age of ages) {
  const value=params.get(age);
  if (value !== null && /^[0-9]$/.test(value)) quantity[age]=Number(value);
 }
 return {pass, quantity};
}

/** Change only ticket parameters; preserve the language, date, fragment and other state. */
export function writeTicketSelection(url: URL, selection: TicketSelection): URL {
 const next = new URL(url.href);
 next.searchParams.set('pass', selection.pass);
 for (const age of ages) next.searchParams.set(age, String(selection.quantity[age]));
 return next;
}
