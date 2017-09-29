const express = require('express')
const router = express.Router()
const config = require('../config')
const API = require('../lib/api')

router.get('/', function(req, res, next) {
	res.render('index')
})

function orderId() {
	return txnTime() + ('00' + new Date().getSeconds()).slice(-3)
}

function txnTime() {
	const d = new Date()
	return [d.getFullYear(),
		('0' + (d.getMonth() + 1)).slice(-2),
		('0' + d.getDate()).slice(-2),
		('0' + d.getHours()).slice(-2),
		('0' + d.getMinutes()).slice(-2),
		('0' + d.getSeconds()).slice(-2)
	].join('')
}

router.all('/jlwt', function(req, res, next) {
	API.jlwt({
		merId: '777290058152112',
		orderId: orderId(),
		txnTime: txnTime(),
		accNo: '6216261000000000018',
		certifTp: '01',
		certifId: '341126197709218366',
		customerNm: '全渠道',
		phoneNo: '13552535506',
		cvn2: '',
		expired: ''
	}, function(ret) {
		res.json(ret)
	})
})

module.exports = router
