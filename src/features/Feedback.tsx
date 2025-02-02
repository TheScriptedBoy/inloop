import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Rating } from "react-native-ratings";
import Header from "../components/Header";
import { GiphyData } from "../models/Giphy";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FeedbackProps {
  route: { params: GiphyData };
  navigation: {
    goBack: () => void;
  };
}

const Feedback: React.FC<FeedbackProps> = ({ route, navigation }) => {
  const { params } = route;
  const data: GiphyData = params;
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    // laoding and setting prev feedback
    const loadFeedback = async () => {
      const savedFeedback = await AsyncStorage.getItem(`feedback-${data.id}`);
      if (savedFeedback) {
        const { comment, rating } = JSON.parse(savedFeedback);
        setComment(comment);
        setRating(rating);
      }
    };
    loadFeedback();
  }, [data.id]);

  const submitFeedback = async () => {
    // rating validation and storing feedback locally
    if (rating === 0) {
      Alert.alert("Validation Error", "Please provide a star rating.");
      return;
    }

    const feedback = { comment, rating };
    await AsyncStorage.setItem(`feedback-${data.id}`, JSON.stringify(feedback));
    Alert.alert("Success", "Feedback saved successfully.");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onBackButtonPress={navigation.goBack} />
      <Image
        source={{ uri: data.images.original.url }}
        resizeMode={"center"}
        style={styles.image}
      />
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.formContainer}>
        <Text style={styles.feedbackTitle}>You Feedback</Text>
        <Rating
          ratingCount={5}
          startingValue={rating}
          onFinishRating={setRating}
          ratingBackgroundColor={"red"}
          style={styles.rating}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={10}
          placeholder="Leave a comment"
          value={comment}
          onChangeText={setComment}
        />
        <Button
          title="Submit Feedback"
          onPress={submitFeedback}
          accessibilityLabel="Submit Feedback"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#F5F5F5",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    height: 150,
    textAlignVertical: "top",
  },
  formContainer: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackTitle: { textAlign: "center" },
  rating: {
    paddingVertical: 30,
  },
});

export default Feedback;
