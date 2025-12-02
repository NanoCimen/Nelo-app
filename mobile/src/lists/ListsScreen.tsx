import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../shared/constants/colors';
import { Restaurant } from '../shared/types';
import { getUserLists } from '../shared/services/mockData';

export default function ListsScreen() {
  const [activeList, setActiveList] = useState<'WANT' | 'VISITED'>('WANT');
  const [data, setData] = useState<{ want: Restaurant[]; visited: Restaurant[] } | null>(null);

  useEffect(() => {
    getUserLists().then(setData);
  }, []);

  const currentList = activeList === 'WANT' ? data?.want : data?.visited;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mis Lugares</Text>

        {/* Segment Control */}
        <View style={styles.segmentContainer}>
          <View style={styles.segmentBackground} />
          <TouchableOpacity
            onPress={() => setActiveList('WANT')}
            style={[styles.segmentButton, styles.segmentButtonLeft]}>
            <Text
              style={[
                styles.segmentText,
                activeList === 'WANT' && styles.segmentTextActive,
              ]}>
              Quiero Ir ({data?.want.length || 0})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveList('VISITED')}
            style={[styles.segmentButton, styles.segmentButtonRight]}>
            <Text
              style={[
                styles.segmentText,
                activeList === 'VISITED' && styles.segmentTextActive,
              ]}>
              Visitados ({data?.visited.length || 0})
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.segmentSlider,
              activeList === 'WANT' ? styles.segmentSliderLeft : styles.segmentSliderRight,
            ]}
          />
        </View>

        <View style={styles.mapButtonContainer}>
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map-outline" size={14} color={Colors.nelo.orange} />
            <Text style={styles.mapButtonText}>Ver Mapa</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {currentList?.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantCard}>
              <Image
                source={{
                  uri: `https://source.unsplash.com/random/200x200?restaurant,${restaurant.category}`,
                }}
                style={styles.restaurantImage}
              />
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantMeta}>
                  {restaurant.zone} • {restaurant.category}
                </Text>
                <View style={styles.ratingContainer}>
                  <Text style={styles.ratingText}>★ 4.6</Text>
                </View>
              </View>
              <View style={styles.restaurantActions}>
                <View style={styles.visitedBadge}>
                  <Text style={styles.visitedBadgeText}>Visitado</Text>
                </View>
                <TouchableOpacity style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={12} color={Colors.nelo.orange} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nelo.bg,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.nelo.black,
    marginBottom: 24,
  },
  segmentContainer: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    padding: 4,
    flexDirection: 'row',
    marginBottom: 24,
    height: 50,
    position: 'relative',
  },
  segmentBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  segmentButtonLeft: {
    marginRight: 2,
  },
  segmentButtonRight: {
    marginLeft: 2,
  },
  segmentText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.nelo.subtle,
  },
  segmentTextActive: {
    color: Colors.white,
  },
  segmentSlider: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    borderRadius: 20,
    backgroundColor: Colors.nelo.orange,
    width: '48%',
    zIndex: 1,
  },
  segmentSliderLeft: {
    left: 4,
  },
  segmentSliderRight: {
    right: 4,
  },
  mapButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  mapButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.nelo.orange,
  },
  listContainer: {
    flex: 1,
  },
  restaurantCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    gap: 12,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: Colors.gray[100],
  },
  restaurantInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.nelo.black,
    lineHeight: 22,
  },
  restaurantMeta: {
    fontSize: 12,
    color: Colors.nelo.subtle,
    fontWeight: '500',
    marginTop: 4,
  },
  ratingContainer: {
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.nelo.orange,
  },
  restaurantActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  visitedBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  visitedBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
  deleteButton: {
    width: 28,
    height: 28,
    backgroundColor: '#FEE2E2',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

