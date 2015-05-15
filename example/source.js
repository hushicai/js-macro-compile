/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

define(
    function (require) {
        var a = 1;
        if (!EC_DEFINED('mobile') && a === 1) {
            console.log('mobile');
        }

        var b = 'test';
        if (EC_DEFINED('mobile') && b === 'test') {
            console.log('mobile');
        }
        else {
            console.log('pc');
        }

        if (EC_DEFINED('mobile') && EC_DEFINED('ios')) {
            console.log('ios');
        }
        else {
            console.log('pc1');
        }

        if (EC_DEFINED('mobile') && EC_DEFINED('android.chrome')) {
            var test = require('chrome');
        }
        else {
            var test2 = require('pc2');
        }

        if (EC_DEFINED('mobile')) {
            var test = require('hammer');
        }
        else {
            var test2 = require('pc3');
        }
    }
);
