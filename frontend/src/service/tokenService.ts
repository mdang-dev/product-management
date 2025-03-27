import Cookies from "js-cookie";

class TokenService {

    private static readonly TOKEN_KEY = "token";
    private static readonly SESSION_ACTIVITY_KEY = "session_activity";

    static getToken(): string | null {
        return Cookies.get(this.TOKEN_KEY) || null;
    }

    static setToken(token: string): void {
        Cookies.set(this.TOKEN_KEY, token, {expires: 7});
    }

    static clearToken(): void {
        Cookies.remove(this.TOKEN_KEY);
        localStorage.removeItem(this.SESSION_ACTIVITY_KEY);
    }

    static isSessionExpired(timeout: number):boolean {
        const lastActivity = localStorage.getItem(this.SESSION_ACTIVITY_KEY);
        return lastActivity ? Date.now() - parseInt(lastActivity, 10) >= timeout : true; 
    }

}

export default TokenService;