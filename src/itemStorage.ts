// 每个项目的存储

import { fromJS, Map, List } from "immutable";
import { getSelfReplacementList } from "./selfReplacementList";

type ItemStorage = Map<string, List<any> | number | undefined | boolean>;
type returnClearData = "success" | "fail" | "ignore";

class createItemStorage {
  private data: ItemStorage;

  constructor(userValue: unknown = {}, n: number = 2) {
    let value = this.getInitValue(userValue, n);

    this.data = Map({
      // 用户数据
      value,
      // 用户数据初始值
      init: value,
      // value值的记忆层数
      n,
      // 刚执行完成 clearData - 防止无意义的再次执行
      executedClear: false,
    });
  }

  // 用户传入值初始化 - 转自替换List
  private getInitValue(userValue: unknown, n: number): List<any> {
    return getSelfReplacementList({
      n,
      selfReplacementList: List([]),
      target: fromJS(userValue),
    });
  }
  // TODO 对于数据处理的公共方案 结合mittx

  /**
   * 清除数据 - 清除数据是将数据重置为初始值并不是卸载数据
   * 同时会将数据绑定的一切方法初始化
   * @returns boolean
   */
  public clearData(init?: { value: unknown; n: number }): returnClearData {
    try {

      // 总库init发现单库存在时触发 - 重制init以及后续清除操作
      if (init) {
        let { value, n } = init;
        let initValue = this.getInitValue(value, n);
        this.data.set("init", initValue);
      }
      // 拦截重复清除操作 - 不拦截总库init下发
      if (this.data.get("executedClear") && !init) {
        return "ignore";
      }
      this.data.set("executedClear", true);
      // 数据清除
      this.data.set("value", this.data.get("init"));
      // TODO clear mittxfunction
      return "success";
    } catch {}
    return "fail";
  }

  // 删除数据 - 内部使用交由总库决策
  public removeData(): boolean {
    try {
      // @ts-ignore
      this.data = null;
      // TODO remove mittxfunction
      return true;
    } catch {}
    return false;
  }

  public changeData(): boolean {
    try {
      this.data.set("executedClear", false);
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
