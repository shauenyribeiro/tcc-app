import { FlatList, ListRenderItemInfo, View, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";

import { Text } from "../Text";
import { formatByteSize } from "../../utils/formatByteSize";

export type Document = DocumentPicker.DocumentPickerAsset;

type DocumentInfoProps = {
  name: string;
  size?: number;
};

function DocumentInfo({ name, size }: DocumentInfoProps) {
  return (
    <View style={styles.documentInfoContainer}>
      <Text weight="bold" style={styles.documentName}>
        {name}
      </Text>
      <Text weight="regular" style={styles.documentSize}>
        {formatByteSize(size)}
      </Text>
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

type Props = {
  documents: Document[];
};

export function DocumentsList({ documents }: Props) {
  const renderItem = (item: ListRenderItemInfo<Document>) => {
    return <DocumentInfo {...item.item} />;
  };

  return (
    <FlatList
      data={documents}
      renderItem={renderItem}
      style={styles.list}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
  },
  documentInfoContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
  },
  documentName: {
    color: "#8191e4",
    maxWidth: "80%",
  },
  documentSize: {
    color: "#949494",
  },
  separator: {
    height: 16,
  },
});
