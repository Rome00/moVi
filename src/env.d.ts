/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'notiwind' {
  import { Plugin } from 'vue';
  const Notifications: Plugin;
  export default Notifications;
  export function notify(
    notification: {
      group: string;
      title: string;
      text?: string;
      kind?: 'error' | 'success';
    },
    time: number
  ): void;
}

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_API_KEY: string;
  readonly VITE_IMAGE_URL: string;
  readonly VITE_ORIGINAL_IMAGE_URL: string;
  readonly VITE_API_BASE_URL: string; // Package directory
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
