/** Local, fixed-destination QR and PNG artwork for fictional tickets. No personal data is encoded. */
export const PARK_SITE_URL = 'https://mix.kaisei.shoug.org/park/';

/**
 * ISO/IEC 18004 QR matrix (version 4, error correction Q), encoded for
 * PARK_SITE_URL with a local QR encoder. The four-module quiet zone is
 * added while drawing. A fixed matrix avoids third-party calls/dependencies.
 */
export const PARK_QR_ROWS = [
  '111111100101011100100010001111111',
  '100000101000010001011110001000001',
  '101110100111100001110011101011101',
  '101110101111100000010001001011101',
  '101110101101100010101101101011101',
  '100000100100001110001011001000001',
  '111111101010101010101010101111111',
  '000000001011101000011010100000000',
  '010111101110001101010000111011010',
  '010101011011110000010011000011100',
  '100001110101001001100101101011111',
  '011001010111000101010000010100101',
  '110011111100011011111110101100000',
  '011100000000111001010110000101000',
  '110100101011111000100111101111000',
  '000101011010100010110001010011101',
  '000111100001001001110010111110000',
  '110001010111010100111100101010101',
  '000011111110110110111001111101111',
  '100111001001111101000100110011100',
  '101000101111011111001101100001000',
  '111100011100010011001010100110100',
  '100110101011110100000001010011011',
  '101100010011011100100000010100101',
  '110101101000001111111000111111011',
  '000000001100110100001001100010110',
  '111111100110011010111111101010100',
  '100000101000110001101001100011111',
  '101110101101001111011101111110011',
  '101110101011011111001000110100101',
  '101110100110011010101101010110011',
  '100000101010011100000010010110111',
  '111111100001000011000000101110000',
] as const;

export interface IssuedTicketArtwork {
  code: string;
  date: string;
  pass: string;
  guests: number;
  total: number;
}

const NAVY = '#092b45';
const GOLD = '#dfb65b';
const DARK = '#19374c';
const SIZE = PARK_QR_ROWS.length;
const BORDER = 4;
let currentTicket: IssuedTicketArtwork | null = null;
let pngFile: File | null = null;
let pngUrl: string | null = null;

const copy = (ja: string, en: string, english: boolean): string => english ? en : ja;
const escapeHtml = (text: string): string => text.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char] || char));

/** Render the precomputed local QR with a four-module white quiet zone. */
export function ticketQrSvg(english: boolean): string {
  const paths: string[] = [];
  PARK_QR_ROWS.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '1') paths.push('M' + (x + BORDER) + ' ' + (y + BORDER) + 'h1v1h-1z');
    }
  });
  const dimension = SIZE + BORDER * 2;
  return '<svg class="ticket-site-qr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + dimension + ' ' + dimension +
    '" role="img" aria-label="' + copy('パーク公式サイトに移動するQRコード', 'QR code linking to the park website', english) +
    '" shape-rendering="crispEdges"><rect width="' + dimension + '" height="' + dimension + '" fill="white"/><path fill="' +
    NAVY + '" d="' + paths.join('') + '"/></svg>';
}

export function ticketCardMarkup(ticket: IssuedTicketArtwork, english: boolean): string {
  const guests = ticket.guests.toLocaleString(english ? 'en-US' : 'ja-JP') + copy('名', ' guests', english);
  const price = copy(ticket.total.toLocaleString('ja-JP') + '円', '¥' + ticket.total.toLocaleString('en-US'), english);
  const detail = (label: string, value: string): string =>
    '<div><dt>' + label + '</dt><dd>' + escapeHtml(value) + '</dd></div>';
  return '<article class="issued-ticket-card" id="ticket-artwork" tabindex="-1" aria-label="' +
    copy('体験用記念チケット', 'Fictional souvenir ticket', english) + '">' +
    '<header class="issued-ticket-header"><div><span class="issued-ticket-series">SOUVENIR / DEMO TICKET</span>' +
    '<strong>FUKUI DINO CITY</strong></div><span class="issued-ticket-demo">DEMO</span></header>' +
    '<div class="issued-ticket-body"><div class="issued-ticket-info"><span class="issued-ticket-label">' +
    copy('パスの種類', 'PASS TYPE', english) + '</span><h3>' + escapeHtml(ticket.pass) + '</h3>' +
    '<dl class="issued-ticket-facts">' +
    detail(copy('来場予定日', 'DATE', english), ticket.date) +
    detail(copy('人数', 'GUESTS', english), guests) +
    detail(copy('体験用金額', 'DEMO TOTAL', english), price) +
    '</dl><div class="issued-ticket-reference"><small>' + copy('体験用受付番号', 'DEMO REFERENCE', english) + '</small><strong>' +
    escapeHtml(ticket.code) + '</strong></div></div>' +
    '<div class="issued-ticket-qr-area">' + ticketQrSvg(english) +
    '<strong>' + copy('パークサイトを見る', 'VISIT PARK WEBSITE', english) + '</strong>' +
    '<span>' + copy('サイト案内用QR・入場スキャン不可', 'Website QR only — not an entry code', english) + '</span>' +
    '<a href="' + PARK_SITE_URL + '" target="_blank" rel="noopener noreferrer">' + PARK_SITE_URL + '</a></div></div>' +
    '<footer class="issued-ticket-footer">SAMPLE / NOT VALID FOR ENTRY<span>' +
    copy('WEB記念チケット画像です。実際の購入・予約・入場には対応していません。', 'Fictional souvenir only. No purchase, booking or admission.', english) +
    '</span></footer></article>';
}

function drawQr(ctx: CanvasRenderingContext2D, x: number, y: number, moduleSize: number): void {
  const side = (SIZE + BORDER * 2) * moduleSize;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y, side, side);
  ctx.fillStyle = NAVY;
  PARK_QR_ROWS.forEach((row, index) => {
    for (let col = 0; col < row.length; col++) {
      if (row[col] === '1') ctx.fillRect(x + (col + BORDER) * moduleSize, y + (index + BORDER) * moduleSize, moduleSize, moduleSize);
    }
  });
}

function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, size: number, bold = false): void {
  let fontSize = size;
  const family = '"Noto Sans JP", "Barlow Condensed", sans-serif';
  do {
    ctx.font = (bold ? '800 ' : '600 ') + fontSize + 'px ' + family;
    if (ctx.measureText(text).width <= maxWidth) break;
    fontSize -= 2;
  } while (fontSize > 20);
  ctx.fillText(text, x, y, maxWidth);
}

/** All text and QR modules are drawn directly, avoiding CORS and DOM screenshots. */
export function ticketCanvas(ticket: IssuedTicketArtwork, english: boolean): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 960;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D is not available');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1400, 960);
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 0, 1400, 12);
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 12, 1400, 162);
  ctx.fillStyle = '#f7d989';
  drawText(ctx, 'SOUVENIR / DEMO TICKET', 90, 66, 850, 24, true);
  ctx.fillStyle = '#ffffff';
  drawText(ctx, 'FUKUI DINO CITY', 90, 130, 900, 65, true);
  ctx.fillStyle = GOLD;
  ctx.fillRect(1142, 57, 165, 57);
  ctx.fillStyle = NAVY;
  drawText(ctx, 'DEMO', 1180, 96, 125, 32, true);
  ctx.fillStyle = '#718391';
  drawText(ctx, copy('パスの種類', 'PASS TYPE', english), 92, 251, 790, 24, true);
  ctx.fillStyle = DARK;
  drawText(ctx, ticket.pass, 92, 326, 796, 57, true);
  ctx.fillStyle = '#d7e0e6';
  ctx.fillRect(90, 373, 802, 2);
  const guests = ticket.guests.toLocaleString(english ? 'en-US' : 'ja-JP') + copy('名', ' guests', english);
  const total = copy(ticket.total.toLocaleString('ja-JP') + '円', '¥' + ticket.total.toLocaleString('en-US'), english);
  const facts: Array<[string, string, number]> = [
    [copy('来場予定日', 'DATE', english), ticket.date, 428],
    [copy('人数', 'GUESTS', english), guests, 540],
    [copy('体験用金額', 'DEMO TOTAL', english), total, 652]
  ];
  for (const [label, value, y] of facts) {
    ctx.fillStyle = '#6a7b88';
    drawText(ctx, label, 92, y, 730, 23, true);
    ctx.fillStyle = DARK;
    drawText(ctx, value, 92, y + 49, 750, 41, true);
  }
  ctx.fillStyle = '#6a7b88';
  drawText(ctx, copy('体験用受付番号', 'DEMO REFERENCE', english), 92, 765, 790, 23, true);
  ctx.fillStyle = DARK;
  drawText(ctx, ticket.code, 92, 813, 790, 34, true);
  drawQr(ctx, 975, 268, 8);
  ctx.textAlign = 'center';
  ctx.fillStyle = NAVY;
  drawText(ctx, copy('パークサイトを見る', 'VISIT PARK WEBSITE', english), 1139, 652, 350, 25, true);
  ctx.fillStyle = '#4e6879';
  drawText(ctx, copy('サイト案内用・入場スキャン不可', 'Website QR only / not for entry', english), 1139, 700, 370, 19);
  ctx.fillStyle = DARK;
  drawText(ctx, PARK_SITE_URL, 1139, 745, 400, 18);
  ctx.textAlign = 'left';
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 855, 1400, 105);
  ctx.fillStyle = GOLD;
  drawText(ctx, 'SAMPLE / NOT VALID FOR ENTRY', 92, 900, 1200, 30, true);
  ctx.fillStyle = '#ecf3f7';
  drawText(ctx, copy('WEB記念チケット画像です。実際の購入・予約・入場には対応していません。', 'Fictional souvenir. No purchase, booking or admission.', english), 92, 939, 1210, 21);
  return canvas;
}

async function createPng(ticket: IssuedTicketArtwork, english: boolean): Promise<File> {
  // The same browser font is used for Japanese text and canvas export.
  if (document.fonts) await document.fonts.ready;
  const canvas = ticketCanvas(ticket, english);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(result => result ? resolve(result) : reject(new Error('PNG export failed')), 'image/png');
  });
  return new File([blob], 'FUKUI-DINO-CITY-' + ticket.code + '.png', {type: 'image/png'});
}

function status(message: string): void {
  const node = document.getElementById('ticket-artwork-status');
  if (node) node.textContent = message;
}

function revealImage(english: boolean): void {
  const preview = document.getElementById('ticket-image-preview');
  const image = document.querySelector<HTMLImageElement>('#ticket-image-preview img');
  const button = document.getElementById('ticket-show-image');
  if (!pngUrl || !preview || !image) return;
  image.src = pngUrl;
  preview.hidden = false;
  button?.setAttribute('aria-expanded', 'true');
  image.focus({preventScroll: true});
  preview.scrollIntoView({block: 'nearest'});
  status(copy('画像を長押しすると、iPhoneの「写真」に保存できます。', 'On iPhone, touch and hold the image to save it to Photos.', english));
}

function fallback(english: boolean): void {
  document.getElementById('ticket-share-fallback')?.removeAttribute('hidden');
  revealImage(english);
  status(copy('このブラウザでは画像共有が利用できません。画像を保存するか、URLをコピーしてください。', 'Image sharing is unavailable. Save the image or copy the website URL instead.', english));
}

/** Called once, after the Japanese or English ticket page has been rendered. */
export function initTicketArtwork(english: boolean): void {
  document.getElementById('ticket-show-image')?.addEventListener('click', () => revealImage(english));
  document.getElementById('ticket-save-image')?.addEventListener('click', () => {
    if (!pngFile || !pngUrl) return;
    const anchor = document.createElement('a');
    anchor.href = pngUrl;
    anchor.download = pngFile.name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    status(copy('PNGの保存を開始しました。iPhoneでは「チケット画像を表示」から長押し保存もできます。', 'PNG download started. On iPhone, use View ticket image and touch and hold to save.', english));
  });
  document.getElementById('ticket-share-image')?.addEventListener('click', () => {
    if (!pngFile) return;
    const nav = navigator;
    if (!nav.share || !nav.canShare || !nav.canShare({files: [pngFile]})) {
      fallback(english);
      return;
    }
    // Invoke share immediately from the click, without awaiting image encoding.
    void nav.share({
      files: [pngFile],
      title: 'FUKUI DINO CITY',
      text: copy('WEB記念チケットです。実際のパーク入場にはご利用いただけません。', 'Park souvenir ticket — not valid for admission.', english)
    }).catch((error: unknown) => {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      fallback(english);
    });
  });
  document.getElementById('ticket-copy-url')?.addEventListener('click', () => {
    const field = document.querySelector<HTMLInputElement>('#ticket-fallback-url');
    if (!field) return;
    if (!navigator.clipboard?.writeText) {
      field.focus();
      field.select();
      status(copy('URLを選択しました。コピーしてください。', 'The URL is selected; copy it manually.', english));
      return;
    }
    void navigator.clipboard.writeText(PARK_SITE_URL).then(() => {
      status(copy('パークサイトURLをコピーしました。', 'Park website URL copied.', english));
    }).catch(() => {
      field.focus();
      field.select();
      status(copy('URLを選択しました。コピーしてください。', 'The URL is selected; copy it manually.', english));
    });
  });
}

/** Updates only the issued artwork; the existing ticket history schema is unchanged. */
export function presentIssuedTicket(ticket: IssuedTicketArtwork, english: boolean): void {
  currentTicket = ticket;
  pngFile = null;
  if (pngUrl) URL.revokeObjectURL(pngUrl);
  pngUrl = null;
  const host = document.getElementById('ticket-artwork-host');
  if (host) host.innerHTML = ticketCardMarkup(ticket, english);
  const preview = document.getElementById('ticket-image-preview');
  if (preview) preview.hidden = true;
  document.getElementById('ticket-share-fallback')?.setAttribute('hidden', '');
  document.getElementById('ticket-show-image')?.setAttribute('aria-expanded', 'false');
  for (const id of ['ticket-show-image', 'ticket-save-image', 'ticket-share-image']) {
    const button = document.getElementById(id) as HTMLButtonElement | null;
    if (button) button.disabled = true;
  }
  status(copy('画像を準備しています…', 'Preparing your image…', english));
  void createPng(ticket, english).then(file => {
    if (currentTicket !== ticket) return;
    pngFile = file;
    pngUrl = URL.createObjectURL(file);
    for (const id of ['ticket-show-image', 'ticket-save-image', 'ticket-share-image']) {
      const button = document.getElementById(id) as HTMLButtonElement | null;
      if (button) button.disabled = false;
    }
    status(copy('チケット画像の準備ができました。', 'Ticket image ready.', english));
  }).catch(() => {
    if (currentTicket === ticket) status(copy('画像を書き出せませんでした。画面のチケットをご利用ください。', 'The image could not be exported. The onscreen ticket is still available.', english));
  });
}
