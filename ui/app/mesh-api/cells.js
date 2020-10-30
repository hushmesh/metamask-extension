import CryptoJS from 'crypto-js'
import helpers from './crypto'

const createEncKey = (title, secret) => {
  return CryptoJS.HmacSHA256(title, secret).toString(CryptoJS.enc.Hex)
}

const createCellNum = (key, title) => {
  return CryptoJS.HmacSHA256(title, key).toString(CryptoJS.enc.Hex)
}

const encCellContent = (key, data) => {
  return helpers.encrypt(data, key)
}

const decCellContent = (key, data) => {
  return helpers.decrypt(data, key)
}

export default {
  createEncKey,
  createCellNum,
  encCellContent,
  decCellContent,
}
