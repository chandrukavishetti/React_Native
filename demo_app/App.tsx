// import React, { useState } from 'react';
// import {
//   Button,
//   FlatList,
//   Pressable,
//   SafeAreaView,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// export default function App() {
//   const [name, setName] = useState('');
//   const [message, setMessage] = useState('');

//   const fruits = ['Apple', 'Banana', 'Mango', 'Orange', 'Grapes', 'Pineapple'];

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {/* SafeAreaView = keeps your content away from the phone notch and status bar */}

//       <ScrollView>
//         <View style={{ padding: 20, gap: 20 }}>

//           {/* 1. Button = simple click button. You cannot style it much. */}
//           <Button
//             title="Click Me (Button)"
//             onPress={() => setMessage('You clicked Button!')}
//           />

//           {/* 2. TouchableOpacity = wrap anything to make it clickable. When you press, it becomes slightly transparent (opacity effect). */}
//           <TouchableOpacity onPress={() => setMessage('You pressed TouchableOpacity!')}>
//             <View style={{ backgroundColor: 'blue', padding: 12 }}>
//               <Text style={{ color: 'white', textAlign: 'center' }}>I am TouchableOpacity</Text>
//             </View>
//           </TouchableOpacity>

//           {/* 3. Pressable = newer version of TouchableOpacity. Wrap anything to make it clickable. */}
//           <Pressable onPress={() => setMessage('You pressed Pressable!')}>
//             <View style={{ backgroundColor: 'green', padding: 12 }}>
//               <Text style={{ color: 'white', textAlign: 'center' }}>I am Pressable</Text>
//             </View>
//           </Pressable>

//           {/* 4. TextInput = box where user can type text */}
//           <TextInput
//             placeholder="Type your name here..."
//             value={name}
//             onChangeText={setName}
//             style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
//           />
//           <Text>You typed: {name}</Text>

//           {/* 5. ScrollView horizontal = scroll things left and right */}
//           <Text>Horizontal Scroll:</Text>
//           <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//             <View style={{ width: 150, height: 100, backgroundColor: 'red', marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: 'white' }}>Box 1</Text>
//             </View>
//             <View style={{ width: 150, height: 100, backgroundColor: 'orange', marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: 'white' }}>Box 2</Text>
//             </View>
//             <View style={{ width: 150, height: 100, backgroundColor: 'purple', marginRight: 10, justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: 'white' }}>Box 3</Text>
//             </View>
//             <View style={{ width: 150, height: 100, backgroundColor: 'brown', justifyContent: 'center', alignItems: 'center' }}>
//               <Text style={{ color: 'white' }}>Box 4</Text>
//             </View>
//           </ScrollView>

//           {/* 6. FlatList = shows a long list of items efficiently. It only creates items you see on screen. Good for 100+ items. */}
//           <Text>Fruit List (FlatList):</Text>
//           <FlatList
//             data={fruits}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <View style={{ padding: 10, backgroundColor: 'lightgray', marginBottom: 5 }}>
//                 <Text>{item}</Text>
//               </View>
//             )}
//           />

//           {/* Message display area */}
//           {message !== '' && (
//             <Text style={{ fontSize: 18, color: 'darkgreen', textAlign: 'center' }}>
//               {message}
//             </Text>
//           )}

//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }








import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './screens/Home';
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;