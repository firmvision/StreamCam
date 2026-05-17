// Color filter presets — applied as RGBA matrix ColorFilter in preview
// Each filter is a 4x5 color matrix [R,G,B,A rows]

export const FILTERS = {
  natural: {
    name: 'Natural',
    emoji: '🎯',
    matrix: null, // no filter = native colors
  },
  warm: {
    name: 'Warm',
    emoji: '🌅',
    matrix: [
      1.2, 0.05, -0.05, 0, 10,
      0,   1.0,  -0.1,  0, 5,
      0,  -0.1,   0.85, 0, 0,
      0,   0,     0,    1, 0,
    ],
  },
  cool: {
    name: 'Cool',
    emoji: '🌊',
    matrix: [
      0.85, 0,    0.05, 0, -5,
      0,    1.0,  0.1,  0,  0,
      0.05, 0.1,  1.2,  0,  10,
      0,    0,    0,    1,  0,
    ],
  },
  cinematic: {
    name: 'Cinematic',
    emoji: '🎬',
    matrix: [
      1.1,  0.05, 0,    0, -5,
      -0.1, 1.05, 0.05, 0,  0,
      0.05, 0,    0.9,  0,  5,
      0,    0,    0,    1,  0,
    ],
  },
  vivid: {
    name: 'Vivid',
    emoji: '✨',
    matrix: [
      1.4, -0.1, -0.1, 0, 0,
      -0.1, 1.4, -0.1, 0, 0,
      -0.1, -0.1, 1.4, 0, 0,
      0,    0,    0,   1, 0,
    ],
  },
  bw: {
    name: 'B&W',
    emoji: '⬛',
    matrix: [
      0.33, 0.59, 0.11, 0, 0,
      0.33, 0.59, 0.11, 0, 0,
      0.33, 0.59, 0.11, 0, 0,
      0,    0,    0,    1, 0,
    ],
  },
  fade: {
    name: 'Fade',
    emoji: '🌫️',
    matrix: [
      0.9,  0.05, 0.05, 0, 20,
      0.05, 0.9,  0.05, 0, 20,
      0.05, 0.05, 0.9,  0, 20,
      0,    0,    0,    1,  0,
    ],
  },
};

export const FILTER_KEYS = Object.keys(FILTERS);
