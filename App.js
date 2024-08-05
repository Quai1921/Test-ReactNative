import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import RoverScreen from './components/RoverScreen'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            if (route.name === 'Curiosity') {
              iconName = focused ? 'planet' : 'planet-outline'
            } else if (route.name === 'Opportunity') {
              iconName = focused ? 'rocket' : 'rocket-outline'
            } else if (route.name === 'Spirit') {
              iconName = focused ? 'star' : 'star-outline'
            }

            return <Icon name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#3B3B69',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { marginBottom: 6 },
        })}
      >
        <Tab.Screen name="Curiosity">
          {() => <RoverScreen rover="curiosity" />}
        </Tab.Screen>
        <Tab.Screen name="Opportunity">
          {() => <RoverScreen rover="opportunity" />}
        </Tab.Screen>
        <Tab.Screen name="Spirit">
          {() => <RoverScreen rover="spirit" />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

