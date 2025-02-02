import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { GiphyData } from "../models/Giphy";
import { fetchTrendingGifs, searchGifs } from "../api/api";

interface ItemListProps {
  onPress: (item: GiphyData) => void;
  searchText: string;
}

const ItemList = ({ onPress, searchText }: ItemListProps) => {
  const [gifs, setGifs] = React.useState<GiphyData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [pageNo, setPageNo] = React.useState<number>(0);
  const [error, setError] = React.useState(false);
  const [reachedLastPage, setReachedLastPage] = React.useState(false);

  React.useEffect(() => {
    fetchData(0);
  }, [searchText]);

  const fetchData = async (_pageNo: number) => {
    // let's avoid api hammering
    if (loading) return;
    setLoading(true);
    setPageNo(_pageNo);
    let response;

    try {
      // call search api if q is at least 3 chars, else load trending gifs
      // inital call will have blank query so falls into loading trending gifs
      if (searchText && searchText.length >= 3) {
        response = await searchGifs(_pageNo, searchText);
      } else {
        response = await fetchTrendingGifs(_pageNo);
      }

      const data: GiphyData[] = response.data;

      // resets gif list on refresh or initial call
      if (_pageNo == 0) {
        setGifs(data);
      } else {
        setGifs((currentGifs) => [...currentGifs, ...data]);
      }

      setError(false);
      // set reached the max count to stop loading more gifs
      setReachedLastPage(response.pagination.total_count === gifs?.length);
    } catch (e) {
      // could have better error handling
      setError(true);
      setGifs([]);
    }

    setLoading(false);
  };

  const loadMoreGifs = async () => {
    if (!reachedLastPage) {
      await fetchData(pageNo + 1);
    }
  };

  const onRefresh = async () => {
    // reset paginatoin on refresh
    setRefreshing(true);
    await fetchData(0);
    setRefreshing(false);
  };

  const renderItem = ({ item, index }: { item: GiphyData; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => onPress(item)}
        style={styles.item}
        accessibilityLabel={"Click to navigate feedback screen"}
        accessible={true}
      >
        <Image
          source={{ uri: item.images.downsized.url }}
          style={styles.image}
          accessible={true}
          accessibilityLabel={`gif image with title ${item.title}`}
        />
        <Text
          numberOfLines={3}
          style={styles.title}
          accessibilityLabel={`gif title ${item.title}`}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const emptyComponentText = error
    ? "Oops! something went wrong!"
    : loading
    ? "Loading..."
    : "Data not found";

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={gifs}
      keyExtractor={(item, index) => `${index}-${item.id}`}
      renderItem={renderItem}
      onEndReached={loadMoreGifs}
      onEndReachedThreshold={0.1}
      ListEmptyComponent={
        <Text
          style={styles.emptyContainer}
          accessibilityLabel={emptyComponentText}
        >
          {emptyComponentText}
        </Text>
      }
      ListFooterComponent={
        loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            accessibilityLabel={"Loading more gif files"}
          />
        ) : null
      }
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          accessibilityLabel={"refreshing gif list"}
        />
      }
    />
  );
};

export default ItemList;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 6,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingTop: 2,
    flexShrink: 1,
  },
  emptyContainer: {
    textAlign: "center",
    padding: 10,
    color: "#666",
  },
});
