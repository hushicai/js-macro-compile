/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

define(
    function (require) {
        if (EC_DEFINED('mobile')) {
            console.log('mobile');
        }
        
        if (EC_EQUAL('ios', 8)) {
            console.log('ios8');
        }

        if (EC_EQUAL('ios', 8)) {
            console.log('ios8 again');
        }

        if (!EC_DEFINED('pc')) {
            console.log('mobile');
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
