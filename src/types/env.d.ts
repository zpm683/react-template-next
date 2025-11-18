interface ImportMetaEnv {
  readonly ENV_API_URL: string;
  readonly ENV_API_TIME_OUT: string;
  readonly ENV_APP_BASE_URL: string;
  readonly ENV_USE_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// declare global {
//   interface Window {}
// }
