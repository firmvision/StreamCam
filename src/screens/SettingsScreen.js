import { useState } from 'react';
import {
  Alert, ScrollView, StyleSheet, Switch,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useStreamSettings from '../hooks/useStreamSettings';
import { QUALITY_KEYS, QUALITIES } from '../utils/qualities';

export default function SettingsScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { settings, updateSetting, updateSettings } = useStreamSettings();
  const [urlDraft, setUrlDraft] = useState(settings.rtmpUrl);

  const saveUrl = () => {
    if (!urlDraft.startsWith('rtmp://') && !urlDraft.startsWith('srt://')) {
      Alert.alert('Invalid URL', 'URL must start with rtmp:// or srt://');
      return;
    }
    updateSetting('rtmpUrl', urlDraft);
    Alert.alert('Saved', 'Server URL saved.');
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.body}>

        {/* ── Server URL ── */}
        <Section title="PC Server URL">
          <Text style={styles.hint}>
            Copy the RTMP or SRT URL from the PC app and paste it here.
          </Text>
          <TextInput
            style={styles.input}
            value={urlDraft}
            onChangeText={setUrlDraft}
            placeholder="rtmp://192.168.x.x:1935/live"
            placeholderTextColor="#444"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          <TouchableOpacity style={styles.saveBtn} onPress={saveUrl}>
            <Text style={styles.saveBtnText}>Save URL</Text>
          </TouchableOpacity>
        </Section>

        {/* ── Quality ── */}
        <Section title="Stream Quality">
          <View style={styles.optionGrid}>
            {QUALITY_KEYS.map(k => {
              const q = QUALITIES[k];
              const active = settings.quality === k;
              return (
                <TouchableOpacity
                  key={k}
                  style={[styles.optionBtn, active && styles.optionBtnActive]}
                  onPress={() => updateSetting('quality', k)}
                >
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {q.label}
                  </Text>
                  <Text style={styles.optionSub}>{q.bitrate} kbps</Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.hint}>
            4K requires SRT connection and strong WiFi (34+ Mbps). Use 1080p30 for best reliability.
          </Text>
        </Section>

        {/* ── Bitrate ── */}
        <Section title="Custom Bitrate (kbps)">
          <TextInput
            style={styles.input}
            value={String(settings.bitrate)}
            onChangeText={v => updateSetting('bitrate', parseInt(v) || 6000)}
            keyboardType="numeric"
            placeholder="6000"
            placeholderTextColor="#444"
          />
          <Text style={styles.hint}>
            Recommended: 3000–6000 for 1080p30, 8000–9000 for 1080p60.
          </Text>
        </Section>

        {/* ── Toggles ── */}
        <Section title="Audio & Display">
          <Row label="Mute microphone">
            <Switch
              value={settings.muted}
              onValueChange={v => updateSetting('muted', v)}
              trackColor={{ true: '#B22222' }}
              thumbColor="#fff"
            />
          </Row>
        </Section>

        {/* ── About ── */}
        <Section title="About">
          <Text style={styles.hint}>
            StreamCam v1.0{'\n'}
            Streams to your PC via RTMP or SRT.{'\n'}
            Works with the BlackmagicRtmpCamera PC app.{'\n\n'}
            Port defaults: RTMP 1935, 1936, 1937, 1938{'\n'}
            SRT 9000, 9001, 9002, 9003
          </Text>
        </Section>

      </ScrollView>
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Row({ label, children }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#141414' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: '#222',
  },
  backBtn: { width: 60 },
  backText: { color: '#B22222', fontSize: 15, fontWeight: '600' },
  title: { flex: 1, color: '#fff', fontSize: 17, fontWeight: '700', textAlign: 'center' },

  body: { padding: 16, gap: 4, paddingBottom: 48 },

  section: {
    backgroundColor: '#1E1E1E', borderRadius: 12,
    padding: 16, marginBottom: 12, gap: 10,
  },
  sectionTitle: { color: '#888', fontSize: 11, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },

  hint: { color: '#555', fontSize: 12, lineHeight: 18 },

  input: {
    backgroundColor: '#111', color: '#F0F0F0',
    borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    borderWidth: 1, borderColor: '#2E2E2E',
  },
  saveBtn: {
    backgroundColor: '#B22222', borderRadius: 8,
    paddingVertical: 10, alignItems: 'center',
  },
  saveBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  optionGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optionBtn: {
    flex: 1, minWidth: '45%',
    backgroundColor: '#111', borderRadius: 8,
    padding: 10, borderWidth: 1, borderColor: '#2E2E2E',
    alignItems: 'center',
  },
  optionBtnActive: { borderColor: '#B22222', backgroundColor: '#2A0A0A' },
  optionText: { color: '#888', fontSize: 13, fontWeight: '600' },
  optionTextActive: { color: '#fff' },
  optionSub: { color: '#555', fontSize: 10, marginTop: 2 },

  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { color: '#ccc', fontSize: 14 },
});
