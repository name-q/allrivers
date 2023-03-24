import { createItemStorage } from "./itemStorage";
import { toSymbol } from "./mittx";
import { isString, toInt } from "./util";

interface dataType {
  [k: symbol]: createItemStorage;
}

/**
 * 总库
 */
function database() {
  let data: dataType = Object.create(null);
  return {
    /**
     * 判断索引是否存在于此数据库
     * @param path 单库路径
     * @returns
     */
    exist: function exist(path: string) {
      return Object.getOwnPropertySymbols(data)
        .map((sym) => sym.description)
        .includes(path);
    },

    /**
     * 初始化单库并记录总库索引
     * @param path 单库路径
     * @param value 初始值
     * @param n 单库记忆层
     */
    init: function init(path: string, value: unknown, n: number = 2) {
      if (!isString(path)) {
        throw new Error("path must be of string type.");
      }
      if (toInt(n) < 1) {
        throw new Error(
          `·n indicates the number of layers of the single memory bank,
         and must be an integer greater than or equal to 1. 
         When n is 1, it means that the historical value is not recorded.`
        );
      }
      if (this.exist(path)) {
        data[toSymbol(path)].clearData({ value, n });
        return data[toSymbol(path)];
      }
      const storage = new createItemStorage(value, n);
      data[toSymbol(path)] = storage;
      return storage;
    },
  };
}

const rootDataBase = database();

export { rootDataBase };
