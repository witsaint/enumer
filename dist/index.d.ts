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
declare class EnumItem {
    private _key;
    private _val;
    private _desc;
    constructor(conf: EnumConfObj);
    private init;
    get key(): string;
    get val(): string;
    get desc(): "";
    [Symbol.toPrimitive](): "";
    valueOf(): "";
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
export declare function enumer(conf: EnumConfObj[]): EnumObj;
export {};
