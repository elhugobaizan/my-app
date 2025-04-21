import { RootStackParamList } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Dialog } from 'react-native-elements';

export default function ExpenseItem({ expense, onDelete, onEdit }) {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [visible, setVisible] = useState(false);

  const deleteExpense = async (expense) => {
    onDelete(expense);
    setVisible(false);
  }

  return (<>
  <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
    <View style={{flex: 6}}>
      <Text style={styles.description}>{expense.expenseName}</Text>
    </View>
    <View style={{flex: 3}}>
      <Text style={styles.description}>${expense.amount}</Text>
    </View>
    <View style={{flex: 3}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingHorizontal: 10, paddingVertical: 5}}>
      <Button
      buttonStyle={styles.editButton}
      icon={{name: 'edit', size: 15, color: 'white'}}
      onPress={() => navigation.navigate('EditExpense', {id: 3, expense})} />
      <Button 
      buttonStyle={styles.deleteButton}
      icon={{name: 'delete', size: 15, color: 'white'}}
      onPress={() => setVisible(true)}/>
      </View>
    </View>    
  </View>
  <Dialog
    isVisible={visible}
    onBackdropPress={() => setVisible(false)}
  >
    <Dialog.Title title="Dialog Title"/>
      <Text>Are you sure you want to delete?</Text>
    <Dialog.Actions>
      <Dialog.Button title="Accept" onPress={() => deleteExpense(expense)}/>
      <Dialog.Button title="Cancel" onPress={() => setVisible(false)} />
    </Dialog.Actions>
  </Dialog>
    
  </>);
}

const styles = StyleSheet.create({
  editButton: {
    backgroundColor: '#007B00', 
    borderRadius: 5
  },
  deleteButton: {
    backgroundColor: '#FF0000', 
    borderRadius: 5
  },
  description: {
    fontSize: 18,
    fontFamily: 'Lato',
    color: '#000',
  }
});