import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LiveStreamView from '@api.video/react-native-livestream';
import { useKeepAwake } from 'expo-keep-awake';
import * as Haptics from 'expo-haptics';

import FilterStrip from '../components/FilterStrip';
import StreamButton from '../components/StreamButton';
import StatusOverlay from '../components/StatusOverlay';
import useStreamSettings from '../hooks/useStreamSettings';
import { QUALITIES } from '../utils/qualities';

export default function CameraScreen({ navigation }) {
  useKeepAwake();

  const insets = useSafeAreaInsets();
  const { settings, updateSetting } = useStreamSettings();
  const liveRef = useRef(null);

  const [isStreaming, setIsStreaming] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [duration, setDuration] = useState(0);

  const quality = QUALITIES[settings.quality] ?? QUALITIES['720p30'];

  // Duration timer
  useEffect(() => {
    if (!isStreaming) { setDuration(0); return; }
    const t = setInterval(() => setDuration(d => d + 1), 1000);
    return () => clearInterval(t);
  }, [isStreaming]);

  // ── Stream control ─────────────────────────────────────────────────────

  const startStream = useCallback(async () => {
    if (!settings.rtmpUrl || settings.rtmpUrl.includes('192.168.1.x')) {
      Alert.alert('Server not configured', "Tap ⚙️ to set your PC's IP address first.");
      return;
    }
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setIsConnecting(true);
      await liveRef.current?.startStreaming(settings.rtmpUrl);
    } catch (e) {
      Alert.alert('Stream error', e.message ?? 'Could not connect');
      setIsConnecting(false);
    }
  }, [settings.rtmpUrl]);

  const stopStream = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await liveRef.current?.stopStreaming();
    setIsStreaming(false);
    setIsConnecting(false);
    setDuration(0);
  }, []);

  const flipCamera = useCallback(() => {
    Haptics.selectionAsync();
    updateSetting('cameraFacing', settings.cameraFacing === 'back' ? 'front' : 'back');
  }, [settings.cameraFacing]);

  const toggleMute = useCallback(() => {
    Haptics.selectionAsync();
    updateSetting('muted', !settings.muted);
  }, [settings.muted]);

  // ── Render ─────────────────────────────────────────────────────────────

  return (
    <View style={styles.root}>

      <View style={styles.cameraWrap}>
        <LiveStreamView
          ref={liveRef}
          style={StyleSheet.absoluteFill}
          camera={settings.cameraFacing ?? 'back'}
          isMuted={settings.muted ?? false}
          video={{
            fps: quality.fps,
            resolution: quality.resolution,
            bitrate: quality.bitrate,
            gopDuration: 1,
          }}
          audio={{
            bitrate: 128000,
            sampleRate: 44100,
            isStereo: true,
          }}
          onConnectionSuccess={() => {
            setIsConnecting(false);
            setIsStreaming(true);
          }}
          onConnectionFailed={(reason) => {
            setIsConnecting(false);
            setIsStreaming(false);
            Alert.alert('Connection failed', reason ?? 'Check your server URL and network.');
          }}
          onDisconnect={() => {
            setIsStreaming(false);
            setIsConnecting(false);
            setDuration(0);
          }}
        />

        <FilterOverlay filterKey={settings.filter} />

        {/* Top bar */}
        <View style={[styles.topBar, { paddingTop: insets.top + 4 }]}>
          <StatusOverlay
            isStreaming={isStreaming}
            duration={duration}
            bitrate={quality.bitrate}
            protocol="RTMP"
          />
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.iconText}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Side controls */}
        <View style={styles.sideControls}>
          <TouchableOpacity style={styles.iconBtn} onPress={flipCamera}>
            <Text style={styles.iconText}>🔄</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleMute}>
            <Text style={styles.iconText}>{settings.muted ? '🔇' : '🎙️'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 4 }]}>
        <TouchableOpacity style={styles.qualityBadge} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.qualityText}>{quality.label}</Text>
        </TouchableOpacity>

        <FilterStrip selected={settings.filter} onSelect={k => updateSetting('filter', k)} />

        <View style={styles.goLiveRow}>
          <StreamButton
            isStreaming={isStreaming}
            isConnecting={isConnecting}
            onPress={isStreaming ? stopStream : startStream}
          />
        </View>

        <Text style={styles.urlHint} numberOfLines={1}>
          {settings.rtmpUrl || 'No server — tap ⚙️ to configure'}
        </Text>
      </View>
    </View>
  );
}

function FilterOverlay({ filterKey }) {
  const overlayColors = {
    warm:      'rgba(255,140,0,0.12)',
    cool:      'rgba(0,100,255,0.10)',
    cinematic: 'rgba(80,40,0,0.15)',
    vivid:     'rgba(255,0,255,0.04)',
    fade:      'rgba(220,220,220,0.15)',
  };
  const color = overlayColors[filterKey];
  const isGrayscale = filterKey === 'bw';
  if (!color && !isGrayscale) return null;
  return (
    <View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFill,
        color && { backgroundColor: color },
        isGrayscale && { backgroundColor: 'rgba(128,128,128,0.35)' },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  cameraWrap: { flex: 1, overflow: 'hidden' },
  topBar: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sideControls: {
    position: 'absolute', right: 12, top: '30%',
    gap: 14, alignItems: 'center',
  },
  iconBtn: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center', justifyContent: 'center',
  },
  iconText: { fontSize: 20 },
  bottomBar: { backgroundColor: '#141414', paddingTop: 6 },
  qualityBadge: {
    alignSelf: 'center', marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14, paddingVertical: 4, borderRadius: 12,
  },
  qualityText: { color: '#aaa', fontSize: 11, fontWeight: '600' },
  goLiveRow: { alignItems: 'center', marginVertical: 10 },
  urlHint: {
    color: '#3A3A3A', fontSize: 10, textAlign: 'center',
    marginBottom: 4, paddingHorizontal: 16,
  },
});
