import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { addTransaction } from '../../../services/transactionService';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

export default function AddTransactionScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState<'expense' | 'income'>('expense');

  const handleSave = async () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert('Validation Error', 'Please enter a valid numeric amount.');
      return;
    }

    try {
      await addTransaction({
        amount: Number(amount),
        category,
        note: 'Added via app',
        type,
        date: new Date().toISOString(),
        userId: user!.uid,
      });
      setAmount('');
      navigation.navigate('Dashboard' as never);
    } catch (error) {
      Alert.alert('Error', 'Failed to save transaction');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter amount (e.g. 500)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <View style={styles.typeRow}>
        <TouchableOpacity 
          style={[styles.typeBtn, type === 'expense' && styles.activeExpense]}
          onPress={() => setType('expense')}>
          <Text style={{ color: type === 'expense' ? '#FFF' : '#000' }}>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.typeBtn, type === 'income' && styles.activeIncome]}
          onPress={() => setType('income')}>
          <Text style={{ color: type === 'income' ? '#FFF' : '#000' }}>Income</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F8FAFC' },
  input: { 
    backgroundColor: '#FFFFFF', 
    padding: 18, 
    borderRadius: 12, 
    fontSize: 16, 
    marginBottom: 24, 
    borderWidth: 1, 
    borderColor: '#E2E8F0', 
    color: '#0F172A' 
  },
  typeRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  typeBtn: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#F1F5F9', borderWidth: 1, borderColor: '#E2E8F0' },
  activeExpense: { backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
  activeIncome: { backgroundColor: '#ECFDF5', borderColor: '#10B981' },
  saveBtn: { 
    backgroundColor: '#3B82F6', 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center', 
    shadowColor: '#3B82F6', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 8, 
    elevation: 4 
  },
  saveText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 }
});