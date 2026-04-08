import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toasts } from '@backpackapp-io/react-native-toast';
import AvailableLoadsScreen from './src/screens/AvailableLoadsScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AvailableLoadsScreen />
        <Toasts />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
