import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/balloons.png')} style={styles.image} />
      <Text style={styles.title}>Explore Beyond: Your Gateway to Adventure</Text>
      <Text style={styles.subtitle}>
        Unveil the world's wonders with our travel app, designed for the modern-day explorer.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/signin')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20 
  },
  image: { 
    width: 100, 
    height: 200, 
    marginBottom: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    textAlign: 'center', 
    color: '#777', 
    marginBottom: 30 },
  button: { 
    backgroundColor: '#4CAF50', 
    padding: 15, 
    borderRadius: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 },
});
