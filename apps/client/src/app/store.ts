import type { User } from '../types';

export interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
}

class AppStore {
  private state: AppState = {
    user: null,
    theme: 'light',
    sidebarOpen: true
  };
  private listeners: Set<(state: AppState) => void> = new Set();

  getState(): AppState {
    return this.state;
  }

  setState(newState: Partial<AppState>): void {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const store = new AppStore();
