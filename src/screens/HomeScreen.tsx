import React, { useState, useEffect } from "react";
import { Button, View } from "react-native";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateSelector from "../components/DateSelector";
import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";
import { generateDateList } from "../utils/dateUtils";
import { Task } from "../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>;
    route: RouteProp<RootStackParamList, 'Home'>;
};
export const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  route,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //선택된 날짜의 할 일만 필터링
  const filteredTasks = tasks.filter((task) => task.date === selectedDate);
  const todoTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  //AsyncStorage관련 로직
  const STORAGE_KEY = "@tasks";

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  //할 일 추가
  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      date: selectedDate,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  //할 일 토글
  const handleToggleTask = (id: number) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  //할 일 삭제
  const handleDeleteTask = (id: number) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    loadTasks();
  }, []);

    // route.params에서 selectedDate를 가져와서 상태를 업데이트
    useEffect(() => {
        if (route.params?.selectedDate) {
            console.log('route.params.selectedDate', route.params.selectedDate);
            setSelectedDate(route.params.selectedDate);
        }
    }, [route.params]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.selectedDateText}>
          {format(new Date(selectedDate), "yyyy-MM-dd")} {/* 년도와 월 표시 */}
        </Text>
        <DateSelector
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />
      </View>

      <View style={styles.content}>
        <TaskInput onAddTask={handleAddTask} />

        <View style={styles.listContainer}>
          <TaskList
            todoTasks={todoTasks}
            completedTasks={completedTasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  selectedDateText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "left",
    marginBottom: 8,
    paddingLeft: 16,
  },
  header: {
    padding: 16,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1A1A1A",
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContainer: {
    flex: 1,
  },
});
