import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
  Switch,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../shared/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// System font (SF Pro on iOS)
const SYSTEM_FONT = 'System';

type CategoryType = 'Restaurantes' | 'Bares' | 'Reposterías' | 'Cafés' | 'Helados y Postres';
type TabType = 'VISITED' | 'WANT' | 'AMIGOS' | 'LISTAS';

const CATEGORIES: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'Restaurantes', label: 'Restaurantes', icon: 'restaurant-outline' },
  { id: 'Bares', label: 'Bares', icon: 'wine-outline' },
  { id: 'Reposterías', label: 'Reposterías', icon: 'cafe-outline' },
  { id: 'Cafés', label: 'Cafés', icon: 'cafe-outline' },
  { id: 'Helados y Postres', label: 'Helados y Postres', icon: 'ice-cream-outline' },
];

// Filter options
const CITIES = [
  { id: 'santo_domingo', label: 'Santo Domingo', available: true },
  { id: 'santiago', label: 'Santiago', available: false, comingSoon: true },
];

const SCORE_OPTIONS = [
  { id: '9.0', label: '9.0 o más' },
  { id: '8.0', label: '8.0 o más' },
  { id: '7.0', label: '7.0 o más' },
  { id: '6.0', label: '6.0 o más' },
];

const PRICE_OPTIONS = [
  { id: 'under_500', label: 'Menos de RD$500 p/p' },
  { id: '500_1000', label: 'RD$500 - RD$1,000 p/p' },
  { id: '1000_2000', label: 'RD$1,000 - RD$2,000 p/p' },
  { id: '2000_3000', label: 'RD$2,000 - RD$3,000 p/p' },
  { id: 'over_3000', label: 'Más de RD$3,000 p/p' },
];

// Cuisines from database (empty for now - will be populated from Firebase)
const CUISINES: { id: string; label: string }[] = [];

// Sample data for each tab - will be populated from Firebase
const VISITED_PLACES: { id: string; name: string; priceRange: string; cuisine: string; location: string; distance: string; status: string; opensAt: string }[] = [];

const WANT_TO_GO_PLACES: { id: string; name: string; priceRange: string; cuisine: string; location: string; distance: string; status: string; opensAt: string }[] = [];

const AMIGOS_PLACES: { id: string; name: string; priceRange: string; cuisine: string; location: string; distance: string; status: string; opensAt: string; recommendedBy?: string }[] = [];

export default function ListsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('VISITED');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('Restaurantes');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showFullFilterModal, setShowFullFilterModal] = useState(false);
  
  // Filter states
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedScore, setSelectedScore] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [openNow, setOpenNow] = useState(false);
  
  // Expanded sections in filter modal
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Import card visibility
  const [showImportCard, setShowImportCard] = useState(true);

  const handleTabPress = (tab: TabType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const handleCategorySelect = (category: CategoryType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(category);
    setShowCategoryModal(false);
  };

  const toggleSection = (section: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExpandedSection(expandedSection === section ? null : section);
  };

  const clearAllFilters = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCity(null);
    setSelectedScore(null);
    setSelectedCuisine(null);
    setSelectedPrice(null);
    setOpenNow(false);
  };

  const applyFilters = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowFullFilterModal(false);
    // Filters would be applied here when connected to Firebase
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCity) count++;
    if (selectedScore) count++;
    if (selectedCuisine) count++;
    if (selectedPrice) count++;
    if (openNow) count++;
    return count;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <Text style={styles.headerTitle}>LISTAS</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal" size={18} color={Colors.nelo.black} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Dropdown */}
      <TouchableOpacity 
        style={styles.categoryDropdown}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setShowCategoryModal(true);
        }}
      >
        <Text style={styles.categoryDropdownText}>{selectedCategory}</Text>
        <Ionicons name="chevron-down" size={18} color={Colors.nelo.black} />
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'VISITED' && styles.tabActive]}
          onPress={() => handleTabPress('VISITED')}
        >
          <Text style={[styles.tabText, activeTab === 'VISITED' && styles.tabTextActive]}>
            Visitados
          </Text>
        </TouchableOpacity>
          <TouchableOpacity
          style={[styles.tab, activeTab === 'WANT' && styles.tabActive]}
          onPress={() => handleTabPress('WANT')}
        >
          <Text style={[styles.tabText, activeTab === 'WANT' && styles.tabTextActive]}>
            Quiero ir
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={[styles.tab, activeTab === 'AMIGOS' && styles.tabActive]}
          onPress={() => handleTabPress('AMIGOS')}
        >
          <Ionicons 
            name="people" 
            size={10} 
            color={activeTab === 'AMIGOS' ? Colors.nelo.black : Colors.nelo.subtle} 
            style={{ marginRight: 3 }}
          />
          <Text style={[styles.tabText, activeTab === 'AMIGOS' && styles.tabTextActive]}>
            Amigos
            </Text>
          </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'LISTAS' && styles.tabActive]}
          onPress={() => handleTabPress('LISTAS')}
        >
          <Ionicons 
            name="folder-outline" 
            size={10} 
            color={activeTab === 'LISTAS' ? Colors.nelo.black : Colors.nelo.subtle} 
            style={{ marginRight: 3 }}
          />
          <Text style={[styles.tabText, activeTab === 'LISTAS' && styles.tabTextActive]}>
            Listas
          </Text>
          </TouchableOpacity>
        </View>

      {/* Filter Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersContainer}
      >
        <TouchableOpacity 
          style={[styles.filterPill, getActiveFiltersCount() > 0 && styles.filterPillActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setShowFullFilterModal(true);
          }}
        >
          <Ionicons name="options-outline" size={11} color={getActiveFiltersCount() > 0 ? 'white' : Colors.nelo.black} />
          {getActiveFiltersCount() > 0 && (
            <Text style={styles.filterPillTextActive}>{getActiveFiltersCount()}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterPill, selectedCity && styles.filterPillActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setExpandedSection('city');
            setShowFullFilterModal(true);
          }}
        >
          <Text style={[styles.filterPillText, selectedCity && styles.filterPillTextActive]}>Ciudad</Text>
          <Ionicons name="chevron-down" size={11} color={selectedCity ? 'white' : Colors.nelo.black} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterPill, openNow && styles.filterPillActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setOpenNow(!openNow);
          }}
        >
          <Text style={[styles.filterPillText, openNow && styles.filterPillTextActive]}>Abierto</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterPill, selectedCuisine && styles.filterPillActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setExpandedSection('cuisine');
            setShowFullFilterModal(true);
          }}
        >
          <Text style={[styles.filterPillText, selectedCuisine && styles.filterPillTextActive]}>Cocina</Text>
          <Ionicons name="chevron-down" size={11} color={selectedCuisine ? 'white' : Colors.nelo.black} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterPill, selectedPrice && styles.filterPillActive]}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setExpandedSection('price');
            setShowFullFilterModal(true);
          }}
        >
          <Text style={[styles.filterPillText, selectedPrice && styles.filterPillTextActive]}>Precio</Text>
          <Ionicons name="chevron-down" size={11} color={selectedPrice ? 'white' : Colors.nelo.black} />
        </TouchableOpacity>
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Visitados Tab */}
        {activeTab === 'VISITED' && (
          <>
            {VISITED_PLACES.length > 0 ? (
              VISITED_PLACES.map((place, index) => (
                <View key={place.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemNumber}>{index + 1}. </Text>
                    <View style={styles.listItemInfo}>
                      <Text style={styles.listItemName}>{place.name}</Text>
                      <Text style={styles.listItemMeta}>
                        {place.priceRange} | {place.cuisine}
                      </Text>
                      <Text style={styles.listItemLocation}>{place.location}</Text>
                      <Text style={styles.listItemStatus}>
                        {place.distance} • {place.status}{place.opensAt ? ` • Abre ${place.opensAt}` : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="restaurant-outline" size={48} color={Colors.nelo.subtle} />
                <Text style={styles.emptyStateTitle}>Sin lugares visitados</Text>
                <Text style={styles.emptyStateText}>
                  Los lugares que marques como visitados aparecerán aquí
                </Text>
              </View>
            )}
          </>
        )}

        {/* Quiero ir Tab */}
        {activeTab === 'WANT' && (
          <>
            {/* Import List Card */}
            {showImportCard && (
              <View style={styles.importListCard}>
                <TouchableOpacity 
                  style={styles.importListCloseButton}
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setShowImportCard(false);
                  }}
                >
                  <Ionicons name="close" size={20} color={Colors.nelo.subtle} />
                </TouchableOpacity>
                
                <Ionicons name="cloud-upload-outline" size={28} color={Colors.nelo.black} style={styles.importListIcon} />
                
                <Text style={styles.importListTitle}>
                  ¿Ya tienes una lista o mapa de lugares por visitar?
                </Text>
                
                <TouchableOpacity 
                  style={styles.importListButton}
                  onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
                >
                  <Text style={styles.importListButtonText}>Importar una lista</Text>
                </TouchableOpacity>
              </View>
            )}

            {WANT_TO_GO_PLACES.length > 0 ? (
              WANT_TO_GO_PLACES.map((place, index) => (
                <View key={place.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemNumber}>{index + 1}. </Text>
                    <View style={styles.listItemInfo}>
                      <Text style={styles.listItemName}>{place.name}</Text>
                      <Text style={styles.listItemMeta}>
                        {place.priceRange} | {place.cuisine}
                      </Text>
                      <Text style={styles.listItemLocation}>{place.location}</Text>
                      <Text style={styles.listItemStatus}>
                        {place.distance} • {place.status}{place.opensAt ? ` • Abre ${place.opensAt}` : ''}
                      </Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.nothingHereText}>Agrega algún lugar donde quieras ir</Text>
            )}
          </>
        )}

        {/* Amigos Tab */}
        {activeTab === 'AMIGOS' && (
          <>
            {AMIGOS_PLACES.length > 0 ? (
              AMIGOS_PLACES.map((place, index) => (
                <View key={place.id} style={styles.listItem}>
                  <View style={styles.listItemContent}>
                    <Text style={styles.listItemNumber}>{index + 1}. </Text>
                    <View style={styles.listItemInfo}>
                      <Text style={styles.listItemName}>{place.name}</Text>
                      <Text style={styles.listItemMeta}>
                        {place.priceRange} | {place.cuisine}
                      </Text>
                      <Text style={styles.listItemLocation}>{place.location}</Text>
                      {place.recommendedBy && (
                        <Text style={styles.listItemRecommendedBy}>
                          Recomendado por {place.recommendedBy}
                        </Text>
                      )}
                      <Text style={styles.listItemStatus}>
                        {place.distance} • {place.status}{place.opensAt ? ` • Abre ${place.opensAt}` : ''}
                      </Text>
                </View>
              </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={48} color={Colors.nelo.subtle} />
                <Text style={styles.emptyStateTitle}>Sin recomendaciones</Text>
                <Text style={styles.emptyStateText}>
                  Las recomendaciones de tus amigos aparecerán aquí
                </Text>
              </View>
            )}
          </>
        )}

        {/* Listas Tab */}
        {activeTab === 'LISTAS' && (
          <View style={styles.emptyState}>
            <Ionicons name="folder-outline" size={48} color={Colors.nelo.subtle} />
            <Text style={styles.emptyStateTitle}>Sin listas personalizadas</Text>
            <Text style={styles.emptyStateText}>
              Crea tus propias listas para organizar lugares
            </Text>
            <TouchableOpacity 
              style={styles.createListButton}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            >
              <Ionicons name="add" size={18} color="white" />
              <Text style={styles.createListButtonText}>Crear lista</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Floating Button - Ver Mapa for Visitados, Buscar for Quiero ir */}
      {activeTab === 'VISITED' && (
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity 
            style={styles.viewMapButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          >
            <Ionicons name="map-outline" size={16} color="white" />
            <Text style={styles.viewMapButtonText}>Ver Mapa</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeTab === 'WANT' && (
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity 
            style={styles.viewMapButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
          >
            <Ionicons name="search" size={16} color="white" />
            <Text style={styles.viewMapButtonText}>Buscar</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Category Selection Modal */}
      <Modal
        visible={showCategoryModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCategoryModal(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Elige una categoría</Text>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowCategoryModal(false)}
            >
              <Ionicons name="close" size={22} color={Colors.nelo.black} />
            </TouchableOpacity>
            
            <View style={styles.categoryGrid}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.categoryOption,
                    selectedCategory === category.id && styles.categoryOptionActive,
                  ]}
                  onPress={() => handleCategorySelect(category.id)}
                >
                  <Ionicons 
                    name={category.icon as any} 
                    size={14} 
                    color={selectedCategory === category.id ? 'white' : Colors.nelo.black} 
                  />
                  <Text 
                    style={[
                      styles.categoryOptionText,
                      selectedCategory === category.id && styles.categoryOptionTextActive,
                    ]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Full Filter Modal */}
      <Modal
        visible={showFullFilterModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFullFilterModal(false)}
      >
        <View style={styles.fullFilterModalOverlay}>
          <View style={styles.fullFilterModalContent}>
            <View style={styles.modalHandle} />
            <TouchableOpacity 
              style={styles.fullFilterCloseButton}
              onPress={() => setShowFullFilterModal(false)}
            >
              <Ionicons name="close" size={24} color={Colors.nelo.black} />
            </TouchableOpacity>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.filterScrollContent}>
              <Text style={styles.filterSectionTitle}>Filtros</Text>
              
              {/* Open Now Toggle */}
              <View style={styles.filterToggleRow}>
                <Text style={styles.filterToggleLabel}>Abierto ahora</Text>
                <Switch
                  value={openNow}
                  onValueChange={(value) => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setOpenNow(value);
                  }}
                  trackColor={{ false: '#E5E7EB', true: Colors.nelo.orange }}
                  thumbColor="white"
                />
              </View>

              {/* City Section */}
              <TouchableOpacity 
                style={styles.filterRow}
                onPress={() => toggleSection('city')}
              >
                <View style={styles.filterRowLeft}>
                  <Ionicons name="business-outline" size={20} color={Colors.nelo.black} />
                  <Text style={styles.filterRowLabel}>Ciudad</Text>
                </View>
                <Ionicons 
                  name={expandedSection === 'city' ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={Colors.nelo.black} 
                />
              </TouchableOpacity>
              {expandedSection === 'city' && (
                <View style={styles.filterOptions}>
                  {CITIES.map((city) => (
                    <TouchableOpacity
                      key={city.id}
                      style={[
                        styles.filterOptionItem,
                        selectedCity === city.id && styles.filterOptionItemActive,
                        !city.available && styles.filterOptionItemDisabled,
                      ]}
                      onPress={() => {
                        if (city.available) {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          setSelectedCity(selectedCity === city.id ? null : city.id);
                        }
                      }}
                      disabled={!city.available}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedCity === city.id && styles.filterOptionTextActive,
                        !city.available && styles.filterOptionTextDisabled,
                      ]}>
                        {city.label}
                        {city.comingSoon && ' (próximamente)'}
                      </Text>
                      {selectedCity === city.id && (
                        <Ionicons name="checkmark" size={18} color={Colors.nelo.orange} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Score Section */}
              <TouchableOpacity 
                style={styles.filterRow}
                onPress={() => toggleSection('score')}
              >
                <View style={styles.filterRowLeft}>
                  <Ionicons name="stats-chart-outline" size={20} color={Colors.nelo.black} />
                  <Text style={styles.filterRowLabel}>Score</Text>
                </View>
                <Ionicons 
                  name={expandedSection === 'score' ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={Colors.nelo.black} 
                />
              </TouchableOpacity>
              {expandedSection === 'score' && (
                <View style={styles.filterOptions}>
                  {SCORE_OPTIONS.map((score) => (
                    <TouchableOpacity
                      key={score.id}
                      style={[
                        styles.filterOptionItem,
                        selectedScore === score.id && styles.filterOptionItemActive,
                      ]}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setSelectedScore(selectedScore === score.id ? null : score.id);
                      }}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedScore === score.id && styles.filterOptionTextActive,
                      ]}>
                        {score.label}
                      </Text>
                      {selectedScore === score.id && (
                        <Ionicons name="checkmark" size={18} color={Colors.nelo.orange} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Cuisine Section */}
              <TouchableOpacity 
                style={styles.filterRow}
                onPress={() => toggleSection('cuisine')}
              >
                <View style={styles.filterRowLeft}>
                  <MaterialCommunityIcons name="silverware-fork-knife" size={20} color={Colors.nelo.black} />
                  <Text style={styles.filterRowLabel}>Cocina</Text>
                </View>
                <Ionicons 
                  name={expandedSection === 'cuisine' ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={Colors.nelo.black} 
                />
              </TouchableOpacity>
              {expandedSection === 'cuisine' && (
                <View style={styles.filterOptions}>
                  {CUISINES.length === 0 ? (
                    <Text style={styles.emptyFilterText}>
                      No hay tipos de cocina disponibles aún
                    </Text>
                  ) : (
                    CUISINES.map((cuisine) => (
                      <TouchableOpacity
                        key={cuisine.id}
                        style={[
                          styles.filterOptionItem,
                          selectedCuisine === cuisine.id && styles.filterOptionItemActive,
                        ]}
                        onPress={() => {
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                          setSelectedCuisine(selectedCuisine === cuisine.id ? null : cuisine.id);
                        }}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedCuisine === cuisine.id && styles.filterOptionTextActive,
                        ]}>
                          {cuisine.label}
                        </Text>
                        {selectedCuisine === cuisine.id && (
                          <Ionicons name="checkmark" size={18} color={Colors.nelo.orange} />
                        )}
                      </TouchableOpacity>
                    ))
                  )}
                </View>
              )}

              {/* Price Section */}
              <TouchableOpacity 
                style={styles.filterRow}
                onPress={() => toggleSection('price')}
              >
                <View style={styles.filterRowLeft}>
                  <Ionicons name="cash-outline" size={20} color={Colors.nelo.black} />
                  <Text style={styles.filterRowLabel}>Precio</Text>
                </View>
                <Ionicons 
                  name={expandedSection === 'price' ? 'chevron-up' : 'chevron-down'} 
                  size={20} 
                  color={Colors.nelo.black} 
                />
              </TouchableOpacity>
              {expandedSection === 'price' && (
                <View style={styles.filterOptions}>
                  {PRICE_OPTIONS.map((price) => (
                    <TouchableOpacity
                      key={price.id}
                      style={[
                        styles.filterOptionItem,
                        selectedPrice === price.id && styles.filterOptionItemActive,
                      ]}
                      onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        setSelectedPrice(selectedPrice === price.id ? null : price.id);
                      }}
                    >
                      <Text style={[
                        styles.filterOptionText,
                        selectedPrice === price.id && styles.filterOptionTextActive,
                      ]}>
                        {price.label}
                      </Text>
                      {selectedPrice === price.id && (
                        <Ionicons name="checkmark" size={18} color={Colors.nelo.orange} />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Action Buttons */}
            <View style={styles.filterBottomActions}>
              <TouchableOpacity onPress={clearAllFilters}>
                <Text style={styles.clearAllText}>Limpiar todo</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Aplicar</Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6',
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerLeft: {
    width: 50,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '500',
    alignSelf: 'center',
    color: Colors.nelo.black,
    letterSpacing: 0.5,
    fontFamily: SYSTEM_FONT,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    padding: 4,
  },
  
  // Category Dropdown
  categoryDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 6,
    gap: 6,
  },
  categoryDropdownText: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginRight: 6,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.nelo.black,
  },
  tabText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  tabTextActive: {
    color: Colors.nelo.black,
    fontWeight: '500',
  },
  
  // Filter Pills
  filtersScrollView: {
    maxHeight: 44,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 6,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    gap: 3,
  },
  filterPillActive: {
    backgroundColor: Colors.nelo.orange,
    borderColor: Colors.nelo.orange,
  },
  filterPillText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  filterPillTextActive: {
    color: 'white',
    fontFamily: SYSTEM_FONT,
    fontSize: 10,
    fontWeight: '400',
  },
  
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  
  // List Item
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  listItemContent: {
    flexDirection: 'row',
    flex: 1,
  },
  listItemNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  listItemInfo: {
    flex: 1,
  },
  listItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginBottom: 2,
  },
  listItemMeta: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  listItemLocation: {
    fontSize: 10,
    fontWeight: '300',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginTop: 2,
  },
  listItemStatus: {
    fontSize: 9,
    fontWeight: '300',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginTop: 6,
  },
  listItemLockButton: {
    padding: 6,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
  },
  listItemRecommendedBy: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.nelo.orange,
    fontFamily: SYSTEM_FONT,
    marginTop: 4,
  },
  
  // Empty State
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 10,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    textAlign: 'center',
    lineHeight: 14,
  },
  // Import List Card
  importListCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    paddingTop: 24,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
    position: 'relative',
  },
  importListCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
  },
  importListIcon: {
    marginBottom: 8,
  },
  importListTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  importListButton: {
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
  },
  importListButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
  nothingHereText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    textAlign: 'center',
    marginTop: 20,
  },
  
  // Create List Button
  createListButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 20,
    gap: 6,
  },
  createListButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
  
  // Floating Button
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  viewMapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  viewMapButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
  
  // Modal (Category)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 36,
  },
  modalHandle: {
    width: 36,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginBottom: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
  },
  
  // Category Grid
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    gap: 6,
  },
  categoryOptionActive: {
    backgroundColor: Colors.nelo.orange,
    borderColor: Colors.nelo.orange,
  },
  categoryOptionText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  categoryOptionTextActive: {
    color: 'white',
  },

  // Full Filter Modal
  fullFilterModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  fullFilterModalContent: {
    backgroundColor: '#FFF5E6',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
    paddingTop: 10,
  },
  fullFilterCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
    zIndex: 10,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
  },
  filterSectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginTop: 20,
    marginBottom: 20,
  },
  filterToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  filterToggleLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  filterRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  filterRowLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  filterOptions: {
    paddingLeft: 32,
    paddingBottom: 8,
  },
  filterOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.03)',
  },
  filterOptionItemActive: {
    // Active state styling
  },
  filterOptionItemDisabled: {
    opacity: 0.5,
  },
  filterOptionText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  filterOptionTextActive: {
    color: Colors.nelo.orange,
    fontWeight: '400',
  },
  filterOptionTextDisabled: {
    color: Colors.nelo.subtle,
  },
  emptyFilterText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    fontStyle: 'italic',
    paddingVertical: 12,
  },
  filterBottomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
    backgroundColor: '#FFF5E6',
  },
  clearAllText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.orange,
    fontFamily: SYSTEM_FONT,
  },
  applyButton: {
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 24,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
});
