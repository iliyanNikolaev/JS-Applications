import { getUserData } from '../utill.js';

export function addSessionToCtx(ctx, next){
    const userData = getUserData();

    ctx.user = userData;

    next();
}