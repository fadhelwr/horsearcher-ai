import { NativeTabs } from 'expo-router/native-tabs';
import { useColorScheme } from 'react-native';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  const scheme = useColorScheme();

  const colors =
    Colors[scheme === 'dark'
      ? 'dark'
      : 'light'];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{
        selected: {
          color: colors.text,
        },
      }}
    >
      <NativeTabs.Trigger name="dashboard">
        <NativeTabs.Trigger.Label>
          Dashboard
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="house.fill"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="training-plans">
        <NativeTabs.Trigger.Label>
          Training
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="target"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <NativeTabs.Trigger.Label>
          History
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="clock.arrow.circlepath"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Label>
          Profile
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          sf="person.fill"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
