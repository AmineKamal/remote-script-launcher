import { shuffle } from "lodash";

export class RandomUtils {
  public static rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  public static any<T>(arr: Array<T>) {
    return arr[RandomUtils.rand(0, arr.length)];
  }

  public static shuffle<T>(arr: T[]) {
    return shuffle(arr);
  }
}
