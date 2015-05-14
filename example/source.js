/**
 * @file test
 * @author hushicai(bluthcy@gmail.com)
 */

define(
    function (require) {
        if (EC_DEFINED('mobile') && EC_DEFINED('ios') && EC_DEFINED('ios8')) {
            console.log('test');
            console.log('mobile');
        }
        else {
            console.log('test');
            console.log('pc');
        }

        if (EC_DEFINED('mobile') && EC_DEFINED('ios')) {
            console.log('test');
            console.log('ios');
        }
        else {
            console.log('test');
            console.log('pc');
        }

        if (EC_DEFINED('mobile') && EC_DEFINED('android.chrome')) {
            var test = require('chrome');
        }
        else {
            var test2 = require('xxx');
        }

        if (EC_DEFINED('mobile')) {
            var test = require('hammer');
        }
        else {
            var test2 = require('xxx');
        }
    }
);
