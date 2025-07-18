export const getUserFromToken = (token) => {
    try {
        const base64 = token.split('.')[1];
        const decoded = JSON.parse(atob(base64));
        return decoded;
    } catch (err) {
        return null;
    }
};