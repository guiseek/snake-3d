export const createStore = <T extends object>(initialValues: T) => {
  const get = <K extends keyof T>(key: K) => {
    const value = localStorage.getItem(String(key)) ?? "";
    if (!isNaN(+value)) return +value as T[K];
    try {
      return JSON.parse(value) as T[K];
    } catch {
      return value as T[K];
    }
  };

  const set = <K extends keyof T>(key: K, value: T[K]) => {
    if (typeof value === "string") {
      localStorage.setItem(String(key), value);
    } else if (typeof value === "number") {
      localStorage.setItem(String(key), String(value));
    } else if (typeof value === "object") {
      localStorage.setItem(String(key), JSON.stringify(value));
    }
  };

  for (const [key, value] of Object.entries(initialValues)) {
    set(key as keyof T, value);
  }

  return { get, set };
};
