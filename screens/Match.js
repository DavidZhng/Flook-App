import React from 'react'
import { useState, useEffect } from 'react';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import * as Location from "expo-location";
import { StyleSheet, Text, View, Dimensions, Animated, Linking, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';

function App () {

	const url = "https://desolate-castle-65187.herokuapp.com/users/";
	const userId = "613d5728bb00235e2dc76255";
	const otherId = "613cc6fd3bf2114362546e6a";

	//default location when there is no location
	const [location, setLocation] = useState({
		latitude: 0,
		longitude: 0,
	});

	const [otherLocation, setOtherLocation] = useState({
		latitude: 0,
		longitude: 0,
	});
	
	useEffect(() => {
		setInterval(async () => {
		//request location permission
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			return;
		}
		//get initial position
		let fullLocation = await Location.getLastKnownPositionAsync({});
		setLocation({latitude: fullLocation.coords.latitude, longitude: fullLocation.coords.longitude});
		
		//post new location to database
		axios.post(url + "updateLoc/" + userId, location)
		.then(res => {
		console.log(res)
		})

		axios.get(url + otherId)
		.then(res => setOtherLocation(res.data.location))
		}, 5000);

	}, []);

	// making a phone call 
const dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
        phoneNumber = `tel:${number}`;
    } else {
        phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
}

function renderCallButton(number) {
    return (
        <View>
            <TouchableOpacity
                style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 100
                }}
                // this should come from props
                onPress={() => { dialCall(`${number}`) }}
            >
                <Image
                    source={require('../assets/images/call.png')}
                    style={{
                        width: 60,
                        height: 60,
						marginBottom: 80
                    }}

                />
            </TouchableOpacity>
        </View>
    )
}

	return (
    <View style={styles.container}>
      <MapView style={styles.map}
	  initialRegion={
		{
		  latitude: 39.95,
		  longitude: -75.2, 
		  latitudeDelta: 0.0922, 
		  longitudeDelta: 0.0421}
		}
	>
		<Marker coordinate={
			{latitude: location.latitude,
			  longitude: location.longitude}}>
			<Animated.View style={[styles.markerWrap]}>
				<Animated.Image
				source={require('../assets/icons/person-marker.png')}
				style={styles.marker}
				resizeMode="cover"
				/>
			</Animated.View>
		</Marker>

		<Marker coordinate={
			{latitude: otherLocation.latitude,
			  longitude: otherLocation.longitude}}>
			<Animated.View style={[styles.markerWrap]}>
				<Animated.Image
				source={require('../assets/icons/map_marker.png')}
				style={styles.marker}
				resizeMode="cover"
				/>
			</Animated.View>
		</Marker>
	  </MapView>
	  {/* <Text style={styles.paragraph}>PHONE BUTTON</Text> */}
            {renderCallButton(2159643261)}
    </View>
  );
}

export default App

const styles = StyleSheet.create({
	container: {
	//   flex: 6,
	  //backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	map: {
	  width: Dimensions.get('window').width,
	  height: Dimensions.get('window').height,
	},
	markerWrap: {
		alignItems: "center",
		justifyContent: "center",
		width:10,
		height:10,
	},
	marker: {
		width: 30,
		height: 30,
	},
	// paragraph: {
	// 	flex: 1,
	// 	fontSize: 18,
	// 	textAlign: 'center',
	// },
  });