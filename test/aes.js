var crypto = require('crypto');

function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

function en128(data, key) {
    var cipher = crypto.createCipher('aes-128-ecb', key);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function de128(data, key) {
    var cipher = crypto.createDecipher('aes-128-ecb', key);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

function en256(data, key) {
    var cipher = crypto.createCipher('aes-256-ecb', key);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function de256(data, key) {
    var cipher = crypto.createDecipher('aes-256-ecb', key);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

function en128md5(data, key) {
    var cipher = crypto.createCipher('aes-128-ecb', md5(key));
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function de128md5(data, key) {
    var cipher = crypto.createDecipher('aes-128-ecb', md5(key));
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

function en256md5(data, key) {
    var cipher = crypto.createCipher('aes-256-ecb', md5(key));
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function de256md5(data, key) {
    var cipher = crypto.createDecipher('aes-256-ecb', md5(key));
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

function en128vi(data, key) {
    var cipher = crypto.createCipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(true);
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

function de128vi(data, key) {
    var cipher = crypto.createDecipheriv('aes-128-ecb', key, '');
    cipher.setAutoPadding(true);
    return cipher.update(data, 'hex', 'utf8') + cipher.final('utf8');
}

var str = 'accNo=jhPKkXYKYiZLEs/XkcbvXde1qv6L8pMICyThsKVuSTHkWmoecxXB2+exVrIsXJX9NSVVW+l7r3w7v2/LC/v5GHfnlOcVZzI5b3yDaw1C8SjTpbbE1kLWw+R2vznt4jzwrENvclFA5BwBqviORhgbaiOdmkLxumMv1exucdEJDfgMlfiB3ZgOJOSllM9bGn0tgameRtq4/HVrlDqeZcpvOAVo0Jj8i8KDapUZoB7pVIOrV5ny/Y85eyLqPm2dYd6lxgdafnFmfRy5/+ZgO2PbtSx1xEYddk2yedWkXCPojtewCHPJ0pM4Tk9uP+ud9N+MmNU1v9pZJUuBzd55qF2riQ==&accType=01&accessType=0&bizType=000501&certId=68759663125&channelType=07&customerInfo=e2NlcnRpZklkPTM0MTEyNjE5NzcwOTIxODM2NiZjZXJ0aWZUcD0wMSZjdXN0b21lck5tPeWFqOa4oOmBkyZlbmNyeXB0ZWRJbmZvPVpBMEFTNG5FUmxackVwUmVCVTl5emNtMFNoZ1FCdnMzUnkxY2cxQmNVM29pVGtjblpwTGtJa2I5aFhVOFZRV0N5NmhkTlBKd1dQR3hvUkhIRXJyOXFkZ3BBSXV0T001eGVnTW5nL2JybHU2cjRjR1QzQXFqZWQwWTdGcE4vckZoRXFQOXVrbzIrVDIvb1lBZGZKZUk1dSt4dnU5MUNaNUh6elFJSUlIM0VySHdKUEk4M2M1aDVRSXRodnhlSlphQno5VmpyeUlRUkZGMHdlN3ZPQ0Z5QjM1TDBOTno1MmcrTzExb0R6M0Y0YkZCd3RXSXNpREYwVWlQOXVxYUg2TWxRdm5CTlU2VzN2Vk1FNmhDdXp6KzlyRGw3V2xqZkI3cnBwWi9NN1hSUWJsTlJSWjhPdHdJcXovMHhxR0poZkVVY1BHcnVrTXRKdmp5YzFid2Y5WkZzdz09fQ==&encoding=UTF-8&encryptCertId=68759622183&merId=777290058152112&orderId=20170929165156447&signMethod=01&txnSubType=11&txnTime=20170929165156&txnType=72&version=5.1.0'


console.log();


/*

[52, 54, 100, 99, 57, 52, 99, 98, 54, 97, 50, 57, 53, 99, 49, 51, 101, 51, 99, 53, 101, 51, 98, 57, 55, 101, 50, 55, 49, 48, 50, 97, 57, 49, 51, 99, 48, 102, 57, 51, 99, 48, 101, 54, 54, 56, 97, 48, 97, 49, 54, 101, 53, 101, 99, 52, 49, 101, 101, 57, 52, 52, 57, 50]

YMfudjRl/sK+RzoSWbZcqZ7NnEd2Twj9x2mFe9IV2Isv7PthKIETU3Vorj2vjdIsvi+cjNMLLWy8sWgHAF2fhLBKXZhWUJQbJJW9eZBo0/qaMbPVPgrOrx2hIHrb2Ef/PQwFTbxg9XdVX74PT1mHYbD8YLsgAtSrDtykjbzMfJe4PzjoWgWdytfu3sCitYcbzCIw320UqXmP50TL7BfiSBRK+B2rjX3kAMfx9uT7B2HRwumaNqv9UNKyEHmZmLdwMOYhb35mexbOMujYPop4MxLHP6IPvATfPNmXjPwv+kkkwiFEqvrXqLtstT9DxycwHnDKAr2ZQbP7XmtBKGY28g==

*/
