import { StyleSheet, Text, SafeAreaView, Pressable, View } from 'react-native'
import React, {useRef, useState} from 'react'
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import {shareAsync} from 'expo-sharing';



const INITIAL_REGION={
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }

  const NEW_YORK_REGION = {
    latitude: 40.7128,
    longitude: -74.0060,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  

const index = () => {

    const [region, setRegion] = useState(INITIAL_REGION)

    const mapRef = useRef<MapView>(null)

    // const onRegionChange = (region: Region) => {
    //     console.log(region);
        
    // }

    const focusMap = () => {
      mapRef.current?.animateToRegion(NEW_YORK_REGION)
    }

    const zoom = () => {
      mapRef.current?.animateCamera({zoom: 15})
    }

    const takSnapshotAndShare = async() => {
      const snapshot = await mapRef.current?.takeSnapshot({
        width: 300, 
        height: 300, 
        result: 'base64'
      })
      const uri = FileSystem.documentDirectory + 'snapshot.png'
      await FileSystem.writeAsStringAsync(uri, snapshot!, {
        encoding: 'base64'
      }), 
      await shareAsync(uri)
    }

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      mapType='standard'
      rotateEnabled={false}
      showsUserLocation
      style={styles.map}
      showsMyLocationButton
      initialRegion={region}
      //onRegionChange={onRegionChange}
      />

      <View style={styles.mapButtonContainer}>

      <Pressable style={({pressed}) => [
       pressed && {opacity: 0.8},
       styles.mapButton
      ]}
      onPress={focusMap}
      >
      <MaterialIcons name="zoom-out-map" size={24} color="black" />
      </Pressable>

      <Pressable style={({pressed}) => [
       pressed && {opacity: 0.8},
       styles.mapButton
      ]}
      onPress={zoom}
      >
        <Feather name="zoom-in" size={24} color="black" />
      </Pressable>
      
      <Pressable style={({pressed}) => [
       pressed && {opacity: 0.8},
       styles.mapButton
      ]}
      onPress={takSnapshotAndShare}
      >
        <Feather name="camera" size={24} color="black" />
      </Pressable>

      </View>

    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    map: {
        width: '100%',
        height: '100%',
    }, 
    mapButtonContainer: {
        position: 'absolute',
        top: 60, 
        right: 30,
        gap: 20
    },
    mapButton: {
        backgroundColor: '#FFFFFF',
        padding: 10, 
        borderRadius: 100, 
        elevation: 3
    }
})