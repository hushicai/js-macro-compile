/**
 * @file compile
 * @author hushicai(bluthcy@gmail.com)
 */

var esprima = require('esprima');
var escodegen = require('escodegen');
var estraverse = require('estraverse');
var Syntax = estraverse.Syntax;
var registry = require('./registry');

// 逆波兰式
// 后缀表达式
function findMacroInCondition(node, result) {
    if (node.type === Syntax.LogicalExpression) {
        findMacroInCondition(node.left, result);
        findMacroInCondition(node.right, result);
        result.push(node.operator);
    }
    else if (node.type === Syntax.UnaryExpression) {
        // 一元运算
        findMacroInCondition(node.argument, result);
        result.push(node.operator);
    }
    else if (node.type === Syntax.CallExpression) {
        // 宏调用
        var name = node.callee.name;
        var entry  = registry[name];
        if (entry) {
            result.push(entry.getValue(node.arguments));
        }
    }
}

// 计算逆波兰式
function evaluate(expr) {
    var stack = [];
    // 二元运算
    var binaryExpression = {
        '&&': function (a, b) {
            return a && b;
        },
        '||': function (a, b) {
            return a || b;
        }
    };
    expr.forEach(function (v) {
        var a;
        var b;
        switch (v) {
            case '&&':
            case '||':
                a = stack.pop();
                b = stack.pop();
                stack.push(binaryExpression[v](a, b));
                break;
            case '!':
                a = stack.pop();
                stack.push(!a);
                break;
            default:
                // 非操作符
                stack.push(v);
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
    // 更新config
    registry.setConfig(config);

    var ast = esprima.parse(code);

    var newAst = estraverse.replace(ast, {
        enter: function (node, parent) {
            if (node.type === Syntax.IfStatement) {
                var result = [];
                findMacroInCondition(node.test, result);
                // 如果没有找到宏定义，则直接返回
                if (!result.length) {
                    return;
                }
                this.skip();
                // 如果找到宏定义，则计算表达式的值
                result = evaluate(result);
                var newNode;
                if (result) {
                    newNode = node.consequent;
                }
                else {
                    newNode = node.alternate;
                }

                // 设置为Program可以去掉if表达式的括号
                // 但这样貌似不符合语法树定义？
                // newNode && (newNode.type = 'Program');
                return newNode;
            }
        }
    });

    return escodegen.generate(newAst);
}

module.exports = compile;

