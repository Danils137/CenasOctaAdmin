import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import UsersScreen from '../screens/UsersScreen';
import PoliciesScreen from '../screens/PoliciesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Import navigation
import { ROUTES } from '../constants';

const Stack = createStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName={ROUTES.LOGIN}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} />
            <Stack.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} />
            <Stack.Screen name={ROUTES.USERS} component={UsersScreen} />
            <Stack.Screen name={ROUTES.POLICIES} component={PoliciesScreen} />
            <Stack.Screen name={ROUTES.SETTINGS} component={SettingsScreen} />
            <Stack.Screen name={ROUTES.PROFILE} component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
