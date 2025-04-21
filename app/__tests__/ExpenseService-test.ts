import { Expense } from '../types';
import { createExpense, getExpense, updateExpense, removeExpense } from '../utils/ExpenseService';
import AsyncStorage  from '@react-native-async-storage/async-storage';
//import { mocked } from 'ts-jest/utils';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key) => Promise.resolve('[{"id":1,"expenseName":"test","category":"1","amount":10}]')),
  setItem: jest.fn((key, value) => Promise.resolve(null))
}));

const testExpense: Expense = {
  id: 2, 
  amount: 20, 
  category: '2', 
  date: new Date(), 
  expenseName: 'test create'
};

describe('ExpenseService getExpense', () => {
  test('found element', async () => {
    const result = await getExpense(1);
    
    expect(result).toBeDefined();
    expect(result.id).toBe(1);
  });

  test('not found', async () => {
    const result = await getExpense(2);

    expect(result).toBeDefined();
    expect(result).toStrictEqual({});
  });

  test('error', async () => {
    const mocked = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
    mocked.getItem.mockImplementationOnce(() => Promise.reject({status:'error', message:'Unknown error'}));

    const result = await getExpense(0);    
    expect(result.status).toBe('error');
  });
});

describe('ExpenseService createExpense', () => {
  test('create ok', async () => {
    const result = await createExpense(testExpense);
    expect(result.status).toBe('OK');
  });

  test('error', async () => {
    const mocked = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
    mocked.getItem.mockImplementationOnce(() => Promise.reject({status:'error', message:'Unknown error'}));

    const result = await createExpense(testExpense);    
    expect(result.status).toBe('error');
  });
});

describe('ExpenseService updateExpense', () => {
  test('create ok', async () => {
    const result = await updateExpense(testExpense);
    expect(result.status).toBe('OK');
  });

  test('error', async () => {
    const mocked = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
    mocked.getItem.mockImplementationOnce(() => Promise.reject({status:'error', message:'Unknown error'}));

    const result = await updateExpense(testExpense);    
    expect(result.status).toBe('error');
  });
});

describe('ExpenseService removeExpense', () => {
  test('create ok', async () => {
    const result = await removeExpense(testExpense);
    expect(result.status).toBe('OK');
  });

  test('error', async () => {
    const mocked = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
    mocked.getItem.mockImplementationOnce(() => Promise.reject({status:'error', message:'Unknown error'}));

    const result = await removeExpense(testExpense);    
    expect(result.status).toBe('error');
  });
});