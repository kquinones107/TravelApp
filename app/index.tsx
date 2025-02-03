import { useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <ImageBackground
    source={require('../assets/images/balloons.png')} 
    style={styles.background}
    resizeMode="cover"
    >
      <View style={styles.contentContainer}>
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Posiciona el contenido al final del fondo
    alignItems: 'center',
    paddingBottom: 60, // Ajusta la distancia del contenido al borde inferior
    paddingHorizontal: 20,
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
    paddingHorizontal: 80,
    borderRadius: 22 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 
    
  },
});
