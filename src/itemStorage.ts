// 每个项目的存储

import { fromJS, Map, List } from "immutable";
import { getSelfReplacementList } from "./selfReplacementList";

type ItemStorage = Map<string, List<any> | number | undefined>;

class createItemStorage {
  private data: ItemStorage;

  constructor(userValue: unknown = {}, n: number = 2) {
    let value = getSelfReplacementList({
      n,
      selfReplacementList: List([]),
      target: fromJS(userValue),
    });

    this.data = Map({
      value,
      init: value,
      n,
    });
  }

  // TODO 对于数据处理的公共方案 结合mittx

  /**
   * 清除数据 - 清除数据是将数据重置为初始值并不是卸载数据
   * 同时会将数据绑定的一切方法初始化
   * @returns boolean
   */
  public clearData(): boolean {
    try {
      this.data.set("value", this.data.get("init"));
      // TODO clear mittxfunction
      return true;
    } catch {}
    return false;
  }

  public changeData(): boolean {
    try {
      // TODO change function
      return true;
    } catch {}
    return false;
  }

  public getData(): ItemStorage {
    return this.data;
  }
}

type createItemStorageReturnType = ReturnType<createItemStorage["getData"]>;

export { createItemStorage, ItemStorage, createItemStorageReturnType };
