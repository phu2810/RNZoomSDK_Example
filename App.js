/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback} from 'react';
import {View, Button} from 'react-native';
import RNZoomView from 'react-native-zoom-us';
import {NativeModules, NativeEventEmitter} from 'react-native';
const {ZoomModule} = NativeModules;
const eventEmitter = new NativeEventEmitter(ZoomModule);

const App: () => React$Node = () => {
  const handleEventMeeting = useCallback((event) => {
    console.log(event);
  }, []);

  useEffect(() => {
    ZoomModule.initZoomSDK({
      domain: 'zoom.us',
      clientKey: 'yaEkS5rguwHNuFvqOsDh8VMvZOkRSNEMJpjn',
      clientSecret: 'ngtmOzHAu0FwI55Faoe0AD3tVm86D3XfkzTj',
    });
    const subscriptionEvent = eventEmitter.addListener(
      'onMeetingEvent',
      handleEventMeeting,
    );
    ZoomModule.startObserverEvent();
    return () => {
      subscriptionEvent.remove();
      ZoomModule.stopObserverEvent();
    };
  }, [handleEventMeeting]);

  const leaveMeeting = useCallback(() => {
    ZoomModule.leaveCurrentMeeting();
  }, []);

  const joinMeeting = useCallback(() => {
    ZoomModule.joinMeeting({
      roomNumber: '75348310869',
      roomPassword: 'N7B5Zi',
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
      <RNZoomView style={{flex: 1}} userID={'active_user'} />
      <RNZoomView
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 100,
          height: 150,
        }}
        userID={'local_user'}
      />
      <View
        style={{
          marginBottom: 40,
          backgroundColor: 'green',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <Button onPress={joinMeeting} title=" Join " color="#841584" />
        <Button onPress={leaveMeeting} title=" Leave " color="#841584" />
        <Button onPress={onOffAudio} title=" On/Off audio " color="#841584" />
        <Button onPress={onOffVideo} title=" On/Off video " color="#841584" />
        <Button
          onPress={switchCamera}
          title=" Switch Camera "
          color="#841584"
        />
        <Button onPress={getParticipants} title=" Members " color="#841584" />
      </View>
    </View>
  );
};

export default App;
