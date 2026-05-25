// NodeMediaClient video presets:
// 1=360p, 2=480p, 3=540p, 4=720p, 5=1080p
export const QUALITIES = {
  '1080p30': {
    label: '1080p 30fps',
    width: 1920, height: 1080, fps: 30,
    bitrate: 6000 * 1000,
    nmc_preset: 5,
  },
  '720p30': {
    label: '720p 30fps',
    width: 1280, height: 720, fps: 30,
    bitrate: 3000 * 1000,
    nmc_preset: 4,
  },
  '540p30': {
    label: '540p 30fps',
    width: 960, height: 540, fps: 30,
    bitrate: 1500 * 1000,
    nmc_preset: 3,
  },
  '480p30': {
    label: '480p 30fps',
    width: 854, height: 480, fps: 30,
    bitrate: 800 * 1000,
    nmc_preset: 2,
  },
};

export const QUALITY_KEYS = Object.keys(QUALITIES);
