// 每个项目的存储

import { fromJS, Map, List } from "immutable";
import { getSelfReplacementList, selfRootList } from "./selfReplacementList";
import { isObject, isString } from "./util";

type ItemStorage = Map<string, List<any> | number>;

class createItemStorage {
  private data: ItemStorage;

  constructor(value: unknown = {}, n: number = 2) {
    // constructor(key: string, value: unknown = {}, n: number = 2) {
    // XXX key为啥要放在这里 返回的数据结构没必要多裹一层key
    // if (!isString(key)) {
    //   throw new Error("key must be of string type.");
    // }

    this.data = Map({
      value: getSelfReplacementList({
        n,
        selfReplacementList: List([]),
        target: fromJS(value),
      }),
      n,
    });
  }

  public getData(): ItemStorage {
    return this.data;
  }
}

export { createItemStorage, itemStorage };
