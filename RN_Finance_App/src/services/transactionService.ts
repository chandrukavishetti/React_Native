import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Transaction {
  id?: string; // Changed to string for Date.now().toString()
  amount: number;
  category: string;
  note: string;
  type: 'expense' | 'income';
  date: string;
  userId: string;
}

const storageKey = (userId: string) => `transactions_${userId}`;

export const getTransactions = async (userId: string): Promise<Transaction[]> => {
  try {
    const raw = await AsyncStorage.getItem(storageKey(userId));
    if (!raw) return [];
    
    const data: Transaction[] = JSON.parse(raw);
    // Sort by date descending (newest first)
    return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error fetching transactions", error);
    return [];
  }
};

export const addTransaction = async (data: Transaction): Promise<Transaction> => {
  try {
    const existing = await getTransactions(data.userId);
    
    // Generate a local ID since we don't have a database auto-increment
    const newTx: Transaction = { 
      ...data, 
      id: Date.now().toString() 
    };
    
    await AsyncStorage.setItem(storageKey(data.userId), JSON.stringify([...existing, newTx]));
    return newTx;
  } catch (error) {
    console.error("Error saving transaction", error);
    throw error;
  }
};