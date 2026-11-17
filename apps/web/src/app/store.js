// Simple reactive state store for React (compatible with Redux, Zustand or Context)
class AppStore {
  constructor() {
    this.state = {
      user: null,
      theme: 'light',
      sidebarOpen: true
    };
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const store = new AppStore();
