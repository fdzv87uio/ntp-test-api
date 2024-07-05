
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

export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function areAllTrueOrNull(obj) {
    return Object.values(obj).every(value => value === (true || null));
}