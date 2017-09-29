var crypto = require('crypto')
var fs = require('fs')

var cer = 'test.cer'
var key = 'test.key'

var publicKEY = fs.readFileSync(cer).toString()
var privateKEY = fs.readFileSync(key).toString()

var data = "123asdf"

var sign = crypto.createSign('RSA-SHA256')
sign.update(data, 'utf8')

var signature = sign.sign(privateKEY, 'base64')

var verify = crypto.createVerify('RSA-SHA256')
verify.update(data)

var ret = verify.verify(publicKEY, signature, 'base64')

console.log(ret) // => true
