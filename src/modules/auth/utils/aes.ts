import * as crypto from 'crypto';


// Encrypt data
export function aesEncrypt(data: string) {
    // Generate secret hash with crypto to use for encryption
    const secretKey = process.env.AES_KEY;
    const secretIv = process.env.AES_IV;
    const method = process.env.AES_METHOD;
    const key = crypto
        .createHash('sha512')
        .update(secretKey)
        .digest('hex')
        .substring(0, 32)
    const encryptionIV = crypto
        .createHash('sha512')
        .update(secretIv)
        .digest('hex')
        .substring(0, 16)

    const cipher = crypto.createCipheriv(method, key, encryptionIV)
    return Buffer.from(
        cipher.update(data, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64') // Encrypts data and converts to hex and base64
}

// Decrypt data
export function aesDecrypt(encryptedData: string) {
    // Generate secret hash with crypto to use for encryption
    const secretKey = process.env.AES_KEY;
    const secretIv = process.env.AES_IV;
    const method = process.env.AES_METHOD;
    const key = crypto
        .createHash('sha512')
        .update(secretKey)
        .digest('hex')
        .substring(0, 32)
    const encryptionIV = crypto
        .createHash('sha512')
        .update(secretIv)
        .digest('hex')
        .substring(0, 16)

    const buff = Buffer.from(encryptedData, 'base64')
    const decipher = crypto.createDecipheriv(method, key, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    ) // Decrypts data and converts to utf8
}