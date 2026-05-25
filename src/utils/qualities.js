// Resolutions supported by @api.video/react-native-livestream:
// '240p' | '360p' | '480p' | '720p' | '1080p'
export const QUALITIES = {
  '1080p30': {
    label: '1080p 30fps',
    fps: 30, resolution: '1080p',
    bitrate: 6 * 1024 * 1024,
  },
  '720p30': {
    label: '720p 30fps',
    fps: 30, resolution: '720p',
    bitrate: 3 * 1024 * 1024,
  },
  '480p30': {
    label: '480p 30fps',
    fps: 30, resolution: '480p',
    bitrate: 1 * 1024 * 1024,
  },
  '360p30': {
    label: '360p 30fps',
    fps: 30, resolution: '360p',
    bitrate: 500 * 1024,
  },
};

export const QUALITY_KEYS = Object.keys(QUALITIES);
