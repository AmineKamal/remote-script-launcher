export class StringUtils {
  public static isChar(s: string) {
    return s.length === 1 && /^[a-zA-Z]+$/.test(s);
  }
}
