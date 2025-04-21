import { Expense } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function createExpense(expense: Expense) {
  try {    
    const expenses = await AsyncStorage.getItem('expenses'); 
    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    expense.id = parsedExpenses.length+1;
    expense.date = new Date();
    parsedExpenses.push(expense);
    await AsyncStorage.setItem('expenses', JSON.stringify(parsedExpenses));
    return { status: 'OK', message: 'Expense created successfully' }; 
  } catch (error: any) {
    return {status: 'error', message: error.message};
  }
}

export async function updateExpense(expense: Expense) {
  try {    
    const expenses = await AsyncStorage.getItem('expenses'); 
    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    
    const newExpenses = parsedExpenses.map((e: Expense) => e.id === expense.id ? expense : e);
    await AsyncStorage.setItem('expenses', JSON.stringify(newExpenses));
    return { status: 'OK', message: 'Expense updated successfully' }; 
  } catch (error: any) {
    return {status: 'error', message: error.message};
  }
}

export async function removeExpense(expense: Expense) {
  try {    
    const expenses = await AsyncStorage.getItem('expenses');
    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const filteredExpenses = parsedExpenses.filter((e: Expense) => e.id !== expense.id);
    await AsyncStorage.setItem('expenses', JSON.stringify(filteredExpenses));
    return { status: 'OK', message: 'Expense deleted successfully' }; 
  } catch (error: any) {
    return {status: 'error', message: error.message};
  }
}

export async function getExpense(id: number) {
  try {
    const expenses = await AsyncStorage.getItem('expenses');
    const parsedExpenses = expenses ? JSON.parse(expenses) : [];
    const foundExpense = parsedExpenses.find((e: Expense) => e.id === id);
    return foundExpense ? foundExpense : {};
  } catch (error: any) {
    return {status: 'error', message: error.message};    
  }
}