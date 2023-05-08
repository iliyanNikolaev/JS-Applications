export function addSessionToCtx(loadData){
    return function (ctx, next){
        const userData = loadData();

        if(userData){
            ctx.user = userData;
        }

        next();
    }
}