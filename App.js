import React, { useContext, useState } from 'react';
import { View, Text, Button, Switch, StyleSheet, Alert, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Appbar, IconButton, MD3Colors } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import { TVProvider, TVContext } from './TVContext';
import { ACProvider, ACContext } from './ACContext';
import { LightProvider, LightContext } from './LightContext';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

import { logEvent } from './logService';
import { db, getDatabase } from './firebaseConfig';
import { Fragment } from 'react';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2: {
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    //marginBottom: 10,
  },
  container3: {

  },
  typeContainer: {
    height: 120,
    width: 160,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#EBFBF4',
    borderRadius: 20,
    shadowColor: '',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    shadowOffset: {
      height: -1,
      width: 0,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  typeContainer2: {
    height: 130,
    width: 170,
    borderWidth: 3,
    borderColor: "#8CB8A5",
    borderRadius: 30,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 0,
    backgroundColor: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  modelContainer: {
    height: 120,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  valueContainer: {
    height: 200,
    width: 330,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    //marginVertical: 0,
    borderRadius: 16,
    shadowColor: '',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      height: -1,
      width: 0,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  TVvalueContainer: {
    height: 150,
    width: 330,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 0,
    borderRadius: 16,
    shadowColor: '',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      height: -1,
      width: 0,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  deviceContainer: {
    width: 350,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 0,
    borderRadius: 16,
    shadowColor: '',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      height: -1,
      width: 0,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  containerText: {
    flex: 1,
    marginLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row', // 행 방향으로 나열
    justifyContent: 'space-between', // 두 컨테이너를 행 내에서 좌우로 나눔
    paddingHorizontal: 10, // 좌우 여백 설정
    marginTop: 15, // 상단 여백 설정
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 0,
    height: 100,
  },
  switch: {
    //marginRight: 10,
  },
  iconContainer: {
    height: 160,
    width: 170,
    borderWidth: 3,
    borderColor: "#8CB8A5",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 0,
    backgroundColor: '#E3F3EC',
    borderRadius: 40,
  },
  powerContainer: {
    height: 120,
    width: 140,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 0,
    backgroundColor: '#E3F3EC',
    borderRadius: 20,
    shadowColor: '',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: {
      height: -1,
      width: 0,
    },
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  spaceContainer: {
    marginVertical: 10,
  },
  dashboardContainer: {
    height: 110,
    width: 160,
    borderWidth: 3,
    borderColor: "white",
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    //marginVertical: 8,
    marginTop: 0,
    marginBottom: 10,

    //marginRight: 8,
    backgroundColor: '#E3F3EC',
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 4,
  },
  textBold: {
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
    //textAlignVertical: 'center',
    marginTop: 0,
    //marginBottom: 18,
  },
  textBold2: {
    fontSize: 25,
    fontWeight: '600',
    //textAlignVertical: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  textBold3: {
    fontSize: 14,
    fontWeight: '500',
    //textAlignVertical: 'center',
    marginTop: 12,
    marginBottom: 0,
  },
  background: {
    flex: 1,
    backgroundColor: '#D8F6EE',
  },
  separator: {
    width: 315,
    borderBottomWidth: 2, // 선의 높이
    borderBottomColor: '#C5C8C770', // 선의 색상
  },
  verticalseparator: {
    borderLeftWidth: 2,
    borderLeftColor: '#C5C8C770',
    marginTop: 6
  },
  deviceseparator: {
    width: 350,
    borderBottomWidth: 2, // 선의 높이
    borderBottomColor: '#C5C8C770', // 선의 색상
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A4A4A',
    marginBottom: 10,
  },
});

const DeviceCard = ({ device, navigation }) => {

  const navigateControl = (singleDevice) => {
    if (singleDevice === 'LG LED') {
      navigation.navigate('TVControl', { tvName: singleDevice });
    } else if (singleDevice === 'LG Ultra LED') {
      navigation.navigate('TVControl', { tvName: singleDevice });
    } else if (singleDevice === 'LG OLED') {
      navigation.navigate('TVControl', { tvName: singleDevice });
    } else if (singleDevice === 'UHD') {
      navigation.navigate('TVControl', { tvName: singleDevice });
    }

    else if (singleDevice === 'Whisen 4way') {
      navigation.navigate('ACControl', { acName: singleDevice });
    } else if (singleDevice === 'Whisen 1way') {
      navigation.navigate('ACControl', { acName: singleDevice });
    } else if (singleDevice === 'windfree') {
      navigation.navigate('ACControl', { acName: singleDevice });
    } else if (singleDevice === 'Carrier') {
      navigation.navigate('ACControl', { acName: singleDevice });
    }

    else if (singleDevice === 'Light1') {
      navigation.navigate('LightControl', { lightName: singleDevice });
    } else if (singleDevice === 'Light2') {
      navigation.navigate('LightControl', { lightName: singleDevice });
    } else if (singleDevice === 'Light3') {
      navigation.navigate('LightControl', { lightName: singleDevice });
    }
  }

  return (
    <View>
      {device.devices.map((singleDevice, deviceIndex) => (

        <View>
          {singleDevice === 'LG LED' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="tv" size={50} color="#C4084F" />
              <Button
                title={`LG LED`}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}

          {singleDevice === 'LG Ultra LED' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="tv" size={50} color="#C4084F" />
              <Button
                title={`LG Ultra LED`}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'LG OLED' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="tv" size={50} color="#C4084F" />
              <Button
                title={`LG OLED`}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'UHD' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="tv" size={50} color="#1862B4" />
              <Button
                title={`Samsung UHD`}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}


          {singleDevice === 'Whisen 4way' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#C4084F" />
              <Button
                title={`Whisen 4way`}
                size={30}
                color="black"
                onPress={() => navigation.navigate('ACControl', { acName: singleDevice })}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Whisen 1way' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#C4084F" />
              <Button
                title={`Whisen 1way`}
                size={25}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'windfree' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#1862B4" />
              <Button
                title={`windfree`}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Carrier' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#020298" />
              <Button
                title={`Carrier`}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}


          {singleDevice === 'Light1' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="lightbulb-outline" size={50} color="#73E1C5" />
              <Button
                title={`${singleDevice} `}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Light2' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="lightbulb-outline" size={50} color="#73E1C5" />
              <Button
                title={`${singleDevice} `}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Light3' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={() => navigateControl(singleDevice)}>
              <Icon name="lightbulb-outline" size={50} color="#73E1C5" />
              <Button
                title={`${singleDevice} `}
                size={30}
                color="black"
                onPress={() => navigateControl(singleDevice)}
              />
            </TouchableOpacity>
          )}


        </View>
      ))}
    </View>
  );
};

const DeviceCardDelete = ({ device, navigation, onDelete }) => {

  const handleDelete = () => {
    if (device && device.devices) {
      // 장치 목록이 있을 경우 첫 번째 장치의 이름을 사용
      onDelete(device.name);
    } else {
      console.error("Invalid device information:", device);
    }
  };

  return (
    <View>
      {device.devices.map((singleDevice, deviceIndex) => (

        <View>
          {singleDevice === 'LG LED' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="tv" size={50} color="#C4084F" />
              <Button
                title={`LG LED`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}

          {singleDevice === 'LG Ultra LED' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="tv" size={50} color="#C4084F"
                onPress={handleDelete} />
              <Button
                title={`LG Ultra LED`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}

          {singleDevice === 'LG OLED' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="tv" size={50} color="#C4084F"
                onPress={handleDelete} />
              <Button
                title={`LG OLED`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}

          {singleDevice === 'UHD' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="tv" size={50} color="#1862B4"
                onPress={handleDelete} />
              <Button
                title={`Samsung UHD`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}

          {singleDevice === 'Whisen 4way' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#C4084F" />
              <Button
                title={`Whisen 4way`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Whisen 1way' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#C4084F" />
              <Button
                title={`Whisen 1way`}
                size={25}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'windfree' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#1862B4" />
              <Button
                title={`windfree`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Carrier' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <MaterialCommunityIcons name="air-filter" size={45} color="#020298" />
              <Button
                title={`Carrier`}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}

          {singleDevice === 'Light1' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="lightbulb-outline" size={50} color="#73E1C5" />
              <Button
                title={`${singleDevice} `}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Light2' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="lightbulb-outline" size={50} color="#73E1C5" />
              <Button
                title={`${singleDevice} `}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}
          {singleDevice === 'Light3' && (
            <TouchableOpacity
              key={`device_${deviceIndex}`}
              style={styles.dashboardContainer}
              alignItems='center'
              onPress={handleDelete}>
              <Icon name="lightbulb-outline" size={50} color="#73E1C5" />
              <Button
                title={`${singleDevice} `}
                size={30}
                color="black"
                onPress={handleDelete}
              />
            </TouchableOpacity>
          )}


        </View>
      ))}
    </View>
  );
};

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert('Logged in', `Welcome, ${username}!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={handleLogin} />
    </View>
  );
}

function Dashboard({ navigation }) {
  const { tvs } = useContext(TVContext);
  const { acs } = useContext(ACContext);
  const { lights } = useContext(LightContext);

  // const groupedDevices = groupDevicesByRow([tvs, acs, lights]);
  // 각 섹션에 속하는 디바이스들로 그룹화
  const groupedTvs = tvs.length > 0 ? groupDevicesByRow([tvs]) : [];
  const groupedAcs = acs.length > 0 ? groupDevicesByRow([acs]) : [];
  const groupedLights = lights.length > 0 ? groupDevicesByRow([lights]) : [];

  const [isTvsOpen, setTvsOpen] = useState(true);
  const [isAcsOpen, setAcsOpen] = useState(true);
  const [isLightsOpen, setLightsOpen] = useState(true);

  return (
    <ScrollView
      //contentContainerStyle={styles.background} //이거 있으면 스크롤 원위치
      style={styles.background}
      keyboardShouldPersistTaps="handled" // 스크롤 시 키보드 닫기
    >
      <View style={styles.spaceContainer}></View>


      {/* TV 섹션 */}
      {groupedTvs.length > 0 && (
        <View style={[styles.deviceContainer, { backgroundColor: '#E6FAF5' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 13, marginBottom: 5 }}>

            <Text style={styles.sectionTitle}>  Television                                          </Text>
            <Icon
              name={isTvsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color="#4A4A4A"
              onPress={() => setTvsOpen(!isTvsOpen)}
            />

          </View>

          {isTvsOpen && (
            <View>
              <View style={styles.deviceseparator}></View>
              {groupedTvs.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.rowContainer}>
                  {row.map((device, colIndex) => (
                    <DeviceCard
                      key={colIndex}
                      device={{ name: device ? device.name : '', devices: [device] }}
                      navigation={navigation}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
      <View style={styles.spaceContainer}></View>

      {/* AC 섹션 */}
      {groupedAcs.length > 0 && (
        <View style={[styles.deviceContainer, { backgroundColor: '#E6FAF5' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 13, marginBottom: 5 }}>

            <Text style={styles.sectionTitle}>  Air Conditioner                                </Text>
            <Icon
              name={isAcsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color="#4A4A4A"
              onPress={() => setAcsOpen(!isAcsOpen)}
            />
          </View>

          {isAcsOpen && (
            <View>
              <View style={styles.deviceseparator}></View>
              {groupedAcs.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.rowContainer}>
                  {row.map((device, colIndex) => (
                    <DeviceCard
                      key={colIndex}
                      device={{ name: device ? device.name : '', devices: [device] }}
                      navigation={navigation}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
      <View style={styles.spaceContainer}></View>

      {/* Light 섹션 */}
      {groupedLights.length > 0 && (
        <View style={[styles.deviceContainer, { backgroundColor: '#E6FAF5' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 13, marginBottom: 5 }}>
            <Text style={styles.sectionTitle}>  Lights                                                  </Text>
            <Icon
              name={isLightsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color="#4A4A4A"
              onPress={() => setLightsOpen(!isLightsOpen)}
            />
          </View>

          {isLightsOpen && (
            <View>
              <View style={styles.deviceseparator}></View>
              {groupedLights.map((row, rowIndex) => (
                <View key={rowIndex} style={styles.rowContainer}>
                  {row.map((device, colIndex) => (
                    <DeviceCard
                      key={colIndex}
                      device={{ name: device ? device.name : '', devices: [device] }}
                      navigation={navigation}
                    />
                  ))}
                </View>
              ))}
            </View>
          )}
        </View>
      )}
      <View style={styles.spaceContainer}></View>
      <View style={styles.spaceContainer}></View>
    </ScrollView>
  );
}

function groupDevicesByRow(deviceArrays) {
  const devicesPerRow = 2; // 한 행에 표시할 디바이스 수
  const result = [];

  let flattenedDevices = [];
  deviceArrays.forEach((deviceArray) => {
    flattenedDevices = flattenedDevices.concat(deviceArray);
  });

  for (let i = 0; i < flattenedDevices.length; i += devicesPerRow) {
    const row = flattenedDevices.slice(i, i + devicesPerRow);
    result.push(row);
  }

  return result;
}

function TypeScreen({ navigation }) {
  return (
    <View style={styles.background}>
      <View style={styles.spaceContainer}></View>
      <View style={styles.spaceContainer}></View>

      <TouchableOpacity style={[styles.typeContainer, { justifyContent: 'center' }]} onPress={() => navigation.navigate('AddTVScreen')}>
        <Icon name="airplay" size={60} color="#73E1C5" />
        <Button title="TV" color="#366A55" onPress={() => navigation.navigate('AddTVScreen')} />
      </TouchableOpacity>

      <View style={styles.spaceContainer}></View>
      <View style={styles.spaceContainer}></View>

      <TouchableOpacity style={[styles.typeContainer, { justifyContent: 'center' }]} onPress={() => navigation.navigate('AddACScreen')}>

        <MaterialCommunityIcons name="air-filter" size={60} color="#73E1C5" />
        <Button title="AC" color="#366A55" onPress={() => navigation.navigate('AddACScreen')} />
      </TouchableOpacity>

      <View style={styles.spaceContainer}></View>
      <View style={styles.spaceContainer}></View>

      <TouchableOpacity style={[styles.typeContainer, { justifyContent: 'center' }]} onPress={() => navigation.navigate('AddLightScreen')}>
        <Icon name="lightbulb-outline" size={60} color="#73E1C5" />
        <Button title="Light" color="#366A55" onPress={() => navigation.navigate('AddLightScreen')} />
      </TouchableOpacity>
    </View>
  );
}

function AddTVScreen() {

  const { tvs, setTVs } = useContext(TVContext);
  const [selectedValue, setSelectedValue] = useState('TV1');
  const [pickerItems, setPickerItems] = useState([
    { label: '-', value: '' },
    { label: '-', value: '' },
    { label: '-', value: '' },
  ]);

  const handleComplete = () => {
    setTVs([...tvs, selectedValue]);
    Alert.alert(`${selectedValue} 등록이 완료되었습니다.`);
  };

  const handleIconPress = (items) => {
    setPickerItems(items);
    setSelectedValue(items[0].value);
  };

  return (
    <View style={styles.background}>
      <View style={styles.spaceContainer}></View>

      <Text style={[styles.textBold, { marginLeft: 20 }]}>Select Brand</Text>
      <View style={[styles.modelContainer, { alignSelf: 'center' }]}>
        <TouchableOpacity onPress={() => handleIconPress([
          { label: '< LG LED >', value: 'LG LED' },
          { label: '< LG Ultra LED >', value: 'LG Ultra LED' },
          { label: '< LG OLED >', value: 'LG OLED' },
        ])}>
          <Image source={require('./assets/LG_symbol.png')} style={{ width: 55, height: 55 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center' }}
          onPress={() => handleIconPress([
            { label: '< Samsung UHD >', value: 'UHD' }])}>
          <Image source={require('./assets/samsung.png')} style={{ width: 105, height: 35 }} />
        </TouchableOpacity>

      </View>

      <View style={[styles.separator, { alignSelf: 'center', width: 340 }]}></View>
      <Text style={[styles.textBold, { marginTop: 20, marginLeft: 20 }]}>Select Line</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {pickerItems.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
      <View style={styles.spaceContainer}></View>
      <View style={{ width: 100, height: 40, borderWidth: 2, backgroundColor: "#E5F4F0", borderRadius: 30, borderColor: "white", alignSelf: 'center', }}>
        <Button title="추가" color="#63C7AE" onPress={handleComplete} />
      </View>


    </View>
  );
}

function AddACScreen() {
  const { acs, setACs } = useContext(ACContext);
  const [selectedValue, setSelectedValue] = useState('AC1');
  const [pickerItems, setPickerItems] = useState([
    { label: '-', value: 'a' },
    { label: '-', value: 'b' },
    { label: '-', value: 'c' },
  ]);

  const handleComplete = () => {
    setACs([...acs, selectedValue]);
    Alert.alert(`${selectedValue} 등록이 완료되었습니다.`);
  };

  const handleIconPress = (items) => {
    setPickerItems(items);
    setSelectedValue(items[0].value);
  };

  return (
    <View style={styles.background}>
      <View style={styles.spaceContainer}></View>

      <Text style={[styles.textBold, { marginLeft: 20 }]}>Select Brand</Text>
      <View style={[styles.modelContainer, { alignSelf: 'center' }]}>
        <TouchableOpacity onPress={() => handleIconPress([
          { label: 'Whisen -4way-', value: 'Whisen 4way' },
          { label: 'Whisen -1way-', value: 'Whisen 1way' },
        ])}>
          <Image source={require('./assets/LG_symbol.png')} style={{ width: 55, height: 55 }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ alignSelf: 'center' }}
          onPress={() => handleIconPress([
            { label: '< BESPOKE windfree >', value: 'windfree' },
          ])}>
          <Image source={require('./assets/samsung.png')} style={{ width: 105, height: 35 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIconPress([
          { label: '< Carrier Inverter >', value: 'Carrier' },
        ])}>
          <Image source={require('./assets/Carrier.png')} style={{ width: 95, height: 37 }} />
        </TouchableOpacity>
      </View>

      <View style={[styles.separator, { alignSelf: 'center', width: 340 }]}></View>
      <Text style={[styles.textBold, { marginTop: 20, marginLeft: 20 }]}>Select Line</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        {pickerItems.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>

      <View style={styles.spaceContainer}></View>
      <View style={{ width: 100, height: 40, borderWidth: 2, backgroundColor: "#E5F4F0", borderRadius: 30, borderColor: "white", alignSelf: 'center', }}>
        <Button title="추가" color="#63C7AE" onPress={handleComplete} />
      </View>

    </View>
  );
}

function AddLightScreen() {
  const { lights, setLights } = useContext(LightContext);
  const [selectedValue, setSelectedValue] = useState('Light1');

  const handleComplete = () => {
    setLights([...lights, selectedValue]);
    Alert.alert(`${selectedValue}  등록이 완료되었습니다.`);
  };

  return (
    <View style={styles.background}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Light1" value="Light1" />
        <Picker.Item label="Light2" value="Light2" />
        <Picker.Item label="Light3" value="Light3" />
      </Picker>
      <View style={styles.spaceContainer}></View>
      <View style={{ width: 100, height: 40, borderWidth: 2, backgroundColor: "#E5F4F0", borderRadius: 30, borderColor: "white", alignSelf: 'center', }}>
        <Button title="추가" color="#63C7AE" onPress={handleComplete} />
      </View>
    </View>
  );
}

function TVControl({ route }) {
  const { tvName } = route.params;

  const [range, setRange] = useState(5); // 초기값 설정

  // 전원, 볼륨, 채널 업/다운 동작 수행
  const handlePowerButtonPress = () => {
    console.log(`${tvName} Power Button Pressed!`);
    logEvent(db, tvName, 1111);
  };
  const handleVolumeUp = () => {
    const newValue = range + 1; // 새로운 값 계산
    console.log(tvName, 'Volume Up - New value:', newValue);
    logEvent(db, tvName, newValue);
    setRange(newValue);
  };
  const handleVolumeDown = () => {
    const newValue = range - 1; // 새로운 값 계산
    console.log(tvName, 'Volume Down - New value:', newValue);
    logEvent(db, tvName, newValue);
    setRange(newValue);
  };
  const handleChannelUp = () => {
    console.log(`${tvName} Channel Up!`);
    logEvent(db, tvName, 'Channel Up!');
  };
  const handleChannelDown = () => {
    console.log(`${tvName} Channel Down!`);
    logEvent(db, tvName, 'Channel Down!');
  };
  const handleVolumeChange = (value) => {
    if (value > range) {
      console.log(tvName, 'Volume Up - New value:', value);
      logEvent(db, tvName, value);
    } else if (value < range) {
      console.log(tvName, 'Volume Down - New value:', value);
      logEvent(db, tvName, value);
    } else {
      console.log('Slider value did not change.');
    }
    setRange(value);
  };

  return (

    <View style={styles.background}>
      <View style={[styles.spaceContainer, { height: 15 }, { justifyContent: 'center' }]}></View>

      {tvName === 'LG LED' && (
        <View>
          <TouchableOpacity
            style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
            onPress={handlePowerButtonPress}>
            <Icon name="power-settings-new" size={45} color="#648E7E" />
          </TouchableOpacity>
          <View style={[styles.spaceContainer, { marginVertical: 20 }, { justifyContent: 'center' }]}></View>


          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 200 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Volume                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={handleVolumeDown}>
                <Icon name="volume-down" size={30} color="#85B09E" />
              </TouchableOpacity>
              <Text>                                                              </Text>
              <TouchableOpacity onPress={handleVolumeUp}>
                <Icon name="volume-up" size={30} color="#85B09E" />
              </TouchableOpacity>
            </View>

            <Slider
              style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
              value={range} // == this.state.value
              onValueChange={handleVolumeChange} // 슬라이더를 움질일때 출력값 변환
              minimumValue={1} // 최소값 설정
              maximumValue={20} // 최대값 설정
              maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
              minimumTrackTintColor='white' // 값이 작으면 파란색
              step={1} // 1단위로 값이 변경 
            />

            <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
              {String(range)} {/* range 변수를 문자열로 변환 */}
            </Text>

          </View>

          <View style={[styles.spaceContainer, { justifyContent: 'center' }, { height: 20 }]}></View>

          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 125 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Channel                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
              <Icon name="keyboard-arrow-up" size={45} color="#8EBEAA" onPress={handleChannelUp} />
              <Icon name="keyboard-arrow-down" size={45} color="#8EBEAA" onPress={handleChannelDown} />
            </View>
          </View>
        </View>
      )}
      {tvName === 'LG Ultra LED' && (
        <View>
          <TouchableOpacity
            style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
            onPress={handlePowerButtonPress}>
            <Icon name="power-settings-new" size={45} color="#648E7E" />
          </TouchableOpacity>
          <View style={[styles.spaceContainer, { marginVertical: 20 }, { justifyContent: 'center' }]}></View>


          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 200 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Volume                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={handleVolumeDown}>
                <Icon name="volume-down" size={30} color="#85B09E" />
              </TouchableOpacity>
              <Text>                                                              </Text>
              <TouchableOpacity onPress={handleVolumeUp}>
                <Icon name="volume-up" size={30} color="#85B09E" />
              </TouchableOpacity>
            </View>

            <Slider
              style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
              value={range} // == this.state.value
              onValueChange={handleVolumeChange} // 슬라이더를 움질일때 출력값 변환
              minimumValue={1} // 최소값 설정
              maximumValue={20} // 최대값 설정
              maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
              minimumTrackTintColor='white' // 값이 작으면 파란색
              step={1} // 1단위로 값이 변경 
            />

            <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
              {String(range)} {/* range 변수를 문자열로 변환 */}
            </Text>

          </View>

          <View style={[styles.spaceContainer, { justifyContent: 'center' }, { height: 10 }]}></View>

          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 125 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Channel                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
              <Icon name="keyboard-arrow-up" size={45} color="#8EBEAA" onPress={handleChannelUp} />
              <Icon name="keyboard-arrow-down" size={45} color="#8EBEAA" onPress={handleChannelDown} />
            </View>
          </View>
        </View>
      )}
      {tvName === ' LG OLED' && (
        <View>
          <TouchableOpacity
            style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
            onPress={handlePowerButtonPress}>
            <Icon name="power-settings-new" size={45} color="#648E7E" />
          </TouchableOpacity>
          <View style={[styles.spaceContainer, { marginVertical: 20 }, { justifyContent: 'center' }]}></View>


          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 200 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Volume                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={handleVolumeDown}>
                <Icon name="volume-down" size={30} color="#85B09E" />
              </TouchableOpacity>
              <Text>                                                              </Text>
              <TouchableOpacity onPress={handleVolumeUp}>
                <Icon name="volume-up" size={30} color="#85B09E" />
              </TouchableOpacity>
            </View>

            <Slider
              style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
              value={range} // == this.state.value
              onValueChange={handleVolumeChange} // 슬라이더를 움질일때 출력값 변환
              minimumValue={1} // 최소값 설정
              maximumValue={20} // 최대값 설정
              maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
              minimumTrackTintColor='white' // 값이 작으면 파란색
              step={1} // 1단위로 값이 변경 
            />

            <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
              {String(range)} {/* range 변수를 문자열로 변환 */}
            </Text>

          </View>

          <View style={[styles.spaceContainer, { justifyContent: 'center' }, { height: 10 }]}></View>

          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 125 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Channel                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
              <Icon name="keyboard-arrow-up" size={45} color="#8EBEAA" onPress={handleChannelUp} />
              <Icon name="keyboard-arrow-down" size={45} color="#8EBEAA" onPress={handleChannelDown} />
            </View>
          </View>
        </View>
      )}
      {tvName === ' UHD' && (
        <View>
          <TouchableOpacity
            style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
            onPress={handlePowerButtonPress}>
            <Icon name="power-settings-new" size={45} color="#648E7E" />
          </TouchableOpacity>
          <View style={[styles.spaceContainer, { marginVertical: 20 }, { justifyContent: 'center' }]}></View>


          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 200 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Volume                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
              <TouchableOpacity onPress={handleVolumeDown}>
                <Icon name="volume-down" size={30} color="#85B09E" />
              </TouchableOpacity>
              <Text>                                                              </Text>
              <TouchableOpacity onPress={handleVolumeUp}>
                <Icon name="volume-up" size={30} color="#85B09E" />
              </TouchableOpacity>
            </View>

            <Slider
              style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
              value={range} // == this.state.value
              onValueChange={handleVolumeChange} // 슬라이더를 움질일때 출력값 변환
              minimumValue={1} // 최소값 설정
              maximumValue={20} // 최대값 설정
              maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
              minimumTrackTintColor='white' // 값이 작으면 파란색
              step={1} // 1단위로 값이 변경 
            />

            <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
              {String(range)} {/* range 변수를 문자열로 변환 */}
            </Text>

          </View>

          <View style={[styles.spaceContainer, { justifyContent: 'center' }, { height: 10 }]}></View>

          <View style={[styles.TVvalueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 125 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 15 }}>
              <Text style={[styles.textBold]}>Channel                                               </Text>
            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
              <Icon name="keyboard-arrow-up" size={45} color="#8EBEAA" onPress={handleChannelUp} />
              <Icon name="keyboard-arrow-down" size={45} color="#8EBEAA" onPress={handleChannelDown} />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

function ACControl({ route }) {
  const { acName } = route.params;
  const [isPowerOn, setPowerOn] = useState(false);
  const [isDehumidifyingModeOn, setDehumidifyingModeOn] = useState(false);
  const [isCoolingModeOn, setCoolingModeOn] = useState(false);

  const [range, setRange] = useState(24); // 초기값 설정

  const handlePower = () => {
    setPowerOn(prevState => {
      const nextPowerState = !prevState;
      if (nextPowerState) {
        console.log(acName, 'Power On!');
        logEvent(db, acName, 111);
      } else {
        console.log(acName, 'Power Off!');
      }
      return nextPowerState;
    });
  };

  const handleTempUp = (value) => {
    const newValue = range + 1; // 새로운 값 계산
    console.log('Temperature Up - New value:', newValue);
    logEvent(db, acName, newValue);
    setRange(newValue);
  };
  const handleTempDown = (value) => {
    const newValue = range - 1; // 새로운 값 계산
    console.log('Temperature Down - New value:', newValue);
    logEvent(db, acName, newValue);
    setRange(newValue);
  };
  const handleTempChange = (value) => {
    if (value > range) {
      console.log('Temperature Up - New value:', value);
      logEvent(db, acName, value);
    } else if (value < range) {
      console.log('Temperature Down - New value:', value);
      logEvent(db, acName, value);
    } else {
      console.log('Slider value did not change.');
    }
    setRange(value);
  };

  const handleDehumidifyingModeToggle = () => {
    setDehumidifyingModeOn(prevState => !prevState);
    if (!isDehumidifyingModeOn) {
      console.log('Dehumidifying Mode On!');
      logEvent(db, acName, 11);
    } else {
      console.log('Dehumidifying Mode Off!');
      // logEvent(db, acName, 13); // off 상태에 대한 새로운 이벤트 코드를 사용하세요.
    }
    setCoolingModeOn(false);
  };
  const handleCoolingModeToggle = () => {
    setCoolingModeOn(prevState => !prevState);
    if (!isCoolingModeOn) {
      console.log('Cooling Mode On!');
      logEvent(db, acName, 12);
    } else {
      console.log('Cooling Mode Off!');
      // logEvent(db, acName, 14); // off 상태에 대한 새로운 이벤트 코드를 사용하세요.
    }
    setDehumidifyingModeOn(false);
  };

  return (
    <View style={styles.background}>

      <View style={[styles.spaceContainer, { marginVertical: 15 }, { justifyContent: 'center' }]}></View>

      {acName === 'Whisen 4way' && (
        <View>
          <TouchableOpacity
            style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
            onPress={handlePower}>
            <Icon name="power-settings-new" size={45} color="#648E7E" />
          </TouchableOpacity>
          <View style={[styles.spaceContainer, { marginVertical: 20 }, { justifyContent: 'center' }]}></View>

          <View style={[styles.valueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 170 }]}>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
              <Text style={[styles.textBold]}>temperature                        </Text>

              {isPowerOn ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                  <Text style={[styles.textBold2, { color: '#85B09E' }]}>
                    {String(range)}
                  </Text>
                  <MaterialCommunityIcons name="temperature-celsius" color='#85B09E' size={26} marginTop={10} />
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.textBold2, { color: '#C2C2C2' }]}>   - </Text>
                  <MaterialCommunityIcons name="temperature-celsius" color='#C2C2C2' size={26} marginTop={10} />
                </View>
              )}
            </View>
            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
              <TouchableOpacity onPress={handleTempDown}>
                <Icon name="ac-unit" size={30} color="#B0D5C1" />
              </TouchableOpacity>
              <Text>                                                             </Text>

              <Icon name="whatshot" size={30} color="#B0D5C1" onPress={handleTempUp} />

            </View>

            <Slider
              style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
              value={range} // == this.state.value
              onValueChange={handleTempChange} // 슬라이더를 움질일때 출력값 변환
              minimumValue={18} // 최소값 설정
              maximumValue={30} // 최대값 설정
              maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
              minimumTrackTintColor='white' // 값이 작으면 파란색
              step={1} // 1단위로 값이 변경 
            />

          </View>

          <View style={[styles.spaceContainer, { marginVertical: 20 }, { justifyContent: 'center' }]}></View>

          <View style={[styles.valueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }, { height: 145 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5, marginBottom: 20 }}>
              <Text style={[styles.textBold]}>mode                                                  </Text>

            </View>

            <View style={styles.separator}></View>

            <View style={{ flexDirection: 'row', marginTop: 7 }}>
              <View style={[styles.container3, { flex: 1, flexDirection: 'row', justifyContent: 'space-around' }]}>
                <IconButton icon="water-off-outline" size={35} />
                <Switch
                  trackColor={{ false: "#A9FFCD", true: "#C5D5B0" }}
                  value={isDehumidifyingModeOn}
                  onValueChange={handleDehumidifyingModeToggle}
                  style={styles.switch}
                  marginTop={15}
                />
              </View>

              <View style={styles.verticalseparator}></View>

              <View style={[styles.container3, { flex: 1, flexDirection: 'row', justifyContent: 'space-around' }]}>
                <IconButton icon="weather-windy" size={35} />
                <Switch
                  trackColor={{ false: "#A9FFCD", true: "#9BD5FF" }}
                  value={isCoolingModeOn}
                  onValueChange={handleCoolingModeToggle}
                  style={styles.switch}
                  marginTop={15}
                />
              </View>

            </View>

          </View>

          <View style={[styles.spaceContainer, { marginVertical: 10 }, { justifyContent: 'center' }]}></View>

        </View>
      )
      }
      {
        acName === 'Whisen 2way' && (
          <View>
            <TouchableOpacity
              style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
              onPress={() => {
                console.log(acName, 'Power Button Pressed!');
                logEvent(db, acName, 111);
              }}>
              <Icon name="power-settings-new" size={45} color="#648E7E" />
            </TouchableOpacity>
            <View style={[styles.spaceContainer, { marginVertical: 25 }, { justifyContent: 'center' }]}></View>


            <View style={[styles.valueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[styles.textBold]}>temperature                              </Text>
                <Icon name="device-thermostat" size={35} color="#85B09E" />
              </View>

              <View style={styles.separator}></View>
              <Text style={[styles.textBold3, { fontSize: 18 }, { color: '#527566' }, { justifyContent: 'center' }]}>18         ( - )               ( + )          30</Text>

              <Slider
                style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
                value={range} // == this.state.value
                onValueChange={handleTempChange} // 슬라이더를 움질일때 출력값 변환
                minimumValue={18} // 최소값 설정
                maximumValue={30} // 최대값 설정
                maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
                minimumTrackTintColor='white' // 값이 작으면 파란색
                step={1} // 1단위로 값이 변경 
              />

              <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
                {String(range)} {/* range 변수를 문자열로 변환 */}
              </Text>

            </View>

          </View>
        )
      }
      {
        acName === 'Whisen 1way' && (
          <View>
            <TouchableOpacity
              style={[styles.powerContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}
              onPress={() => {
                console.log(acName, 'Power Button Pressed!');
                logEvent(db, acName, 111);
              }}>
              <Icon name="power-settings-new" size={45} color="#648E7E" />
            </TouchableOpacity>
            <View style={[styles.spaceContainer, { marginVertical: 25 }, { justifyContent: 'center' }]}></View>

            <View style={[styles.valueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={[styles.textBold]}>temperature                              </Text>
                <Icon name="device-thermostat" size={35} color="#85B09E" />
              </View>

              <View style={styles.separator}></View>
              <Text style={[styles.textBold3, { fontSize: 18 }, { color: '#527566' }, { justifyContent: 'center' }]}>18         ( - )               ( + )          30</Text>

              <Slider
                style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
                value={range} // == this.state.value
                onValueChange={handleTempChange} // 슬라이더를 움질일때 출력값 변환
                minimumValue={18} // 최소값 설정
                maximumValue={30} // 최대값 설정
                maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
                minimumTrackTintColor='white' // 값이 작으면 파란색
                step={1} // 1단위로 값이 변경 
              />

              <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
                {String(range)} {/* range 변수를 문자열로 변환 */}
              </Text>

            </View>

          </View>
        )
      }
      {/* ... */}
    </View >
  );
}

function LightControl({ route }) {
  const { lightName } = route.params;
  const [range, setRange] = useState(5); // 초기값 설정
  const [isSwitchOn, setSwitchOn] = useState(false);
  const handleSwitchToggle = () => {
    setSwitchOn(!isSwitchOn);
    if (isSwitchOn) {
      console.log('Power Button Pressed!');
      logEvent(db, lightName, 'Power Button Pressed!');
    }
    else {
      console.log('Power Button Pressed!');
      logEvent(db, lightName, 'Power Button Pressed!');
    }
  };

  const handleBrightnessUp = (value) => {
    const newValue = range + 1; // 새로운 값 계산
    console.log('Brightness Up - New value:', newValue);
    logEvent(db, lightName, newValue);
    setRange(newValue);
  };
  const handleBrightnessDown = (value) => {
    const newValue = range - 1; // 새로운 값 계산
    console.log('Brightness Down - New value:', newValue);
    logEvent(db, lightName, newValue);
    setRange(newValue);
  };

  const handleBrightChange = (value) => {
    if (value > range) {
      console.log('Brightness Up - New value:', value);
      logEvent(db, lightName, value);
    } else if (value < range) {
      console.log('Brightness Down - New value:', value);
      logEvent(db, lightName, value);
    } else {
      console.log('Slider value did not change.');
    }
    setRange(value);
  };

  return (

    <View style={[styles.background, { alignItems: 'center' }]}>

      <View style={styles.container2}>
        <MaterialCommunityIcons name="home-lightbulb-outline" size={80} color="#73E1C5" />
      </View>

      <View style={[styles.spaceContainer, { justifyContent: 'center' }]}></View>

      <View style={[styles.valueContainer, { justifyContent: 'center' }, { backgroundColor: '#E6FAF5' }]}>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
          <Text style={[styles.textBold]}>Light                                        </Text>

          <Switch
            trackColor={{ false: "#767577", true: "#85B09E" }}
            value={isSwitchOn}
            onValueChange={handleSwitchToggle}
            style={styles.switch}
            color="#60F0CB"
            onPress={() => console.log('Power Button Pressed!')}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
          <TouchableOpacity onPress={handleBrightnessDown}>
            <Icon name="lightbulb-outline" size={30} color="#85B09E" />
          </TouchableOpacity>
          <Text>                                                              </Text>
          <TouchableOpacity onPress={handleBrightnessUp}>
            <Icon name="lightbulb" size={30} color="#85B09E" />
          </TouchableOpacity>
        </View>

        <Slider
          style={{ height: 40, width: 290, marginTop: 0, marginBottom: 5 }}
          value={range} // == this.state.value
          onValueChange={handleBrightChange} // 슬라이더를 움질일때 출력값 변환
          minimumValue={0} // 최소값 설정
          maximumValue={10} // 최대값 설정
          maximumTrackTintColor='#8EBEAA' // 값이 크면 빨간색
          minimumTrackTintColor='white' // 값이 작으면 파란색
          step={1} // 1단위로 값이 변경 
        />

        <Text style={[styles.textBold2, { color: '#85B09E' }, { justifyContent: 'center' }]}>
          {String(range)} {/* range 변수를 문자열로 변환 */}
        </Text>

      </View>

      <View style={[styles.spaceContainer, { justifyContent: 'center' }]}></View>


      {lightName === 'Light1' && (
        <View>
          {/* Light2에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {lightName === 'Light2' && (
        <View>
          {/* Light2에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {lightName === 'Light3' && (
        <View>
          {/* Light3에 대한 고유한 UI를 여기에 추가 */}
        </View>
      )}
      {/* ... */}
    </View>
  );
}

function DeleteScreen({ navigation }) {
  const { tvs, setTVs } = useContext(TVContext);
  const { acs, setACs } = useContext(ACContext);
  const { lights, setLights } = useContext(LightContext);

  // 각 섹션에 속하는 디바이스들로 그룹화
  const groupedTvs = tvs.length > 0 ? groupDevicesByRow([tvs]) : [];
  const groupedAcs = acs.length > 0 ? groupDevicesByRow([acs]) : [];
  const groupedLights = lights.length > 0 ? groupDevicesByRow([lights]) : [];

  // 아코디언 아이콘
  const [isTvsOpen, setTvsOpen] = useState(true);
  const [isAcsOpen, setAcsOpen] = useState(true);
  const [isLightsOpen, setLightsOpen] = useState(true);

  const handleDelete = (deviceName, setDevices) => {
    Alert.alert(
      "삭제 확인",
      `디바이스를 삭제하시겠습니까?`,
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "확인",
          onPress: () => {
            setDevices(devices => {
              // 삭제할 디바이스의 인덱스를 찾습니다.
              const indexToDelete = devices.findIndex(dev => dev.name === deviceName);

              // 디바이스를 찾으면 배열에서 제거합니다.
              if (indexToDelete !== -1) {
                const updatedDevices = [...devices];
                updatedDevices.splice(indexToDelete, 1);
                return updatedDevices;
              }

              return devices; // 디바이스가 찾아지지 않으면 원래 배열을 반환합니다.
            });

            Alert.alert(`디바이스가 삭제되었습니다.`);
          }
        }
      ]
    );
  };


  return (
    <ScrollView
      backgroundColor='#E8E8E8'
      keyboardShouldPersistTaps="handled" // 스크롤 시 키보드 닫기
    >
      <View style={styles.spaceContainer}></View>

      {/* TV 섹션 */}
      {groupedTvs.length > 0 && (
        <View style={[styles.deviceContainer, { backgroundColor: '#E6FAF5' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 13, marginBottom: 5 }}>

            <Text style={styles.sectionTitle}>  Television                                       </Text>
            <Icon
              name={isTvsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color="#4A4A4A"
              onPress={() => setTvsOpen(!isTvsOpen)}
            />

          </View>

          {isTvsOpen && (
            <Fragment>
              <View>
                <View style={styles.deviceseparator}></View>
                {groupedTvs.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.rowContainer}>
                    {row.map((device, colIndex) => (
                      <DeviceCardDelete
                        key={colIndex}
                        device={{ name: device ? device.name : '', devices: [device] }}
                        navigation={navigation}
                        onDelete={(deletedDevice) => handleDelete(deletedDevice, setTVs)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </Fragment>

          )}
        </View>
      )}
      <View style={styles.spaceContainer}></View>

      {/* AC 섹션 */}
      {groupedAcs.length > 0 && (
        <View style={[styles.deviceContainer, { backgroundColor: '#E6FAF5' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 13, marginBottom: 5 }}>

            <Text style={styles.sectionTitle}>  Air Conditioner                              </Text>
            <Icon
              name={isAcsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color="#4A4A4A"
              onPress={() => setAcsOpen(!isAcsOpen)}
            />
          </View>

          {isAcsOpen && (
            <Fragment>
              <View>
                <View style={styles.deviceseparator}></View>
                {groupedAcs.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.rowContainer}>
                    {row.map((device, colIndex) => (
                      <DeviceCardDelete
                        key={colIndex}
                        device={{ name: device ? device.name : '', devices: [device] }}
                        navigation={navigation}
                        onDelete={(deletedDevice) => handleDelete(deletedDevice, setACs)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </Fragment>
          )}
        </View>
      )}
      <View style={styles.spaceContainer}></View>

      {/* Light 섹션 */}
      {groupedLights.length > 0 && (
        <View style={[styles.deviceContainer, { backgroundColor: '#E6FAF5' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 13, marginBottom: 5 }}>
            <Text style={styles.sectionTitle}>  Lights                                                </Text>
            <Icon
              name={isLightsOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
              size={30}
              color="#4A4A4A"
              onPress={() => setLightsOpen(!isLightsOpen)}
            />
          </View>

          {isLightsOpen && (
            <Fragment>
              <View>
                <View style={styles.deviceseparator}></View>
                {groupedLights.map((row, rowIndex) => (
                  <View key={rowIndex} style={styles.rowContainer}>
                    {row.map((device, colIndex) => (
                      <DeviceCardDelete
                        key={colIndex}
                        device={{ name: device ? device.name : '', devices: [device] }}
                        navigation={navigation}
                        onDelete={(deletedDevice) => handleDelete(deletedDevice, setLights)}
                      />
                    ))}
                  </View>
                ))}
              </View>
            </Fragment>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default function App() {
  return (
    <TVProvider>
      <ACProvider>
        <LightProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard" headerMode="screen">
              <Stack.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ navigation }) => ({
                  title: 'Dashboard',
                  headerLeft: () => <Appbar.Action icon="delete-outline" size={40} color="#73E1C5" onPress={() => navigation.navigate('DeleteScreen')} />,
                  headerRight: () => <Appbar.Action icon="plus" size={40} color="#73E1C5" onPress={() => navigation.navigate('TypeScreen')} />,
                })}
              />
              <Stack.Screen name="TVControl" component={TVControl}
                options={({ navigation }) => ({
                  title: 'Device Type',
                  headerLeft: () => <Appbar.Action icon="home" size={45} color="#73E1C5" onPress={() => navigation.navigate('Dashboard')} />,
                })} />
              <Stack.Screen name="ACControl" component={ACControl}
                options={({ navigation }) => ({
                  title: 'Device Type',
                  headerLeft: () => <Appbar.Action icon="home" size={45} color="#73E1C5" onPress={() => navigation.navigate('Dashboard')} />,
                })} />
              <Stack.Screen name="LightControl" component={LightControl}
                options={({ navigation }) => ({
                  title: 'Device Type',
                  headerLeft: () => <Appbar.Action icon="home" size={45} color="#73E1C5" onPress={() => navigation.navigate('Dashboard')} />,
                })} />
              <Stack.Screen
                name="TypeScreen"
                component={TypeScreen}
                options={({ navigation }) => ({
                  title: 'Device Type',
                  headerLeft: () => <Appbar.Action icon="home" size={45} color="#73E1C5" onPress={() => navigation.navigate('Dashboard')} />,
                })} />
              <Stack.Screen
                name="AddTVScreen"
                component={AddTVScreen}
                options={({ navigation }) => ({
                  title: 'TV model',
                  headerTintColor: "#72D2BA",
                  headerTitleStyle: { color: 'black' },
                })} />
              <Stack.Screen
                name="AddACScreen"
                component={AddACScreen}
                options={({ navigation }) => ({
                  title: 'AC model',
                  headerTintColor: "#72D2BA",
                  headerTitleStyle: { color: 'black' },
                })} />
              <Stack.Screen
                name="AddLightScreen"
                component={AddLightScreen}
                options={({ navigation }) => ({
                  title: 'Light model',
                  headerTintColor: "#72D2BA",
                  headerTitleStyle: { color: 'black' },
                })} />
              <Stack.Screen
                name="DeleteScreen"
                component={DeleteScreen}
                options={({ navigation }) => ({
                  title: 'Delete Device',
                  headerLeft: () => <Appbar.Action icon="home" size={45} color="#73E1C5" onPress={() => navigation.navigate('Dashboard')} />,
                })} />
            </Stack.Navigator>
          </NavigationContainer>
        </LightProvider>
      </ACProvider>
    </TVProvider>
  );
}