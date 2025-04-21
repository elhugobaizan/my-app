import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './AddExpense.data';
import { Expense, RootStackParamList } from '../types';
import { createExpense } from '../utils/ExpenseService';

const categories = [
  {id: 1, description: 'Food'},
  {id: 2, description: 'Transport'},
  {id: 3, description: 'Entertainment'},
  {id: 4, description: 'Health'},
  {id: 5, description: 'Other'}
];


export function AddExpense() {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        saveExpense({
          ...expense,
          expenseName: formValue.expenseName,
          amount: formValue.amount,
        });
      } catch (error) {
        console.error('Error saving expense:', error);
      }
    }
  });

  const [expense, setExpense] = useState({
    id: 0,
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date()
  });
  
  const saveExpense = async (newExpense: Expense) => {
    await createExpense(newExpense);
    navigation.navigate('Home');
  }
  
  return (
    <>
      <View style={styles.appBG}>
        <View style={{flex: 1, width: '100%'}}>
        <Input
          style={localStyles.input}
          onChangeText={(text) => formik.setFieldValue('expenseName', text)}
          errorMessage={formik.errors.expenseName}
        />
        <Input
          style={localStyles.input}
          onChangeText={(text) => formik.setFieldValue('amount', +text)}
          errorMessage={formik.errors.amount}
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
          onPress={() => formik.handleSubmit()}
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