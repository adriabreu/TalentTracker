// Configurações globais para os testes
import '@testing-library/jest-dom';
import 'whatwg-fetch';

// Mock de ResizeObserver para componentes que dependem dele
class ResizeObserverMock {
  constructor(callback) {
    this.callback = callback;
    this.observables = new Map();
  }

  observe(target) {
    this.observables.set(target, {
      target,
      contentRect: {
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0
      }
    });
    
    // Immediately trigger the callback with initial size
    if (this.callback) {
      const entries = Array.from(this.observables.values());
      this.callback(entries);
    }
  }

  unobserve(target) {
    this.observables.delete(target);
  }

  disconnect() {
    this.observables.clear();
  }
}

// Explicitly set ResizeObserver before any tests run
global.ResizeObserver = ResizeObserverMock;

// Mock DOMRect for elements that need size measurements
global.DOMRect = class {
  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.left = x;
  }
  
  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
    };
  }
};

// Element.getBoundingClientRect mock
Element.prototype.getBoundingClientRect = function() {
  return new DOMRect(0, 0, 100, 100);
};

// Mock do fetch global
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock do window.location
const mockLocation = {
  href: '',
  assign: jest.fn(),
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});
