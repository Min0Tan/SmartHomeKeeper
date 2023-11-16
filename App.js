import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { TVProvider, TVContext } from './TVContext';

const Stack = createStackNavigator();

function Dashboard({ navigation }) {
  const { tvs } = useContext(TVContext);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Action icon="delete" onPress={() => navigation.navigate('DeleteScreen')} />
        <Appbar.Content title="Dashboard" style={{alignItems: 'center'}}/>
        <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddScreen')} />
      </Appbar.Header>
      {tvs.map((tv, index) => <Button key={index} title={tv} onPress={() => {}} />)}
    </View>
  );
}

function AddScreen() {
  const { tvs, setTVs } = useContext(TVContext);
  const [selectedValue, setSelectedValue] = useState('TV1');

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Add Screen" style={{alignItems: 'center'}}/>
      </Appbar.Header>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="TV1" value="TV1" />
        <Picker.Item label="TV2" value="TV2" />
        <Picker.Item label="TV3" value="TV3" />
      </Picker>
      <Button title="완료" onPress={() => setTVs([...tvs, selectedValue])} />
    </View>
  );
}

function DeleteScreen() {
  return (
    <View>
      <Text>Delete Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <TVProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TVProvider>
  );
}