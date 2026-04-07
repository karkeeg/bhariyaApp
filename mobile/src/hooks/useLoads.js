import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { fetchPendingLoads, acceptLoadRequest } from '../services/loadService';

const DRIVER_ID = 'driver123';

export const useLoads = () => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [acceptingId, setAcceptingId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const getLoads = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const response = await fetchPendingLoads();
            if (response.success) {
                setLoads(response.data);
            } else {
                Alert.alert('Error', response.message || 'Failed to fetch loads');
            }
        } catch (error) {
            Alert.alert('Network Error', 'Could not connect to the server. Please check your connection.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        getLoads();
    }, [getLoads]);

    const acceptLoad = async (loadId) => {
        setAcceptingId(loadId);

        try {
            const response = await acceptLoadRequest(loadId, DRIVER_ID);
            if (response.success) {
                setLoads((prevLoads) => prevLoads.filter((load) => load._id !== loadId));
            } else {
                Alert.alert('Error', response.message || 'Failed to accept load');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred while accepting the load.');
        } finally {
            setAcceptingId(null);
        }
    };

    return {
        loads,
        loading,
        acceptingId,
        refreshing,
        getLoads,
        acceptLoad
    };
};
