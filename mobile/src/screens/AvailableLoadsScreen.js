import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, RefreshCw } from 'lucide-react-native';
import { useLocation } from '../hooks/useLocation';
import { useLoads } from '../hooks/useLoads';
import LoadCard from '../components/LoadCard';
import EmptyState from '../components/EmptyState';

const AvailableLoadsScreen = () => {
    const {
        location,
        locationLoading,
        locationError,
        refreshLocation
    } = useLocation();

    const {
        loads,
        loading,
        acceptingId,
        refreshing,
        getLoads,
        acceptLoad
    } = useLoads(location);

    const handleRefresh = () => {
        getLoads(true);
    };

    const renderItem = ({ item }) => (
        <LoadCard
            load={item}
            onAccept={acceptLoad}
            isAccepting={acceptingId === item._id}
        />
    );

    const renderLocationStatus = () => {
        if (locationLoading) {
            return (
                <View style={styles.locationBar}>
                    <ActivityIndicator size="small" color="#007AFF" />
                    <Text style={styles.locationText}>Getting your location...</Text>
                </View>
            );
        }

        if (locationError) {
            return (
                <TouchableOpacity style={styles.locationBarError} onPress={refreshLocation}>
                    <MapPin size={14} color="#d32f2f" />
                    <Text style={styles.locationTextError}>{locationError}</Text>
                    <RefreshCw size={14} color="#d32f2f" />
                </TouchableOpacity>
            );
        }

        return null;
    };

    const isLoading = (loading || locationLoading) && !refreshing;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.title}>Bhariya</Text>
                <Text style={styles.subtitle}>Available Cargo Loads</Text>
            </View>

            {renderLocationStatus()}

            {/* Location info bar */}
            {location && !locationLoading && (
                <View style={styles.infoBar}>
                    <MapPin size={14} color="#2e7d32" />
                    <Text style={styles.infoBarText}>
                        Showing cargo within 10km of your location · {loads.length} found
                    </Text>
                </View>
            )}

            {isLoading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#1a1a1a" />
                    <Text style={styles.loadingText}>
                        {locationLoading ? 'Detecting your location...' : 'Loading nearby cargo...'}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={loads}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={
                        <EmptyState
                            message={'No cargo available within 10km of your location'}
                        />
                    }
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#1a1a1a']}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        marginTop: 2,
    },
    locationBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#e3f2fd',
        gap: 8,
    },
    locationBarError: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#ffebee',
        gap: 8,
    },
    locationText: {
        flex: 1,
        fontSize: 13,
        color: '#007AFF',
        fontWeight: '500',
    },
    locationTextError: {
        flex: 1,
        fontSize: 12,
        color: '#d32f2f',
        fontWeight: '500',
    },
    infoBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#e8f5e9',
        gap: 6,
    },
    infoBarText: {
        fontSize: 12,
        color: '#2e7d32',
        fontWeight: '600',
    },
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
});

export default AvailableLoadsScreen;
