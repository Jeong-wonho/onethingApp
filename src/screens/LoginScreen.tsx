import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type LoginScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Login">;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  useEffect(() => {
    //google login options
  }, []);

  const handleGoogleLogin = () => {
    console.log("구글로 로그인");
  };

  const handleKakaoLogin = async () => {
    console.log("카카오로 로그인");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
          <Image
            source={require("../../assets/img/kakao_login_medium_wide.png")} // 카카오 로그인 버튼 이미지 경로
            style={styles.buttonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <Image
            source={{
              uri: "https://developers.google.com/identity/images/g-logo.png",
            }} // 구글 로고 이미지
            style={styles.googleButtonImage}
          />
          <Text style={styles.buttonText}>Google 계정으로 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    
    // justifyContent: "center", // 버튼들을 수직 중앙에 배치
    // alignItems: "center", // 버튼들을 수평 중앙에 배치
  },
  kakaoButton: {
    marginBottom: 12,
    paddingVertical: 10,
  },
  googleButton: {
    backgroundColor: '#ffffff', // 구글 버튼 색상
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // 그림자 색상
    shadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
    shadowOpacity: 0.3, // 그림자 불투명도
    shadowRadius: 4, // 그림자 반경
    elevation: 5, // Android에서 그림자 효과
    borderWidth: 0.1,
    width: "80%",
    alignSelf: "center",
    cursor: "pointer",
  },
  buttonImage: {
    width: "100%", // 버튼 이미지의 너비를 100%로 설정
    height: 48, // 버튼 이미지의 높이 설정
    resizeMode: "contain", // 이미지 비율 유지
  },
  googleButtonImage: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: "#000000", // 버튼 텍스트 색상
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
