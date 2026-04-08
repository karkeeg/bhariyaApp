import { useState, useEffect, useCallback } from 'react';
import { toast } from '@backpackapp-io/react-native-toast';
import { fetchPendingLoads, acceptLoadRequest } from '../services/loadService';

const DRIVER_ID = 'driver123';

export const useLoads = (location) => {
    const [loads, setLoads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [acceptingId, setAcceptingId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const getLoads = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);

        try {
            const lat = location?.lat;
            const lng = location?.lng;

            const response = await fetchPendingLoads(lat, lng);
            if (response.success) {
                setLoads(response.data);
            } else {
                toast.error(response.message || 'Failed to fetch loads');
            }
        } catch (error) {
            toast.error('Network Error: Could not connect to the server.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [location]);

    // Fetch loads when location becomes available or changes
    useEffect(() => {
        if (location) {
            getLoads();
        }
    }, [location, getLoads]);

    const acceptLoad = async (loadId) => {
        setAcceptingId(loadId);

        try {
            const response = await acceptLoadRequest(loadId, DRIVER_ID);
            if (response.success) {
                setLoads((prevLoads) => prevLoads.filter((load) => load._id !== loadId));
                toast.success('Load accepted successfully!');
            } else {
                toast.error(response.message || 'Failed to accept load');
            }
        } catch (error) {
            toast.error('An unexpected error occurred while accepting the load.');
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
