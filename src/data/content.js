/**
 * =======================================================================
 * BESTIE.EXE 💗 — CENTRAL CONTENT CONFIGURATION
 * =======================================================================
 *
 * This file contains ALL customizable text, names, captions, letter
 * paragraphs, and photo paths for the entire website.
 *
 * HOW TO CUSTOMIZE:
 * 1. Change `bestieName` to your friend's real name or nickname.
 * 2. Change `senderName` to your own name.
 * 3. Place your photos in `/public/images/` with names `photo-1.jpg` to `photo-6.jpg`.
 * 4. Update the captions in `photos` array if you want custom memory notes.
 * 5. Edit the letter paragraphs in `letter.paragraphs` to speak from your heart.
 *
 * Everything here automatically propagates across all screens!
 */

export const CONTENT = {
  // =====================================================================
  // 1. NAMES & GENERAL DETAILS
  // =====================================================================
  bestieName: 'Butkii', // Replace with your best friend's real name (e.g. 'Sarah', 'Alex')
  senderName: 'PB 💗', // Replace with your name or nickname

  // =====================================================================
  // 2. SCREEN 1: THE SURPRISE INTRODUCTION
  // =====================================================================
  intro: {
    badge: '⚠️ BESTIE DETECTED',
    heading: 'Hey You! 💗',
    subheading: (name) => `Yes, you, ${name}! Someone made a tiny little corner of the internet just for you...`,
    envelopeHint: 'Tap the envelope or click below to begin ✨',
    buttonText: 'Open Your Surprise 🎁',
    footerText: 'Made with an unreasonable amount of love ✨',
    topPhotos: [
      {
        id: 'top-photo-1',
        imagePath: '/images/top-photo-1.jpeg',
        alt: 'Our favorite memory 1',
        sticker: '🌸',
        tapeColor: 'washi-tape',
        rotation: '-rotate-[8deg]',
      },
      {
        id: 'top-photo-2',
        imagePath: '/images/top-photo-2.jpeg',
        alt: 'Our favorite memory 2',
        sticker: '✨',
        tapeColor: 'washi-tape-yellow',
        rotation: 'rotate-[7deg]',
      },
    ],
  },

  // =====================================================================
  // 3. SCREEN 2: THE BESTIE VERIFICATION (Interactive Quiz)
  // =====================================================================
  verification: {
    badge: 'SECURITY CHECK 🔍',
    heading: 'Hold on a second... 🤨',
    question: 'Are you actually my favorite human?',
    yesButton: 'YES, OBVIOUSLY 💅',
    noButton: "NOOO, I'M NOT YOUR BESTIE 😭",
    yesHeading: 'I KNEW IT! 😭💗',
    yesCelebration: "Obviously, you're my favourite human, Butki. Now let's see why you're stuck with me! 😂",
    continueButton: 'Continue to Reasons You Rock ✨',
    noResponses: [
      "Nice try, Butki! 😂",
      "Excuse me?! After everything we've been through? 😭",
      "Error 404: Friendship denial rejected! 💗",
      "Stop pretending, Nikki! We both know the truth. 🫶",
      "Okay, drama queen. Now press YES! 💅",
    ],
  },

  // =====================================================================
  // 4. SCREEN 3: FRIENDSHIP APPRECIATION
  // =====================================================================
  appreciation: {
    badge: 'WHY YOU ARE IRREPLACEABLE 🌟',
    heading: "Reasons You're Kinda Awesome 💖",
    subtitle: 'A scientifically verified list of why life is 1000x better with you around.',
    cards: [
      {
        id: 1,
        title: 'Professional Partner in Crime 🕵️',
        description: 'Life would be considerably less chaotic without you.',
        sticker: '✨',
        tag: 'CRIME PARTNER',
        tapeColor: 'washi-tape',
      },
      {
        id: 2,
        title: 'Certified Mood Booster ☀️',
        description: 'Somehow, you make even ordinary days more fun.',
        sticker: '🌈',
        tag: 'PURE SUNSHINE',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 3,
        title: 'Keeper of My Secrets 🤫',
        description: 'A very important position with absolutely no salary.',
        sticker: '🔒',
        tag: 'CONFIDENTIAL',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 4,
        title: 'My Forever Bestie 🫶',
        description: 'No matter how weird things get, you are still my person.',
        sticker: '👑',
        tag: 'FOREVER BOND',
        tapeColor: 'washi-tape-lavender',
      },
    ],
    continueButton: 'Enter Our Photo Scrapbook 📸',
  },

  // =====================================================================
  // 5. SCREEN 4: OUR PHOTO SCRAPBOOK 📸
  // =====================================================================
  scrapbook: {
    badge: 'MOMENTS & CHAOS 📸',
    heading: 'Our Photo Scrapbook 📸',
    subtitle: 'Tap any photo to view in high detail. If a picture is missing, our placeholder will keep it cozy!',
    fallbackMessage: 'Our memory goes here 💗',
    photos: [
      {
        id: 'photo-1',
        imagePath: '/images/photo-1.jpg',
        title: 'The Beginning of Our Chaos 📸',
        caption: 'The beginning of our chaos 📸',
        tag: 'CHAPTER 01',
        sticker: '🌸',
        rotation: '-rotate-2',
        tapeColor: 'washi-tape',
      },
      {
        id: 'photo-2',
        imagePath: '/images/photo-2.jpg',
        title: 'Actually Normal (Rare) 😂',
        caption: "Proof that we're actually normal sometimes 😂",
        tag: 'RARE SIGHT',
        sticker: '⭐',
        rotation: 'rotate-1',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 'photo-3',
        imagePath: '/images/photo-3.jpg',
        title: 'Core Memory ✨',
        caption: 'A moment worth keeping ✨',
        tag: 'TREASURED',
        sticker: '🎀',
        rotation: '-rotate-1',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 'photo-4',
        imagePath: '/images/photo-4.jpg',
        title: 'Pure Smiles 💕',
        caption: 'Our kind of happiness 💕',
        tag: 'HAPPINESS',
        sticker: '💖',
        rotation: 'rotate-2',
        tapeColor: 'washi-tape-lavender',
      },
      {
        id: 'photo-5',
        imagePath: '/images/photo-5.jpg',
        title: 'Secret Level 🔓',
        caption: 'Another memory unlocked 🔓',
        tag: 'UNLOCKED',
        sticker: '🎉',
        rotation: '-rotate-2',
        tapeColor: 'washi-tape',
      },
      {
        id: 'photo-6',
        imagePath: '/images/photo-6.jpg',
        title: 'To Be Continued 🫶',
        caption: 'More memories to come 🫶',
        tag: 'FUTURE MEMORIES',
        sticker: '🌟',
        rotation: 'rotate-1',
        tapeColor: 'washi-tape-yellow',
      },
    ],
    continueButton: 'Open Your Personal Letter 💌',
  },

  // =====================================================================
  // 6. SCREEN 5: THE FRIENDSHIP LETTER 💌
  // =====================================================================
  letter: {
    badge: 'CONFIDENTIAL • FOR YOUR EYES ONLY 💌',
    heading: 'A Little Something From Me to You 💌',
    envelopePrompt: 'A letter is waiting inside for you. Tap to open it!',
    openButton: 'Open My Letter 💌',
    greeting: (name) => `Hey ${name}! 💗`,
    paragraphs: [
      "I don't always say it, but I'm genuinely glad you're a part of my life.",
      'Thank you for all the laughs, the random conversations, the silly moments, and all those little things that somehow become special memories.',
      'You make ordinary days a little more interesting, and I\'m really grateful for the bond we share.',
      'I hope we keep making memories, annoying each other, laughing at absolutely nothing, and being our wonderfully weird selves.',
      'No matter how busy life gets, I hope you always remember that you have someone cheering for you.',
      "You're not just a friend. You're my bestie, and that means a lot to me.",
      'Stay the amazing human you are. 🫶',
    ],
    signoff: 'With lots of love,',
    signature: 'Your Bestie 💗',
    continueButton: 'One Last Surprise 🎁',
  },

  // =====================================================================
  // 7. SCREEN 6: THE FINAL SURPRISE 🎁
  // =====================================================================
  final: {
    badge: 'GRAND FINALE 🌟',
    heading: 'And One Last Thing... 🥹',
    supportingText: 'Because you deserve a little reminder of how special you are.',
    openButton: 'Open Your Final Surprise 🎁',
    celebrationHeadline: 'YOU ARE OFFICIALLY STUCK WITH ME! 💗😂',
    celebrationSupporting:
      "Here's to more laughs, more memories, more random conversations, and a friendship that keeps getting better.",
    replayButton: 'Replay Our Little Adventure ↻',
    tagline: 'BESTIE.EXE • Made with love, laughter & pure chaos 💗',
  },
};
