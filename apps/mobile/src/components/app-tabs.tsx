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
      indicatorColor={
        colors.backgroundElement
      }
      labelStyle={{
        selected: {
          color: colors.text,
        },
      }}
    >
      <NativeTabs.Trigger
        name="dashboard"
      >
        <NativeTabs.Trigger.Label>
          Dashboard
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require(
            '@/assets/images/tabIcons/explore.png'
          )}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="training-plans"
      >
        <NativeTabs.Trigger.Label>
          Training Plans
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require(
            '@/assets/images/tabIcons/explore.png'
          )}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="history"
      >
        <NativeTabs.Trigger.Label>
          History
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require(
            '@/assets/images/tabIcons/explore.png'
          )}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger
        name="profile"
      >
        <NativeTabs.Trigger.Label>
          Profile
        </NativeTabs.Trigger.Label>

        <NativeTabs.Trigger.Icon
          src={require(
            '@/assets/images/tabIcons/explore.png'
          )}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}