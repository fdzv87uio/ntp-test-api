"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aesEncrypt = aesEncrypt;
exports.aesDecrypt = aesDecrypt;
const crypto = require("crypto");
function aesEncrypt(data) {
    const secretKey = process.env.AES_KEY;
    const secretIv = process.env.AES_IV;
    const method = process.env.AES_METHOD;
    const key = crypto
        .createHash('sha512')
        .update(secretKey)
        .digest('hex')
        .substring(0, 32);
    const encryptionIV = crypto
        .createHash('sha512')
        .update(secretIv)
        .digest('hex')
        .substring(0, 16);
    const cipher = crypto.createCipheriv(method, key, encryptionIV);
    return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64');
}
function aesDecrypt(encryptedData) {
    const secretKey = process.env.AES_KEY;
    const secretIv = process.env.AES_IV;
    const method = process.env.AES_METHOD;
    const key = crypto
        .createHash('sha512')
        .update(secretKey)
        .digest('hex')
        .substring(0, 32);
    const encryptionIV = crypto
        .createHash('sha512')
        .update(secretIv)
        .digest('hex')
        .substring(0, 16);
    const buff = Buffer.from(encryptedData, 'base64');
    const decipher = crypto.createDecipheriv(method, key, encryptionIV);
    return (decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8'));
}
//# sourceMappingURL=aes.js.map