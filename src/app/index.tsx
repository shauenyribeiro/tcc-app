import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import * as Fonts from "expo-font";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const fonts = {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
};

export default function Root() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      await Fonts.loadAsync(fonts);
      await SplashScreen.hideAsync();
      setLoading(false);
    }
    bootstrap();
  }, []);

  if (loading) {
    return null;
  }

  return <Redirect href="/home" />;
}
