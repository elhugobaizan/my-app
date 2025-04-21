import { render } from '@testing-library/react-native';

import { EditExpense } from '../views/EditExpense';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
describe('<EditExpense />', () => {

  test('renders correctly', () => {

    const expense = {
      id: 0,
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date()
    };

    const route = {
      "navigation": {},
      "route": {
        "name": "EditExpense",
        "params": {
            "expense": expense
        }
      }
    }
    expect(render(<EditExpense {...route} />)).toBeTruthy();
  });
});