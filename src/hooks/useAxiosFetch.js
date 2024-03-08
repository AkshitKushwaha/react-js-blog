import {useState, useEffect} from 'react';
import axios from 'axios';

export default function useAxiosFetch(dataUrl) {

        const [data, setData] = useState([]);
        const [fetchError, setFetchError] = useState(null);
        const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        let isMounted = true; //to prevent memory leak
        
        const source = axios.CancelToken.source(); //cancellation token for axios

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                } 
            } finally {
                isMounted && setTimeout(() => setIsLoading(false), 2000);
            }
        }

        fetchData(dataUrl);

        //cleanup

        const cleanUp = () => {
            console.log('Clean up');
            isMounted = false;
            source.cancel();
        }

        return cleanUp;

    }, [dataUrl])

  return {data, fetchError, isLoading};
}
