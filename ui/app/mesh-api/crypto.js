import encUTF8 from 'crypto-js/enc-utf8'
import AES from 'crypto-js/aes'

const encrypt = (value, secret) => {
  return AES.encrypt(value, secret).toString()
}

const decrypt = (value, secret) => {
  return AES.decrypt(value, secret).toString(encUTF8)
}

export default {
  encrypt,
  decrypt,
}
