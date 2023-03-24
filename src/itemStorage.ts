// 每个项目的存储

import { fromJS, Map, List } from "immutable";
import { getSelfReplacementList } from "./selfReplacementList";

type ItemStorage = Map<string, List<any> | number | undefined | boolean>;
type returnClearData = "success" | "fail" | "ignore";

class createItemStorage {
  private data: ItemStorage;

  constructor(userValue: unknown = {}, n: number = 2) {
    let value = getSelfReplacementList({
      n,
      selfReplacementList: List([]),
      target: fromJS(userValue),
    });

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

  // TODO 对于数据处理的公共方案 结合mittx

  /**
   * 清除数据 - 清除数据是将数据重置为初始值并不是卸载数据
   * 同时会将数据绑定的一切方法初始化
   * @returns boolean
   */
  public clearData(): returnClearData {
    try {
      if (this.data.get("executedClear")) {
        return "ignore";
      }
      this.data.set("executedClear", true);
      this.data.set("value", this.data.get("init"));
      // TODO clear mittxfunction
      return "success";
    } catch {}
    return "fail";
  }

  // 删除数据 - 内部使用交由总库决策
  // 此时引发一个猜想 用户 init 后离开页面 clearData 再次回到页面 init 时已存在而报错
  // 解决方案是用户 init - removeData - init 则clearData没有存在必要
  // remove会使得内存得到释放但再次注册是一个庞大的工作量
  // TODO ·故init时如果已存在不应该报错而是使用 clearData 使数据及mittx方法初始化
  // 基上有两个缺陷 1.用户会在卸载页面和再次回到时两次 clearData
  // 2.如果init时元数据发生变化则执行 clearData 后不会变化 - 编译时问题比较大
  // TODO 
  // ·clearData 接受init时传入uservalue的值 当init时重新计算value并复写value&init后执行剩余的清除操作
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
