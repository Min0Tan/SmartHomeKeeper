import React, { useContext, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
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
      {tvs.map((tv, index) =>
      <Button
        key={index}
        title={tv}
        onPress={() => navigation.navigate('TVControl', {tvName: tv })}
      />
    )}
    </View>
  );
}

function TVControl({ route }) {
  const { tvName } = route.params;

  return (
    <View>
      <Text>{tvName} Remote Controller</Text>
      {tvName === 'TV1' && (
        <View>
          {/* TV1에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {tvName === 'TV2' && (
        <View>
          {/* TV2에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {tvName === 'TV3' && (
        <View>
          {/* TV3에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}      
      {/* ... */}
    </View>
  );
}

function AddScreen() {
  const { tvs, setTVs } = useContext(TVContext);
  const [selectedValue, setSelectedValue] = useState('TV1');

  const handleComplete = () => {
    setTVs([...tvs, selectedValue]);
    Alert.alert(`${selectedValue}  등록이 완료되었습니다.`);
  };

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="TV1" value="TV1" />
        <Picker.Item label="TV2" value="TV2" />
        <Picker.Item label="TV3" value="TV3" />
      </Picker>
      <Button title="완료" onPress={handleComplete} />
    </View>
  );
}

function DeleteScreen({ navigation }) {
  const { tvs, setTVs } = useContext(TVContext);

  const handleDelete = (tvToDelete) => {
    Alert.alert(
      "삭제 확인",
      `${tvToDelete}을 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel"
        },
        { 
          text: "확인", 
          onPress: () => {
            setTVs(tvs.filter(tv => tv !== tvToDelete));
            Alert.alert(`${tvToDelete}가 삭제되었습니다.`);
          } 
        }
      ]
    );
  };

  return (
    <View>
      {tvs.map((tv, index) => 
        <Button 
          key={index} 
          title={tv} 
          onPress={() => handleDelete(tv)} 
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <TVProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" headerMode="screen">
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={({ navigation }) => ({
              title: 'Dashboard',
              headerLeft: () => <Appbar.Action icon="delete" onPress={() => navigation.navigate('DeleteScreen')} />,
              headerRight: () => <Appbar.Action icon="plus" onPress={() => navigation.navigate('AddScreen')} />,
            })}
          />
          <Stack.Screen name="TVControl" component={TVControl} />
          <Stack.Screen name="AddScreen" component={AddScreen} />
          <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TVProvider>
  );
}