export function assignExpr(expr, ctx, value) {
    try {
        new Function('ctx', 'value', 'with(ctx) { ' + expr + ' = value }')(ctx, value);
    } catch (e) {}
}