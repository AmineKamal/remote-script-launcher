export class ArrayUtils {
  public static combineSort<T, U>(
    ta: T[],
    ua: U[],
    cmp?: (a: U, b: U) => number
  ) {
    const merged = ta.map((t, i) => ({
      t,
      u: ua[i],
    }));

    merged.sort((a, b) => cmp(a.u, b.u));

    return merged.map(m => m.t);
  }
}
