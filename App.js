import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, LogBox } from 'react-native';

//screens
import Login from './screens/Login'
import Signup from './screens/Signup'
import RootStack from './navigators/RootStack';

LogBox.ignoreAllLogs();

export default function App() {
  return <RootStack />;
}
