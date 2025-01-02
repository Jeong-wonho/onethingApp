import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, {useEffect} from "react";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

const LoginScreen:React.FC<LoginScreenProps> = ({navigation}) => {
    useEffect(() => {
        //google login options
        
    }, []);

    const handleGoogleLogin = () => {
        console.log('구글로 로그인');
    };


    const handleKakaoLogin = async () => {
        console.log('카카오로 로그인');
    };

    return (
        <View style={styles.container}>
                        <Text style={styles.title}>로그인</Text>
            <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
                <Image
                    source={require('../../assets/img/kakao_login_medium_wide.png')} // 카카오 로그인 버튼 이미지 경로
                    style={styles.buttonImage}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                <Text style={styles.buttonText}>구글로 로그인</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
    },
    kakaoButton: {
        marginBottom: 12,
    },
    googleButton: {
        backgroundColor: '#4285F4', // 구글 버튼 색상
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
    },
    buttonImage: {
        width: '100%', // 버튼 이미지의 너비를 100%로 설정
        height: 48, // 버튼 이미지의 높이 설정
        resizeMode: 'contain', // 이미지 비율 유지
    },
    buttonText: {
        color: '#ffffff', // 버튼 텍스트 색상
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default LoginScreen;