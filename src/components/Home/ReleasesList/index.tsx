import { useCallback, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useRealm } from "@realm/react";
import Realm, { flags } from "realm";

import { Release } from "../../../models/Release";

import { DeleteModal } from "./DeleteModal";
import { Header } from "./Header";
import { EmptyState } from "./EmptyState";
import { ItemInfo } from "./ItemInfo";
import { EditModal, type EditableData } from "./EditModal";

type ReleaseListProps = {
  data: Realm.Results<Release & Realm.Object>;
};

type ModalVariants = "delete" | "edit";

type ModalOptions = { visible: boolean; item: Release & Realm.Object };

export function ReleasesList({ data }: ReleaseListProps) {
  const [deleteOptions, setDeleteOptions] = useState<ModalOptions>({
    visible: false,
    item: null,
  });
  const [editOptions, setEditOptions] = useState<ModalOptions>({
    visible: false,
    item: null,
  });
  const realm = useRealm();

  const onRequestCloseModal = useCallback((modal: ModalVariants) => {
    if (modal === "delete") {
      return () => setDeleteOptions({ visible: false, item: null });
    } else {
      return () => setEditOptions({ visible: false, item: null });
    }
  }, []);

  const onPressActionButton = useCallback((action: ModalVariants) => {
    if (action === "delete") {
      return (item: Release & Realm.Object) =>
        setDeleteOptions({ visible: true, item: item });
    } else {
      return (item: Release & Realm.Object) =>
        setEditOptions({ visible: true, item: item });
    }
  }, []);

  const onConfirmDelete = useCallback(
    (item: Release & Realm.Object) => {
      realm.write(() => {
        realm.delete(item);
      });
      setDeleteOptions({ visible: false, item: null });
    },
    [realm]
  );

  const onConfirmEdit = useCallback(
    (item: Release & Realm.Object, newData: EditableData) => {
      realm.write(() => {
        item.name = newData.name;
        item.value = newData.value;
        item.date = newData.date;
      });
      setEditOptions({ visible: false, item: null });
    },
    []
  );

  if (!data.length) {
    return <EmptyState />;
  }
  return (
    <>
      <DeleteModal
        release={deleteOptions.item}
        visible={deleteOptions.visible}
        onRequestClose={onRequestCloseModal("delete")}
        onConfirm={onConfirmDelete}
      />
      <EditModal
        release={editOptions.item}
        visible={editOptions.visible}
        onRequestClose={onRequestCloseModal("edit")}
        onConfirm={onConfirmEdit}
      />
      <FlatList
        data={data}
        renderItem={(item) => (
          <ItemInfo
            onPressDelete={onPressActionButton("delete")}
            onPressEdit={onPressActionButton("edit")}
            item={item.item}
          />
        )}
        keyExtractor={(item) => item._id.toString()}
        ItemSeparatorComponent={Separator}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
      />
    </>
  );
}

function Separator() {
  return <View style={styles.separator}></View>;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 16,
  },
});
