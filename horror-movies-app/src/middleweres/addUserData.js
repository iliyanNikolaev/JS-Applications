import { getUserData } from "../util.js";

export function addUserToCtx(ctx, next){
    const userData = getUserData();

    ctx.userData = userData;

    next();
}