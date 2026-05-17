import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'streamcam_settings';

export const defaultSettings = {
  rtmpUrl: 'rtmp://192.168.1.x:1935/live',
  quality: '1080p30',
  bitrate: 6000,        // kbps
  cameraPosition: 'back',
  filter: 'natural',
  torch: false,
  muted: false,
};

export async function loadSettings() {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(settings));
  } catch {}
}
