import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('Destinations');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const filters = ['All', 'Beach', 'Mountain', 'Snow'];
  const categories = [ 'Destinations', 'Accommodations', 'Hotels' ];
  const destinations = [
    {
      id: '1',
      name: 'British Virgin Islands',
      price: '$19',
      location: 'North America',
      rating: 4.5,
      reviews: 104,
      image: [require('../assets/images/British_Virgin.png')], // Reemplaza con imágenes reales
    },
    {
      id: '2',
      name: 'Glacier National Park',
      price: '$25',
      location: 'Thailand',
      rating: 4.2,
      reviews: 89,
      image: [require('../assets/images/Glacier.png')],
    },
  ];

  const accommodations = [
    {
      id: '1',
      name: 'Sky Villa',
      price: '$120',
      location: 'San Diego, California',
      type: 'Villa',
      rating: 4.9,
      reviews: 104,
      image: [require('../assets/images/Sky_villa.png')],
    },
    {
      id: '2',
      name: 'Ocean View Apartment',
      price: '$90',
      location: 'Miami, Florida',
      type: 'Villa',
      rating: 4.7,
      reviews: 80,
      image: [require('../assets/images/Bedugul_villa.png')],
    },
  ];

  const hotels = [
    {
      id: '1',
      name: 'Ubud Hotel',
      price: '$249',
      oldPrice: '$299',
      location: 'Bali, Indonesia',
      rating: 4.9,
      reviews: 104,
      image: [require('../assets/images/Ubud.png')],
    },
    {
      id: '2',
      name: 'Pura Ulun Danu',
      price: '$130',
      oldPrice: '$170',
      location: 'Bali, Indonesia',
      rating: 4.9,
      reviews: 104,
      image: [require('../assets/images/Pura_Ulun.png')],
    },
    {
    id: '3',
      name: 'Bangkok Hotel',
      price: '$240',
      oldPrice: '$250',
      location: 'Bangkok',
      rating: 4.9,
      reviews: 104,
      image: [require('../assets/images/Bangkok.png')],
    },
  ];

  // Filtra la lista activa según la categoría seleccionada
  const getFilteredItems = () => {
    if (selectedCategory === 'Destinations') return destinations;
    if (selectedCategory === 'Accommodations') return accommodations;
    if (selectedCategory === 'Hotels') return hotels;
    return [];
  };

  const filteredItems = getFilteredItems();

  // Función para filtrar elementos por búsqueda y categoría
  const filterItems = (items: 
    { 
      id: string; 
      name: string; 
      location: string; 
      image: any[]; 
      price: string; 
      oldPrice?: string; 
      rating: number; 
      reviews: number; 
      type?: string 
    }[]) => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        selectedFilter === 'All' || (item.type || '').toLowerCase() === selectedFilter.toLowerCase();
      return matchesSearch && matchesFilter;
    });
  };

  const filteredDestinations = filterItems(destinations);
  const filteredAccommodations = filterItems(accommodations);
  const filteredHotels = filterItems(hotels);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
      {/* Cabecera */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.userOval}>
            <Text style={styles.userName}>Hi, Alexander</Text>
          </View>
          <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerMessage}>
          Let’s make <Text style={styles.highlightedText}>your dream</Text>{' '}
          holiday come true
        </Text>
      </View>

      {/* Barra de Búsqueda */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <FontAwesome name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={setSearch}
          />
          {/* Botón de Filtro */}
         <TouchableOpacity style={styles.filterButtonSearch}
          onPress={() => setFilterModalVisible(true)}
         >
          <Ionicons name="options-outline" size={26} color="gray" />
         </TouchableOpacity>
        </View>
        <View>

          {/* Modal de Categorías */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFilterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      selectedCategory === item && styles.filterOptionActive,
                    ]}
                    onPress={() => {
                      setSelectedCategory(item);
                      setFilterModalVisible(false); // Cierra el modal al seleccionar
                    }}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        selectedCategory === item && styles.filterOptionTextActive,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setFilterModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Go</Text>
        </TouchableOpacity>
        </View>
      </View>

      
      {/* Filtros */}

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Popular Today <Text style={styles.fireIcon}>🔥</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersList}>
      <FlatList
        horizontal
        data={filters}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedFilter === item && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(item)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedFilter === item && styles.filterButtonTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
        style={styles.filtersList}
      />
      </View>

      {/* Destinos */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageContainer}>
            <Image source={item.image[0]} style={styles.cardImage} />
            <TouchableOpacity style={styles.favoriteButton}>
              <FontAwesome name="heart-o" size={20} color="#4CAF50" />
            </TouchableOpacity>
            </View>

            
              <Text style={styles.cardSubtitle}>{item.location}</Text>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <View style={styles.cardDetails}>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.cardRating}>
                  {item.rating} ⭐ ({item.reviews})
                </Text>
              </View>
            </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    
      {/* Título de Nearby Accommodation */}
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Nearby Accommodation</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Nearby Accommodation */}
      <FlatList
        data={filteredAccommodations}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.accommodationContainer}>
            <Image source={item.image[0]} style={styles.imageAccommodation} />

            <View style={styles.cardAccommodation}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>{item.type}</Text>
            </View>

            
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSubtitle}>{item.location}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.cardPrice}>{item.price}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {item.rating} ({item.reviews})
                </Text>
              </View>
            </View>
          </View>
          </View>
        )}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.title} >End of Year Discount </Text>
      </View>

      <Image source={require('../assets/images/image_1.png')} style={styles.imageYear} />

      <View style={styles.sectionHeader}>
        <Text style={styles.title}>Top Hotels</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Lista Vertical de Hoteles */}
      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardHotel}>
            {/* Imagen */}
            <Image source={item.image[0]} style={styles.imageAccommodation} />

            {/* Información */}
            <View style={styles.infoContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>{item.location}</Text>
              <View style={styles.infoRow}>
                <Text style={styles.cardPrice}>{item.price}</Text>
                <Text style={styles.oldPrice}>{item.oldPrice}</Text>

                <View style={styles.ratingContainerHotel}>
                <FontAwesome name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {item.rating} ({item.reviews})
                </Text>
              </View>
              </View>
              
            </View>
          </View>
        )}
      />

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  oldPrice: {
    fontSize: 14,
    color: 'red',
    textDecorationLine: 'line-through',
    marginRight: 60,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  ratingContainerHotel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingBottom: 140,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerSubtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -80,
    marginHorizontal: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 22,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginLeft: 10,
    borderRadius: 30,
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  filtersList: {
    marginVertical: 20,
    paddingHorizontal: 10,
    marginTop: -15,
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 25,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#555',
  },
  filterButtonActive: {
    backgroundColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#555',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  card: {  
    marginLeft: 30,
    marginRight: 15,
    width: 250,

  },
  cardImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 15,

  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardPrice: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  cardRating: {
    fontSize: 14,
    color: '#777',
  },
  userOval: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    borderColor: '#4CAF44',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  notificationIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: -10, // Reduce la separación entre el óvalo y el ícono
    borderRadius: 20,
    marginRight: 10,
  },
  headerMessage: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 30,
    marginTop: 30,
  },
  highlightedText: {
    color: '#dfffc0',
  },
    filterOption: {
      padding: 10,
      borderRadius: 20,
      marginVertical: 5,
      marginHorizontal: 10,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    filterOptionActive: {
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    filterOptionText: {
      fontSize: 16,
      color: '#555',
    },
    filterOptionTextActive: {
      color: '#fff',
    },
    filterButtonSearch: {
        backgroundColor: '#fff',
        paddingHorizontal: 0,
        paddingVertical: 5,
        marginLeft: 10,
        borderRadius: 30,
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      marginTop: 40,
      marginLeft: 30,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },  
    fireIcon: {
      fontSize: 20,
    },
    seeAll: {
      color: '#4CAF50',
      fontSize: 16,
      marginRight: 20,

    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      padding: 8,
      borderRadius: 20,
      elevation: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 15,
  },
  accommodationContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    width: 320,
    elevation: 3, // Sombra para resaltar las tarjetas
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 5,
  },
  typeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#555',
  },
  imageAccommodation: {
    width: 130,
    height: 130,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRadius: 15,
  },
  cardAccommodation: {
    padding: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  imageYear: {
    width: 310,
    height: 152,
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 30,
    marginLeft: 40,
    marginRight: 30,
  },
  cardHotel: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
