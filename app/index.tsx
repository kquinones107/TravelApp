import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ImageBackground 
} from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);

  const onboardingData = [  
    {
      image: require('../assets/images/balloons.png'),
      title: 'Explore Beyond: Your Gateway to Adventure',
      subtitle: 'Unveil the world\'s wonders with our travel app, designed for the modern-day explorer.',
      buttonLabel: 'Continue',
    },
    {
      image: require('../assets/images/ocean.png'),
      title: 'Wanderlust Awaits: Embark on a Journey',
      subtitle:
        'Discover, plan, and set off on an unforgettable journey using our travel app.',
      buttonLabel: 'Continue',
    },
    {
      image: require('../assets/images/ocean.png'),
      title: 'Unveil Your Next Destination: Start Exploring!',
      subtitle:
        'Unleash your wanderlust and dive into a world of travel possibilities with our app.',
      buttonLabel: 'Get Started',
    },
  ];

  const handleIndicatorPress = (index: number) => {
    setCurrentIndex(index);
  };

  // Manejador para cambiar a la siguiente pantalla
  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push('/signin'); // Navega a la siguiente pantalla después del último slide
    }
  };

  const { image, title, subtitle, buttonLabel } = onboardingData[currentIndex];

  return (
    <ImageBackground  source={image} style={styles.background} resizeMode="cover">
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        {/* Indicadores */}
        <View style={styles.indicatorContainer}>
          {onboardingData.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleIndicatorPress(index)}
              style={[
                styles.indicator,
                currentIndex === index && styles.activeIndicator,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
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
    fontSize: 16,
    fontWeight: 'bold' 
  },
  indicatorContainer: { 
    flexDirection: 'row', 
    marginBottom: 20 
  },
  indicator: { 
    width: 20, 
    height: 10, 
    borderRadius: 5, 
    backgroundColor: '#ccc', 
    marginHorizontal: 5 
  },
  activeIndicator: { 
    backgroundColor: '#4CAF50', 
    width: 50,
    height: 10,

  },
});
