const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const config = require('../config')
const ACP = {}

if (config.prod) {
	ACP.MER_CER_FILE = 'acp_prod_mer.cer'
	ACP.MER_KEY_FILE = 'acp_prod_mer.key'
	ACP.ACP_ENC_FILE = 'acp_prod_enc.cer'
	ACP.ACP_MIDDLE_FILE = 'acp_prod_middle.cer'
	ACP.ACP_ROOT_FILE = 'acp_prod_root.cer'
} else {
	ACP.MER_CER_FILE = 'acp_test_mer.cer'
	ACP.MER_KEY_FILE = 'acp_test_mer.key'
	ACP.ACP_ENC_FILE = 'acp_test_enc.cer'
	ACP.ACP_MIDDLE_FILE = 'acp_test_middle.cer'
	ACP.ACP_ROOT_FILE = 'acp_test_root.cer'
}

function read(name) {
	return fs.readFileSync(path.join(__dirname, '../assets/', name)).toString()
}

// 商户证书
ACP.MER_CER = read(ACP.MER_CER_FILE)

// 商户私钥
ACP.MER_KEY = read(ACP.MER_KEY_FILE)

// 敏感信息加密证书
ACP.ACP_ENC = read(ACP.ACP_ENC_FILE)

// 验签中级证书
ACP.ACP_MIDDLE = read(ACP.ACP_MIDDLE_FILE)

// 验签根证书
ACP.ACP_ROOT = read(ACP.ACP_ROOT_FILE)

// 敏感信息加密证书公钥加密后转Base64
ACP.encryptData = function(data) {
	const buff = new Buffer('utf8')
	const bytes = crypto.publicEncrypt(ACP.ACP_ENC, buff)
	return bytes.toString('base64')
}

// 自定义信息加密
ACP.customEncrypt = function(data, keys) {
	const sf = []
	const encryptedInfoSb = []
	for (let i in keys) {
		let k = keys[i]
		if (k == 'phoneNo' || k == 'cvn2' || k == 'expired') {
			encryptedInfoSb.push(k + '=' + data[k])
		} else {
			if (k == 'pin') {
				// TODO
			}
			sf.push(k + '=' + data[k])
		}
	}
	if (encryptedInfoSb.length > 0) {
		console.log('组装的customerInfo encryptedInfo明文:')
		console.log(encryptedInfoSb.join('&'));
		sf.push('encryptedInfo=' + ACP.encryptData(encryptedInfoSb.join('&')))
	}
	console.log('组装的customerInfo明文:')
	console.log('{' + sf.join('&') + '}');
	return new Buffer('{' + sf.join('&') + '}', 'utf8').toString('base64')
}

// 签名
ACP.signEncrypt = function(data) {
	const ks = []
	for (let k in data) {
		ks.push(k)
	}
	ks.sort()
	const kvs = []
	for (let i in ks) {
		if (data[ks[i]]) {
			kvs.push(ks[i] + '=' + data[ks[i]])
		}
	}
	console.log('待签名请求报文串:')
	console.log(kvs.join('&'));
	// SHA256摘要
	const hash = crypto.createHash('SHA256').update(kvs.join('&')).digest('hex')
	// 私钥加密
	const sign = crypto.createSign('RSA-SHA256')
	sign.update(hash)
	return sign.sign(ACP.MER_KEY, 'base64')
}


module.exports = ACP
