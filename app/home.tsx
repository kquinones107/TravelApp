import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState(['All', 'Beach', 'Mountain', 'Snow']);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const destinations = [
    { id: '1', name: 'British Virgin Islands', price: '$19', category: 'Beach' },
    { id: '2', name: 'Glacier National Park', price: '$25', category: 'Mountain' },
  ];

  const filteredDestinations = destinations.filter((item) =>
    selectedFilter === 'All' ? true : item.category === selectedFilter
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
      <FlatList
        data={filters}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedFilter(item)}
            style={[
              styles.filterButton,
              selectedFilter === item && styles.activeFilter,
            ]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.name}</Text>
            <Text>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  searchInput: { borderBottomWidth: 1, marginBottom: 15, fontSize: 16 },
  filterButton: { marginHorizontal: 5, padding: 10, borderRadius: 10, backgroundColor: '#f0f0f0' },
  activeFilter: { backgroundColor: '#4CAF50', color: '#fff' },
  card: { padding: 15, borderRadius: 10, marginVertical: 5, backgroundColor: '#f9f9f9' },
});
