import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StreamButton({ isStreaming, isConnecting, onPress }) {
  const label = isConnecting ? 'Connecting…' : isStreaming ? '⏹ Stop' : '⏺ Go Live';
  const bg = isStreaming ? '#8B0000' : '#B22222';

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bg }]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isConnecting}
    >
      {isConnecting ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 28, paddingVertical: 14,
    borderRadius: 32, minWidth: 130,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.4,
    shadowRadius: 8, elevation: 6,
  },
  label: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
});
