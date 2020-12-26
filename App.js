/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNZoomView from 'react-native-zoom-us';
import { NativeModules } from 'react-native';
const { ZoomModule } = NativeModules;

const App: () => React$Node = () => {

  useEffect(() => {
    ZoomModule.initZoomSDK({
      domain: 'zoom.us',
      clientKey: 'yaEkS5rguwHNuFvqOsDh8VMvZOkRSNEMJpjn',
      clientSecret: 'ngtmOzHAu0FwI55Faoe0AD3tVm86D3XfkzTj',
    });
  }, []);

  const leaveMeeting = useCallback(() => {
    ZoomModule.leaveCurrentMeeting();
  }, []);

  const joinMeeting = useCallback(() => {
    ZoomModule.joinMeeting({
      roomNumber: '72308688384',
      roomPassword: '2WXXGY',
      userDisplayName: 'Phu2',
      userPassword: '123',
    });
  }, []);

  const onOffAudio = useCallback(() => {
    ZoomModule.onOffMyAudio();
  }, []);

  const onOffVideo = useCallback(() => {
    ZoomModule.onOffMyVideo();
  }, []);

  const switchCamera = useCallback(() => {
    ZoomModule.switchMyCamera();
  }, []);
  const getParticipants = useCallback(() => {
    console.log('+++ getParticipants', ZoomModule.getParticipants());
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'blue'}}>
      <RNZoomView style={{flex: 1}} />
      <View style={{marginBottom: 40, backgroundColor: 'green', flexDirection: 'row', flexWrap: 'wrap'}}>
        <Button
            onPress={joinMeeting}
            title=" Join "
            color="#841584"
        />
        <Button
            onPress={leaveMeeting}
            title=" Leave "
            color="#841584"
        />
        <Button
            onPress={onOffAudio}
            title=" On/Off audio "
            color="#841584"
        />
        <Button
            onPress={onOffVideo}
            title=" On/Off video "
            color="#841584"
        />
        <Button
            onPress={switchCamera}
            title=" Switch Camera "
            color="#841584"
        />
        <Button
            onPress={getParticipants}
            title=" Members "
            color="#841584"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
