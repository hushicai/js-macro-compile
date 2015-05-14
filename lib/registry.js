/**
 * @file registry
 * @author hushicai(bluthcy@gmail.com)
 */

var config = {};

var registry = {
    setConfig: function (cfg) {
        config = cfg;
    },
    DEFINED: {
        getValue: function (args) {
            var key = args[0].getValue();
            return !!config[key];
        }
    },
    NO_DEFINED: function (args) {}
};

// alias
registry.EC_DEFINED = registry.DEFINED;
registry.EC_NO_DEFINED = registry.NO_DEFINED;

module.exports = registry;
