
export function isNotNullAndNotEmpty(obj) {
    return obj != null && Object.keys(obj).length > 0;
}

export function isNotNull(obj) {
    return obj != null ;
}