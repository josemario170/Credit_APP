import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'transaction',
      title: 'Pagamento Recebido',
      description: 'Você recebeu AOA 500.000,00 de João Silva',
      timestamp: 'Há 2 horas',
      isRead: false,
      icon: 'check-circle',
      color: '#10B981',
    },
    {
      id: '2',
      type: 'system',
      title: 'Alerta de Segurança',
      description: 'Novo login detectado em sua conta. Revise a atividade.',
      timestamp: 'Há 4 horas',
      isRead: false,
      icon: 'alert-circle',
      color: '#F59E0B',
    },
    {
      id: '3',
      type: 'deadline',
      title: 'Vencimento Próximo',
      description: 'Sua prestação vence em 3 dias - AOA 150.000,00',
      timestamp: 'Há 6 horas',
      isRead: true,
      icon: 'calendar-alert',
      color: '#EF4444',
    },
    {
      id: '4',
      type: 'transaction',
      title: 'Transferência Enviada',
      description: 'Transferência de AOA 100.000,00 para Maria Santos',
      timestamp: 'Há 1 dia',
      isRead: true,
      icon: 'arrow-up-circle',
      color: '#3B82F6',
    },
    {
      id: '5',
      type: 'system',
      title: 'Atualização de Sistema',
      description: 'Seu app foi atualizado com novas funcionalidades.',
      timestamp: 'Há 2 dias',
      isRead: true,
      icon: 'refresh-circle',
      color: '#8B5CF6',
    },
    {
      id: '6',
      type: 'deadline',
      title: 'Contrato Expirando',
      description: 'Seu contrato KWIK vence em 5 dias. Renove agora.',
      timestamp: 'Há 3 dias',
      isRead: true,
      icon: 'file-document-alert',
      color: '#EC4899',
    },
  ]);

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    );
  };

  const handleDeleteNotification = (id: string) => {
    Alert.alert(
      'Deletar Notificação',
      'Você tem certeza que deseja deletar esta notificação?',
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Deletar',
          onPress: () => {
            setNotifications((prev) => prev.filter((notif) => notif.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const NotificationItem = ({ notification }: { notification: any }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !notification.isRead && styles.notificationItemUnread,
      ]}
      onPress={() => handleToggleRead(notification.id)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationLeft}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: `${notification.color}20` },
            ]}
          >
            <MaterialCommunityIcons
              name={notification.icon}
              size={20}
              color={notification.color}
            />
          </View>
        </View>

        <View style={styles.notificationTextContainer}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationDescription}>
            {notification.description}
          </Text>
          <Text style={styles.notificationTimestamp}>
            {notification.timestamp}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteNotification(notification.id)}
        >
          <Feather name="trash-2" size={18} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {!notification.isRead && (
        <View style={styles.unreadIndicator} />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notificações</Text>
          {unreadCount > 0 && (
            <Text style={styles.unreadCountText}>
              {unreadCount} nova{unreadCount !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity
            onPress={handleMarkAllAsRead}
            style={styles.markAllButton}
          >
            <Text style={styles.markAllButtonText}>Marcar todas</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={48}
            color="#D1D5DB"
          />
          <Text style={styles.emptyText}>Sem notificações</Text>
          <Text style={styles.emptySubText}>
            Você já viu todas as suas notificações
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  unreadCountText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  markAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
  },
  markAllButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationItemUnread: {
    backgroundColor: '#F0F9FF',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  notificationLeft: {
    marginRight: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 6,
    lineHeight: 18,
  },
  notificationTimestamp: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  deleteButton: {
    padding: 8,
    marginTop: -4,
  },
  unreadIndicator: {
    position: 'absolute',
    left: 16,
    top: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
  },
});

export default NotificationsScreen;