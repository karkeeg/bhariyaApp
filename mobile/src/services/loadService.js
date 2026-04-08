import api from './api';

export const fetchPendingLoads = async (lat, lng) => {
    try {
        const params = {};
        if (lat != null && lng != null) {
            params.lat = lat;
            params.lng = lng;
        }

        const response = await api.get('/loads', { params });
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
