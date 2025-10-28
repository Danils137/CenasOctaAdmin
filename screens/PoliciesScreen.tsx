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

interface Policy {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
}

export default function PoliciesScreen() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPolicies();
  }, []);

  const loadPolicies = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockPolicies: Policy[] = [
        {
          id: '1',
          title: 'Privacy Policy',
          description: 'Data protection and privacy guidelines',
          category: 'Legal',
          status: 'active',
          lastUpdated: '2024-01-15',
        },
        {
          id: '2',
          title: 'Terms of Service',
          description: 'User agreement and service terms',
          category: 'Legal',
          status: 'active',
          lastUpdated: '2024-01-10',
        },
        {
          id: '3',
          title: 'Security Policy',
          description: 'Information security protocols',
          category: 'Security',
          status: 'draft',
          lastUpdated: '2024-01-20',
        },
        {
          id: '4',
          title: 'Data Retention Policy',
          description: 'Data storage and retention guidelines',
          category: 'Compliance',
          status: 'active',
          lastUpdated: '2024-01-05',
        },
      ];
      setPolicies(mockPolicies);
    } catch (error) {
      Alert.alert('Error', 'Failed to load policies');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePolicyPress = (policy: Policy) => {
    Alert.alert(
      'Policy Actions',
      `Actions for ${policy.title}`,
      [
        { text: 'Edit', onPress: () => Alert.alert('Edit', 'Edit policy functionality') },
        { text: 'View', onPress: () => Alert.alert('View', 'View policy details') },
        { text: 'Archive', style: 'destructive', onPress: () => Alert.alert('Archive', 'Archive policy functionality') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { backgroundColor: '#dcfce7', color: '#166534' };
      case 'draft':
        return { backgroundColor: '#fef3c7', color: '#92400e' };
      case 'archived':
        return { backgroundColor: '#f3f4f6', color: '#374151' };
      default:
        return { backgroundColor: '#f3f4f6', color: '#374151' };
    }
  };

  const renderPolicy = ({ item }: { item: Policy }) => {
    const statusStyle = getStatusColor(item.status);

    return (
      <TouchableOpacity
        style={styles.policyCard}
        onPress={() => handlePolicyPress(item)}
      >
        <View style={styles.policyHeader}>
          <Text style={styles.policyTitle}>{item.title}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
            <Text style={[styles.statusText, { color: statusStyle.color }]}>
              {item.status}
            </Text>
          </View>
        </View>

        <Text style={styles.policyDescription}>{item.description}</Text>

        <View style={styles.policyFooter}>
          <Text style={styles.policyCategory}>{item.category}</Text>
          <Text style={styles.policyDate}>Updated: {item.lastUpdated}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Policies</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ New Policy</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading policies...</Text>
        </View>
      ) : (
        <FlatList
          data={policies}
          renderItem={renderPolicy}
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
  policyCard: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  policyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  policyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT,
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  policyDescription: {
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
    marginBottom: 12,
    lineHeight: 20,
  },
  policyFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policyCategory: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontWeight: '500',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  policyDate: {
    fontSize: 12,
    color: COLORS.TEXT_MUTED,
  },
});
