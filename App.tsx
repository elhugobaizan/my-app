import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@/views/Home';
import { AddExpense } from '@/views/AddExpense';
import { EditExpense } from '@/views/EditExpanse';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <NavigationContainer>
    <Stack.Navigator
    initialRouteName='Home'>
    <Stack.Screen
      name='Home'
      component={Home}
    />
    <Stack.Screen
      name='AddExpense'
      component={AddExpense}
    />
    <Stack.Screen
      name='EditExpense'
      component={EditExpense}
    />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
