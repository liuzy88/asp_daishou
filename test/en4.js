const crypto = require('crypto');

// Generate Alice's keys...
const alice = crypto.createDiffieHellman(1024);
const aliceKey = alice.generateKeys();
console.log(alice.getPublicKey('hex'));
console.log(alice.getPrivateKey('hex'));

console.log();

// Generate Bob's keys...
const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();
console.log(bob.getPublicKey('hex'));
console.log(bob.getPrivateKey('hex'));

// // Exchange and generate the secret...
// const aliceSecret = alice.computeSecret(bobKey);
// const bobSecret = bob.computeSecret(aliceKey);

// // OK
// console.log(aliceSecret.toString('hex'))
// console.log(bobSecret.toString('hex'))