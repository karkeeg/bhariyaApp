import api from './api';

export const fetchPendingLoads = async () => {
    try {
        const response = await api.get('/loads');
        return response.data;
    } catch (error) {
        console.error('Error fetching loads:', error);
        throw error;
    }
};

export const acceptLoadRequest = async (loadId, driverId) => {
    try {
        const response = await api.patch(`/loads/${loadId}/accept`, { driverId });
        return response.data;
    } catch (error) {
        console.error('Error accepting load:', error);
        throw error;
    }
};
