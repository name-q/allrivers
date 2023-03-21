// 每个项目的存储

import { fromJS, Map, List } from "immutable";
import { getSelfReplacementList, selfRootList } from "./selfReplacementList";
import { isObject, isString } from "./util";

interface storageKernel {
  value: List<selfRootList>;
  n: number;
}

type itemStorage = Map<string, storageKernel>;

const createItemStorage = (
  key: string,
  value: unknown = {},
  n: number = 2
): itemStorage => {
  if (!isString(key)) {
    throw new Error("key must be of string type.");
  }

  return Map({
    [key]: {
      value: getSelfReplacementList({
        n,
        selfReplacementList: List([]),
        target: fromJS(value),
      }),
      n,
    },
  });
};

export { createItemStorage, itemStorage };
