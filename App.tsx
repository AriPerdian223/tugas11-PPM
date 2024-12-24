import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Animated, {
  Easing,
  withRepeat,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const App = () => {
  // Shared value untuk animasi translateX kedua kotak
  const translateX1 = useSharedValue(0); // Untuk kotak pertama
  const translateX2 = useSharedValue(0); // Untuk kotak kedua

  // State untuk kontrol animasi kedua kotak saat tombol ditekan
  const [isBox2Visible, setIsBox2Visible] = useState(false);

  // Animasi untuk kotak pertama (bergerak secara terus-menerus)
  translateX1.value = withRepeat(
    withTiming(300, {duration: 1000, easing: Easing.linear}),
    -1,
    true,
  );

  // Animasi untuk kotak pertama
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX1.value}],
    };
  });

  // Fungsi untuk menangani aksi tombol
  const handlePress = () => {
    setIsBox2Visible(true); // Menampilkan kotak kedua

    // Menghasilkan posisi acak untuk kotak kedua
    const randomPosition = Math.random() * 300; // Acak antara 0 dan 300

    // Animasi kotak kedua bergerak ke posisi baru secara acak
    translateX2.value = withTiming(randomPosition, {
      duration: 1000,
      easing: Easing.linear,
    });
  };

  // Animasi untuk kotak kedua saat tombol ditekan
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX2.value}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Moving Box Animation</Text>

      {/* Kotak pertama yang bergerak secara otomatis */}
      <Animated.View style={[styles.box, animatedStyle1]} />

      {/* Tombol untuk menggerakkan kotak kedua */}
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Move Box 2</Text>
      </TouchableOpacity>

      {/* Kotak kedua yang bergerak saat tombol ditekan */}
      {isBox2Visible && <Animated.View style={[styles.box, animatedStyle2]} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'tomato',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
