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
        description: 'No matter how weird things get, you are still my favourite person.',
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
    subtitle: 'Tap any photo to view in high detail! 📸',
    photos: [
      {
        id: 1,
        imagePath: '/images/photo-1.jpg',
        title: 'The Beginning of Our Chaos 📸',
        caption: 'The beginning of our chaos 📸',
        tag: 'CHAPTER 01',
        sticker: '🌸',
        tapeColor: 'washi-tape',
      },
      {
        id: 2,
        imagePath: '/images/photo-2.jpg',
        title: 'Actually Normal (Rare) 😂',
        caption: "Proof that we're actually normal sometimes 😂",
        tag: 'RARE SIGHT',
        sticker: '⭐',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 3,
        imagePath: '/images/photo-3.jpg',
        title: 'Core Memory ✨',
        caption: 'A moment worth keeping ✨',
        tag: 'TREASURED',
        sticker: '🎀',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 4,
        imagePath: '/images/photo-4.jpg',
        title: 'Pure Smiles 💕',
        caption: 'Our kind of happiness 💕',
        tag: 'HAPPINESS',
        sticker: '💖',
        tapeColor: 'washi-tape-lavender',
      },
      {
        id: 5,
        imagePath: '/images/photo-5.jpg',
        title: 'Secret Level 🔓',
        caption: 'Another memory unlocked 🔓',
        tag: 'UNLOCKED',
        sticker: '🎉',
        tapeColor: 'washi-tape',
      },
      {
        id: 6,
        imagePath: '/images/photo-6.jpg',
        title: 'To Be Continued 🫶',
        caption: 'More memories to come 🫶',
        tag: 'FUTURE',
        sticker: '🌟',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 7,
        imagePath: '/images/photo-7.jpg',
        title: 'Pure Sunshine ☀️',
        caption: 'Unfiltered happiness with you ☀️',
        tag: 'SUNSHINE',
        sticker: '🌷',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 8,
        imagePath: '/images/photo-8.jpg',
        title: 'Endless Laughter 😂',
        caption: 'Pure chaos and endless laughter 😂',
        tag: 'PURE CHAOS',
        sticker: '👑',
        tapeColor: 'washi-tape-lavender',
      },
      {
        id: 9,
        imagePath: '/images/photo-9.jpg',
        title: 'One of the Best 💗',
        caption: 'One of my absolute favorites 💗',
        tag: 'FAVORITE',
        sticker: '✨',
        tapeColor: 'washi-tape',
      },
      {
        id: 10,
        imagePath: '/images/photo-10.jpg',
        title: 'Crime Partners 🕵️',
        caption: 'Partners in crime forever 🕵️',
        tag: 'CRIME PARTNER',
        sticker: '🌸',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 11,
        imagePath: '/images/photo-11.jpg',
        title: 'Bestie Energy ⚡',
        caption: 'Unstoppable bestie energy ⚡',
        tag: 'BESTIE VIBES',
        sticker: '⭐',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 12,
        imagePath: '/images/photo-12.jpg',
        title: 'Pure Joy 🌈',
        caption: 'Making ordinary days special 🌈',
        tag: 'PURE JOY',
        sticker: '🎀',
        tapeColor: 'washi-tape-lavender',
      },
      {
        id: 13,
        imagePath: '/images/photo-13.jpg',
        title: 'Drama Queen 💅',
        caption: 'Too much drama in one frame 💅',
        tag: 'DRAMA QUEEN',
        sticker: '💖',
        tapeColor: 'washi-tape',
      },
      {
        id: 14,
        imagePath: '/images/photo-14.jpg',
        title: 'Always Smiling 🥹',
        caption: 'Smiling because you exist 🥹',
        tag: 'SMILES',
        sticker: '🎉',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 15,
        imagePath: '/images/photo-15.jpg',
        title: '100x Louder 😂',
        caption: 'Laughter is 100x louder with you 😂',
        tag: 'LAUGHTER',
        sticker: '🌟',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 16,
        imagePath: '/images/photo-16.jpg',
        title: 'Core Memory 🔓',
        caption: 'Core friendship memory unlocked 🔓',
        tag: 'CORE MEMORY',
        sticker: '🌷',
        tapeColor: 'washi-tape-lavender',
      },
      {
        id: 17,
        imagePath: '/images/photo-17.jpg',
        title: 'Two Pagals 🤡',
        caption: 'Two pagals, one vibe 🤡',
        tag: 'PAGALPAN',
        sticker: '👑',
        tapeColor: 'washi-tape',
      },
      {
        id: 18,
        imagePath: '/images/photo-18.jpg',
        title: 'Forever Stuck 🤝',
        caption: 'Forever stuck with each other 🤝',
        tag: 'FOREVER',
        sticker: '✨',
        tapeColor: 'washi-tape-mint',
      },
      {
        id: 19,
        imagePath: '/images/photo-19.jpg',
        title: 'Grateful for You 🫶',
        caption: 'Grateful for every single laugh 🫶',
        tag: 'GRATEFUL',
        sticker: '🌸',
        tapeColor: 'washi-tape-yellow',
      },
      {
        id: 20,
        imagePath: '/images/photo-20.jpg',
        title: 'To Infinity & Beyond 🚀',
        caption: 'To infinity and beyond with my bestie 🚀',
        tag: 'BESTIE FOR LIFE',
        sticker: '⭐',
        tapeColor: 'washi-tape-lavender',
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
    greeting: 'Hey Butkii! 🎂💖',
    paragraphs: [
      'First of all, HAPPY BIRTHDAY, MADAM JI! 🎉🥳',
      "Congratulations! You've successfully survived another year of life, my nonsense, and my world-class Pagal energy. Honestly, you deserve an award for tolerating me. 🏆😂",
      'Aaj ka din tumhara hai, toh aaj main tumhari saari tareef karunga… bas aaj hi, zyada expectations mat rakhna! Kal se phir wahi normal wali tang khichai shuru. 🤭💗',
      'Butkii, I hope your birthday is filled with happiness, laughter, lots of surprises, and enough cake to forget all your problems. 🎂✨ And please, cake khud hi kha lena, mujhe photo bhej kar jalana mat! 😭😂',
      'You know what? Life gave me a wonderful friend, and then it gave you the responsibility of handling this certified Pagal. Sach mein, tumhari patience ko toh national award milna chahiye. 🏆🤡',
      "Jokes apart, I'm genuinely glad you're a part of my life. Thank you for all the random conversations, silly moments, laughter, and memories that make our friendship special. You might not realize it, but you really do matter to me. 🫶💖",
      "On your special day, I wish you endless happiness, success, good health, beautiful memories, and all the little things that make you smile. May this year bring you closer to everything you've been dreaming of. 🌷✨",
      "And remember, Butkii, no matter how much you grow up, you'll always have one permanently assigned Pagal Bestu who will annoy you, cheer for you, celebrate your wins, and remind you that you're amazing. 😂💗",
    ],
    rulesTitle: 'Birthday Friendship Rules 😂',
    rules: [
      'Birthday girl gets unlimited pampering today. 👑',
      'Cake pictures are compulsory. No excuses! 🎂📸',
      'Smiling is mandatory; being grumpy is allowed only for 5 minutes. 🤭',
      "Your Pagal Bestu's nonsense subscription renews automatically every year. 😂",
      "Friendship cancellation? Sorry, that feature doesn't exist! 💗",
    ],
    finalParagraph: "So enjoy your day, birthday girl! Dance like nobody's watching, laugh until your cheeks hurt, eat that cake, and make some beautiful memories.",
    birthdayWish: 'Happy Birthday once again, Butkii! 🎂💖',
    closing: 'Stay happy, stay crazy, and keep being the wonderful person you are.',
    signatureIntro: 'With lots of pyaar, unlimited teasing, and absolutely zero maturity,',
    signature: 'Your Pagal Bestu 🤡💗',
    ps: 'Birthday gift toh mil gaya — meri friendship. Ab isse bada gift kya chahiye? 😂🎁',
    continueButton: 'One Last Surprise 🎁',
  },

  // =====================================================================
  // 7. SCREEN 6: THE FINAL SURPRISE 🎁
  // =====================================================================
  final: {
    badge: 'GRAND FINALE 🌟',
    heading: 'BUTKII, THIS IS YOUR BIRTHDAY DLC! 🎂💗',
    subtitle: "Congratulations! You've unlocked another year of being my favourite headache. 😂",
    openButton: 'Open Your Birthday Surprise 🎁',
    missionComplete: "MISSION COMPLETE: BUTKII'S BIRTHDAY SURPRISE! 🎉",
    missionSupporting: 'One more year of memories, madness, and having Pagal Bestu permanently in your life. 😂💗',
    celebrationHeadline: 'OFFICIALLY STUCK WITH PAGAL BESTU! 💗😂',
    celebrationNotice: 'Sorry Butkii, no returns, no exchanges, and absolutely no cancellation of this friendship. Terms and conditions apply forever. 🤝💅',
    birthdayMessageTitle: 'HAPPY BIRTHDAY, BUTKII! 🎂💖',
    birthdayMessageParagraphs: [
      "Another year older, but don't worry, your level of pagalpan is still perfectly competitive with mine. 😂",
      'I hope your day is full of happiness, cake, surprises, and all the little things that make you smile.',
      'Thank you for being my partner in random conversations, silly jokes, unnecessary drama, and unforgettable memories.',
      "No matter how much we tease each other, I'm always cheering for you. Keep smiling, keep being your adorable weird self, and never forget how special you are.",
    ],
    birthdayMessageClosing: 'With lots of love, unlimited bakchodi, and zero refund policy,',
    birthdayMessageSignature: 'Your Pagal Bestu 💗',
    wishButton: 'Make a Birthday Wish ✨',
    wishMadeMessage: 'Wish made! ✨ May this year bring Butkii more happiness, success, adventures, and reasons to smile. 💗',
    replayButton: 'Replay Our Little Adventure ↻',
    revisitScrapbookButton: 'Revisit Scrapbook Memories 📸',
    tagline: 'BESTIE.EXE • Made with love, laughter & pure chaos 💗',
  },
};
