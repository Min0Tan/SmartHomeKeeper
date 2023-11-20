import React, { useContext, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { TVProvider, TVContext } from './TVContext';
import { ACProvider, ACContext } from './ACContext';

const Stack = createStackNavigator();

function Dashboard({ navigation }) {
  const { tvs } = useContext(TVContext);
  const { acs } = useContext(ACContext);

  return (
    <View>
      {tvs.map((tv, index) =>
      <Button
        key={index}
        title={tv}
        onPress={() => navigation.navigate('TVControl', {tvName: tv })}
      />
    )}
      {acs.map((ac, index) =>
      <Button
        key={index}
        title={ac}
        onPress={() => navigation.navigate('ACControl', {acName: ac })}
      />
    )}    
    </View>
  );
}

function TypeScreen({ navigation }) {
  return (
    <View>
      <Button title="TV" onPress={() => navigation.navigate('AddTVScreen')} />
      <Button title="AC" onPress={() => navigation.navigate('AddACScreen')} />
      <Button title="조명" onPress={() => {/* 조명 제품을 추가하는 화면으로 이동하는 코드 */}} />
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

function ACControl({ route }) {
  const { acName } = route.params;

  return (
    <View>
      <Text>{acName} Remote Controller</Text>
      {acName === 'AC1' && (
        <View>
          {/* AC1에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {acName === 'AC2' && (
        <View>
          {/* AC2에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {acName === 'AC3' && (
        <View>
          {/* AC3에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}      
      {/* ... */}
    </View>
  );
}

function AddTVScreen() {
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

function AddACScreen() {
  const { acs, setACs } = useContext(ACContext);
  const [selectedValue, setSelectedValue] = useState('AC1');

  const handleComplete = () => {
    setACs([...acs, selectedValue]);
    Alert.alert(`${selectedValue}  등록이 완료되었습니다.`);
  };

  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="AC1" value="AC1" />
        <Picker.Item label="AC2" value="AC2" />
        <Picker.Item label="AC3" value="AC3" />
      </Picker>
      <Button title="완료" onPress={handleComplete} />
    </View>
  );
}

function AddLightScreen() {
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
  const { acs, setACs } = useContext(ACContext);

  const handleDelete = (productToDelete) => {
    Alert.alert(
      "삭제 확인",
      `${productToDelete}을 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel"
        },
        { 
          text: "확인", 
          onPress: () => {
            if(tvs.includes(productToDelete)) {
              setTVs(tvs.filter(tv => tv !== productToDelete));
            } else if(acs.includes(productToDelete)) {
              setACs(acs.filter(ac => ac !== productToDelete));
            }
            Alert.alert(`${productToDelete}가 삭제되었습니다.`);
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
      {acs.map((ac, index) => 
        <Button 
          key={index} 
          title={ac} 
          onPress={() => handleDelete(ac)} 
        />
      )}
    </View>
  );
}

export default function App() {
  return (
    <TVProvider>
      <ACProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Dashboard" headerMode="screen">
          <Stack.Screen 
            name="Dashboard" 
            component={Dashboard} 
            options={({ navigation }) => ({
              title: 'Dashboard',
              headerLeft: () => <Appbar.Action icon="delete" onPress={() => navigation.navigate('DeleteScreen')} />,
              headerRight: () => <Appbar.Action icon="plus" onPress={() => navigation.navigate('TypeScreen')} />,
            })}
          />
          <Stack.Screen name="TVControl" component={TVControl} />
          <Stack.Screen name="ACControl" component={ACControl} />
          <Stack.Screen name="TypeScreen" component={TypeScreen} />
          <Stack.Screen name="AddTVScreen" component={AddTVScreen} />
          <Stack.Screen name="AddACScreen" component={AddACScreen} />
          <Stack.Screen name="AddLightScreen" component={AddLightScreen} />
          <Stack.Screen name="DeleteScreen" component={DeleteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </ACProvider>
    </TVProvider>
  );
}