import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../features/auth/screens/LoginScreen';

export default function RootNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <MainTabNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}