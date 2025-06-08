// Application configuration
export const APP_CONFIG = {
  // Window settings
  window: {
    width: 900,
    height: 700,
    minWidth: 600,
    minHeight: 500,
  },

  // Download settings
  downloads: {
    defaultPath: "downloads",
    maxConcurrent: 3,
  },

  // Quality options
  qualities: [
    { display: "Best Quality", value: "best", formatId: "best" },
    {
      display: "Best Video + Audio",
      value: "bv+ba/best",
      formatId: "bv+ba/best",
    },
    {
      display: "4K (2160p)",
      value: "bv[height<=2160]+ba/best[height<=2160]",
      formatId: "2160p",
    },
    {
      display: "1440p",
      value: "bv[height<=1440]+ba/best[height<=1440]",
      formatId: "1440p",
    },
    {
      display: "1080p",
      value: "bv[height<=1080]+ba/best[height<=1080]",
      formatId: "1080p",
    },
    {
      display: "720p",
      value: "bv[height<=720]+ba/best[height<=720]",
      formatId: "720p",
    },
    {
      display: "480p",
      value: "bv[height<=480]+ba/best[height<=480]",
      formatId: "480p",
    },
    {
      display: "360p",
      value: "bv[height<=360]+ba/best[height<=360]",
      formatId: "360p",
    },
    {
      display: "240p",
      value: "bv[height<=240]+ba/best[height<=240]",
      formatId: "240p",
    },
    {
      display: "144p",
      value: "bv[height<=144]+ba/best[height<=144]",
      formatId: "144p",
    },
    { display: "--- Audio Only ---", value: "", disabled: true },
    { display: "Audio Only (Best)", value: "ba/best", formatId: "audio-best" },
    {
      display: "Audio Only (128k)",
      value: "ba[abr<=128]/best",
      formatId: "audio-128",
    },
    {
      display: "Audio Only (96k)",
      value: "ba[abr<=96]/best",
      formatId: "audio-96",
    },
    { display: "Worst Quality", value: "worst", formatId: "worst" },
  ],

  // Format options
  formats: {
    video: [
      { value: "mp4", text: "MP4" },
      { value: "webm", text: "WebM" },
      { value: "mkv", text: "MKV" },
      { value: "avi", text: "AVI" },
      { value: "any", text: "Any Format" },
    ],
    audio: [
      { value: "mp3", text: "MP3" },
      { value: "m4a", text: "M4A" },
      { value: "ogg", text: "OGG" },
      { value: "webm", text: "WebM" },
      { value: "any", text: "Any Format" },
    ],
  },
};

export default APP_CONFIG;
