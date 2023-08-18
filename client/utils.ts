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
}
