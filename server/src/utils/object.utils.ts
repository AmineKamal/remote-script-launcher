import { StrictMap } from "./type.utils";

export class ObjectUtils {
  public static clone<T>(arg: T): T {
    return JSON.parse(JSON.stringify(arg));
  }

  public static filterStringify(obj: any, key: string) {
    return JSON.stringify(obj, (k, v) => {
      if (k === key) return;
      else return v;
    });
  }

  public static pick<K, T extends K>(K: new () => K, obj: T): K {
    const copy = {} as K;
    Object.keys(new K()).forEach(key => (copy[key] = obj[key]));
    return copy;
  }

  public static initStrict<K extends string, V>(
    a: readonly K[],
    i: V
  ): StrictMap<K, V> {
    return a.reduce((p: any, c) => ((p[c] = i), p), {}) as StrictMap<K, V>;
  }
}
