import { FlatList, StyleSheet, View } from "react-native";
import Realm from "realm";

import { Release } from "../../../models/Release";

import { Header } from "./Header";
import { EmptyState } from "./EmptyState";
import { ItemInfo } from "./ItemInfo";

function Separator() {
  return <View style={styles.separator}></View>;
}

type ReleaseListProps = {
  data: Realm.Results<Release & Realm.Object>;
};

export function ReleasesList({ data }: ReleaseListProps) {
  if (!data.length) {
    return <EmptyState />;
  }
  return (
    <FlatList
      data={data}
      renderItem={(item) => <ItemInfo item={item.item} />}
      keyExtractor={(item) => item._id.toString()}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={Header}
      stickyHeaderIndices={[0]}
    />
  );
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 16,
  },
});
