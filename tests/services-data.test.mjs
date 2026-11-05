import test from 'node:test';
import assert from 'node:assert/strict';
import {services,faqs,renderFAQs,renderServices} from '../park/services-data.ts';
test('services cover the seven categories and FAQs retain related links',()=>{
 assert.equal(services.length,7);assert.equal(new Set(services.map(s=>s.id)).size,7);
 assert.ok(faqs.length>=10 && faqs.length<=15);
 for(const s of services){assert.ok(s.areas.length);assert.ok(s.location&&s.content&&s.conditions&&s.hours);assert.ok(s.links.length);assert.ok(renderServices().includes(`id="${s.id}"`));}
 for(const f of faqs){assert.ok(f.category&&f.question&&f.answer&&f.href.startsWith('/park/'));assert.ok(renderFAQs().includes(f.question));}
});
