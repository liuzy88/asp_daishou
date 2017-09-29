const request = require('request')
const ACP = require('./acp')
const API = {}

const url = 'https://gateway.test.95516.com/gateway/api/backTransReq.do'

function parseBody(body) {
	const ret = {}
	body = body.substring(1, body.length - 1)
	const kvs = body.split('&')
	for (i in kvs) {
		const item = kvs[i].split('=')
		ret[item[0]] = item[1]
	}
	return ret
}

// 建立委托
API.jlwt = function(params, cb) {
	const formdata = {
		bizType: '000501',
		txnSubType: '11',
		orderId: params.orderId,
		txnType: '72',
		channelType: '07',
		certId: '68759663125', // mer.cer的序列号 1002653215(16进制转10进制)
		encoding: 'UTF-8',
		version: '5.1.0',
		accessType: '0',
		encryptCertId: '68759622183', // enc.cer的序列号 1002649227(16进制转10进制)
		txnTime: params.txnTime,
		merId: params.merId,
		accType: '01',
		signMethod: '01'
	}
	formdata.accNo = ACP.encryptData(params.accNo)
	formdata.customerInfo = ACP.customEncrypt(params, ['expired', 'cvn2', 'certifId', 'certifTp', 'customerNm', 'phoneNo'])
	formdata.signature = ACP.signEncrypt(formdata)
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		let ret = parseBody(body)
		cb(ret)
	})
}

// 解除委托
API.removeWt = function(params, cb) {
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		let ret = parseBody(body)
		cb(ret)
	})
}

// 代收
API.daishou = function(params, cb) {
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		let ret = parseBody(body)
		cb(ret)
	})
}

// 交易状态查询
API.daishouQuery = function(params, cb) {
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		let ret = parseBody(body)
		cb(ret)
	})
}

module.exports = API
