// 每个项目的存储

import { fromJS, Map, List } from "immutable";
import { getSelfReplacementList } from "./selfReplacementList";

type ItemStorage = Map<string, List<any> | number>;

class createItemStorage {
  private data: ItemStorage;

  constructor(value: unknown = {}, n: number = 2) {
    this.data = Map({
      value: getSelfReplacementList({
        n,
        selfReplacementList: List([]),
        target: fromJS(value),
      }),
      n,
    });
  }

  // TODO 对于数据处理的公共方案 结合mittx

  public changeData():boolean {
    return true
  }

  public getData(): ItemStorage {
    return this.data;
  }
}

type createItemStorageReturnType = ReturnType<createItemStorage["getData"]>;

export { createItemStorage, ItemStorage, createItemStorageReturnType };
