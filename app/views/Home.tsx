import ExpenseItem from '../components/ExpenseItem';
import { Context, Expense, RootStackParamList } from '../types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { styles } from '../styles';
import { removeExpense } from '../utils/ExpenseService';



export function Home() {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [context, setContext] = useState<Context>({
    state: {
      budget: 0,
      expenses: []
    },
    totalExpenses: 0,
    remainingBudget: 0
  });
  
  useEffect(() => {
    (async () => {
      await loadContext(); 
    })();
  }, []); 
  
  const totalExpenses = useMemo(() => context.state.expenses.reduce((total, expense) => total = total + expense.amount, 0), [context.state.expenses]);
  const remainingBudget = useMemo(() => context.state.budget - totalExpenses, [context.state.budget, totalExpenses]); 
  const isEmpty = useMemo(() => context.state.expenses.length===0, [context.state.expenses]);  
  
  const loadContext = async () => {
    const expenses = await AsyncStorage.getItem('expenses'); 
    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const budget = await AsyncStorage.getItem('budget'); 
    const parsedBudget = budget ? +budget : 0;
    setContext({...context, state: {...context.state, budget: parsedBudget, expenses: parsedExpenses}}); 
  }
  
  const deleteExpense = async (expense: Expense) => {
    await removeExpense(expense); 
    loadContext();
  }

  return (
    <>
        <View style={styles.appBG}>
          <View style={styles.budgetSection}>
            <Text style={[styles.totals, {textAlign: 'center'}]}>Current Budget</Text>
            <View style={{flexDirection: 'row', flex: 1}}>
            <Input style={[styles.totals, {textAlign: 'center'}]}  
              value={context.state.budget.toString()}
              onChangeText={async (text) => { 
                setContext({
                  ...context, 
                  state: {
                    ...context.state, 
                    budget: parseInt(text)
                  }
                });
                AsyncStorage.setItem('budget', text);
              }}
            />
            </View>
          </View>
          <View style={{flex: 6, width: '100%'}}>
          {isEmpty ? <Text>No expenses</Text> :
            context.state.expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} onDelete={() => deleteExpense(expense)} onEdit={() => {}} />
            ))
          }
          </View>
          <View style={{flex: 2, width: '100%'}}>

            <View style={{flex: 9, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Text style={styles.totals}>Total expenses: ${totalExpenses}</Text>
              <Text style={styles.totals}>Remaining budget: ${remainingBudget}</Text>
            </View>
            <View style={{flex: 6}}>
              <Button
                title={'Add Expense'}
                onPress={() => navigation.navigate('AddExpense')}
              />
            </View>
          </View>
        </View>
    </>
  );
};