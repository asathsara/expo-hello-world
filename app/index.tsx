import React, { useState } from "react";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Task from "../components/Task";

export default function Index() {
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<string[]>([]);

  // Function to add a new task
  const handleAddTask = () => {
    if (task.trim().length === 0) return; // Don't add empty tasks
    setTodoList([...todoList, task]);
    setTask(""); // Clear input
    Keyboard.dismiss(); // Hide keyboard
  };

  // Function to delete a task
  const completeTask = (index: number) => {
    let itemsCopy = [...todoList];
    itemsCopy.splice(index, 1);
    setTodoList(itemsCopy);
  };

  return (
    <View style={styles.container}>
      {/* 1. Header Area */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todays tasks</Text>

        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          <FlatList
            data={todoList}
            renderItem={({ item, index }) => (
              <Task
                text={item}
                onDelete={() => completeTask(index)}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </View>

      {/* 2. Write a task wrapper */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Write a task"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cee7ffff",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  items: {
    marginTop: 10,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#ffffffff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});
