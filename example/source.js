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

        // if (EC_DEFINED('mobile') && EC_DEFINED('ios')) {
            // console.log('test');
            // console.log('mobile');
        // }
        // else {
            // console.log('test');
            // console.log('pc');
        // }


        if (EC_DEFINED('mobile')) {
            var test = require('test');
        }
        else {
            var test2 = require('test2');
        }
    }
);