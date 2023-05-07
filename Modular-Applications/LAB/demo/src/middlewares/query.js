export function addQueryToCtx(ctx, next){
    if(ctx.querystring != ''){
        ctx.query = Object.fromEntries(ctx.querystring
        .split('&')
        .map(x => x.split('=')));
    } else {
        ctx.query = {};
    }
    next();
}