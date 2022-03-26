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
import colorPallette from "../../stuff/colorPallette";
import styles from "../../stuff/styles";
import * as SMS from "expo-sms";

export default class ViewEventScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [
        {
          id: "asdf",
          title: "Meeting",
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
          title: "Get together",
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
  async sendMessage() {
    const { result } = await SMS.sendSMSAsync(
      [],
      "[DO NOT REPLY] Welcome to " +
        "[Insert event name]!" +
        " This event will take place on " +
        "[MM:DD:YY]" +
        " ! The time of this event will be" +
        "[Time]! "
    );
  }

  render() {
    item = this.props.route.params.event;
    people = [];
    for (var i in item.people) {
      people.push(i);
    }
    console.log(item);
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.sav} />
        <AppHeader title="View Event" />
        <TouchableOpacity
          style={[styles.subOptionButton, { alignSelf: "center" }]}
          onPress={this.props.navigation.goBack}
        >
          <Text
            style={[styles.subOptionButtonText, { color: colorPallette.blush }]}
          >
            Back
          </Text>
        </TouchableOpacity>
        <View
          style={[
            styles.eventItem,
            { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
          ]}
        >
          <View style={styles.eventItemLeftContent}>
            <Text
              style={[
                styles.eventItemInfo,
                {
                  fontStyle: "italic",
                  fontWeight: "normal",
                  marginBottom: 20,
                  opacity: 0.4,
                },
              ]}
            >
              {`ID: ${item.id}`}
            </Text>
            <Text style={[styles.eventItemTitle, { fontSize: 30 }]}>
              {item.eventName}
            </Text>
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
            <Text style={styles.eventItemInfo}>
              {`${Object.keys(item.people).length.toString()} people`}
            </Text>
          </View>
          {(() =>
            item.mine ? (
              <TouchableOpacity
                style={styles.eventItemEditButton}
                onPress={() => {
                  this.props.navigation.navigate("Create Event", {
                    editing: item.id,
                    eventInfo: JSON.parse(JSON.stringify(item)),
                  });
                }}
              >
                <Text style={styles.eventItemEditButtonText}>Edit</Text>
              </TouchableOpacity>
            ) : undefined)()}
        </View>
        <View
          style={[
            styles.eventItem,
            {
              flexDirection: "column",
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            },
          ]}
        >
          <Text style={[styles.eventItemTitle, { fontSize: 30 }]}>People</Text>
          <Text style={styles.eventItemInfo}>
            {people.map((value) => "- " + value).join("\n")}
          </Text>
        </View>
        {(() =>
          item.mine ? (
            <TouchableOpacity
              style={styles.messageButton}
              onPress={this.sendMessage}
            ></TouchableOpacity>
          ) : undefined)()}
      </SafeAreaProvider>
    );
  }
}
