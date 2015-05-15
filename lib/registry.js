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
            var key = args[0].value;
            return !!accessByDot(config, key);
        }
    },
    NO_DEFINED: {
        getValue: function (args) {
            var key = args[0].value;
            return !accessByDot(config, key);
        }
    },
    EQUAL: {
        getValue: function (args) {
            var key = args[0].value;
            var value = args[1].value;
            return accessByDot(config, key) === value;
        }
    }
};

// alias
registry.EC_DEFINED = registry.DEFINED;
registry.EC_NO_DEFINED = registry.NO_DEFINED;
registry.EC_EQUAL = registry.EQUAL;

module.exports = registry;
