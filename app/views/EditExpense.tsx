import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles';
import { updateExpense } from '../utils/ExpenseService';

const categories = [
  {id: 1, description: 'Food'},
  {id: 2, description: 'Transport'},
  {id: 3, description: 'Entertainment'},
  {id: 4, description: 'Health'},
  {id: 5, description: 'Other'}
];


export function EditExpense({ route }: { route: any }) {
  
  const oldExpense = route.params.expense;
  
  const navigation = useNavigation();
  
  const [expense, setExpense] = useState({
    id: 0,
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });

  useEffect(() => {
    setExpense(oldExpense);
  }, []);
  
  const saveExpense = async () => {
    await updateExpense(expense);
    navigation.navigate('Home' as never);
  }
  
  return (
    <>
      <View style={styles.appBG}>
        <View style={{flex: 1, width: '100%'}}>
        <Input
          style={localStyles.input}
          value={expense.expenseName}
          onChangeText={(text) => setExpense({...expense, expenseName: text})}
        />
        <Input
          style={localStyles.input}
          value={expense.amount.toString()}
          onChangeText={(text) => setExpense({...expense, amount: +text})}
        />
        <Picker
          style={[localStyles.input, {height: 50, borderColor: '#86939E'}]}
          selectedValue={expense.category}
          onValueChange={(itemValue) => setExpense({...expense, category: itemValue})}
        >
          <Picker.Item label="Select a category" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.id} label={category.description} value={category.id} />
          ))}
        </Picker>
        </View>
        <View style={{flex: 1, width: '100%'}}>
        <Button 
          title={'Add Expense'}
          onPress={() => saveExpense()}
        />
        </View>
      </View>
    </>
  );
}

const localStyles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  }
});