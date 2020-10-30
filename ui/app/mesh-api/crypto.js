import CryptoJS from 'crypto-js'

const encrypt = (value, secret) => {
  return CryptoJS.AES.encrypt(value, secret).toString()
}

const decrypt = (value, secret) => {
  return CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8)
}

export default {
  encrypt,
  decrypt,
}
