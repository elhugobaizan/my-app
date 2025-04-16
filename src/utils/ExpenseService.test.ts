import { createExpense } from "./ExpenseService";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage");
const mockedStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

test('should create an expense', async () => {
  
  const expense = {
    id: 1,
    amount: 100,
    expenseName: 'Test Expense',
    category: '1',
    date: new Date(),
  };
  
  mockedStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));
  mockedStorage.setItem.mockResolvedValueOnce(undefined);

  console.log(await mockedStorage.getItem('expenses'));
  
  const result = await createExpense(expense);
  expect(result).toBe({status: 'OK', message: 'Expense created successfully'});
    //expect(result.status).toBe('OK');

});

test('should handle error when creating an expense', async () => {
  const expense = {
    id: 1,
    amount: 100,
    expenseName: 'Test Expense',
    category: '1',
    date: new Date(),
  };

  AsyncStorage.getItem = jest.fn(() => {
    throw new Error('AsyncStorage error');
  });

  try {
    await createExpense(expense);
  } catch (error) {
    expect(error).toBeDefined();
  }
});