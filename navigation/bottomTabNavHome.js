import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react"
import AccountScreen from "../screensSwitchNavMain/screensBotTabNavHome/accountScreen";
import CreateEventScreen from "../screensSwitchNavMain/screensBotTabNavHome/createEventScreen";
import JoinEventScreen from "../screensSwitchNavMain/screensBotTabNavHome/joinEventScreen";
import MyEventsScreen from "../screensSwitchNavMain/screensBotTabNavHome/myEventsScreen";
import MyEventsStack from "./myEventsStack";

var BotTabNav = createBottomTabNavigator();

var AccScreen;
export default class HomeTabs extends React.Component
{
  componentDidMount()
  {
    AccScreen = <AccountScreen parentNavigation={this.props.navigation}/>
  }

  render()
  {
    return (
      <BotTabNav.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true
      }}
      >
        <BotTabNav.Screen name="My Events" component={MyEventsStack} />
        <BotTabNav.Screen name="Create Event" component={CreateEventScreen} />
        <BotTabNav.Screen name="Join Event" component={JoinEventScreen} />
        <BotTabNav.Screen name="Account" component={() => AccScreen} />
      </BotTabNav.Navigator>
    );
  }
}
