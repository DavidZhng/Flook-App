import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableHighlight} from "react-native";
import _ from "lodash";
import { SelectMultipleButton } from "react-native-selectmultiple-button";
import axios from 'axios';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../components/styles';

const ios_blue = "#007AFF";
const interests = [
  '3D printing',
  'Amateur radio',
  'Scrapbook',
  'Acting',
  'Baton twirling',
  'Board games',
  'Book restoration',
  'Cabaret',
  'Calligraphy',
  'Candle making',
  'Computer programming',
  'Coffee roasting',
  'Cooking',
  'Colouring',
  'Cosplaying',
  'Couponing',
  'Creative writing',
  'Crocheting',
  'Cryptography',
  'Dance',
  'Digital arts',
  'Drama',
  'Drawing',
  'Do it yourself',
  'Electronics',
  'Embroidery',
  'Fashion',
  'Flower arranging',
  'Foreign language learning',
  'Gaming',
  'Tabletop games',
  'Role-playing games',
  'Gambling',
  'Genealogy',
  'Glassblowing',
  'Gunsmithing',
  'Homebrewing',
  'Ice skating',
  'Jewelry making',
  'Jigsaw puzzles',
  'Juggling',
  'Knapping',
  'Knitting',
  'Kabaddi',
  'Knife making',
  'Lacemaking',
  'Lapidary',
  'Leather crafting',
  'Lego building',
  'Lockpicking',
  'Machining',
  'Macrame',
  'Metalworking',
  'Magic',
  'Model building',
  'Listening to music',
  'Origami',
  'Painting',
  'Playing musical instruments',
  'Pet',
  'Poi',
  'Pottery',
  'Puzzles',
  'Quilting',
  'Reading',
  'Scrapbooking',
  'Sculpting',
  'Sewing',
  'Singing',
  'Sketching',
  'Soapmaking',
  'Sports',
  'Stand-up comedy',
  'Sudoku',
  'Table tennis',
  'Taxidermy',
  'Video gaming',
  'Watching movies',
  'Web surfing',
  'Whittling',
  'Wood carving',
  'Woodworking',
  'World Building',
  'Writing',
  'Yoga',
  'Yo-yoing',
  'Air sports',
  'Archery',
  'Astronomy',
  'Backpacking',
  'Base jumping',
  'Baseball',
  'Basketball',
  'Beekeeping',
  'Bird watching',
  'Blacksmithing',
  'Board sports',
  'Bodybuilding',
  'Brazilian jiu-jitsu',
  'Community',
  'Cycling',
  'Dowsing',
  'Driving',
  'Fishing',
  'Flag football',
  'Flying',
  'Flying disc',
  'Foraging',
  'Gardening',
  'Geocaching',
  'Ghost hunting',
  'Graffiti',
  'Handball',
  'Hiking',
  'Hooping',
  'Horseback riding',
  'Hunting',
  'Inline skating',
  'Jogging',
  'Kayaking',
  'Kite flying',
  'Kitesurfing',
  'Larping',
  'Letterboxing',
  'Metal detecting',
  'Motor sports',
  'Mountain biking',
  'Mountaineering',
  'Mushroom hunting',
  'Mycology',
  'Netball',
  'Nordic skating',
  'Orienteering',
  'Paintball',
  'Parkour',
  'Photography',
  'Polo',
  'Rafting',
  'Rappelling',
  'Rock climbing',
  'Roller skating',
  'Rugby',
  'Running',
  'Sailing',
  'Sand art',
  'Scouting',
  'Scuba diving',
  'Sculling',
  'Rowing',
  'Shooting',
  'Shopping',
  'Skateboarding',
  'Skiing',
  'Skim Boarding',
  'Skydiving',
  'Slacklining',
  'Snowboarding',
  'Stone skipping',
  'Surfing',
  'Swimming',
  'Taekwondo',
  'Tai chi',
  'Urban exploration',
  'Vacation',
  'Vehicle restoration',
  'Water sports'
];
// const SelectPreferences = ({navigation}) => {

// }

export default class SelectPreferences extends Component {
  constructor(props) {
    super(props)

    this.state = {
      multipleSelectedData: []
    };
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Text style={{ color: ios_blue, marginLeft: 10 }}>
            I like {_.join(this.state.multipleSelectedData, ", ")}
          </Text>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            {interests.map(interest => (
              <SelectMultipleButton
                key={interest}
                buttonViewStyle={{
                  borderRadius: 10,
                  height: 40
                }}
                textStyle={{
                  fontSize: 15
                }}
                highLightStyle={{
                  borderColor: "gray",
                  backgroundColor: "transparent",
                  textColor: "gray",
                  borderTintColor: ios_blue,
                  backgroundTintColor: ios_blue,
                  textTintColor: "white"
                }}
                value={interest}
                selected={this.state.multipleSelectedData.includes(interest)}
                singleTap={valueTap =>
                  this._singleTapMultipleSelectedButtons(interest)
                }
              />
            ))}
          </View>
        </View>
        
        <View style={{ alignItems: "center", marginTop: 20, marginBottom: 30 }}>
        <TouchableHighlight onPress={() => {
              axios.post("https://desolate-castle-65187.herokuapp.com/users/addPrefs/613d5728bb00235e2dc76255", 
              {prefs: this.state.multipleSelectedData}
              ).then(res => console.log(res))
              this.props.navigation.navigate('Home')}
          }>
              <View>
              <Text style={[styles.interestText, { color: "#41444B", fontWeight: "300" }]}>Continue</Text>
              </View>
          </TouchableHighlight>
        </View>

      </ScrollView>
    );
  }

  _singleTapMultipleSelectedButtons(interest) {
    if (this.state.multipleSelectedData.includes(interest)) {
      _.remove(this.state.multipleSelectedData, ele => {
        return ele === interest;
      });
    } else {
      this.state.multipleSelectedData.push(interest);
    }

    this.setState({
      multipleSelectedData: this.state.multipleSelectedData
    });
  }
}

const styles = StyleSheet.create({
  interestText: {
    paddingVertical: 10, borderRadius: 15, paddingHorizontal: 10,
    backgroundColor: '#03fc66',
    marginHorizontal: 5,
    marginVertical: 5,
    fontSize: 20,
    overflow: 'hidden',
    fontFamily: "HelveticaNeue",
    color: "#52575D"
},
  welcome: {
    margin: 10,
    marginTop: 30,
    color: "gray"
  }
});

// export default SelectPreferences
