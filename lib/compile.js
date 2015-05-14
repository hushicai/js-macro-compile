/**
 * @file compile
 * @author hushicai(bluthcy@gmail.com)
 */

var util = require('util');
var ug = require('uglify-js');

var registry = require('./registry');


// 逆波兰式
// 后缀表达式
function findMacroInCondition(condition, result) {
    if (condition.left) {
        findMacroInCondition(condition.left, result);
    }
    if (condition.right) {
        findMacroInCondition(condition.right, result);
    }
    if (condition.operator) {
        result.push(condition.operator);
    }
    else if (condition.expression) {
        var entry  = registry[condition.expression.name];
        if (entry) {
            result.push(entry.getValue(condition.args));
        }
    }
    // 如果if表达式中还有其他非宏判断，就会挂掉...
    // 怎么非宏的表达式呢？
}

// 计算逆波兰式
function evaluate(expr) {
    var stack = [];
    expr.forEach(function (v) {
        if (typeof v === 'boolean') {
            stack.push(v);
        }
        else {
            var a = stack.pop();
            var b = stack.pop();
            switch (v) {
                case '&&':
                    stack.push(a && b);
                    break;
                case '||':
                    stack.push(a || b);
                    break;
            }
        }
    });
    return stack[0];
}

/**
 * 预编译
 *
 * @public
 * @param {strign} code 源代码
 * @param {Object} options 配置项
 * @param {Object} options.config 宏值
 * @return {string}
 */
function compile(code, options) {
    options = options || {};
    var config = options.config;
    var ast = ug.parse(code);

    // 更新config
    registry.setConfig(config);

    var transfomer = new ug.TreeTransformer(null, function (node) {
        // 如果是if表达式，则进行处理
        if (node instanceof ug.AST_If) {
            var result = [];
            findMacroInCondition(node.condition, result);
            result = evaluate(result);

            var body;
            if (result) {
                body = node.body.body;
            }
            else {
                body = node.alternative.body;
            }
            return new ug.AST_Toplevel({
                body: body
            });
        }
    });

    var newAst = ast.transform(transfomer);

    return newAst.print_to_string({beautify: true});
}

module.exports = compile;

