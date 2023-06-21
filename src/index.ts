/**
 * @description 枚举item
 * @eg const bizEnumItem = new EnumItem(['static', 1, '静态'])
 *  bizEnumItem === 'static'
 *  bizEnumItem.static === 'static'
 *  bizEnumItem.val === 1
 *  bizEnumItem.desc === '静态'
 *  @eg2 const bizEnumItem2 = new EnumItem('static')
 *  bizEnumItem2 === 'static'
 *  bizEnumItem2.static === 'static'
 *  bizEnumItem2.val === 1
 *  bizEnumItem2.desc === '静态'
 *
 */
class EnumItem {
  private _key: '';
  private _val: '';
  private _desc: '';
  constructor(conf: EnumConfObj) {
    if (Array.isArray(conf)) {
      const [val, key, desc] = conf || [];
      this.init(key, val, desc);
    } else if (typeof conf === 'object' && conf) {
      const { key, val, desc } = conf || {};
      this.init(key, val, desc);
    } else {
      this.init(conf, conf, conf);
    }
  }

  private init(key, val, desc) {
    this._key = key;
    this._val = val ?? key;
    this._desc = desc ?? val ?? key;
  }

  public get key(): string {
    return this._key;
  }
  public get val(): string {
    return this._val;
  }
  public get desc() {
    return this._desc;
  }

  [Symbol.toPrimitive]() {
    return this._val;
  }

  valueOf() {
    return this._val;
  }
}
type EnumConfigItem = number | string | boolean | never;
type EnumConfigKey = string;
type EnumConfObj = EnumConfigItem[];

type ForEachFn<T> = (callbackfn: (value: T, index: number) => void, thisArg?: any) => void;
type MapFn<T, U> = (callbackfn: (value: T, index: number) => U, thisArg?: any) => U[];

type RecordType = {
  [k: string]: any;
};

type OptionType = {
  value: EnumConfigItem;
  label: string;
  key: string;
};
export interface EnumObj extends RecordType {
  /**
   * 枚举key的集合
   * @return [...keys]
   */
  keys: EnumConfigKey[];
  /**
   * 遍历枚举 同Array的forEach
   * @params fn(value 当前枚举{ key, val, desc})
   */
  forEach: ForEachFn<EnumItem>;
  /**
   * 遍历枚举、对每个枚举值做逻辑产生的结果并集合返回 同Array的map
   * @params callbackfn: (value: T, index: number) => U, thisArg?: any
   */
  map: MapFn<EnumItem, any>;
  /**
   * 生成用于select等组件的后选项
   * @returns [...{ label, value }]
   */
  options: () => OptionType[];
}

function inheritPrototype(subType, superType) {
  const prototype = Object(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function EnumFn(this: any) {
  this.forEach = function (fn) {
    this.keys?.forEach((key, index) => {
      fn.call(this, this[key] as EnumItem, index);
    });
  };
  this.map = function (fn) {
    const _map: any[] = [];
    this.keys?.forEach((key, index) => {
      _map.push(fn.call(this, this[key] as EnumItem, index));
    });
    return _map;
  };
  this.options = function () {
    const _map: OptionType[] = [];
    this.keys?.forEach((key) => {
      const { desc, val } = this[key];
      _map.push({ label: desc, value: val, key });
    });
    return _map;
  };
}

function EnumParent() {
  // empty
}
EnumParent.prototype = new EnumFn();
inheritPrototype(EnumObjCreate, EnumParent);
function EnumObjCreate(this: any) {
  EnumParent.call(this);
  this.keys = [] as EnumConfigKey[];
}

/**
 * @description 枚举方法
 * @eg const statusEnum = new enumer([
 *  [1, 'success', '成功']，
 *  [2, 'failure', '失败']，
 * ])
 *  statusEnum.success === 'success'
 *  statusEnum.success.key === 'success'
 *  statusEnum.success.val === 1
 *  statusEnum.success.desc === '成功'
 *
 *  statusEnum.failure === 'failure'
 *  statusEnum.failure.key === 'failure'
 *  statusEnum.failure.val === 2
 *  statusEnum.failure.desc === '失败'
 *
 */
export function enumer(conf: EnumConfObj[]): EnumObj {
  if (!Array.isArray) {
    console.warn('enumer 构造器需要传数组');
    return {} as any;
  }

  const result: EnumObj = new EnumObjCreate();
  conf.forEach((item) => {
    const _enumItem = new EnumItem(item);

    result[_enumItem.key] = _enumItem;
    result[_enumItem.val] = _enumItem;
    result.keys.push(_enumItem.key);
  });
  return result;
}
