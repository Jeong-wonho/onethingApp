import { useState } from "react";
import { Keyboard, TextInput, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      onAddTask(text.trim());
      setText("");
      Keyboard.dismiss();
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSubmit}
        placeholder="할 일을 입력하세요"
        returnKeyType="done"
      ></TextInput>
      <TouchableOpacity style={styles.addButton} onPress={handleSubmit}>
        <MaterialIcons name="add-circle-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default TaskInput;