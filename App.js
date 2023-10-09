import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function DashboardScreen({ navigation }) {
  const [devices, setDevices] = useState(['TV', 'AC']);

  const getButtonColor = (device) => {
    switch(device) {
      case 'TV':
        return "#6799FF"; // Color for TV
      case 'AC':
        return "#5CD1E5"; // Color for AC
      default:
        return "#ABABAB"; // Default color is gray
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style={{fontSize: 24, alignSelf: "center", marginBottom: 40}}>Dashboard</Text>
      {devices.map(device => (
        <Button
         key={device}
         mode="contained"
         onPress={() => navigation.navigate(device + 'Remote')} 
         style={styles.button}
         buttonColor={getButtonColor(device)} // Get the color based on the device type
        >
        {device}
      </Button>
      ))}
    </View>
  );
}

function TVRemoteScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 24, alignSelf: "center", marginBottom: 40}}>TV Remote Screen</Text>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Power button pressed')}>Power</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Volume Up button pressed')}>Volume Up</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Volume Down button pressed')}>Volume Down</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Channel Up button pressed')}>Channel Up</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Channel Down button pressed')}>Channel Down</Button>
    </View>
  );
}

function ACRemoteScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 24, alignSelf: "center", marginBottom: 40}}>AC Remote Screen</Text>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Power button pressed')}>Power</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Volume Up button pressed')}>Volume Up</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Volume Down button pressed')}>Volume Down</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Channel Up button pressed')}>Channel Up</Button>
      <Button style={styles.button} mode="contained" onPress={() => console.log('Channel Down button pressed')}>Channel Down</Button>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="TVRemote" component={TVRemoteScreen} />
        <Stack.Screen name="ACRemote" component={ACRemoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
   },
   button: {
    marginTop: 10, // Adjust this value as needed
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center'
   },
   input:{
     height :40,
     borderColor:'gray',
     borderWidth :1,
     marginBottom :10
   }
});