const querystring = require('querystring')
const request = require('request')
const crypto = require('crypto')
const https = require('https')
const path = require('path')
const URL = require('url')
const fs = require('fs')
const config = require('../config')
const ACP = {}

ACP.backTransUrl = 'https://gateway.test.95516.com/gateway/api/backTransReq.do'

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

const ENC_PublicKey = '-----BEGIN PUBLIC KEY-----\r\n\
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0eeg/HQlkpmYWMhRHE0B\r\n\
suVYDDaOIUVYGcMXYwgaTJravR8aJHSSerzOQpSegjIL63MSI5q+eJBpK7S5y6/9\r\n\
Xi6DPro9JHHDWBo9xHZ0NV2CiMXTRNx7DGUkQDrl8rd4qFRh8Lc1tFpVA4wx3C/u\r\n\
c0S/PG90TETjtx4zJrsWaxQ/IsW71f75yEVCJh+vycf7B0N5ijzDy8Jf4l3a9G6o\r\n\
M5qHb0JB+QCZezHcPrzODSrgCOUsjW3mAsqJTligbrJauKA/Kt4QeHvXqtXweROM\r\n\
ZbHdzEX8ewtn8ThKAivnIhkDqrDxEWppJe7LDeIOs1/ppIkY7QYqW/Ge8PbSgZEm\r\n\
iQIDAQAB\r\n\
-----END PUBLIC KEY-----'
// 敏感信息加密证书公钥加密后转Base64
ACP.encryptData = function(data) {
	console.log('加密前：')
	console.log(data)
	const buff = new Buffer(data, 'utf8')
	const bytes = crypto.publicEncrypt(ENC_PublicKey, buff)
	const ret = bytes.toString('base64')
	console.log('加密后：')
	console.log(ret)
	return ret
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
	const ret = new Buffer('{' + sf.join('&') + '}', 'utf8').toString('base64')
	return ret
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
	const ret = sign.sign(ACP.MER_KEY, 'base64')
	return ret
}

function parse(body) {
	console.log('应答报文：')
	console.log(body)
	if (body.indexOf('&') != -1) {
		const ret = {}
		body = body.substring(1, body.length - 1)
		const kvs = body.split('&')
		for (i in kvs) {
			const item = kvs[i].split('=')
			ret[item[0]] = item[1]
		}
		return ret
	} else {
		return body
	}
}

ACP.doPost = function(data, cb) {
	console.log('请求对象：')
	console.log(JSON.stringify(data));
	console.log('请求报文：')
	console.log(querystring.stringify(data))
	request.post({
		url: ACP.backTransUrl,
		body: querystring.stringify(data),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
	}, function(err, res, body) {
		// cb(parse(body))
		cb(body)
	})
}

ACP.doPost2 = function(data, cb) {
	console.log('请求对象：')
	console.log(JSON.stringify(data));
	console.log('请求报文：')
	console.log(querystring.stringify(data))
	const options = URL.parse(ACP.backTransUrl)
	options.method = 'POST'
	options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
	const req = https.request(options, function(res) {
		const buff = []
		res.on('data', function(chunk) {
			buff.push(chunk)
		})
		res.on('end', function() {
			const body = buff.join('')
			// cb(parse(body))
			cb(body)
		})
	})
	req.on('error', function(err) {
		console.log(err)
		cb(err.stack)
	})
	req.write(querystring.stringify(data))
	req.end()
}

module.exports = ACP
