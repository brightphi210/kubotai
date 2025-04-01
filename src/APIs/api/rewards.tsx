import { base_url } from "../base";
import {REWARDS } from "../endpoints";


export const allReward = (userName: string) => base_url.get(REWARDS(userName))
