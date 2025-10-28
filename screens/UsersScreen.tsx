import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../constants';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockUsers: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
        { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
      ];
      setUsers(mockUsers);
    } catch (error) {
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserPress = (user: User) => {
    Alert.alert(
      'User Actions',
      `Actions for ${user.name}`,
      [
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit user functionality') },
        { text: 'Delete', style: 'destructive', onPress: () => Alert.alert('Delete', 'Delete user functionality') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const renderUser = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => handleUserPress(item)}
    >
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userRole}>{item.role}</Text>
      </View>
      <View style={[styles.statusBadge, item.status === 'active' ? styles.statusActive : styles.statusInactive]}>
        <Text style={[styles.statusText, item.status === 'active' ? styles.statusTextActive : styles.statusTextInactive]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Users</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add User</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading users...</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          renderItem={renderUser}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  addButton: {
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  userCard: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
    marginBottom: 2,
  },
  userRole: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusActive: {
    backgroundColor: '#dcfce7',
  },
  statusInactive: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextActive: {
    color: '#166534',
  },
  statusTextInactive: {
    color: '#92400e',
  },
});
