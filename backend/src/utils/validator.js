import { REQUEST_TRANSITIONS } from "./constants.js";

export function validateRequestStatus(current, next){
    const allowed = REQUEST_TRANSITIONS;
    if (!allowed[current].includes(next)){
        return {ok: false, errors: `Invalid transition: ${current} to ${next} not allowed`}
    }
    return {ok: true, next}
}
