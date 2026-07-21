import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTransactions, Transaction } from '../../../services/transactionService';
import { useAuth } from '../../../hooks/useAuth';

export default function DashboardScreen() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        getTransactions(user.uid)
          .then(setTransactions)
          .catch(console.error)
          .finally(() => setLoading(false));
      }
    }, [user])
  );

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach(t => {
      if (t.type === 'income') income += t.amount;
      else expense += t.amount;
    });
    return { income, expense, balance: income - expense };
  }, [transactions]);

  if (loading) return <ActivityIndicator size="large" color="#2196F3" style={{ flex: 1 }} />;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Total Balance</Text>
        <Text style={styles.balance}>₹{stats.balance}</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.card, { flex: 1, marginRight: 8, backgroundColor: '#e8f5e9' }]}>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.amount, { color: 'green' }]}>+₹{stats.income}</Text>
        </View>
        <View style={[styles.card, { flex: 1, marginLeft: 8, backgroundColor: '#ffebee' }]}>
          <Text style={styles.label}>Expense</Text>
          <Text style={[styles.amount, { color: 'red' }]}>-₹{stats.expense}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F8FAFC' },
  card: { 
    backgroundColor: '#FFFFFF', 
    padding: 24, 
    borderRadius: 16, 
    marginBottom: 16, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 8, 
    elevation: 3 
  },
  row: { flexDirection: 'row', gap: 12 },
  label: { fontSize: 14, color: '#64748B', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
  balance: { fontSize: 36, fontWeight: '800', color: '#0F172A' },
  amount: { fontSize: 22, fontWeight: '700' }
});