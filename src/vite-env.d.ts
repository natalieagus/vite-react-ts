/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_SOME_KEY: number
  readonly DB_PASSWORD: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
