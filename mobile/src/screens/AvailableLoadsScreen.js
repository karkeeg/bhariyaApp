import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    StatusBar,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLoads } from '../hooks/useLoads';
import LoadCard from '../components/LoadCard';
import EmptyState from '../components/EmptyState';

const AvailableLoadsScreen = () => {
    const {
        loads,
        loading,
        acceptingId,
        refreshing,
        getLoads,
        acceptLoad
    } = useLoads();

    const renderItem = ({ item }) => (
        <LoadCard
            load={item}
            onAccept={acceptLoad}
            isAccepting={acceptingId === item._id}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Text style={styles.title}>Bhariya</Text>
                <Text style={styles.subtitle}>Available Cargo Loads</Text>
            </View>

            {loading && !refreshing ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#1a1a1a" />
                </View>
            ) : (
                <FlatList
                    data={loads}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={<EmptyState />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => getLoads(true)}
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
    listContent: {
        padding: 20,
        paddingBottom: 40,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AvailableLoadsScreen;
