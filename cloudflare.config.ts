import { defineConfig } from 'cf/config';

// アセットのみの静的サイトとして Worker にデプロイします。
// 既存の Worker 名が違う場合は、この name を変更してください。
export default defineConfig({
  worker: {
    name: 'kaisei-carrer-mix',
    compatibilityDate: '2026-11-05',
    observability: {
      enabled: true,
      traces: { enabled: true },
    },
  },
});
