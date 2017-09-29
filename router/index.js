const express = require('express')
const router = express.Router()
const config = require('../config')
const API = require('../lib/api')

router.get('/', function(req, res, next) {
	res.render('index')
})

router.all('/jlwt', function(req, res, next) {
	API.jlwt({
		merId: '777290058152112',
		orderId: '20170929185307599',
		txnTime: '20170929185307',
		accNo: '6216261000000000018',
		certifTp:'01',
		certifId:'341126197709218366',
		customerNm:'全渠道',
		phoneNo:'13552535506',
		cvn2:'',
		expired:''
	}, function(ret) {
		res.json(ret)
	})
})

module.exports = router
