import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.setOptions({
  fade: false,
  duration: 0,
});

export default function RootLayout() {
  const [loaded] = useFonts({
    'Manrope-ExtraLight': require('../assets/static/Manrope-ExtraLight.ttf'),
    'Manrope-Light': require('../assets/static/Manrope-Light.ttf'),
    'Manrope-Regular': require('../assets/static/Manrope-Regular.ttf'),
    'Manrope-Medium': require('../assets/static/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../assets/static/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../assets/static/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('../assets/static/Manrope-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
