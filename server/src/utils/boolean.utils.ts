import { Range } from "./type.utils";

export class BooleanUtils {
  public static inRange(value: number, range: Range) {
    return value >= range.lower && value <= range.upper;
  }
}
