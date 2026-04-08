import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
    const [location, setLocation] = useState(null);
    const [locationLoading, setLocationLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);
    const hasLocation = useRef(false);

    const getLocation = useCallback(async () => {
        // If we already have a location, don't show loading again
        if (!hasLocation.current) {
            setLocationLoading(true);
        }
        setLocationError(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setLocationError('Location permission denied. Please enable location access in Settings.');
                setLocationLoading(false);
                return;
            }

            // 1. Try last known position first (instant, no GPS wait)
            const lastKnown = await Location.getLastKnownPositionAsync();
            if (lastKnown && !hasLocation.current) {
                setLocation({
                    lat: lastKnown.coords.latitude,
                    lng: lastKnown.coords.longitude,
                });
                hasLocation.current = true;
                setLocationLoading(false);
            }

            // 2. Get fresh position in background (low accuracy = fast)
            const fresh = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low,
            });

            setLocation({
                lat: fresh.coords.latitude,
                lng: fresh.coords.longitude,
            });
            hasLocation.current = true;
        } catch (error) {
            console.error('Location error:', error);
            if (!hasLocation.current) {
                setLocationError('Could not get your location. Please try again.');
            }
        } finally {
            setLocationLoading(false);
        }
    }, []);

    useEffect(() => {
        getLocation();
    }, [getLocation]);

    return {
        location,
        locationLoading,
        locationError,
        refreshLocation: getLocation,
    };
};
