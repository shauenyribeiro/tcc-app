import { FlatList, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import Realm from "realm";

import { Text } from "../Text";

import { Release } from "../../models/Release";

type ReleaseInfoProps = {
  item: Release & Realm.Object;
};

function EmptyState() {
  return (
    <View style={styles.emptyState}>
      <Text weight="regular" style={styles.emptyStateText}>
        Você não possui nenhum lançamento!
      </Text>
      <Text weight="regular" style={styles.emptyStateText}>
        Que tal fazer um agora?
      </Text>
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text weight="black" style={styles.headerName}>
        Titulo
      </Text>
      <Text weight="black" style={styles.headerValue}>
        Valor
      </Text>
      <Text weight="black" style={styles.headerDate}>
        Data
      </Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator}></View>;
}

function ItemInfo({ item }: ReleaseInfoProps) {
  const containerStyles: ViewStyle[] = [styles.itemContainer];
  const valueStyles: TextStyle[] = [styles.value];

  if (item.value < 0) {
    containerStyles.push(styles.negativeValueContainer);
    valueStyles.push(styles.negativeValue);
  }

  const formattedValue = new Intl.NumberFormat("default", {
    style: "currency",
    currency: "BRL",
  }).format(item.value);

  return (
    <View style={containerStyles}>
      <Text
        weight="regular"
        style={styles.name}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {item.name}
      </Text>
      <Text
        weight="regular"
        style={valueStyles}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {formattedValue}
      </Text>
      <Text weight="regular" style={styles.date}>
        {item.date}
      </Text>
    </View>
  );
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
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f2f4fb",
    borderColor: "#51f676",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
  },
  value: {
    color: "#51f676",
    width: "33%",
    marginRight: 4,
    textAlign: "center",
  },
  negativeValue: {
    color: "#ff1a1a",
  },
  negativeValueContainer: {
    borderColor: "#ff1a1a",
  },
  name: {
    width: "40%",
    marginRight: 4,
    color: "#636363",
  },
  date: {
    marginLeft: "auto",
    color: "#636363",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  headerName: {
    width: "40%",
    marginRight: 4,
    color: "#808080",
  },
  headerValue: {
    width: "30%",
    marginRight: 4,
    textAlign: "center",
    color: "#808080",
  },
  headerDate: {
    marginLeft: "auto",
    marginRight: "auto",
    color: "#808080",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    color: "#636363",
  },
  separator: {
    width: "100%",
    height: 16,
  },
});
