export default class Utils {
    public static getCookie(key: string): string {
        const cookie = document.cookie;
        const cookieList = cookie.split("; ");

        for(let i = 0; i < cookieList.length; i++) {
            if(cookieList[i].split("=")[0] === key) {
                return cookieList[i].split("=")[1];
            }
        }

        return "";
    }

    public static setCookie(key: string, value: string): void {
        document.cookie = key +"="+ value +";";
    }

    public static deleteCookie(key: string): void {
        document.cookie = key +"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
}
