// Original ESN genesis.json for parity
// from https://github.com/OpenCommunityCoin/parity/blob/ethersocial/ethcore/res/ethereum/ethersocial.json 3/21/2018
// https://raw.githubusercontent.com/OpenCommunityCoin/parity/ethersocial/ethcore/res/ethereum/ethersocial.json
//
// ETSC genesis json
// from https://github.com/paritytech/parity/blob/master/ethcore/res/ethereum/social.json 4/9/2018
// https://raw.githubusercontent.com/paritytech/parity/d97cf341388ced3f5eb501bc9e06cb461e349758/ethcore/res/ethereum/social.json (original)
// https://raw.githubusercontent.com/paritytech/parity/master/ethcore/res/ethereum/social.json (latest)

var BigNumber = require('bignumber.js');
var esn = require('./ethersocial.json');
var etsc = require('./etsc.json'); // renamed

var i = 0, j = 0, n = 0;

delete etsc.accounts["0000000000000000000000000000000000000001"];
delete etsc.accounts["0000000000000000000000000000000000000002"];
delete etsc.accounts["0000000000000000000000000000000000000003"];
delete etsc.accounts["0000000000000000000000000000000000000004"];

var totaletsc = new BigNumber(0);
Object.keys(etsc.accounts).forEach((k) => {
  var a = new BigNumber(etsc.accounts[k].balance);
  totaletsc = totaletsc.plus(a);
});

var totalesn = new BigNumber(0);
Object.keys(esn.accounts).forEach((k) => {
  var key = k.toLowerCase().replace(/^0x/, '');
  var a = new BigNumber(esn.accounts[k].balance);
  totalesn = totalesn.plus(a);
  if (etsc.accounts[key]) {
    if (esn.accounts[k].balance == etsc.accounts[key].balance) {
      console.log(i++, k + " matched");
    } else {
      console.log(j++, k + " not matched");
      var b = new BigNumber(etsc.accounts[key].balance);
      var c = a.minus(b);
      console.log("             ESN: " + esn.accounts[k].balance + ", ETSC: ", etsc.accounts[key].balance + " diff = " + c.toString());
    }
    delete etsc.accounts[key];
  } else {
    console.log(n++, "Only ESN account " + k + " found");
  }
});

console.log("Total ESN = " + totalesn.div(100000000000000000).toString());
console.log("Total ETSC = " + totaletsc.div(100000000000000000).toString());
console.log("");
console.log("Total " + i + " accounts matched / " + j + " accounts not matched / ", n + " accounts ESN only");
console.log("Total " + Object.keys(etsc.accounts).length + " accounts ETSC only");
