import { useEffect, useState } from 'react';
import { loadSettings, saveSettings, defaultSettings } from '../utils/storage';

export default function useStreamSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSettings().then(s => { setSettings(s); setLoaded(true); });
  }, []);

  const updateSetting = (key, value) => {
    setSettings(prev => {
      const next = { ...prev, [key]: value };
      saveSettings(next);
      return next;
    });
  };

  const updateSettings = (updates) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      saveSettings(next);
      return next;
    });
  };

  return { settings, updateSetting, updateSettings, loaded };
}
