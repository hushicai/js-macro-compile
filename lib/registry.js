/**
 * @file registry
 * @author hushicai(bluthcy@gmail.com)
 */

var config = {};

function accessByDot(obj, key) {
    key = key.split('.');
    while (obj && key.length) {
        obj = obj[key.shift()];
    }
    return obj;
}

var registry = {
    setConfig: function (cfg) {
        config = cfg;
    },
    DEFINED: {
        getValue: function (args) {
            var key = args[0].getValue();
            return !!accessByDot(config, key);
        }
    },
    NO_DEFINED: {
        getValue: function (args) {
            var key = args[0].getValue();
            return !accessByDot(config, key);
        }
    },
    EQUAL: function () {}
};

// alias
registry.EC_DEFINED = registry.DEFINED;
registry.EC_NO_DEFINED = registry.NO_DEFINED;

module.exports = registry;
