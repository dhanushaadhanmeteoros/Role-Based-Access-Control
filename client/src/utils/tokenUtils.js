import { jwtDecode } from 'jwt-decode';

export function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
}

export function isTokenExpired(decoded) {
    if (!decoded?.exp) return true;
    const now = Date.now() / 1000;
    return decoded.exp < now;
}