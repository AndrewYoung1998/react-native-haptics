import React from 'react';
import {Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import * as Haptics from 'expo-haptics'

const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

export default function App() {
  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [ONE_SECOND_IN_MS, 2 * ONE_SECOND_IN_MS, 3 * ONE_SECOND_IN_MS];

  const PATTERN_DESC =
      Platform.OS === 'android'
          ? 'wait 1s, vibrate 2s, wait 3s'
          : 'wait 1s, vibrate, wait 2s, vibrate, wait 3s';

  return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>Vibration</Text>

          <View>
              <TouchableOpacity style={styles.button} onPress={ () =>{
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).then(() => {
                  })
              }}>
                  <Text style={styles.buttonText}>Medium Impact Feedback</Text>
              </TouchableOpacity>

              <Separator />

              <TouchableOpacity style={styles.button} onPress={ () =>{
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).then(() => {
                  })
              }}>
                  <Text style={styles.buttonText}>Warning Notification Feedback</Text>
              </TouchableOpacity>
          </View>
          <Separator />
        {Platform.OS == 'android'
            ? [
              <View>
                <Button
                    title="Vibrate for 100 seconds"
                    onPress={() => Vibration.vibrate(100 * ONE_SECOND_IN_MS)}
                />
              </View>,
              <Separator />,
            ]
            : null}

        <Button title="Stop vibration pattern" onPress={() => Vibration.cancel()} color="#FF0000" />
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button:{
    backgroundColor:'#737373',
    padding:8
  },
  buttonText:{
    textAlign:'center',
    color:'white',
  }
});
