import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FILTER_KEYS, FILTERS } from '../utils/filters';

export default function FilterStrip({ selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTER_KEYS.map(key => {
        const f = FILTERS[key];
        const active = selected === key;
        return (
          <TouchableOpacity
            key={key}
            style={[styles.item, active && styles.itemActive]}
            onPress={() => onSelect(key)}
            activeOpacity={0.7}
          >
            <Text style={styles.emoji}>{f.emoji}</Text>
            <Text style={[styles.label, active && styles.labelActive]}>{f.name}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 8, gap: 8, flexDirection: 'row' },
  item: {
    alignItems: 'center', paddingHorizontal: 14, paddingVertical: 6,
    borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1, borderColor: 'transparent',
  },
  itemActive: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderColor: 'rgba(255,255,255,0.5)',
  },
  emoji: { fontSize: 18, marginBottom: 2 },
  label: { color: '#888', fontSize: 10, fontWeight: '500' },
  labelActive: { color: '#fff' },
});
