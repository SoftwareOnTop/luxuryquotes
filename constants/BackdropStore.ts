const DEFAULT_BACKDROP = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80';

type Listener = (uri: string) => void;

let backdropUri = DEFAULT_BACKDROP;
const listeners: Listener[] = [];

export function getBackdrop() {
  return backdropUri;
}

export function setBackdrop(uri: string) {
  backdropUri = uri;
  listeners.forEach((l) => l(backdropUri));
}

export function subscribeBackdrop(listener: Listener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}
