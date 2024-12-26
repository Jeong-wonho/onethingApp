import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const FloatingButton = ({onPress}: {onPress: () => void}) => {
    // 현재 화면 이름 가져오기
    const navigationState = useNavigationState(state => state);
    console.log('navigationState', navigationState);
    const currentRouteName = navigationState.routes[navigationState.index].name;

    const icon = currentRouteName === 'Calendar' ? 'calendar-today' : 'check';
    console.log('currentRouteName', currentRouteName);
    return (
        <TouchableOpacity onPress={onPress} style={styles.fab}>
             <MaterialIcons name={icon} size={24} color="white" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        bottom: 50,
        right: 30,
        backgroundColor: '#000000', // FAB 배경색
        borderRadius: 28,
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5, // 안드로이드에서 그림자 효과
        shadowColor: '#000', // iOS에서 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // iOS에서 그림자 오프셋
        shadowOpacity: 0.3, // iOS에서 그림자 불투명도
        shadowRadius: 4, // iOS에서 그림자 반경
    }
})
export default FloatingButton;