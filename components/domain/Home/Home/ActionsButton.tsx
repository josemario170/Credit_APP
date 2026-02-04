import { CreditSVG, TransferSVG } from '@/assets/images/SVGS/export';
import Button from '@/components/domain/Home/Home/CustomButton';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

type actionsProps = {
    onSendPress?: () => void;
    onReceivePress?: () => void;
}

const ActionButtonsRow = ({ onSendPress, onReceivePress }: actionsProps) => {
  const buttons = [
    {
      id: '1',
      icon: <TransferSVG />,
      label: 'Transferir',
      onPress: onSendPress,
    },
    {
      id: '2',
      icon: <CreditSVG />,
      label: 'Simular',
      onPress: onReceivePress,
    },
  ];

  const ActionButton = ({ button }: { button: any }) => (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={button.onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconWrapper}>
        <View style={{alignItems: 'center', justifyContent: 'center', width: 24, height: 24}}>
          {button.icon}
        </View>
        <ThemedText style={{fontSize: 10}} type="extraSmall" lightColor="">
         {button.label}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={styles.scrollContent}
      >
        <Button variant="primary" onPress={()=>{}}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
            <Ionicons name="add" size={20} color="white" />
            <ThemedText type="default" lightColor="white">
              Novo Pedido
            </ThemedText>
          </View>
        </Button>
        {buttons.map((button) => (
          <ActionButton key={button.id} button={button} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export default ActionButtonsRow;