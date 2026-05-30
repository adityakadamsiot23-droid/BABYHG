// Configuration data for the Dreamy Romantic Scrapbook Fairytale Website
// You can customize any of these texts, dates, and images to make it truly personal!

export interface LoveNote {
  id: number;
  title: string;
  summary: string;
  content: string;
  sticker: string;
  color: string;
}

export interface GalleryPhoto {
  id: number;
  url: string;
  caption: string;
  rotation: string;
  type?: 'image' | 'video';
}

export interface LilyQuote {
  id: number;
  hint: string;
  content: string;
}

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image: string;
  icon: 'heart' | 'star' | 'coffee' | 'sparkles' | 'camera';
}

export const loveNotes: LoveNote[] = [
  {
    id: 1,
    title: "To My Favorite Person 🌸",
    summary: "A little reminder of how special you are...",
    content: "Just in case you forgot today: you are incredibly smart, beautiful, and you bring a unique light wherever you go. Having you in my life is like having a warm cup of coffee on a rainy afternoon — cozy, refreshing, and absolutely essential. Never forget how amazing you are! 💕",
    sticker: "🌸",
    color: "from-[#fff0f5] to-[#ffe4e1] border-[#ffb6c1]",
  },
  {
    id: 2,
    title: "A Small Thank You 💌",
    summary: "For all the small moments we share...",
    content: "Thank you for the late-night talks, the silly memes, the listening ear, and for just being you. You have this magical ability to make even the most boring days feel like a cute adventure. I appreciate you more than words can say. Stay sweet! 🧸✨",
    sticker: "🧸",
    color: "from-[#f0f8ff] to-[#e6e6fa] border-[#b0c4de]",
  },
  {
    id: 3,
    title: "For Sunny & Cloudy Days ⛅",
    summary: "No matter what happens, I'm here!",
    content: "Life has its ups and downs, but I hope this little digital corner brings a huge smile to your face whenever you need a boost. Whenever you feel down, just click around this garden, read these notes, and know that you are deeply cared for, valued, and celebrated. 🌷💖",
    sticker: "🌷",
    color: "from-[#fff5ee] to-[#faf0e6] border-[#ffe4b5]",
  },
  {
    id: 4,
    title: "Princess Reminder 👑",
    summary: "Your daily reminder to wear your crown!",
    content: "Take a deep breath, sit back, and relax. Today, you are in 100% princess mode! Remember to treat yourself gently, eat your favorite snacks, and don't let anyone dull your sparkle. You deserve the entire world and all the happy moments in it. 💖🍰",
    sticker: "🍰",
    color: "from-[#fffbf0] to-[#fff0f5] border-[#f0e68c]",
  }
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: 1,
    url: "assets/WhatsApp Image 2026-05-27 at 11.58.14 PM.jpeg",
    caption: "A bright smile that lights up the day ✨",
    rotation: "rotate-2",
    type: "image",
  },
  {
    id: 2,
    url: "assets/WhatsApp Video 2026-05-27 at 11.58.16 PM.mp4",
    caption: "Sweetest reel moment together 🎥💕",
    rotation: "-rotate-3",
    type: "video",
  },
  {
    id: 3,
    url: "assets/late night sweet chats & cozy vibes.mp4",
    caption: "Late night sweet chats & cozy vibes ☕",
    rotation: "rotate-1",
    type: "video",
  },
  {
    id: 4,
    url: "assets/hg2.mp4",
    caption: "Adorably cute fairy smiles 💫",
    rotation: "-rotate-2",
    type: "video",
  },
  {
    id: 5,
    url: "assets/Magical asthethic snapshot.jpeg",
    caption: "Magical aesthetic snapshots 🌾",
    rotation: "rotate-3",
    type: "image",
  },
  {
    id: 6,
    url: "assets/hg.jpeg",
    caption: "Cozy pink skies and fairytale memories ☁️🌸",
    rotation: "-rotate-1",
    type: "image",
  },
  {
    id: 8,
    url: "assets/roblox.jpeg",
    caption: "Roblox play times and shared fun 🧸🎮",
    rotation: "-rotate-3",
    type: "image",
  }
];

export const lilyGardenQuotes: LilyQuote[] = [
  {
    id: 1,
    hint: "Click me!",
    content: "🌸 'You are a garden of beautiful thoughts and kind deeds.'"
  },
  {
    id: 2,
    hint: "Click here!",
    content: "⭐ 'May your day be filled with warm smiles and soft sparkles.'"
  },
  {
    id: 3,
    hint: "Tap tap!",
    content: "🦋 'Like a butterfly, you bring color and joy wherever you fly.'"
  },
  {
    id: 4,
    hint: "Open me!",
    content: "🌷 'Remember: You are strong, capable, and incredibly loved!'"
  },
  {
    id: 5,
    hint: "Click me too!",
    content: "✨ 'Every single star in the sky is cheering for you today.'"
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    date: "A Cozy Beginning 🌸",
    title: "Where the Magic Started",
    description: "The universe aligned and introduced us. Two souls connecting over shared laughs and silly jokes. The starting chapter of a beautiful bond.",
    image: "assets/Where the magic starts.mp4",
    icon: "sparkles",
  },
  {
    id: 2,
    date: "Late Night Talks ☕",
    title: "Sharing Endless Stories",
    description: "Conversations that stretched into the early morning. Talking about everything from our deepest dreams to our absolute favorite foods. Uncovering the lock to each other's worlds.",
    image: "assets/late night sweet chats & cozy vibes.mp4",
    icon: "coffee",
  },
  {
    id: 3,
    date: "Adventure Days 📷",
    title: "Making Precious Memories",
    description: "Silly snapshots, outdoor strolls, coffee shop hops, and frozen moments in time. Scrapbooks are made of days like these — where we forgot the rest of the world.",
    image: "assets/Making Precious memories.mp4",
    icon: "camera",
  },
  {
    id: 4,
    date: "Today and Tomorrow 💖",
    title: "Growing Stronger Together",
    description: "Every single day is a fresh page in our custom fairytale. Here is to countless more shared giggles, secret high-fives, and beautiful milestones yet to come!",
    image: "assets/growing together.jpeg",
    icon: "heart",
  }
];

export const secretBoxConfig = {
  hint: "Hint: It is a 4-letter word for the most magical feeling in the world (Starts with 'L'!)",
  passcode: "love", // lowercase
  unlockedTitle: "For My Princess 👑💖",
  unlockedCaption: "You opened the magical box!",
  unlockedMessage: "Inside this secret box, I wanted to hide my warmest wish for you: May your path always be lined with blooming lilies, soft pink skies, and hearts that understand you. You are an absolute treasure, and I hope this tiny digital fairytale reminds you of that every single day. Here is a little key to happiness, custom made for you! 🗝️💕",
  unlockedPhoto: "assets/gift.jpeg"
};

