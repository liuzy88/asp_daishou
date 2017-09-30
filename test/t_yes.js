const request = require('request')
const https = require('https')
const URL = require('url')

const reqData = {
	bizType: '000501',
	txnSubType: '11',
	orderId: '20170930142126199',
	signature: 'w4U2XijfdRwKCuAS+bDqCok+xrIPsvCvOm8xNc0yLPg4NF684ohPVVaixD7z73qfPr7ydR9q4bS8wUnRSNlCaXr1S8MO3lHyd/eBU9a+XanDSvf0LPBoPMUD2phBoDuaaV2AL0NdCQFcoUkjfsJjMxUv/R5n9PRXNNIRsU6I64FGjcMyIULmTcUHXvhawVRvE3g+nTMlnuPt3X8BA7+iITgmO8/p/ymwwN/mrDlyCb8huA/26r4JBOZRPVHOsHCJL9Ad6iUieNNxw56qr1ZYWSkSYd1Kp834EXV9JnGVk3ZTNgobv5v0iyx0mvTpboLaTCRpxkDMWx8zPIW6AOedfQ==',
	accNo: 'yasKNFsQO4goTU0DPVKumpFZe3i/pJB1wx7XPLvSIjN6jOcXEsycJFtFouABD3+Zy3LUAIRcXQBdBG+Ka5I0eD+rEalIOJKzC8IonULaVG7oKoDhLASWaBbkpMvAZll1QmdH7uZumz8pwEMorRDjTFnpVToEvk4NBJurC6rk5PEj0xW6XtR6OkIG2ZMvEt1mnLI6STHgYQZ9DfPQx8s1/aCD6BDBfl3aVoovdGmTUxM0R1M5ZOIhQwkjLzEP/YDbGd1erDkTurxAv82G8fT/JOh6FDVE/f0SHe02UR7R0v6MAZQn4Wpcb3eVMJOuVB+iKYveLKKhavNVm4MmSCVxdA==',
	customerInfo: 'e2NlcnRpZklkPTM0MTEyNjE5NzcwOTIxODM2NiZjZXJ0aWZUcD0wMSZjdXN0b21lck5tPeWFqOa4oOmBkyZlbmNyeXB0ZWRJbmZvPXVqQXZhSUZrRE9NS1I1emFWaFFWZGRBVWFDekZoZXFsTTRjc05qYXFKRkk2M3NFZ3dRVFZOR3lHSnRFdzJobFdsNC9mMGcxSDBqNGsvZnZKcU42Wks4TTVteWRaUWhqL1cvM21oMmMwR25ZbEM2NW1XeWxPOThMbDRRZ0J6cnpCbmhmSHlZRUNBUWpxYSsrMXErMmVGWGJkeFJLSVBuV3JRZGVvRzdpeGY0WkJZL1h0SGNwSGFJQnRZOEdDRldYWGlIdU5UajJLV2VvVGlkL3hhdndCc3ZmZmFDR3dMWGo3aVZmRUYyMnUzUXVqaUM4Z0Y0ZnFSYWJWZ011UVhUaWRQRndMcGVVQ000UFI1aUREdEk2eDJabXIxZ0hDR1NDKy9yRSt5UzNaeU5SQW9Sd094TW43OGxGZmk5ZTBuT3RYVzR2ZE5Fd0xGcm9wWDNHSmZZcW4xQT09fQ==',
	txnType: '72',
	channelType: '07',
	certId: '68759663125',
	encoding: 'UTF-8',
	version: '5.1.0',
	accessType: '0',
	encryptCertId: '68759622183',
	txnTime: '20170930142126',
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
