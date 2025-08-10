const httpRequest = async ({ url, method, credentials, body, refreshToken }) => {
    let attempts = 0;
    const fetchRequest = async () => {
        const response = await fetch(url, {
        // const response = await fetch(process.env.REACT_APP_API_URL + url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: credentials,
            body: JSON.stringify(body)
        });
        
        const { status, ok, statusText } = response;
        const result = await response.json();

        if (result.statusText === 'AccessTokenMissing' && refreshToken && attempts < 1) {
            attempts++;
            await refreshToken();
            return await fetchRequest();
        }

        return {
            status,
            ok,
            statusText,
            data: result
        };
    };
    return await fetchRequest();
};
export default httpRequest;