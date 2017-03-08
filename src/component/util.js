export function assignExpr(expr, ctx, value) {
    if(expr.indexOf('=') > 0) {
        var arr = expr.split('=');
        expr = (arr[0]).replace(/(^\s+)|(\s+$)/g, "");
    }
    try {
        new Function('ctx', 'value', 'with(ctx) { ' + expr + ' = value }')(ctx, value);
    } catch (e) {}
}