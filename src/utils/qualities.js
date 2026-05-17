export const QUALITIES = {
  '4K30': {
    label: '4K 30fps',
    width: 3840, height: 2160, fps: 30,
    bitrate: 34000,
    preset: 'max',
  },
  '1080p60': {
    label: '1080p 60fps',
    width: 1920, height: 1080, fps: 60,
    bitrate: 9000,
    preset: 'hd',
  },
  '1080p30': {
    label: '1080p 30fps',
    width: 1920, height: 1080, fps: 30,
    bitrate: 6000,
    preset: 'hd',
  },
  '720p30': {
    label: '720p 30fps',
    width: 1280, height: 720, fps: 30,
    bitrate: 3000,
    preset: 'medium',
  },
};

export const QUALITY_KEYS = Object.keys(QUALITIES);
