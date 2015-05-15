/**
 * @file compile
 * @author hushicai(bluthcy@gmail.com)
 */

var ug = require('uglify-js');
var registry = require('./registry');


// 逆波兰式
// 后缀表达式
function findMacroInCondition(node, result) {
    // 二元运算
    if (node instanceof ug.AST_Binary) {
        findMacroInCondition(node.left, result);
        findMacroInCondition(node.right, result);
        result.push(node.operator);
    }
    else if (node instanceof ug.AST_Unary) {
        // 一元运算
        findMacroInCondition(node.expression, result);
        result.push(node.operator);
    }
    else if (node instanceof ug.AST_Call) {
        // 宏调用
        var entry  = registry[node.expression.name];
        if (entry) {
            result.push(entry.getValue(node.args));
        }
    }
    // else if (node instanceof ug.AST_SymbolRef) {
        // // variable
        // // result.push(node.thedef.init.value);
    // }
    // else {
        // // primary value
        // result.push(node.value);
    // }
}

// 计算逆波兰式
function evaluate(expr) {
    var stack = [];
    expr.forEach(function (v) {
        var a;
        var b;
        switch (v) {
            case '&&':
                a = stack.pop();
                b = stack.pop();
                stack.push(a && b);
                break;
            case '||':
                a = stack.pop();
                b = stack.pop();
                stack.push(a || b);
                break;
            case '===':
                a = stack.pop();
                b = stack.pop();
                stack.push(a === b);
                break;
            /* eslint-disable eqeqeq */
            case '==':
                a = stack.pop();
                b = stack.pop();
                stack.push(a == b);
                break;
            case '!==':
                a = stack.pop();
                b = stack.pop();
                stack.push(a !== b);
                break;
            case '!=':
                break;
                a = stack.pop();
                b = stack.pop();
                stack.push(a != b);
            /* eslint-enable eqeqeq */
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
    var ast = ug.parse(code);

    // ast.figure_out_scope();

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
            else if (node.alternative) {
                body = node.alternative.body;
            }
            return new ug.AST_Toplevel({
                body: body || []
            });
        }
    });

    var newAst = ast.transform(transfomer);

    return newAst.print_to_string({beautify: true});
}

module.exports = compile;

