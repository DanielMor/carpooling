const qs = values => {
    const encode = encodeURIComponent;

    return Object.keys(values)
        .map(key => `${encode(key)}=${encode(values[key])}`)
        .join('&');
};

export default ({ baseUrl, token }) => {
    const baseOptions = {
        //credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    };

    if (token) {
        baseOptions.headers.Authorization = `Bearer ${token}`;
    }

    function request(endpoint, options) {
        return fetch(`${baseUrl}${endpoint}`, options).then(res => {
            if (res.ok) {
                return res.json().catch(() => ({}));
            }

            return res.json().then(body => Promise.reject(body));
        });
    }

    function get(endpoint, extra) {
        const options = { method: 'GET', ...baseOptions, ...extra };

        if (options.query) {
            endpoint += `?${qs(options.query)}`;
            delete options.query;
        }

        return request(endpoint, options);
    }

    function post(endpoint, body = {}) {
        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            ...baseOptions,
        };

        return request(endpoint, options);
    }

    function del(endpoint, body = {}) {
        const options = {
            method: 'DELETE',
            body: JSON.stringify(body),
            ...baseOptions,
        };

        return request(endpoint, options);
    }

    function put(endpoint, body = {}) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(body),
            ...baseOptions,
        };

        return request(endpoint, options);
    }

    return {
        del,
        get,
        post,
        put,
    };
};
