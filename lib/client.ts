import got from "got";
import { CookieJar } from "tough-cookie";
import FileCookieStore from 'tough-cookie-file-store'

export class Client {

    static factory(name:string = 'default') {
        const cookieJar = new CookieJar(new FileCookieStore(`data/${name}-cookies.json`));

        return got.extend({
            cookieJar
        })
    }
    
}