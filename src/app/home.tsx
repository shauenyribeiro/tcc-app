import { StyleSheet, View, StatusBar } from "react-native";
import { useQuery } from "@realm/react";

import { NavButton } from "../components/NavButton";
import { ReleasesList } from "../components/Home/ReleasesList";
import { Header } from "../components/Home/Header";

import { Release } from "../models/Release";
import { useEffect, useState } from "react";

export default function App() {
  const releases = useQuery(Release, (collection) => collection.sorted("date"));
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const newBalance = releases.reduce((acc, curr) => acc + curr.value, 0);
    setBalance(newBalance);
  }, [releases]);

  return (
    <View style={styles.container}>
      <Header value={balance} />
      <View style={styles.financesContainer}>
        <ReleasesList data={releases} />
        <View style={styles.navContainer}>
          <NavButton href="/new" text="Novo lançamento" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8191E4",
    paddingTop: StatusBar.currentHeight,
  },
  financesContainer: {
    height: "65%",
    width: "100%",
    marginTop: "auto",
    paddingTop: 16,
    paddingBottom: 64,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navContainer: {
    paddingTop: 8,
  },
});
