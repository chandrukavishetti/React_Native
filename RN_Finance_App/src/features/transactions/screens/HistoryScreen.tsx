import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getTransactions, Transaction } from '../../../services/transactionService';
import { useAuth } from '../../../hooks/useAuth';

export default function HistoryScreen() {
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

  if (loading) return <ActivityIndicator size="large" color="#2196F3" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={[styles.amount, { color: item.type === 'income' ? 'green' : 'red' }]}>
              {item.type === 'income' ? '+' : '-'}₹{item.amount}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No transactions found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', paddingHorizontal: 16, paddingTop: 12 },
  item: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    marginBottom: 12, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2 
  },
  category: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  amount: { fontSize: 18, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 60, fontSize: 16, color: '#94A3B8' }
});