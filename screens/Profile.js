import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {useState} from 'react';

import axios from 'axios';

const Profile = ({ navigation }) => {
    let username = "davidzhang"
    let occupation = "undergraduate student"
    let numInterests = 4
    let numConnections = 0
    let phoneNumber = 1234567890

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
          return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
      }

    let fPhoneNumber = formatPhoneNumber(phoneNumber)

    const [interests, setInterests] = useState([]);
    
    axios.get("https://desolate-castle-65187.herokuapp.com/users/613d5728bb00235e2dc76255")
    .then(res => setInterests(res.data.prefs))

    var interestsDisplay = [];

	for(let i = 0; i < interests.length; i++){

		interestsDisplay.push(
				<Text key = {i} style={[styles.interestText, { color: "#41444B", fontWeight: "300" }]}>
                    {interests[i]}
                </Text>
		)
	}
    

  return (
      <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.titleBar}>
                  {/* <Ionicons name="arrow-back" size={24} color="#52575D"></Ionicons> */}
                  <TouchableHighlight onPress={() =>
                        navigation.navigate('Select Preferences', { name: 'Select' })
                    }>
                        <View>
                        <Ionicons name="settings" size={24} color="#52575D"></Ionicons>
                        </View>
                    </TouchableHighlight>
              </View>

              <View style={{ alignSelf: "center" }}>
                  <View style={styles.profileImage}>
                      <Image source={require("./../assets/images/david.jpg")} style={styles.image} resizeMode="center"></Image>
                  </View>
                  <View style={styles.active}></View>
              </View>

              <View style={styles.infoContainer}>
                  <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>{username}</Text>
                  <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{occupation}</Text>
              </View>

              <View style={styles.statsContainer}>
                <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                      <Text style={[styles.text, { fontSize: 24 }]}>{numInterests}</Text>
                      <Text style={[styles.text, styles.subText]}>Interests</Text>
                  </View>
                  <View style={styles.statsBox}>
                      <Text style={[styles.text, { fontSize: 24 }]}>{numConnections}</Text>
                      <Text style={[styles.text, styles.subText]}>Connections</Text>
                  </View>
              </View>

              
            <View style = {styles.phoneNumber}>
                <Ionicons style={styles.userInformation} name="call" color="#52575D"></Ionicons>
                <Text style={styles.userInformation}>{fPhoneNumber}</Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 20}}>
                
                <View style = {[styles.interests]}>
                    {interestsDisplay}
                </View>
            </View>
          </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF"
  },
  userInformation: {
      marginHorizontal: 5,
      fontSize: 20,
      textAlign: 'center',
      color: "#52575D",
  },
  text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
  },
  interestText: {
    paddingVertical: 10, borderRadius: 15, paddingHorizontal: 10,
    backgroundColor: '#66ffcc',
    marginHorizontal: 5,
    marginVertical: 5,
    overflow: 'hidden',
    fontFamily: "HelveticaNeue",
    color: "#52575D"
},
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: "flex-end",
      marginTop: 24,
      marginHorizontal: 16
  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 200,
      height: 200,
      borderRadius: 100,
      overflow: "hidden"
  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      top: 28, 
      right: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center"
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 15
  },
  phoneNumber: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 15
},
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  interests: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "flex-start",
      justifyContent: "center",
      marginBottom: 5,
      marginHorizontal: 20
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  }
});

export default Profile