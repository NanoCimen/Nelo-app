import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../shared/constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// SF Pro on iOS
const SYSTEM_FONT = 'System';

type TabType = 'EXPLORAR' | 'AMIGOS' | 'CONFIABLES';

// Empty data arrays - will be populated from Firebase
const INFLUENCERS: { id: string; username: string; name: string; avatarUrl: string; verified?: boolean; reviewsNearYou?: number }[] = [];
const FRIENDS: { id: string; username: string; name: string; avatarUrl: string; verified?: boolean }[] = [];
const TRUSTED: { id: string; username: string; name: string; avatarUrl: string; verified?: boolean; specialty?: string }[] = [];

export default function FriendsScreen() {
  const [activeTab, setActiveTab] = useState<TabType>('EXPLORAR');
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabPress = (tab: TabType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  const renderUserCard = (user: { id: string; username: string; name: string; avatarUrl: string; verified?: boolean; reviewsNearYou?: number; specialty?: string }, index: number) => (
    <TouchableOpacity 
      key={user.id} 
      style={styles.userCard}
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      <Image source={{ uri: user.avatarUrl }} style={styles.userAvatar} />
      <View style={styles.userInfo}>
        <View style={styles.usernameRow}>
          <Text style={styles.username}>{user.username}</Text>
          {user.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark" size={10} color="white" />
            </View>
          )}
        </View>
        {user.reviewsNearYou && (
          <Text style={styles.reviewsNearYou}>{user.reviewsNearYou} reseña cerca de ti!</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft} />
        <View style={styles.headerCenter} />
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal" size={18} color={Colors.nelo.black} />
          </TouchableOpacity>
                </View>
              </View>

      {/* Title - Same style as Restaurantes */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Personas</Text>
            </View>

      {/* Filter Pills - Same style as Nearby, Trending, Friends */}
      <View style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <TouchableOpacity 
            style={[styles.filterPill, activeTab === 'EXPLORAR' && styles.filterPillActive]}
            onPress={() => handleTabPress('EXPLORAR')}
          >
            <Ionicons 
              name="compass-outline" 
              size={11} 
              color={activeTab === 'EXPLORAR' ? 'white' : Colors.nelo.black} 
              style={{ marginRight: 4 }} 
              />
            <Text style={activeTab === 'EXPLORAR' ? styles.filterTextActive : styles.filterText}>
              Explorar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, activeTab === 'AMIGOS' && styles.filterPillActive]}
            onPress={() => handleTabPress('AMIGOS')}
          >
            <Ionicons 
              name="people-outline" 
              size={11} 
              color={activeTab === 'AMIGOS' ? 'white' : Colors.nelo.black} 
              style={{ marginRight: 4 }} 
            />
            <Text style={activeTab === 'AMIGOS' ? styles.filterTextActive : styles.filterText}>
              Amigos
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterPill, activeTab === 'CONFIABLES' && styles.filterPillActive]}
            onPress={() => handleTabPress('CONFIABLES')}
          >
            <Ionicons 
              name="shield-checkmark-outline" 
              size={11} 
              color={activeTab === 'CONFIABLES' ? 'white' : Colors.nelo.black} 
              style={{ marginRight: 4 }} 
            />
            <Text style={activeTab === 'CONFIABLES' ? styles.filterTextActive : styles.filterText}>
              Confiables
            </Text>
          </TouchableOpacity>
              </View>
            </View>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Explorar Tab */}
        {activeTab === 'EXPLORAR' && (
          <>
            {INFLUENCERS.length > 0 ? (
              INFLUENCERS.map((user, index) => renderUserCard(user, index))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="compass-outline" size={48} color={Colors.nelo.subtle} />
                <Text style={styles.emptyStateTitle}>Sin influencers</Text>
                <Text style={styles.emptyStateText}>
                  Descubre influencers de comida de República Dominicana
                </Text>
              </View>
            )}
          </>
        )}

        {/* Amigos Tab */}
        {activeTab === 'AMIGOS' && (
          <View style={styles.contactsContainer}>
            <Text style={styles.contactsQuestion}>¿No ves tus contactos?</Text>
            
            <TouchableOpacity 
              style={styles.syncButton}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            >
              <Text style={styles.syncButtonText}>SINCRONIZAR CONTACTOS</Text>
            </TouchableOpacity>

            <Text style={styles.enableText}>
              Habilita contactos para ver dónde están comiendo tus amigos!
            </Text>

            <TouchableOpacity 
              style={styles.enableButton}
              onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
            >
              <Text style={styles.enableButtonText}>HABILITAR CONTACTOS</Text>
            </TouchableOpacity>

            {FRIENDS.length > 0 && FRIENDS.map((user, index) => renderUserCard(user, index))}
          </View>
        )}

        {/* Confiables Tab */}
        {activeTab === 'CONFIABLES' && (
          <>
            {TRUSTED.length > 0 ? (
              TRUSTED.map((user, index) => renderUserCard(user, index))
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="shield-checkmark-outline" size={48} color={Colors.nelo.subtle} />
                <Text style={styles.emptyStateTitle}>Sin fuentes confiables</Text>
                <Text style={styles.emptyStateText}>
                  Agrega personas cuyas recomendaciones de comida confíes
                </Text>
              </View>
            )}
          </>
        )}

        <View style={{ height: 100 }} />
        </ScrollView>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.nelo.subtle} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar"
            placeholderTextColor={Colors.nelo.subtle}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nelo.bg,
  },
  
  // Header - Same as Listas
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerLeft: {
    width: 50,
  },
  headerCenter: {
    flex: 1,
    height: 20,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    padding: 4,
  },
  
  // Title - Same style as Restaurantes
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  
  // Filter Pills - Same style as Feed page
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  filterPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginHorizontal: 3,
  },
  filterPillActive: {
    backgroundColor: Colors.nelo.orange,
  },
  filterText: {
    color: '#111827',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: SYSTEM_FONT,
  },
  filterTextActive: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    fontFamily: SYSTEM_FONT,
  },
  
  // Content
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  contentContainer: {
    paddingTop: 16,
  },
  
  // User Card
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },
  reviewsNearYou: {
    fontSize: 12,
    fontWeight: '400',
    color: '#10B981',
    fontFamily: SYSTEM_FONT,
    marginTop: 2,
  },
  
  // Contacts/Friends Tab
  contactsContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  contactsQuestion: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginBottom: 16,
  },
  syncButton: {
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 32,
  },
  syncButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
    letterSpacing: 0.5,
  },
  enableText: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 40,
  },
  enableButton: {
    backgroundColor: Colors.nelo.orange,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
  },
  enableButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
    letterSpacing: 0.5,
  },
  
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    textAlign: 'center',
    lineHeight: 20,
  },
  
  // Search Bar
  searchContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.nelo.bg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginLeft: 10,
  },
});
