
export function isNotNullAndNotEmpty(obj) {
    return obj != null && Object.keys(obj).length > 0;
}

export function isNotNull(obj) {
    return obj != null ;
}

export function getEnumKeyByEnumValue(myEnum: any, enumValue: number): string | undefined {
    return Object.keys(myEnum).find(key => myEnum[key] === enumValue);
}

export function getEnumValueByKey(myEnum: any, key: string): number | undefined {
    return myEnum[key];
  }