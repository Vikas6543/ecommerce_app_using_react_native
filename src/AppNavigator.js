import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';

const AppNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='Login'
          component={Login}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='Register'
          component={Register}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name='Dashboard'
          component={Dashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
