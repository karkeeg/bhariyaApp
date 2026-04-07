import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PackageOpen } from 'lucide-react-native';

const EmptyState = ({ message = 'No pending loads available' }) => {
    return (
        <View style={styles.container}>
            <PackageOpen size={64} color="#ccc" />
            <Text style={styles.title}>All Caught Up!</Text>
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        marginTop: 20,
    },
    message: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default EmptyState;
