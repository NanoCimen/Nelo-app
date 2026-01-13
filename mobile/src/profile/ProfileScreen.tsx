import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Colors } from '../shared/constants/colors';
import { UserProfile } from '../shared/types';
import { getCurrentUser } from '../shared/services/mockData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// SF Pro on iOS
const SYSTEM_FONT = 'System';

type ProfileTabType = 'ACTIVITY' | 'TASTE';

export default function ProfileScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<ProfileTabType>('ACTIVITY');

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  const handleTabPress = (tab: ProfileTabType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveTab(tab);
  };

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  // Get initials from name
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{user.name}</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Feather name="upload" size={20} color={Colors.nelo.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="menu" size={24} color={Colors.nelo.black} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{getInitials(user.name)}</Text>
          </View>
          <Text style={styles.username}>{user.handle}</Text>
          <Text style={styles.memberSince}>Miembro desde Noviembre 2025</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.stats.followers}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.stats.following}</Text>
            <Text style={styles.statLabel}>Siguiendo</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>-</Text>
            <Text style={styles.statLabel}>Rank en Nelo</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Text style={styles.actionButtonText}>Editar perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Text style={styles.actionButtonText}>Compartir perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButtonSmall}
            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          >
            <Ionicons name="chevron-up" size={18} color={Colors.nelo.black} />
          </TouchableOpacity>
        </View>

        {/* List Items */}
        <View style={styles.listSection}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="checkmark-circle-outline" size={22} color={Colors.nelo.black} />
              <Text style={styles.listItemText}>Visitados</Text>
            </View>
            <View style={styles.listItemRight}>
              <Text style={styles.listItemCount}>{user.stats.reviews}</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.nelo.subtle} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="bookmark" size={22} color={Colors.nelo.black} />
              <Text style={styles.listItemText}>Quiero ir</Text>
            </View>
            <View style={styles.listItemRight}>
              <Text style={styles.listItemCount}>0</Text>
              <Ionicons name="chevron-forward" size={18} color={Colors.nelo.subtle} />
          </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.listItem}>
            <View style={styles.listItemLeft}>
              <Ionicons name="heart" size={22} color={Colors.nelo.black} />
              <Text style={styles.listItemText}>Recs para ti</Text>
            </View>
            <View style={styles.listItemRight}>
              <Ionicons name="lock-closed" size={16} color={Colors.nelo.subtle} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsCards}>
          <View style={styles.statsCard}>
            <Ionicons name="trophy-outline" size={24} color="#0D6E6E" />
            <Text style={styles.statsCardLabel}>Rank en Nelo</Text>
            <Text style={styles.statsCardValue}>-</Text>
          </View>
          <View style={styles.statsCard}>
            <MaterialCommunityIcons name="fire" size={24} color="#0D6E6E" />
            <Text style={styles.statsCardLabel}>Racha actual</Text>
            <Text style={styles.statsCardValue}>1 semana</Text>
          </View>
                </View>

        {/* Goal Card */}
        <View style={styles.goalCard}>
          <View style={styles.goalCardContent}>
            <Text style={styles.goalCardTitle}>Establece tu meta 2025</Text>
            <Text style={styles.goalCardSubtitle}>
              ¿Cuántos restaurantes quieres probar en 2025?
            </Text>
            <View style={styles.goalOptions}>
              <TouchableOpacity style={styles.goalOption}>
                <Text style={styles.goalOptionText}>20</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.goalOption}>
                <Text style={styles.goalOptionText}>50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.goalOption}>
                <Text style={styles.goalOptionText}>100</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.goalOption}>
                <Text style={styles.goalOptionText}>Personalizar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.goalEmoji}>🏆</Text>
          </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'ACTIVITY' && styles.tabActive]}
            onPress={() => handleTabPress('ACTIVITY')}
          >
            <Ionicons 
              name="document-text-outline" 
              size={16} 
              color={activeTab === 'ACTIVITY' ? Colors.nelo.black : Colors.nelo.subtle} 
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabText, activeTab === 'ACTIVITY' && styles.tabTextActive]}>
              Actividad Reciente
            </Text>
          </TouchableOpacity>
              <TouchableOpacity
            style={[styles.tab, activeTab === 'TASTE' && styles.tabActive]}
            onPress={() => handleTabPress('TASTE')}
          >
            <Ionicons 
              name="bar-chart-outline" 
              size={16} 
              color={activeTab === 'TASTE' ? Colors.nelo.black : Colors.nelo.subtle} 
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.tabText, activeTab === 'TASTE' && styles.tabTextActive]}>
              Perfil de Gustos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'ACTIVITY' && (
          <View style={styles.activitySection}>
            {user.stats.reviews > 0 ? (
              <View style={styles.activityItem}>
                <View style={styles.activityAvatar}>
                  <Text style={styles.activityAvatarText}>{getInitials(user.name)}</Text>
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>
                    <Text style={styles.activityBold}>Calificaste </Text>
                    <Text style={styles.activityBold}>un restaurante</Text>
                  </Text>
                  <View style={styles.activityMeta}>
                    <Ionicons name="restaurant-outline" size={12} color={Colors.nelo.subtle} />
                    <Text style={styles.activityMetaText}>Santo Domingo</Text>
                  </View>
                  <View style={styles.activityMeta}>
                    <Ionicons name="refresh-outline" size={12} color={Colors.nelo.subtle} />
                    <Text style={styles.activityMetaText}>1 visita</Text>
                  </View>
                </View>
                <Ionicons name="lock-closed" size={16} color={Colors.nelo.subtle} />
              </View>
            ) : (
              <View style={styles.emptyActivity}>
                <Text style={styles.emptyActivityText}>Sin actividad reciente</Text>
              </View>
            )}
          </View>
        )}

        {activeTab === 'TASTE' && (
          <View style={styles.tasteSection}>
            {/* Dining Stats Card */}
            <View style={styles.diningStatsCard}>
              <View style={styles.diningStatsHeader}>
                <Text style={styles.diningStatsLabel}>TODO EL TIEMPO</Text>
                <TouchableOpacity>
                  <Feather name="upload" size={18} color="white" />
              </TouchableOpacity>
              </View>
              <Text style={styles.diningStatsTitle}>Tus Estadísticas</Text>
              <View style={styles.diningStatsLocation}>
                <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.8)" />
                <Text style={styles.diningStatsLocationText}>Santo Domingo</Text>
          </View>

              <View style={styles.diningStatsRow}>
                <View style={styles.diningStatItem}>
                  <Text style={styles.diningStatValue}>{user.stats.reviews}</Text>
                  <View style={styles.diningStatLabelRow}>
                    <Ionicons name="restaurant-outline" size={12} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.diningStatLabel}>Restaurantes</Text>
                  </View>
                </View>
                <View style={styles.diningStatItem}>
                  <Text style={styles.diningStatValue}>1</Text>
                  <View style={styles.diningStatLabelRow}>
                    <Ionicons name="globe-outline" size={12} color="rgba(255,255,255,0.8)" />
                    <Text style={styles.diningStatLabel}>Cocinas</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.diningStatsMember}>Miembro desde Noviembre 2025</Text>
              <Text style={styles.diningStatsBrand}>nelo</Text>
            </View>

            {/* Dining Map Card */}
            <View style={styles.diningMapCard}>
              <View style={styles.diningMapHeader}>
                <View>
                  <Text style={styles.diningMapTitle}>Tu Mapa Gastronómico</Text>
                  <Text style={styles.diningMapSubtitle}>1 ciudad • {user.stats.reviews} restaurante</Text>
                </View>
                <TouchableOpacity>
                  <Feather name="upload" size={18} color={Colors.nelo.black} />
                </TouchableOpacity>
              </View>
              <View style={styles.mapPlaceholder}>
                <Ionicons name="map-outline" size={48} color={Colors.nelo.subtle} />
                <Text style={styles.mapPlaceholderText}>Mapa próximamente</Text>
              </View>
            </View>
        </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nelo.bg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.nelo.bg,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  content: {
    flex: 1,
  },
  
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  headerName: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  
  // Avatar Section
  avatarSection: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  
  // Stats Row
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 20,
    gap: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  actionButtonSmall: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // List Section
  listSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  listItemCount: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  
  // Stats Cards
  statsCards: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  statsCardLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginTop: 8,
  },
  statsCardValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0D6E6E',
    fontFamily: SYSTEM_FONT,
    marginTop: 2,
  },
  
  // Goal Card
  goalCard: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    flexDirection: 'row',
    marginBottom: 24,
  },
  goalCardContent: {
    flex: 1,
  },
  goalCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginBottom: 4,
  },
  goalCardSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginBottom: 12,
  },
  goalOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  goalOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)',
  },
  goalOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  goalEmoji: {
    fontSize: 40,
    marginLeft: 8,
  },
  
  // Tabs
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.nelo.black,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  tabTextActive: {
    color: Colors.nelo.black,
    fontWeight: '500',
  },
  
  // Activity Section
  activitySection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  activityAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityAvatarText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
    marginBottom: 4,
  },
  activityBold: {
    fontWeight: '500',
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  activityMetaText: {
    fontSize: 11,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  emptyActivity: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyActivityText: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
  },
  
  // Taste Section
  tasteSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  diningStatsCard: {
    backgroundColor: '#3D3D7A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  diningStatsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diningStatsLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: SYSTEM_FONT,
    letterSpacing: 1,
  },
  diningStatsTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    fontFamily: SYSTEM_FONT,
    marginBottom: 4,
  },
  diningStatsLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 20,
  },
  diningStatsLocationText: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: SYSTEM_FONT,
  },
  diningStatsRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 20,
  },
  diningStatItem: {},
  diningStatValue: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    fontFamily: SYSTEM_FONT,
  },
  diningStatLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  diningStatLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    fontFamily: SYSTEM_FONT,
  },
  diningStatsMember: {
    fontSize: 11,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    fontFamily: SYSTEM_FONT,
    marginBottom: 12,
  },
  diningStatsBrand: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    fontFamily: SYSTEM_FONT,
    textAlign: 'center',
  },
  
  // Dining Map Card
  diningMapCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  diningMapHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  diningMapTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.nelo.black,
    fontFamily: SYSTEM_FONT,
  },
  diningMapSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginTop: 2,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPlaceholderText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.nelo.subtle,
    fontFamily: SYSTEM_FONT,
    marginTop: 8,
  },
});
