import { DownloadSVG, PaymentSVG, ReceiveCreditSVG } from '@/assets/images/SVGS/export';
import { ThemedText } from '@/components/themed-text';
import { colors, windowHeight } from '@/utils/Constants/Styles';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';

type Transaction = {
  id: string;
  type: 'credit' | 'payment' | 'transfer';
  title: string;
  subtitle: string;
  amount: string;
  currency: string;
  isPositive: boolean;
};

const transactions: Transaction[] = [
  { id: '1', type: 'credit', title: 'Crédito Recebido', subtitle: 'Padrão - #12923023', amount: '12.000.000, 00', currency: 'AOA', isPositive: true },
  { id: '2', type: 'payment', title: 'Pagamento de Prestação', subtitle: 'na 6 dias', amount: '100.000, 00', currency: 'AOA', isPositive: false },
  { id: '3', type: 'transfer', title: 'Transferência KWIK', subtitle: 'na um mês', amount: '1.000.000, 00', currency: 'AOA', isPositive: false },
  { id: '4', type: 'payment', title: 'Pagamento de Prestação', subtitle: 'na 6 dias', amount: '100.000, 00', currency: 'AOA', isPositive: false },
  { id: '5', type: 'transfer', title: 'Transferência KWIK', subtitle: 'na um mês', amount: '1.000.000, 00', currency: 'AOA', isPositive: false },
];

const MovimentosScreen = () => {
  const getIconBackgroundColor = (type: string) => type === 'transfer' ? '#FFDCDC' : '#D0FFD9';

  const getIcon = (type: string) => {
    switch (type) {
      case 'transfer': return <DownloadSVG />;
      case 'payment': return <PaymentSVG />;
      case 'credit': return <ReceiveCreditSVG />;
      default: return null;
    }
  };

  const getAmountColor = (isPositive: boolean) => (isPositive ? '#006222' : '#A20205');

  const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <View style={[styles.iconContainer, { backgroundColor: getIconBackgroundColor(transaction.type) }]}>
          <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            {getIcon(transaction.type)}
          </View>
        </View>
        <View style={styles.transactionInfo}>
          <ThemedText type="small">{transaction.title}</ThemedText>
          <ThemedText type="extraSmall" lightColor={colors.gray300}>{transaction.subtitle}</ThemedText>
        </View>
      </View>
      <View style={styles.transactionRight}>
        <ThemedText type="small" lightColor={getAmountColor(transaction.isPositive)}>
          {transaction.isPositive ? '+' : '-'}{transaction.amount}
        </ThemedText>
        <ThemedText type="extraSmall" lightColor={getAmountColor(transaction.isPositive)}>{transaction.currency}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ height: windowHeight * 0.4 }}>

      <View style={styles.header}>
        <ThemedText type="subtitle" lightColor={colors.primary}>Movimentos</ThemedText>
        <TouchableOpacity>
          <ThemedText type="small" style={{ textDecorationLine: 'underline' }} lightColor={colors.primary}>Ver Todos</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true} 
        contentContainerStyle={{ paddingBottom: windowHeight * 0.1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionRight: {
    alignItems: 'flex-end',
    marginLeft: 12,
  },
});

export default MovimentosScreen;
