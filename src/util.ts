import { List, Map, isList, isMap, fromJS } from "immutable";
// 类型判断
type echo<T, V = any> = (value: V) => T;

const _toString = Object.prototype.toString;
const toRawType: echo<string> = (value) => _toString.call(value).slice(8, -1);

const isObject: echo<boolean> = (value) => toRawType(value) === "Object";
const isSymbol: echo<boolean> = (value) => toRawType(value) === "Symbol";
const isArray: echo<boolean> = (value) => toRawType(value) === "Array";
const isNumber: echo<boolean> = (value) => toRawType(value) === "Number";
const isString: echo<boolean> = (value) => toRawType(value) === "String";

const isImmutable: echo<boolean> = (value) => isMap(value) || isList(value);

// 类型转换
const toImmutabl: echo<List<any> | Map<any, any>> = (value) =>
  isImmutable(value) ? value : fromJS(value);

export { isObject, isSymbol, isArray, isNumber, echo, isImmutable, toImmutabl, isString };
