const ACP = require('./acp')
const API = {}

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
	ACP.doPost(data, cb)
}

// 解除委托
API.removeWt = function(params, cb) {
	const data = {}
	ACP.doPost(data, cb)
}

// 代收
API.daishou = function(params, cb) {
	const data = {}
	ACP.doPost(data, cb)
}

// 交易状态查询
API.daishouQuery = function(params, cb) {
	const data = {}
	ACP.doPost(data, cb)
}

module.exports = API
