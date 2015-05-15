/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

var fs = require('fs');
var filename = require('path').resolve(__dirname, 'source.js');
var code = fs.readFileSync(filename, 'utf8');

var config = {
    mobile: 1,
    ios: 8,
    android: {
        chrome: 1,
    }
};

var code = require('../lib/compile')(code, {config: config});

console.log(code);
