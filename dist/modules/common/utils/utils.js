"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotNullAndNotEmpty = isNotNullAndNotEmpty;
exports.isNotNull = isNotNull;
exports.getEnumKeyByEnumValue = getEnumKeyByEnumValue;
exports.getEnumValueByKey = getEnumValueByKey;
exports.delay = delay;
exports.areAllTrueOrNull = areAllTrueOrNull;
function isNotNullAndNotEmpty(obj) {
    return obj != null && Object.keys(obj).length > 0;
}
function isNotNull(obj) {
    return obj != null;
}
function getEnumKeyByEnumValue(myEnum, enumValue) {
    return Object.keys(myEnum).find(key => myEnum[key] === enumValue);
}
function getEnumValueByKey(myEnum, key) {
    return myEnum[key];
}
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function areAllTrueOrNull(obj) {
    return Object.values(obj).every(value => value === (true || null));
}
//# sourceMappingURL=utils.js.map