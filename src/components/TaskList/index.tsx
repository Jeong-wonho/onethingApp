import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { styles } from "./styles";
import { Task } from "../../types";
import { MaterialIcons } from "@expo/vector-icons";

interface TaskListProps {
  todoTasks: Task[];
  completedTasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

const TaskList = ({ todoTasks, completedTasks, onToggleTask, onDeleteTask }: TaskListProps) => {
  const renderTaskSection = (tasks: Task[], title: string) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>
        {title}({tasks.length})
      </Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity
              style={[styles.task, item.completed && styles.completedTaskBg]}
              onPress={() => onToggleTask(item.id)}
            >
              <View style={styles.taskContent}>
                {item.completed ? (
                  <MaterialIcons name="check-box" size={24} color="#1A1A1A" />
                ) : (
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    color="#1A1A1A"
                  />
                )}
                <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                  {item.text}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDeleteTask(item.id)}>
              <MaterialIcons name="remove-circle-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );

  return (
    <>
      {renderTaskSection(todoTasks, "할 일")}
      {renderTaskSection(completedTasks, "완료된 일")}
    </>
  );
};

export default TaskList;
