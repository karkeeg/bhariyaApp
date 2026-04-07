import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MapPin, Truck, IndianRupee, Weight } from 'lucide-react-native';

const LoadCard = ({ load, onAccept, isAccepting }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <MapPin size={18} color="#666" />
                    <Text style={styles.locationLabel}>Origin</Text>
                    <Text style={styles.locationText}>{load.origin}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.locationContainer}>
                    <MapPin size={18} color="#007AFF" />
                    <Text style={styles.locationLabel}>Destination</Text>
                    <Text style={styles.locationText}>{load.destination}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Truck size={16} color="#444" />
                    <Text style={styles.detailText}>{load.vehicleTypeRequired}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Weight size={16} color="#444" />
                    <Text style={styles.detailText}>{load.weight} kg</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.priceContainer}>
                    <IndianRupee size={20} color="#1a1a1a" />
                    <Text style={styles.priceText}>{load.price.toLocaleString()}</Text>
                </View>
                <TouchableOpacity
                    style={[styles.acceptButton, isAccepting && styles.disabledButton]}
                    onPress={() => onAccept(load._id)}
                    disabled={isAccepting}
                >
                    {isAccepting ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#fff" />
                            <Text style={styles.acceptButtonText}>Accepting...</Text>
                        </View>
                    ) : (
                        <Text style={styles.acceptButtonText}>Accept Load</Text>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationContainer: {
        flex: 1,
    },
    locationLabel: {
        fontSize: 10,
        color: '#888',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginTop: 4,
        marginBottom: 2,
    },
    locationText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a1a1a',
    },
    separator: {
        width: 1,
        height: 30,
        backgroundColor: '#eee',
        marginHorizontal: 15,
    },
    detailsContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#f5f5f5',
        paddingVertical: 12,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    detailText: {
        marginLeft: 6,
        color: '#444',
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#1a1a1a',
        marginLeft: 2,
    },
    acceptButton: {
        backgroundColor: '#1a1a1a',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        minWidth: 140,
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.7,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    acceptButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
        marginLeft: 8,
    },
});

export default LoadCard;
