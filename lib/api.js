const querystring = require('querystring')
const request = require('request')
const https = require('https')
const URL = require('url')
const ACP = require('./acp')
const API = {}

const url = 'https://gateway.test.95516.com/gateway/api/backTransReq.do'
const options = URL.parse(url)
options.method = 'POST'
options.headers = { 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }

function parse(body) {
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
	const data = {
		bizType: '000501',
		txnSubType: '11',
		orderId: params.orderId,
		signature: '',
		accNo: params.accNo,
		customerInfo: '',
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
	data.accNo = ACP.encryptData(params.accNo)
	data.customerInfo = ACP.customEncrypt(params, ['expired', 'cvn2', 'certifId', 'certifTp', 'customerNm', 'phoneNo'])
	data.signature = ACP.signEncrypt(data)
	console.log('请求对象：', data);
	console.log('请求报文：', decodeURIComponent(querystring.stringify(data)))
	request.post({
		url: url,
		form: data,
		headers: { 'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8' }
	}, function(err, res, body) {
		cb(parse(body))
	})
	/*const req = https.request(options, function(res) {
		const buff = []
		res.on('data', function(chunk) {
			buff.push(chunk)
		})
		res.on('end', function() {
			console.log('>>' + buff.join(''));
			cb(parse(buff.join('')))
		})
	})
	req.on('error', function(err) {
		console.log(err);
	})
	req.write(querystring.stringify(data))
	req.end()*/
}

// 解除委托
API.removeWt = function(params, cb) {
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		cb(parse(body))
	})
}

// 代收
API.daishou = function(params, cb) {
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		cb(parse(body))
	})
}

// 交易状态查询
API.daishouQuery = function(params, cb) {
	request.post({
		url: url,
		form: formdata
	}, function(err, res, body) {
		cb(parse(body))
	})
}

module.exports = API
