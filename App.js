import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//screens
import Login from './screens/Login'
import Signup from './screens/Signup'
import RootStack from './navigators/RootStack';

export default function App() {
  return <Login />;
}
