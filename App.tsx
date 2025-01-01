import React, { useState } from "react";
import { StatusBar } from "react-native";
import { HomeScreen } from "./src/screens/HomeScreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import FloatingButton from "./src/components/FloatingButton";

// 네비게이션에서 사용할 파라미터 타입 정의
export type RootStackParamList = {
  Home: { selectedDate?: string };
  Calendar: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [currentRouteName, setCurrentRouteName] = useState("Calendar");

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const routeName = state?.routes[state?.index]?.name || "Calendar";
        setCurrentRouteName(routeName); // 현재 경로 이름 업데이트
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <Stack.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          headerShown: false, // 모든 화면의 헤더를 숨김
        }}
      >
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
      <FloatingButton  currentRouteName={currentRouteName}/>
    </NavigationContainer>
  );
}
