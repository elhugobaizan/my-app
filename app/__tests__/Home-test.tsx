import { render } from '@testing-library/react-native';

import { Home } from '../views/Home'; 

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key) => Promise.resolve('[]'))
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('<Home />', () => {

  test('renders correctly', () => {

    expect(render(<Home />)).toBeTruthy();
  });
});