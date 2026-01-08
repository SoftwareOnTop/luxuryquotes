declare module 'firebase/auth' {
  export * from '@firebase/auth';

  import type { Persistence, ReactNativeAsyncStorage } from '@firebase/auth';
  export function getReactNativePersistence(storage: ReactNativeAsyncStorage): Persistence;
}
