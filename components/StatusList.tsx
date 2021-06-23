import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import inspect from '../inspect';
import { DashedCircularIndicator } from './Status/DashedCircularIndicator';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';

const StatusList: React.FC<NavigationInjectedProps> = ({ navigation }) => {
  const status = [];

  for (let i = 0; i < 50; i++) {
    status.push('statusUpdate');
  }
  return (
    <View>
      <Text style={styles.title}>Recent Updates</Text>
      {status.map((_, i) => (
        <TouchableNativeFeedback
          key={i}
          onPress={() => navigation.navigate('StatusView')}
          background={TouchableNativeFeedback.Ripple('#fff', false)}
        >
          <View style={styles.statusPrt}>
            <DashedCircularIndicator
              strokeWidth={2}
              radius={32.5}
              label={<Image source={require('../assets/1.jpg')} style={styles.statusImg} />}
              backgroundColor="#191f23"
              selectedValue={6}
              activeStrokeColor="#00af9c"
            />
            <View style={styles.statusMetaData}>
              <Text style={{ color: 'white', fontSize: 18 }} numberOfLines={1}>
                Kevin
              </Text>
              <Text style={{ color: 'rgba(255,255,255,.5)' }}>Today, 7:44 PM</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
      <Text style={styles.title}>Viewed Updates</Text>
      {status.map((_, i) => (
        <TouchableNativeFeedback
          key={i}
          onPress={() => {}}
          background={TouchableNativeFeedback.Ripple('#fff', false)}
        >
          <View style={styles.statusPrt}>
            <DashedCircularIndicator
              strokeWidth={2}
              radius={32.5}
              label={<Image source={require('../assets/1.jpg')} style={styles.statusImg} />}
              backgroundColor="#191f23"
            />
            <View style={styles.statusMetaData}>
              <Text style={{ color: 'white', fontSize: 18 }} numberOfLines={1}>
                Kevin
              </Text>
              <Text style={{ color: 'rgba(255,255,255,.5)' }}>Today, 7:44 PM</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
    </View>
  );
};

export default withNavigation(StatusList);

const styles = StyleSheet.create({
  statusPrt: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
  },
  statusImgPrt: {
    borderColor: '#00af9c',
    borderWidth: 2,
    borderRadius: 50,
    height: 65,
    width: 65,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  statusImg: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  statusMetaData: {
    marginLeft: '2.5%',
    height: '100%',
    width: '75%',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(255,255,255,.2)',
  },
  ellipsis: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  title: {
    color: 'rgba(255,255,255,.5)',
    marginLeft: 15,
    marginVertical: 10,
  },
  camera: {
    position: 'absolute',
    right: '5%',
    bottom: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00af9c',
    height: 55,
    width: 55,
    borderRadius: 55,
  },
  pencil: {
    position: 'absolute',
    right: '5%',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00af9c',
    height: 45,
    width: 45,
    borderRadius: 55,
  },
});
