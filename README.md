# React Native Todo App - Complete Guide 📱

This is a comprehensive [Expo](https://expo.dev) React Native project demonstrating a fully functional Todo application with TypeScript.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [React Native Components Used](#react-native-components-used)
- [Complete Code Examples](#complete-code-examples)
- [Styling with StyleSheet](#styling-with-stylesheet)
- [State Management with Hooks](#state-management-with-hooks)
- [TypeScript Integration](#typescript-integration)
- [Learn More](#learn-more)

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm or yarn package manager
- Expo Go app on your mobile device (optional)

### Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the app**

   ```bash
   npx expo start
   ```

3. **Run on different platforms**
   ```bash
   npm run android    # Android emulator
   npm run ios        # iOS simulator
   npm run web        # Web browser
   ```

## Project Structure

```
my-app/
├── app/
│   ├── _layout.tsx       # Root layout with navigation
│   └── index.tsx         # Main Todo screen
├── components/
│   └── Task.tsx          # Reusable Task component
├── assets/
│   └── images/
├── package.json
├── tsconfig.json
└── README.md
```

## React Native Components Used

This project demonstrates the following core React Native components:

### 1. **View** - Container Component

The fundamental component for building UI. Similar to `<div>` in HTML.

```tsx
import { View, StyleSheet } from "react-native";

<View style={styles.container}>{/* Child components go here */}</View>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cee7ffff",
  },
});
```

**Key Properties:**

- `style`: Apply styling
- `flex`: Layout using flexbox

---

### 2. **Text** - Text Display Component

Used to display text. All text must be wrapped in `<Text>` component.

```tsx
import { Text, StyleSheet } from "react-native";

<Text style={styles.sectionTitle}>Today's tasks</Text>;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
});
```

**Key Properties:**

- `style`: Text styling (fontSize, fontWeight, color, etc.)
- `numberOfLines`: Limit text lines
- `onPress`: Handle touch events

---

### 3. **TextInput** - User Input Component

Allows users to enter text.

```tsx
import { TextInput, StyleSheet } from "react-native";

const [task, setTask] = useState<string>("");

<TextInput
  style={styles.input}
  placeholder={"Write a task"}
  value={task}
  onChangeText={(text) => setTask(text)}
/>;

const styles = StyleSheet.create({
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#ffffffff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
});
```

**Key Properties:**

- `placeholder`: Placeholder text
- `value`: Controlled input value
- `onChangeText`: Callback when text changes
- `keyboardType`: Specify keyboard type
- `secureTextEntry`: Hide text (for passwords)
- `multiline`: Allow multiple lines

---

### 4. **TouchableOpacity** - Touchable Button Component

Provides touch feedback with opacity change.

```tsx
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

<TouchableOpacity onPress={() => handleAddTask()}>
  <View style={styles.addWrapper}>
    <Text style={styles.addText}>+</Text>
  </View>
</TouchableOpacity>;

const styles = StyleSheet.create({
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
});
```

**Key Properties:**

- `onPress`: Function called on press
- `activeOpacity`: Opacity when pressed (0-1)
- `disabled`: Disable interaction

**Alternatives:**

- `TouchableHighlight`: Underlay color on press
- `TouchableWithoutFeedback`: No visual feedback
- `Pressable`: More flexible touch handling

---

### 5. **FlatList** - Performant List Component

Efficiently renders large lists with lazy loading.

```tsx
import { FlatList } from "react-native";
import Task from "../components/Task";

const [todoList, setTodoList] = useState<string[]>([]);

<FlatList
  data={todoList}
  renderItem={({ item, index }) => (
    <Task text={item} onDelete={() => completeTask(index)} />
  )}
  keyExtractor={(item, index) => index.toString()}
  contentContainerStyle={{ paddingBottom: 100 }}
/>;
```

**Key Properties:**

- `data`: Array of data to render
- `renderItem`: Function that renders each item
- `keyExtractor`: Unique key for each item
- `contentContainerStyle`: Style for scroll content
- `ListHeaderComponent`: Header component
- `ListFooterComponent`: Footer component
- `ListEmptyComponent`: Shown when list is empty
- `horizontal`: Horizontal scrolling
- `numColumns`: Multi-column layout

---

### 6. **KeyboardAvoidingView** - Keyboard-Aware Container

Automatically adjusts position when keyboard appears.

```tsx
import { KeyboardAvoidingView, Platform } from "react-native";

<KeyboardAvoidingView
  behavior={Platform.OS === "ios" ? "padding" : "height"}
  style={styles.writeTaskWrapper}
>
  {/* Input components */}
</KeyboardAvoidingView>;

const styles = StyleSheet.create({
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
```

**Key Properties:**

- `behavior`: "height" | "position" | "padding"
- `keyboardVerticalOffset`: Additional offset

---

### 7. **Platform** - Platform-Specific Code

Detect and handle platform differences.

```tsx
import { Platform } from 'react-native';

// Conditional behavior
behavior={Platform.OS === "ios" ? "padding" : "height"}

// Platform-specific styles
const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
```

**Key Properties:**

- `Platform.OS`: "ios" | "android" | "web" | "windows" | "macos"
- `Platform.Version`: OS version
- `Platform.select()`: Select value by platform

---

### 8. **Keyboard** - Keyboard Utilities

Control keyboard behavior programmatically.

```tsx
import { Keyboard } from "react-native";

const handleAddTask = () => {
  if (task.trim().length === 0) return;
  setTodoList([...todoList, task]);
  setTask("");
  Keyboard.dismiss(); // Hide keyboard
};
```

**Key Methods:**

- `Keyboard.dismiss()`: Hide keyboard
- `Keyboard.addListener()`: Listen to keyboard events
  - `keyboardDidShow`
  - `keyboardDidHide`
  - `keyboardWillShow`
  - `keyboardWillHide`

---

## Complete Code Examples

### Main Screen - `app/index.tsx`

Complete todo list screen with all functionality:

```tsx
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
  // State Management
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
      {/* Header Area */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>

        <View style={styles.items}>
          {/* Task List */}
          <FlatList
            data={todoList}
            renderItem={({ item, index }) => (
              <Task text={item} onDelete={() => completeTask(index)} />
            )}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        </View>
      </View>

      {/* Input Area */}
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
```

---

### Task Component - `components/Task.tsx`

Reusable task component with TypeScript props:

```tsx
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TaskProps {
  text: string;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({ text, onDelete }) => {
  return (
    <TouchableOpacity onPress={onDelete}>
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <View style={styles.square}></View>
          <Text style={styles.itemText}>{text}</Text>
        </View>
        <View style={styles.circular}></View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Task;
```

---

### Root Layout - `app/_layout.tsx`

Navigation setup using Expo Router:

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack />;
}
```

---

## Styling with StyleSheet

React Native uses the `StyleSheet` API for styling, similar to CSS but with camelCase properties.

### Basic Styling Example

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // Flexbox
    backgroundColor: "#fff", // Colors
    padding: 20, // Spacing
  },
  text: {
    fontSize: 16, // Text size
    fontWeight: "bold", // Text weight
    color: "#333", // Text color
    marginBottom: 10, // Margin
  },
  rounded: {
    borderRadius: 10, // Rounded corners
    borderWidth: 1, // Border
    borderColor: "#ddd", // Border color
  },
});
```

### Flexbox Layout

```tsx
// Column Layout (default)
const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
    justifyContent: "center", // Vertical alignment
    alignItems: "center", // Horizontal alignment
  },
});

// Row Layout
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
```

### Positioning

```tsx
const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  relative: {
    position: "relative",
  },
});
```

---

## State Management with Hooks

### useState - Managing State

```tsx
import { useState } from "react";

// String state
const [text, setText] = useState<string>("");

// Array state
const [items, setItems] = useState<string[]>([]);

// Object state
const [user, setUser] = useState({ name: "", age: 0 });

// Updating state
setText("New value");
setItems([...items, "New item"]);
setUser({ ...user, name: "John" });
```

### useEffect - Side Effects

```tsx
import { useEffect } from "react";

useEffect(() => {
  // Runs on mount
  console.log("Component mounted");

  // Cleanup function
  return () => {
    console.log("Component unmounted");
  };
}, []); // Empty dependency array

useEffect(() => {
  // Runs when 'task' changes
  console.log("Task changed:", task);
}, [task]); // Dependency array
```

### Custom Hooks Example

```tsx
import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage
const debouncedSearch = useDebounce(searchTerm, 500);
```

---

## TypeScript Integration

### Component Props Interface

```tsx
interface TaskProps {
  text: string;
  onDelete: () => void;
  isCompleted?: boolean;  // Optional prop
  priority?: 'low' | 'medium' | 'high';  // Union type
}

const Task: React.FC<TaskProps> = ({
  text,
  onDelete,
  isCompleted = false,
  priority = 'low'
}) => {
  return (/* ... */);
};
```

### Type-Safe State

```tsx
// Simple types
const [count, setCount] = useState<number>(0);
const [text, setText] = useState<string>("");
const [isActive, setIsActive] = useState<boolean>(false);

// Complex types
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const [todos, setTodos] = useState<Todo[]>([]);

// Adding typed todo
const addTodo = (text: string) => {
  const newTodo: Todo = {
    id: Date.now(),
    text,
    completed: false,
  };
  setTodos([...todos, newTodo]);
};
```

### Event Types

```tsx
import { TextInput, TouchableOpacity } from "react-native";

// Text input event
const handleTextChange = (text: string) => {
  setText(text);
};

// Press event
const handlePress = () => {
  console.log("Pressed!");
};

// With event object
import { GestureResponderEvent } from "react-native";

const handlePressEvent = (event: GestureResponderEvent) => {
  console.log(event.nativeEvent);
};
```

---

## Advanced Features

### AsyncStorage - Local Data Persistence

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data
const saveData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data:", error);
  }
};

// Load data
const loadData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

// Usage in component
useEffect(() => {
  loadData("todoList").then((data) => {
    if (data) setTodoList(data);
  });
}, []);

useEffect(() => {
  saveData("todoList", todoList);
}, [todoList]);
```

### Animations with Animated API

```tsx
import { Animated } from "react-native";
import { useRef, useEffect } from "react";

const fadeAnim = useRef(new Animated.Value(0)).current;

useEffect(() => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();
}, []);

<Animated.View style={{ opacity: fadeAnim }}>
  <Text>Fading in</Text>
</Animated.View>;
```

### Modal Component

```tsx
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import { useState } from "react";

const [modalVisible, setModalVisible] = useState(false);

<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text>Modal Content</Text>
      <Button title="Close" onPress={() => setModalVisible(false)} />
    </View>
  </View>
</Modal>;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
```

---

## Common Patterns & Best Practices

### 1. Component Composition

```tsx
// Container Component
const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <View>
      <TodoInput onAdd={(text) => setTodos([...todos, text])} />
      <TodoItems
        items={todos}
        onDelete={(index) => {
          /* ... */
        }}
      />
    </View>
  );
};

// Presentational Components
const TodoInput = ({ onAdd }: { onAdd: (text: string) => void }) => {
  // Input logic
};

const TodoItems = ({ items, onDelete }: TodoItemsProps) => {
  // Display logic
};
```

### 2. Error Boundaries (for class components)

```tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Text>Sorry, something went wrong.</Text>;
    }

    return this.props.children;
  }
}
```

### 3. Performance Optimization

```tsx
import React, { memo, useCallback, useMemo } from 'react';

// Memoize component
const Task = memo(({ text, onDelete }: TaskProps) => {
  return (/* ... */);
});

// Memoize callbacks
const handleDelete = useCallback(() => {
  completeTask(index);
}, [index]);

// Memoize expensive calculations
const sortedTodos = useMemo(() => {
  return todoList.sort((a, b) => a.localeCompare(b));
}, [todoList]);
```

---

## Project Scripts

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS simulator
npm run web           # Run in web browser

# Code Quality
npm run lint          # Run ESLint

# Reset
npm run reset-project # Start fresh project
```

---

## Learn More

### Official Documentation

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript with React Native](https://reactnative.dev/docs/typescript)

### Component References

- [Core Components](https://reactnative.dev/docs/components-and-apis)
- [API Reference](https://reactnative.dev/docs/accessibilityinfo)
- [Expo Router](https://docs.expo.dev/router/introduction/)

### Learning Resources

- [React Native Tutorial](https://reactnative.dev/docs/tutorial)
- [JavaScript ES6+](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### Community

- [Expo Discord](https://chat.expo.dev)
- [React Native Community](https://github.com/react-native-community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## Troubleshooting

### Common Issues

**Metro bundler not starting:**

```bash
npx expo start -c  # Clear cache
```

**Module not found:**

```bash
rm -rf node_modules
npm install
```

**iOS simulator not opening:**

```bash
npx expo run:ios
```

**Android build failing:**

```bash
cd android
./gradlew clean
cd ..
npx expo run:android
```

---

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
