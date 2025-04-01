import { base_url } from "../base";
import {WALLETDETAILS } from "../endpoints";


export const walletDetails = (userName: string) => base_url.get(WALLETDETAILS(userName))
