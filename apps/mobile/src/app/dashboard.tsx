import { useEffect, useState } from 'react';

import { ThemedText } from '../components/themed-text';
import { ThemedView } from '../components/themed-view';

import { api } from '../../services/api';

export default function DashboardScreen() {
  const [dashboard, setDashboard] = useState<any>();

    useEffect(() => {
    api
        .get('/dashboard')
        .then((response) => {
        console.log(response.data);
        setDashboard(response.data);
        })
        .catch((error) => {
        console.log('DASHBOARD ERROR', error?.response?.data);
        });
    }, []);

  if (!dashboard) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
      }}
    >
      <ThemedText type="title">
        Welcome, {dashboard.name}
      </ThemedText>

      <ThemedText>
        Level: {dashboard.level}
      </ThemedText>

      <ThemedText>
        XP: {dashboard.xp}
      </ThemedText>

      <ThemedText>
        Completed Sessions: {dashboard.completedSessions}
      </ThemedText>
    </ThemedView>
  );
}