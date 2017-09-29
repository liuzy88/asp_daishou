var crypto = require('crypto');
var fs = require('fs');

var public_key = fs.readFileSync('../assets/acp_test_cer.pem').toString()
var private_key = fs.readFileSync('../assets/acp_test_key.pem').toString()

var data = "6216261000000000018"
// console.log('fb3KH1o09ls4bXQ++hebocFhfdGxDRqsS+Qv0DKOuPm1J3+QsaMGCUP3tmMAIJsDe1vA2j+L17Xz68fCEcY3Wqx2TWQfsYjgPU3OB1BKf+SgTp1qLAneVRWHkhV+ffD5rQJJPr/DSYwV35Qc+GcI50PXC5O74iFIXhRyvwDZsSvBATSKcph8pzMjOveggKySnbIEqPdnZzTLJ6iCNjJOnE12wanQDBDHYWfRaVArFzAUY4Wf2+yTUf09QX4qWlqpIPslfcHjPLUZ7mHBHfCbxfIr/5WziK25UHaiXTk+FWbVVjV0dIBBBkm5QeWVF9CJs3kSPD9Bbi8uiVWsPjO2Fg==');


// var sign = crypto.createSign('RSA-SHA1');
// sign.update(data, 'utf8');

// var signature = sign.sign(public_key, 'base64');

// console.log(signature);


// crypto.privateDecrypt(private_key, buffer)
// crypto.privateEncrypt(private_key, buffer)
// crypto.publicDecrypt(public_key, buffer)
// crypto.publicEncrypt(public_key, buffer)

var buff = new Buffer(data, 'utf8')
var signature =  crypto.publicEncrypt(public_key, buff)
console.log(signature.toString('base64'));
