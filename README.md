# js-macro-compile

利用自定义宏，在特定的场景下，删除没有覆盖到的分支代码。

## example

```bash
npm install
npm run example
```

## result

源代码：

```javascript
define(
    function (require) {
        if (EC_DEFINED('mobile')) {
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
```

配置：

```javascript
var config = {
    mobile: 1,
    ios: 1,
    ios8: 1,
    android: {
        chrome: 1,
    }
};
```

预编译之后：

```javascript
define(function(require) {
        console.log("mobile");
        console.log("ios");
        var test = require("chrome");
        var test = require("hammer");
});
```

目前只满足一些简单的宏定义。
