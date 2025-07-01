import Gemini from "gemini-ai";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-native-markdown-display";
import { ChevronDown, Fish, Send, User } from "lucide-react-native";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { IMessage } from "@/types/message";

const gemini = new Gemini(process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY!);

export default function CoachScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  async function handleSubmit() {
    if (message) {
      const userMessage = {
        text: message,
        isUser: true,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setMessage("");
      setIsLoading(true);

      const response = await gemini.ask(message);

      const geminiMessage = {
        text: response,
        isUser: false,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, geminiMessage]);

      setIsLoading(false);
    }
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isAtBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - 50;
    setShowScrollToBottom(!isAtBottom);
  }

  function scrollToBottom() {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }

  useEffect(() => {
    setMessages([
      {
        text: "👋 Hey there! I'm Fish Coach. Here to provide expert advice on fishing techniques and fish behavior to help you improve your angling skills. 🎣",
        isUser: false,
        createdAt: new Date(),
      },
      {
        text: "Ask me anything about fishing, and I'll do my best to help!",
        isUser: false,
        createdAt: new Date(),
      },
    ]);

    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.8,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.3,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [isLoading, pulseAnim]);

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{ backgroundColor: Colors.dark.background, flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingVertical: 14,
          flexGrow: 1,
          justifyContent: "flex-end",
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onContentSizeChange={() => {
          if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
          }
        }}
      >
        <View>
          {messages.map((message, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                gap: 6,
                alignItems: "flex-end",
                justifyContent: message.isUser ? "flex-end" : "flex-start",
                marginBottom:
                  index < messages.length - 1 &&
                  messages[index + 1].isUser !== message.isUser
                    ? 16
                    : 6,
              }}
            >
              {!message.isUser &&
                (index === messages.length - 1 ||
                  messages[index + 1].isUser !== message.isUser) && (
                  <View style={styles.messageIconContainer}>
                    <Fish size={24} color={Colors.dark.text} />
                  </View>
                )}
              {!message.isUser &&
                !(
                  index === messages.length - 1 ||
                  messages[index + 1].isUser !== message.isUser
                ) && <View style={{ width: 36 }} />}
              <View style={styles.messageBubble}>
                {message.isUser ? (
                  <Text style={styles.userMessage}>{message.text}</Text>
                ) : (
                  <Markdown
                    style={{
                      body: styles.geminiMessage,
                    }}
                  >
                    {message.text}
                  </Markdown>
                )}
              </View>
              {message.isUser &&
                (index === messages.length - 1 ||
                  messages[index + 1].isUser !== message.isUser) && (
                  <View style={styles.messageIconContainer}>
                    <User size={24} color={Colors.dark.text} />
                  </View>
                )}
              {message.isUser &&
                !(
                  index === messages.length - 1 ||
                  messages[index + 1].isUser !== message.isUser
                ) && <View style={{ width: 36 }} />}
            </View>
          ))}
          {isLoading && (
            <View
              style={{
                flexDirection: "row",
                gap: 6,
                marginTop: 16,
                alignItems: "flex-end",
                justifyContent: "flex-start",
              }}
            >
              <View style={styles.messageIconContainer}>
                <Fish size={24} color={Colors.dark.text} />
              </View>
              <View
                style={{
                  backgroundColor: Colors.dark.card,
                  borderRadius: 16,
                  flexShrink: 1,
                  width: "79%",
                  padding: 14,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Animated.View
                    style={[
                      {
                        width: 12,
                        height: 12,
                        backgroundColor: Colors.dark.cardForeground,
                        borderRadius: 6,
                      },
                      { opacity: pulseAnim },
                    ]}
                  />
                  <Animated.View
                    style={[
                      {
                        width: 8,
                        height: 8,
                        backgroundColor: Colors.dark.cardForeground,
                        borderRadius: 4,
                      },
                      { opacity: pulseAnim },
                    ]}
                  />
                  <Animated.View
                    style={[
                      {
                        width: 10,
                        height: 10,
                        backgroundColor: Colors.dark.cardForeground,
                        borderRadius: 5,
                      },
                      { opacity: pulseAnim },
                    ]}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      {showScrollToBottom && (
        <Pressable onPress={scrollToBottom} style={styles.scrollToBottomButton}>
          <ChevronDown size={24} color={Colors.dark.tint} />
        </Pressable>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputTextField}
          value={message}
          onChangeText={setMessage}
          placeholder="Ask the coach..."
          placeholderTextColor={Colors.dark.cardForeground}
          multiline
          numberOfLines={4}
          maxLength={1000}
        />
        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.sendButtonContainer,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          disabled={!message || isLoading}
        >
          <Send color={Colors.dark.text} />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  messageBubble: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    flexShrink: 1,
    width: "79%",
  },
  userMessage: { color: Colors.dark.text, padding: 14 },
  geminiMessage: {
    color: Colors.dark.text,
    paddingHorizontal: 14,
    paddingVertical: 0,
  },
  messageIconContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 9999,
    padding: 6,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    borderWidth: 1,
    borderTopColor: Colors.dark.card,
    backgroundColor: Colors.dark.background,
  },
  inputTextField: {
    flex: 1,
    borderRadius: 9999,
    padding: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.dark.card,
    color: Colors.dark.text,
    marginRight: 10,
    paddingHorizontal: 18,
    fontSize: 16,
    maxHeight: 120,
    minHeight: 58,
  },
  sendButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
    borderRadius: 9999,
    backgroundColor: Colors.dark.button,
    height: 58,
  },
  scrollToBottomButton: {
    position: "absolute",
    bottom: 90,
    right: "45%",
    left: "45%",
    backgroundColor: Colors.dark.text,
    borderRadius: 25,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
