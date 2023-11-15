import { Pressable, StyleSheet, View } from "react-native";
import { useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

import { Release } from "../../../models/Release";

import { Text } from "../../Text";

type ReleaseInfoProps = {
  item: Release & Realm.Object;
  onPressDelete: (item: Release & Realm.Object) => void;
  onPressEdit: (item: Release & Realm.Object) => void;
};

export function ItemInfo({
  item,
  onPressDelete,
  onPressEdit,
}: ReleaseInfoProps) {
  const [open, setOpen] = useState(false);

  const isExpense = item.value < 0;

  const formattedValue = new Intl.NumberFormat("default", {
    style: "currency",
    currency: "BRL",
  }).format(item.value);

  return (
    <Pressable onPress={() => setOpen((curr) => !curr)}>
      <View
        style={[
          styles.itemContainer,
          isExpense && styles.negativeValueContainer,
          !open && styles.closedContainer,
        ]}
      >
        <View style={styles.row}>
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
            style={[styles.value, isExpense && styles.negativeValue]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {formattedValue}
          </Text>
          <Text weight="regular" style={styles.date}>
            {item.date}
          </Text>
        </View>
        {open && (
          <View style={[styles.row, styles.actionsContainer]}>
            <Pressable
              style={[styles.deleteAction, styles.action]}
              onPress={() => onPressDelete(item)}
            >
              <FontAwesome5 name="trash-alt" size={20} color="#636363" />
            </Pressable>
            <Pressable
              style={[styles.editAction, styles.action]}
              onPress={() => onPressEdit(item)}
            >
              <FontAwesome5 name="pen" size={20} color="#636363" />
            </Pressable>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  closedContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    width: "100%",
    paddingTop: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f2f4fb",
    borderColor: "#2de054",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0.1,
    borderRightWidth: 0.1,
  },
  actionsContainer: {
    borderTopColor: "#cdcdcd",
    borderTopWidth: 0.8,
    marginTop: 16,
  },
  action: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    flex: 1,
  },
  deleteAction: {
    borderRightWidth: 0.5,
    borderRightColor: "#cdcdcd",
  },
  editAction: {
    borderLeftWidth: 0.5,
    borderLeftColor: "#cdcdcd",
  },
  value: {
    color: "#2de054",
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
});
