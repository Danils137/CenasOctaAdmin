import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { COLORS } from '../constants';

interface SettingItem {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'button' | 'info';
  value?: boolean;
  onPress?: () => void;
}

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const handleSettingPress = (setting: SettingItem) => {
    if (setting.onPress) {
      setting.onPress();
    } else if (setting.type === 'button') {
      Alert.alert(
        setting.title,
        `Action for ${setting.title}`,
        [
          { text: 'OK', onPress: () => console.log(`${setting.title} action`) },
        ]
      );
    }
  };

  const settingsSections = [
    {
      title: 'General',
      items: [
        {
          id: '1',
          title: 'Notifications',
          description: 'Enable push notifications',
          type: 'toggle' as const,
          value: notifications,
        },
        {
          id: '2',
          title: 'Dark Mode',
          description: 'Use dark theme',
          type: 'toggle' as const,
          value: darkMode,
        },
        {
          id: '3',
          title: 'Analytics',
          description: 'Help improve the app',
          type: 'toggle' as const,
          value: analytics,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          id: '4',
          title: 'Change Password',
          description: 'Update your password',
          type: 'button' as const,
        },
        {
          id: '5',
          title: 'Two-Factor Authentication',
          description: 'Add an extra layer of security',
          type: 'button' as const,
        },
        {
          id: '6',
          title: 'Privacy Settings',
          description: 'Manage your privacy preferences',
          type: 'button' as const,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: '7',
          title: 'Help & Support',
          description: 'Get help and contact support',
          type: 'button' as const,
        },
        {
          id: '8',
          title: 'About',
          description: `CenasOcta Admin v1.0.0`,
          type: 'info' as const,
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem) => (
    <TouchableOpacity
      style={[styles.settingItem, item.type === 'info' && styles.settingItemDisabled]}
      onPress={() => handleSettingPress(item)}
      disabled={item.type === 'info'}
    >
      <View style={styles.settingContent}>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingDescription}>{item.description}</Text>
        </View>

        {item.type === 'toggle' && (
          <Switch
            value={item.value}
            onValueChange={(value) => {
              if (item.id === '1') setNotifications(value);
              if (item.id === '2') setDarkMode(value);
              if (item.id === '3') setAnalytics(value);
            }}
            trackColor={{ false: COLORS.BORDER, true: COLORS.PRIMARY }}
            thumbColor={item.value ? 'white' : COLORS.TEXT_MUTED}
          />
        )}

        {item.type === 'button' && (
          <Text style={styles.arrow}>›</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        {settingsSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>

            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <View key={item.id}>
                  {renderSettingItem(item)}
                </View>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => Alert.alert(
              'Logout',
              'Are you sure you want to logout?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Logout', style: 'destructive', onPress: () => console.log('Logout') },
              ]
            )}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
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
    marginBottom: 24,
    color: COLORS.TEXT,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.TEXT,
  },
  sectionContent: {
    backgroundColor: COLORS.SURFACE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
  },
  settingItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  settingItemDisabled: {
    opacity: 0.6,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
  },
  arrow: {
    fontSize: 20,
    color: COLORS.TEXT_MUTED,
    fontWeight: '300',
  },
  logoutButton: {
    backgroundColor: '#fef2f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: '600',
  },
});
