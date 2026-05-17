import { StyleSheet, Text, View } from 'react-native';

export default function StatusOverlay({ isStreaming, bitrate, duration, protocol }) {
  if (!isStreaming) return null;

  const fmt = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.dot} />
      <Text style={styles.text}>LIVE</Text>
      {duration > 0 && <Text style={styles.dim}>  {fmt(duration)}</Text>}
      {bitrate > 0 && <Text style={styles.dim}>  {(bitrate / 1000).toFixed(1)} Mbps</Text>}
      {protocol ? <Text style={styles.protocol}>{protocol}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.55)',
    paddingHorizontal: 10, paddingVertical: 5,
    borderRadius: 8, gap: 4,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF3B30' },
  text: { color: '#fff', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  dim:  { color: '#ccc', fontSize: 11 },
  protocol: {
    color: '#fff', fontSize: 10, fontWeight: '700',
    backgroundColor: 'rgba(100,100,255,0.4)',
    paddingHorizontal: 5, paddingVertical: 1, borderRadius: 4, marginLeft: 4,
  },
});
