import React, { useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    TouchableHighlight,
    Linking,
    Platform
} from "react-native";

import Swipeable from 'react-native-swipeable';

import MapView, {
    Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE, Location
} from "react-native-maps";

import { icons, images, SIZES, COLORS, FONTS } from '../constants'

import axios from "axios";


const Home = ({ route, navigation }) => {

    //const user = route.params.user;
    //console.log("ID:" + user._id);

    let locData = {
        latitude: 0,
        longitude: 0,
        routeCoordinates: [],
        distanceTravelled: 0,
        prevLatLng: {},
        coordinate: new AnimatedRegion({
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0
        })
    }

    // see if location data updates whenever I move 
    const [locationData, setLocationData] = React.useState(locData)
    const [watchID, setWatchID] = React.useState()

    async function requestGeolocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Ridesharer Geolocation Permission',
                    'message': 'Ridesharer needs access to your current location so you can share or search for a ride'
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the geolocation")
            } else {
                console.log("Geolocation permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    requestGeolocationPermission();

    useEffect(() => {
        setWatchID(async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            console.log('status: ', status);
            navigator.geolocation.watchPosition(
                position => {
                    const { coordinate, routeCoordinates, distanceTravelled } = locationData;
                    const { latitude, longitude } = position.coords;
                    console.log('new position: ', latitude, longitude);
                    const newCoordinate = {
                        latitude,
                        longitude
                    };
                    if (Platform.OS === "android") {
                        if (this.marker) {
                            this.marker._component.animateMarkerToCoordinate(
                                newCoordinate,
                                500
                            );
                        }
                    } else {
                        coordinate.timing(newCoordinate).start();
                    }
                    // this.setState({
                    //     latitude,
                    //     longitude,
                    //     routeCoordinates: routeCoordinates.concat([newCoordinate]),
                    //     distanceTravelled:
                    //         distanceTravelled + this.calcDistance(newCoordinate),
                    //     prevLatLng: newCoordinate
                    // });
                    // setBorderColor(prevState => ({
                    //     borderColor: {
                    //         ...prevState.borderColor,
                    //         [item.id]: 'green'
                    //     }
                    // })
                    setLocationData(prevState => ({
                        ...prevState,
                        latitude: latitude,
                        longitude: longitude,
                        routeCoordinates: routeCoordinates.concat([newCoordinate]),
                        distanceTravelled:
                            distanceTravelled + this.calcDistance(newCoordinate),
                        prevLatLng: newCoordinate
                    }))
                },
                error => console.log(error),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            )
        })
    }, [])


    // Dummy Datas

    const initialCurrentLocation = {
        streetName: "Locust Walk",
        gps: {
            latitude: 1.5496614931250685,
            longitude: 110.36381866919922
        }
    }

    const categoryData = [
        {
            id: 1,
            name: "Movies",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Piano",
            icon: icons.noodle,
        },
        {
            id: 3,
            name: "Football",
            icon: icons.hotdog,
        },
        {
            id: 4,
            name: "Salads",
            icon: icons.salad,
        },
        {
            id: 5,
            name: "Burgers",
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: "Pizza",
            icon: icons.pizza,
        },
        {
            id: 7,
            name: "Snacks",
            icon: icons.fries,
        },
        {
            id: 8,
            name: "Sushi",
            icon: icons.sushi,
        },
        {
            id: 9,
            name: "Desserts",
            icon: icons.donut,
        },
        {
            id: 10,
            name: "Drinks",
            icon: icons.drink,
        },

    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState()
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)

    const [people, setPeople] = React.useState()

    // query request to the database 
    // receive data of people around you

    function filterPeopleFromRadius(array) {
        return array.filter(function (obj) {
            let distance = (obj.location.latitude - 0) + (obj.location.longitude - 0) / 2
            //let distance = haversineDistance(obj.location, my_coordinates);
            console.log(obj.location);
            console.log(distance);
            return distance < 100
        });
    }

    const main_url = "http://desolate-castle-65187.herokuapp.com";
    const users_url = main_url + "/users/";
    useEffect(() => {
        axios.get(users_url)
            .then(async response => {
                if (response.data.length > 0) {
                    setRestaurants(() => filterPeopleFromRadius(response["data"]))
                }
                console.log(response['data'])
                console.log(restaurants);
                console.log("hello");
                // setRestaurants(prevState => ({
                //     prevState.map(
                //         el => {
                //             ...el,
                //             borderWidth: 4
                //         }
                //     )
                //     // return prevState.forEach(person => {
                //     //     person.borderWidth = 4;
                //     //     //person.borderColor = 'white';
                //     // })
                // }))
                // setRestaurants(response["data"])
                // console.log('restaurants: ', restaurants);



            })
            .catch((error) => {
                console.log(error);
            })
    }, [])


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', height: 50 }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                >
                    <Image
                        source={icons.nearby}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View
                        style={{
                            width: '70%',
                            height: "100%",
                            backgroundColor: COLORS.lightGray3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}
                    >
                        <Text style={{ ...FONTS.h3 }}>{currentLocation.streetName}</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingRight: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress = {() => navigation.navigate("Profile")}
                >
                    <Image
                        source={icons.user}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    function renderMainCategories(item) {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: 1,
                        paddingBottom: 5,
                        backgroundColor: COLORS.primary,
                        borderRadius: 25,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                >

                    <Text
                        style={{
                            //marginTop: 1,
                            //marginBottom: 1,
                            color: COLORS.white,
                            ...FONTS.body5
                        }}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: 1 }}>

                <FlatList
                    data={item["prefs"]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding / 2 }}
                />
            </View>
        )
    }

    // each item should keep a variable for them to update separately
    const [borderColor, setBorderColor] = React.useState({
        borderColor: {
            1: 'white',
            2: 'white',
            3: 'white',
            4: 'white',
            5: 'white'
        }
    });
    const [borderWidth, setBorderWidth] = React.useState(4);

    function getDistance(item_coordinates) {
        return Math.trunc(Math.sqrt((0 - parseInt(item_coordinates.latitude)) ** 2 + (0 - parseInt(0)) ** 2))
    }

    // how to change this 'item'
    function renderRestaurantList() {

        const leftContent = (<View
            style={{
                // justifyContent: 'center',
                alignItems: "center"
            }}>
            <Text>pull to request</Text>
            <Image></Image>
        </View>)
        const my_id = '613cc6fd3bf2114362546e6a';
        const add_requests_url = main_url + `/addRequest/${my_id}`;
        const renderItem = ({ item }) => (
            <Swipeable
                leftContent={leftContent}
                // onSwipeRelease={() => setBorderColor(prevState => ({
                //     borderColor: {
                //         ...prevState.borderColor,
                //         [item.id]: 'green'
                //     }
                // }))}
                onSwipeRelease={() => {
                    console.log("in onswipe release")
                    console.log(item);
                    console.log(item["_id"]);
                    axios.post("http://desolate-castle-65187.herokuapp.com/users/addRequest/613cc6fd3bf2114362546e6a", {
                        id: item["_id"],
                    })

                    setBorderColor(prevState => ({
                        borderColor: {
                            ...prevState.borderColor,
                            [item._id]: 'green'
                        }
                    }))

                }}
            >
                <TouchableOpacity
                    style={{ marginBottom: SIZES.padding * 2 }}
                    onPress={() => navigation.navigate("Match", {
                        number: '2159643261' // item.phoneNumber
                        //item,
                        //currentLocation
                    })}
                >
                    {/* Image */}
                    <View
                        style={{
                            marginBottom: SIZES.padding
                        }}
                    >
                        <Image
                            resizeMode="cover"
                            source={require("../assets/images/david.jpg")}
                            style={{
                                width: "100%",
                                height: 200,
                                borderRadius: SIZES.radius,
                                borderColor: borderColor['borderColor'][item["_id"]],
                                borderWidth: 4
                            }}
                        />

                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                height: 50,
                                width: SIZES.width * 0.3,
                                backgroundColor: COLORS.white,
                                borderTopRightRadius: SIZES.radius,
                                borderBottomLeftRadius: SIZES.radius,
                                alignItems: 'center',
                                justifyContent: 'center',
                                ...styles.shadow
                            }}
                        >
                            <Text style={{ ...FONTS.h4 }}>{getDistance(item.location) + "m"}</Text>
                        </View>
                    </View>

                    {/* Restaurant Info */}
                    <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

                    {/* Preferences List: scrollable similar to the main category */}
                    <View>
                        {renderMainCategories(item)}
                    </View>

                    <View
                        style={{
                            marginTop: SIZES.padding,
                            flexDirection: 'row'
                        }}
                    >

                        {/* Rating */}
                        <Image
                            source={icons.star}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.primary,
                                marginRight: 10
                            }}
                        />
                        <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                        {/* Categories */}
                        <View
                            style={{
                                flexDirection: 'row',
                                marginLeft: 10
                            }}
                        >
                            {/* {
                                item.categories.map((categoryId) => {
                                    return (
                                        <View
                                            style={{ flexDirection: 'row' }}
                                            key={categoryId}
                                        >
                                            <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                            <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                        </View>
                                    )
                                })
                            } */}

                            {/* Price */}
                            {
                                [1, 2, 3].map((priceRating) => (
                                    <Text
                                        key={priceRating}
                                        style={{
                                            ...FONTS.body3,
                                            color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                        }}
                                    >$</Text>
                                ))
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </Swipeable>
        )

        return (
            <>
                <View style={{ padding: SIZES.padding * 2 }}>
                    <Text style={{ ...FONTS.h1 }}>Near You</Text>
                </View>

                <FlatList
                    data={restaurants}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{
                        paddingHorizontal: SIZES.padding * 2,
                        paddingBottom: 30
                    }}
                />
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderRestaurantList()}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Home