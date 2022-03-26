import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  FlatList,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/appHeader";
import styles from "../../stuff/styles";
import firebase from "firebase";
import * as SMS from "expo-sms";

export default class MyEventsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          id: "asdf",
          eventName: "Meeting",
          time: {
            year: 2022,
            month: 2,
            day: 20,
            hour: 20,
            minute: 15,
          },
          people: {
            someone: true,
            person: true,
            somebody: true,
          },
          location: "Restaurant",
          mine: true,
        },
        {
          id: "asdg",
          eventName: "Get together",
          time: {
            year: 2022,
            month: 3,
            day: 10,
            hour: 15,
            minute: 10,
          },
          people: {
            someone: true,
            person: true,
            somebody: true,
          },
          location: "House",
          mine: false,
        },
      ],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  async sendMessage() {
    const { result } = await SMS.sendSMSAsync(
      [],
      "My sample HelloWorld message"
    );
  }

  render() {
    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <SafeAreaView style={styles.sav} />

          <AppHeader title="My Events" />

          <Text>Below is a list of all your events.</Text>

          <Image
            source={require("../../assets/images/berry.png")}
            style={{
              width: 200,
              height: 150,
            }}
          />

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.events}
            style={{
              width: "100%",
              flex: 1,
            }}
            renderItem={this.renderEventItem}
          />
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    );
  }

  renderEventItem = ({ item }) => {
    if (item.mine) {
      console.log("mine");
    }
    return (
      <View style={styles.eventItem}>
        <View style={styles.eventItemLeftContent}>
          <Text style={styles.eventItemTitle}>{item.eventName}</Text>
          <Text style={styles.eventItemInfo}>
            {`${
              [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ][item.time.month - 1]
            } ${item.time.day}, ${item.time.year}`}
          </Text>
          <Text style={styles.eventItemInfo}>
            {`${item.time.hour % 12}:${item.time.minute}${
              item.time.hour % 12 == item.time.hour ? "AM" : "PM"
            }`}
          </Text>
        </View>
        <View style={styles.eventItemRightContent}>
          <Text style={styles.eventItemInfo}>
            {`${Object.keys(item.people).length.toString()} people`}
          </Text>
          <Text
            style={[
              styles.eventItemInfo,
              {
                fontStyle: "italic",
                fontWeight: "normal",
                marginTop: 20,
                opacity: 0.4,
              },
            ]}
          >
            {`ID: ${item.id}`}
          </Text>
        </View>
        <View style={styles.eventItemEditButtonContainer}>
          <TouchableOpacity
            style={styles.eventItemEditButton}
            onPress={() => {
              this.props.navigation.navigate("ViewEventScreen", {
                event: item,
              });
            }}
          >
            <Text style={styles.eventItemEditButtonText}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  getEvents = async () => {
    var events = await (
      await firebase.database().ref("/events/").get()
    ).toJSON();
    console.log(events);
    var myEvents = [];
    for (var i in events) {
      if (events[i].people[firebase.auth().currentUser.uid]) {
        console.log("HUSDFGJDJKSJDGHDKSLDGJHKSALFGHDKSLFGHFDKSLFJGHFK");
        1;
        var obj = JSON.parse(JSON.stringify(events[i]));
        obj.id = i;
        myEvents.push(events[i]);
      }
    }

    this.setState({ events: myEvents });
  };
}
