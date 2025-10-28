import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../constants';

export default function DashboardScreen() {
  const handleCardPress = (title: string) => {
    Alert.alert('Navigation', `Navigate to ${title}`);
  };

  const dashboardCards = [
    {
      title: 'Users',
      description: 'Manage system users',
      route: 'Users',
    },
    {
      title: 'Policies',
      description: 'View and edit policies',
      route: 'Policies',
    },
    {
      title: 'Settings',
      description: 'System configuration',
      route: 'Settings',
    },
    {
      title: 'Profile',
      description: 'User profile management',
      route: 'Profile',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Welcome to CenasOcta Admin</Text>

        <View style={styles.cardsContainer}>
          {dashboardCards.map((card, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleCardPress(card.title)}
            >
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardDescription}>{card.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.TEXT,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: COLORS.TEXT_MUTED,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: COLORS.TEXT,
  },
  cardDescription: {
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
  },
});
