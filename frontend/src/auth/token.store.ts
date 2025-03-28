import Cookies from "js-cookie";


const TOKEN_KEY = "token";
const SESSION_ACTIVITY_KEY = "session_activity";

export function getToken(): string | null {
    return Cookies.get(TOKEN_KEY) || null;
}

export function setToken(token: string): void {
    Cookies.set(TOKEN_KEY, token, {expires: 7});
    localStorage.setItem(SESSION_ACTIVITY_KEY, Date.now().toString());
}

export function clearToken(): void {
    Cookies.remove(TOKEN_KEY);
    localStorage.removeItem(SESSION_ACTIVITY_KEY);
}

export function isSessionExpired(timeout: number):boolean {
    const lastActivity = localStorage.getItem(SESSION_ACTIVITY_KEY);
    return lastActivity ? Date.now() - parseInt(lastActivity, 10) >= timeout : true; 
}


