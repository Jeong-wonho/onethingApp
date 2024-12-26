import React, {useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Calendar, DateData } from 'react-native-calendars';
import { Task } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from '@react-navigation/stack';

type CalendarScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Calendar'>;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ navigation }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [markedDates, setMarkedDates] = useState<{ [key: string]: { marked: boolean, dotColor: string } }>({});

    //점 업데이트 함수
    const updateMarkedDates = (date: string) => {
        setMarkedDates((prevMarkedDates) => {
            const newMarkedDates = { ...prevMarkedDates };
            newMarkedDates[date] = { 
                marked: true , 
                dotColor: '#000000'
            }; // 새로운 날짜에 점 추가
            return newMarkedDates;
        });
    }
    //AsyncStorage에서 tasks 가져오기
    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('@tasks');
            if (storedTasks) {
                const parsedTasks = JSON.parse(storedTasks);
                setTasks(parsedTasks);
                parsedTasks.forEach((task:Task) => updateMarkedDates(task.date)); // 기존 할 일에 대한 점 업데이트
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }
    

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        // 오늘 날짜 가져오기
        const today = format(new Date(), 'yyyy-MM-dd');
        
        setMarkedDates((prevMarkedDates) => ({
            ...prevMarkedDates,
            [today]: { marked: true, selected: true, selectedColor: '#000000', dotColor: '#ffffff' }, // 오늘 날짜 강조
        }));
    }, [tasks]);

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                onDayPress={(day: DateData) => {
                    navigation.navigate('Home', { selectedDate: day.dateString });
                }}
                markedDates={markedDates}
                style={styles.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#000000',
                    selectedDayBackgroundColor: '#000000',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#000000',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    // dotColor: '#000000',
                    monthTextColor: '#000000',
                    arrowColor: '#000000',
                    textDayFontWeight: '500',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '600',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    calendar: {
       borderWidth: 1,
       margin: 10,
       borderRadius: 10,
    }
});

export default CalendarScreen;  