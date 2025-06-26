// https://github.com/juliencrn/usehooks-ts/blob/master/packages/usehooks-ts/tests/mocks.ts

/**
 * Mocks the matchMedia API
 * @param {boolean} matches - True for dark, false for light
 * @example
 * mockMatchMedia(false)
 */
export const mockMatchMedia = (matches: boolean): void => {
  Object.defineProperty(globalThis, "matchMedia", {
    value: vitest.fn().mockImplementation((query) => ({
      addEventListener: vitest.fn(),
      dispatchEvent: vitest.fn(),
      matches,
      media: query,
      onchange: undefined,
      removeEventListener: vitest.fn(),
    })),
    writable: true,
  });
};

/**
 * Mocks the Storage API
 * @param {'localStorage' | 'sessionStorage'} name - The name of the storage to mock
 * @example
 * mockStorage('localStorage')
 * // Then use window.localStorage as usual (it will be mocked)
 */
export const mockStorage = (name: "localStorage" | "sessionStorage"): void => {
  class StorageMock implements Omit<Storage, "key" | "length"> {
    store: Record<string, string> = {};

    clear() {
      this.store = {};
    }

    getItem(key: string) {
      return this.store[key] || undefined;
    }

    removeItem(key: string) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete this.store[key];
    }

    setItem(key: string, value: unknown) {
      this.store[key] = value + "";
    }
  }

  Object.defineProperty(globalThis, name, {
    value: new StorageMock(),
  });
};
