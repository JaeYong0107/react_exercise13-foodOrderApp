import { useCallback, useEffect, useState } from "react";
// 비동기로 url서버에서 config요청.
async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Somthing went wrong, failed to send request.');
    }

    return resData;
}

export default function useHttp(url, config, initialData) {
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }
    // 반환할 값들 설정. ( url, config가 변경될때마다 재정의.)
    const sendRequest = useCallback(async function sendRequest(data) {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, { ...config, body: data });
            setData(resData);
        } catch (error) {
            setError({ message: error.message } || 'Something went wrong!');
        }
        setIsLoading(false);
    }, [url, config])
    // GET요청이 들어오거나 method값이 없으면 실행
    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.metod)) || !config) {
            sendRequest();
        }
    }, [sendRequest, config])

    return {
        data,
        isLoading,
        error,
        sendRequest,
        clearData
    }

}