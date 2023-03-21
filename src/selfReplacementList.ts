import { List, is, isList } from "immutable";
import { isArray, echo, isObject, isNumber } from "./util";

interface selfRootList {
  // 自替换系数 - 决定selfReplacementList.size
  n: number;
  // 自替换List
  selfReplacementList: List<any>;
  // 最新值
  target: unknown;
}

/**
 * 获取自替换List
 */
const getSelfReplacementList: echo<List<any>, selfRootList> = (value) => {
  if (!isObject(value)) return List([]);
  let { n, selfReplacementList, target } = value;
  if (!isList(selfReplacementList)) return List([]);
  n = isNumber(n) && n > 0 ? n : 2;
  let { size } = selfReplacementList;

  // 比较数据 - 有变化再添加
  let lastElement = selfReplacementList.last();
  if (!is(lastElement, target)) {
    selfReplacementList.push(target);
    // 应用系数n
    if (size === n) {
      // 自替换流程
      return selfReplacementList.shift();
    } else if (size < n) {
      // 记录流程
      return selfReplacementList;
    } else {
      // 截取流程
      return selfReplacementList.slice(-n);
    }
  } else {
    return selfReplacementList;
  }
};

export { getSelfReplacementList };
