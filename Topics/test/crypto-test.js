const { assert }= require('chai')
const {describe, it} = require('mocha')

const {
    DES
} = require("../Crypto")

describe("加密相关", () => {

    it('DES 加密解密文本', () => {
        let s = "romantic"
        let k = "12345678"
        const cipher = new DES(k)
        const encrypted = cipher.encrypt(s)
        console.log(encrypted)
        console.log(cipher.decrypt(encrypted))
    })
})