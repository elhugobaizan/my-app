import { render } from '@testing-library/react-native';

import ExpenseItem from '../components/ExpenseItem';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

jest.mock('expo-font');

describe('<ExpenseItem />', () => {

  test('renders correctly', () => {

    const expense = {
      id: 0,
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    };

    expect(render(<ExpenseItem expense={expense} onDelete={() => {}} onEdit={() => {}} />)).toBeTruthy();
  });
});