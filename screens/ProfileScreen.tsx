import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { COLORS } from '../constants';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
  lastLogin: string;
  avatar?: string;
}

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Administrator',
    department: 'IT Administration',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20 14:30',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Profile data is already set in useState
    } catch (error) {
      Alert.alert('Error', 'Failed to load profile');
    }
  };

  const handleSave = async () => {
    try {
      // TODO: Replace with actual API call to save profile
      await new Promise(resolve => setTimeout(resolve, 500));

      setProfile(editedProfile);
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const profileFields = [
    { key: 'name', label: 'Full Name', value: editedProfile.name },
    { key: 'email', label: 'Email', value: editedProfile.email },
    { key: 'role', label: 'Role', value: editedProfile.role },
    { key: 'department', label: 'Department', value: editedProfile.department },
  ];

  const renderField = (field: { key: string; label: string; value: string }) => (
    <View key={field.key} style={styles.field}>
      <Text style={styles.fieldLabel}>{field.label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.fieldInput}
          value={field.value}
          onChangeText={(text) =>
            setEditedProfile({ ...editedProfile, [field.key]: text })
          }
          placeholder={`Enter ${field.label.toLowerCase()}`}
        />
      ) : (
        <Text style={styles.fieldValue}>{field.value}</Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Profile Information</Text>

          <View style={styles.fieldsContainer}>
            {profileFields.map(renderField)}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Join Date</Text>
            <Text style={styles.fieldValue}>{profile.joinDate}</Text>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Last Login</Text>
            <Text style={styles.fieldValue}>{profile.lastLogin}</Text>
          </View>
        </View>

        <View style={styles.actionsSection}>
          {isEditing ? (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
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
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: COLORS.SURFACE,
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT,
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: COLORS.TEXT_MUTED,
  },
  infoSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.TEXT,
    marginBottom: 16,
  },
  fieldsContainer: {
    marginBottom: 16,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.TEXT_MUTED,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: COLORS.TEXT,
    paddingVertical: 8,
  },
  fieldInput: {
    fontSize: 16,
    color: COLORS.TEXT,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.SURFACE,
  },
  actionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: COLORS.SURFACE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: COLORS.TEXT,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
