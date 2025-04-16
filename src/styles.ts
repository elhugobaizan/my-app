import { StyleSheet, Dimensions } from 'react-native';


const height = Dimensions.get('window').height

export const styles = StyleSheet.create({
  appBG: {
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    fontFamily: 'Lato',
    flex: 1,
    fontSize: 16,
    height: height - 100,
    marginHorizontal: 20,
    marginTop: 20,
  },
  totals: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  budgetSection: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center', 
    marginVertical: 20
  }
});