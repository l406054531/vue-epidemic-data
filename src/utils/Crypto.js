import CryptoJS from 'crypto-js/crypto-js'

const KEY = 'LxiaZhenShuai' // 密钥

/**
 * AES加密
 * @param word  需要加密的字符串
 * @param key  加密密钥
 * @returns {string}
 * @constructor
 */
export function Encrypt (word, key) {
  // debugger
  key = key || KEY
  let keyStr = CryptoJS.enc.Utf8.parse(key)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.toString()
}

/**
 * AES解密
 * @param word  需要解密的密文
 * @param key 解密密钥，与加密密钥一样
 * @returns {*}
 * @constructor
 */
export function Decrypt (word, key) {
  if (word == null) {
    return ''
  }
  // debugger
  key = key || KEY
  let keyStr = CryptoJS.enc.Utf8.parse(key)
  let decrypt = CryptoJS.AES.decrypt(word, keyStr, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}