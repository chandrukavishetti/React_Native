import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen() {
  const user = auth().currentUser;
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const openCamera = async () => {
    const result = await launchCamera({ mediaType: 'photo', quality: 0.7, saveToPhotos: false });
    if (result.assets?.[0]?.uri) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openCamera}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>Add Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 32, backgroundColor: '#F1F5F9' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  avatarPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#CBD5E1', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  avatarText: { color: '#475569' },
  email: { fontSize: 18, color: '#1E293B', marginBottom: 32 },
  logoutBtn: { backgroundColor: '#EF4444', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  logoutText: { color: '#FFF', fontWeight: 'bold' }
});