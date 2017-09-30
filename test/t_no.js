const request = require('request')
const https = require('https')
const URL = require('url')

const reqData = {
	bizType: '000501',
	txnSubType: '11',
	orderId: '20170930151758058',
	signature: 'IUPYsd5qcGH5Gsvk8MJhpUAvRJfS7XOi8sDAtowy/CgxlS/zG+U73a7koE6F0V2JtaegGbgSNe8D8r86OWtAiSz/OKAHbnOChc0QZA3UewbWt/FziitCrI9h5M6uly9sASora+uUKF0mFviscu0SBLVndnnFogGtEqk/teYXQNdyecz2FQHQPqW2uZC4RoY3tBGWmOKqthZIcMiIRxwpGsNtkNhQtCPyM8t8uj9mmT9m6HiYcElvBhcr+NxcJFDAyMP2U/DgIzKYBd6tlwxKCdWhUiZ9V/7Cru9AMZed4J+K3FOzJVXV29D7O5Yj5w8MSHo/NFAFG4AfoHyd7j+3Pw==',
	accNo: 'wwOXfaQBOAEvEK8sDDPmp1fOV3n2/P83qNOiBIcMUlAjb470d5OljZwdfWGLox1BC4YLhSqlbBJPu/qDpPN4ttAjbBOE3Px21J3n+tqf8E2Oj2yE7ycAK2rGzU4BT+rXWX2cffWSCUACfYRWNpRW4N3FXY1JexEzBc61ohmrHlA6XEK0scjxcxpTCmbWKXh/0c2QakehyqW/ov7GbUTczQ1FCNzVo8HlAyW5z+C29mNIYtMnktHaAgWH3FmQzZ5GTivmcDPLdMlZFfml6x1EP++BCf4PRt5RleBhRXNB7HOSp7P0wplJFzCLzkUf23UUiybtQQWhWjfXX6FH5FqtVQ==',
	customerInfo: 'e2NlcnRpZklkPTM0MTEyNjE5NzcwOTIxODM2NiZjZXJ0aWZUcD0wMSZjdXN0b21lck5tPeWFqOa4oOmBkyZlbmNyeXB0ZWRJbmZvPWdDTHk3dU1aUlZXSno4YkQvaUNUQmlGYklRWGZwYXZzeENYcE1tdzJmTkVET2ZpKzdFTEhacXNEc2hVejBWTGt5akZ6aGlXc0l2WkFKSVFHdTVVZjBTM1RqZ2tZRmFGRGszZ2doUTM1bmxuamJTdytzOVFML1JqYjNHNkdCSDlOaHZONWFJVjVHMitLVmRuVGJtdWtlc2JHbFRwYlpYcnpNODVCN3Z5a2crOWNaNEpPZEk5YkxST2VKd1h5WCtSTVNTaHIrSVoraHZMZ2FSamw1UEc3OU9pSGY4VVc5Vmh1NXc2bzVxMkpvRE5sSkRoUHpPcmNVM0E1ZFRKaXRqc21RYnViN3V2NTlQVjY3Q1VTd2JMRU43YXRHR25rd1cxempra0JFbVJYWkJySWNWZVVmUVVZRFlUZW1RSmlFOTJMWHVYMDZwUUQrQ0FFVU0rb1lMMGx5UT09fQ==',
	txnType: '72',
	channelType: '07',
	certId: '68759663125',
	encoding: 'UTF-8',
	version: '5.1.0',
	accessType: '0',
	encryptCertId: '68759622183',
	txnTime: '20170930151758',
	merId: '777290058152112',
	accType: '01',
	signMethod: '01'
}

const reqStr = require('querystring').stringify(reqData)

console.log(reqStr)

request.post({
	url: 'https://gateway.test.95516.com/gateway/api/backTransReq.do',
	body: reqStr,
	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}, function(err, res, body) {
	console.log(body)
})

/*const options = URL.parse('https://gateway.test.95516.com/gateway/api/backTransReq.do')
options.method = 'POST'
options.headers = {
	'Content-Type': 'application/x-www-form-urlencoded'
}
const req = https.request(options, function(res) {
	const buff = []
	res.on('data', function(chunk) {
		buff.push(chunk)
	})
	res.on('end', function() {
		const body = buff.join('')
		console.log(body)
	})
})
req.on('error', function(err) {
	console.log(err)
})
req.write(reqStr)
req.end()*/
