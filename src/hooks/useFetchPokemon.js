import { useState, useEffect } from "react";
import axios from "axios";

const useFetchPokemons = (initialUrl, pageSize = 20) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [nextUrl, setNextUrl] = useState(initialUrl);

    const fetchData = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            setData((prevData) => [...prevData, ...response.data.results]);
            setNextUrl(response.data.next);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(initialUrl);
    }, [initialUrl]);

    return { data, loading, error, fetchNextPage: () => fetchData(nextUrl) };
};

export default useFetchPokemons;
