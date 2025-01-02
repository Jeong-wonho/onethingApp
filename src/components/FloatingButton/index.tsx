import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, StyleSheet, View, Animated, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { ja } from "date-fns/locale";

const icons: Record<'Calendar' | 'Home', string> = {
    Calendar: "calendar-today",
    Home: "check",
    // 추가 아이콘 예시
    // Settings: "settings",
    // Profile: "person",
};

type IconKeys = keyof typeof icons; // icons의 키 타입 정의

const FloatingButton = ({ currentRouteName }: { currentRouteName: string }) => {
    const navigation = useNavigation();
  // 현재 화면 이름 가져오기
    const [isListVisible, setIsListVisible] = useState<boolean>(false);
    const animation = useRef(new Animated.Value(0)).current;
    const [icon, setIcon] = useState<IconKeys>(currentRouteName as IconKeys);
    
    useEffect(() => {
        if (currentRouteName) {
            setIcon(currentRouteName as IconKeys);
        }
    }, [currentRouteName]); // navigation.getState를 의존성 배열에 추가

    const toggleList = () => {
        setIsListVisible(!isListVisible);

        //애니메이션 효과
        Animated.timing(animation, {
            toValue: isListVisible ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    // 아이콘의 Y축 위치 계산
    const iconTranslateY = animation.interpolate({
        inputRange: [0,1],
        outputRange: [0, -100],
    })

    const handleIconPress = (key: IconKeys) => {
        // setIcon(key);
        navigation.navigate(key as never);
        setIsListVisible(false);
    };

      return (
        <View style={styles.container}>
        <Pressable onPress={toggleList} style={styles.fab}>
            <MaterialIcons
                name={icons[icon as IconKeys]} // 현재 아이콘으로 설정
                size={24}
                color="white"
            />
        </Pressable>

        {isListVisible && (
            <Animated.View style={[styles.listContainer, { transform: [{ translateY: iconTranslateY }] }]}>
                {Object.keys(icons).map((key) => (
                    <Pressable key={key} onPress={() => handleIconPress(key as IconKeys)}>
                        <View style={styles.listItem}>
                            <MaterialIcons name={icons[key as IconKeys]} size={24} />
                        </View>
                    </Pressable>
                ))}
            </Animated.View>
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 50,
        right: 30,
    },
    fab: {
        backgroundColor: "#000000", // FAB 배경색
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // 안드로이드에서 그림자 효과
        shadowColor: "#000", // iOS에서 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // iOS에서 그림자 오프셋
        shadowOpacity: 0.3, // iOS에서 그림자 불투명도
        shadowRadius: 4, // iOS에서 그림자 반경
    },
    listContainer: {
    //     width: 56,
    //     backgroundColor: "white", // 리스트 배경색
    //     borderColor: "black", // 리스트 테두리 색상
    //     borderWidth: 1, // 리스트 테두리 두께
    //     borderRadius: 8,
    //     elevation: 5, // 그림자 효과
    //     padding: 10,
        position: "absolute", // 리스트를 버튼과 같은 위치에 배치
        bottom: 65, // 버튼 위에 위치하도록 설정
    //     right: 0, // 버튼과 같은 오른쪽 위치
    },
    listItem: {
        backgroundColor: "#ffffff", // FAB 배경색
        borderRadius: 28,
        marginTop: 10,
        width: 56,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // 안드로이드에서 그림자 효과
        shadowColor: "#000", // iOS에서 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // iOS에서 그림자 오프셋
        shadowOpacity: 0.3, // iOS에서 그림자 불투명도
        shadowRadius: 4, // iOS에서 그림자 반경
    },
});
export default FloatingButton;
