import { render } from '@testing-library/react-native';

import { AddExpense } from '../views/AddExpense';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
describe('<AddExpense />', () => {

  test('renders correctly', () => {

    expect(render(<AddExpense />)).toBeTruthy();
  });
});