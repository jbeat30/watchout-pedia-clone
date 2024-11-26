import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  base: '',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    // 서버 시작 시 브라우저가 자동으로 열리도록 설정
    open: true,
    // 기본 포트를 3000으로 설정
    port: 3000,
  },
})
