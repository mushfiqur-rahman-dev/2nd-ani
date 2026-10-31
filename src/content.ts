export type StoryImage = {
  src: string
  alt: string
  width: number
  height: number
}

export type JourneyChapter = {
  date: string
  title: string
  body: string
  image: StoryImage
  layout: 'left' | 'right'
}

export type MemoryImage = StoryImage & {
  caption: string
  wide?: boolean
}

export type LoveTestQuestion = {
  prompt: string
  answers: string[]
  correct: number
}

export type FullStoryData = {
  recipient: string
  creator: string
  anniversaryDate: string
  pin: string

  // Calendar
  calendar: {
    month: string
    day: number
  }

  // Hero Section
  heroTitle: string
  heroQuote: string
  heroTexts: {
    note1: string
    note2: string
    ctaText: string
  }
  hero: StoryImage
  photostrip: [StoryImage, StoryImage, StoryImage]

  // Section 2: First Page
  firstStoryImage: StoryImage
  firstMemory: {
    label: string
    title: string
    titleItalic: string
    body: string
    handwrittenLine: string
    cardNote: string
  }

  // Section 3: Chapters
  chaptersSection: {
    label: string
    title: string
    titleItalic: string
  }
  journey: JourneyChapter[]

  // Section 4: Scattered Memory Gallery
  gallerySection: {
    label: string
    title: string
    titleItalic: string
    subtitle: string
    captionTag: string
    captionText: string
  }
  memories: MemoryImage[]

  // Section 5: Spin Wheel
  wheelSection: {
    label: string
    title: string
    titleItalic: string
    subtitle: string
    gameTitle: string
    gameDesc: string
  }
  spinPrompts: string[]

  // Section 6: Love Test
  quizSection: {
    label: string
    title: string
    titleItalic: string
    subtitle: string
    resultPerfect: string
    resultGood: string
    resultFooter: string
  }
  loveTest: LoveTestQuestion[]

  // Section 7: Love Letter
  letterSection: {
    label: string
    title: string
    titleItalic: string
    dateLine: string
  }
  letter: {
    heading: string
    paragraphs: string[]
    signature: string
  }

  // Section 8: Finale
  finaleSection: {
    label: string
    title: string
    titleItalic: string
    buttonText: string
  }
  surprise: {
    heading: string
    message: string
    promise: string
    image?: StoryImage
  }

  // Unlock Screen (Pin Gate)
  pinGateTexts: {
    kicker: string
    title: string
    titleItalic: string
    instruction: string
    footnote: string
  }
}

export const image = (src: string, alt: string, width = 1200, height = 1500): StoryImage => ({
  src,
  alt,
  width,
  height,
})

export const defaultStoryContent: FullStoryData = {
  recipient: 'My Love',
  creator: 'Your Favorite Person',
  anniversaryDate: 'Two beautiful years',
  pin: '01112024',

  calendar: {
    month: 'January',
    day: 11,
  },

  heroTitle: 'Happy Anniversary',
  heroQuote:
    'May your hearts continue to overflow with love and happiness, today and for all the days to come',
  heroTexts: {
    note1: 'Those sweet moments...',
    note2: 'I was thinking of us',
    ctaText: 'Enter our story',
  },
  hero: image(
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&h=1500&q=85',
    'Delicate pink flowers resting together',
  ),
  photostrip: [
    image(
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&h=1500&q=85',
      'The beginning of us',
    ),
    image(
      'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1000&h=1200&q=85',
      'Soft everyday sunlight',
    ),
    image(
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&h=1200&q=85',
      'Walking hand in hand forever',
    ),
  ],

  firstStoryImage: image(
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&h=1200&q=85',
    'A couple holding hands while walking together',
  ),
  firstMemory: {
    label: 'The First Page',
    title: 'It started quietly.',
    titleItalic: 'Then it became everything.',
    body: 'What started as an ordinary moment slowly became my favorite part of every day. I still smile when I think about how naturally we found our way to each other.',
    handwrittenLine: 'I would choose you again in every lifetime.',
    cardNote: 'the moment we didn’t know was a beginning',
  },

  chaptersSection: {
    label: 'What We Kept',
    title: 'Three little chapters.',
    titleItalic: 'One favorite story.',
  },
  journey: [
    {
      date: 'The beginning',
      title: 'Somehow, it was always you.',
      body: 'What started as an ordinary moment slowly became my favorite part of every day. I still smile when I think about how naturally we found our way to each other.',
      image: image(
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&h=1200&q=85',
        'A couple walking hand in hand',
      ),
      layout: 'left',
    },
    {
      date: 'The little things',
      title: 'Our days became a collection of small miracles.',
      body: 'The shared jokes, the late conversations, the quiet comfort of being understood—those are the memories that made our story feel like home.',
      image: image(
        'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=1000&h=1200&q=85',
        'Soft sunlight through a romantic window',
      ),
      layout: 'right',
    },
    {
      date: 'Today',
      title: 'Two years in, and I still choose you.',
      body: 'Every version of our story has been worth keeping. Thank you for making the ordinary feel magical and the future feel exciting.',
      image: image(
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&h=1200&q=85',
        'A romantic couple celebrating together',
      ),
      layout: 'left',
    },
  ],

  gallerySection: {
    label: 'From the Camera Roll',
    title: 'Proof that ordinary',
    titleItalic: 'is breathtaking with you.',
    subtitle: 'Click any photo to open our memory viewer',
    captionTag: 'save this feeling',
    captionText:
      'Some memories are loud. Ours are often soft and tender, and that is what makes them so precious to me.',
  },
  memories: [
    {
      ...image(
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&h=1100&q=85',
        'A couple walking hand in hand',
        900,
        1100,
      ),
      caption: 'Where it all began',
    },
    {
      ...image(
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&h=1100&q=85',
        'Two hands making a heart shape',
        900,
        1100,
      ),
      caption: 'Always in sync',
    },
    {
      ...image(
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&h=800&q=85',
        'A couple sharing a joyful moment',
        1200,
        800,
      ),
      caption: 'Our favorite kind of happy',
      wide: true,
    },
    {
      ...image(
        'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=900&h=1100&q=85',
        'A couple standing close in warm light',
        900,
        1100,
      ),
      caption: 'You make everything softer',
    },
    {
      ...image(
        'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&h=1100&q=85',
        'A romantic evening together',
        900,
        1100,
      ),
      caption: 'A thousand quiet moments',
    },
  ],

  wheelSection: {
    label: 'A Pause For Us',
    title: 'Pick a little',
    titleItalic: 'something sweet.',
    subtitle: 'One playful moment before the most tender part.',
    gameTitle: 'Spin for a little love.',
    gameDesc:
      'One playful prompt, picked just for this moment. No wrong answers, only cute ones.',
  },
  spinPrompts: [
    'Give me your sweetest smile',
    'Tell me one tiny thing you love about us',
    'Send me a kiss when you finish reading',
    'Pick our next little adventure',
    'Say “I love you” in your funniest voice',
    'Make one more memory with me today',
  ],

  quizSection: {
    label: 'A heart-to-heart',
    title: 'How well do you know',
    titleItalic: 'our love?',
    subtitle:
      'There are no wrong answers here. Just the things I hope you feel when you think of us.',
    resultPerfect: 'You know us by heart.',
    resultGood: 'You know the sweetest parts.',
    resultFooter:
      'And honestly, the best answer will always be choosing each other again.',
  },
  loveTest: [
    {
      prompt: 'What makes our love feel most like home?',
      answers: ['The quiet little moments', 'The grand gestures', 'The perfect photos'],
      correct: 0,
    },
    {
      prompt: 'If our story had a secret language, it would be made of…',
      answers: ['Long explanations', 'Looks, laughs, and tiny habits', 'Only song lyrics'],
      correct: 1,
    },
    {
      prompt: 'What do I want most for our next chapter?',
      answers: ['More ordinary days together', 'A very fancy trophy', 'To stop making memories'],
      correct: 0,
    },
    {
      prompt: 'After two years, what is still true?',
      answers: ['You are my favorite person', 'I forgot your name', 'We have run out of things to say'],
      correct: 0,
    },
  ],

  letterSection: {
    label: 'The Part I Mean Most',
    title: 'A letter I could',
    titleItalic: 'never fit in a text.',
    dateLine: '01.11.24 → Always',
  },
  letter: {
    heading: 'A little letter for you',
    paragraphs: [
      'My love, two years with you have taught me that the best parts of life are often the quietest ones. They are in the way you make me laugh when I need it, the way you listen, and the way your presence makes any place feel like home.',
      'I am grateful for every memory behind us and every little adventure still waiting ahead. Thank you for being my favorite person, my safest place, and the sweetest part of my days.',
      'Happy anniversary. I love the life we are building, one ordinary and beautiful moment at a time.',
    ],
    signature: 'Forever yours,',
  },

  finaleSection: {
    label: 'Before You Leave',
    title: 'There is one more',
    titleItalic: 'thing to remember.',
    buttonText: 'Open the last page',
  },
  surprise: {
    heading: 'There is something I want you to know.',
    message:
      'You are still my favorite beginning, my favorite today, and my favorite person to imagine every tomorrow with.',
    promise: 'Two years down, forever to go. Happy Anniversary, My Love.',
    image: image(
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&h=700&q=85',
      'A couple celebrating their love',
      1000,
      700,
    ),
  },

  pinGateTexts: {
    kicker: 'A little secret for you',
    title: 'Our story is',
    titleItalic: 'just for us.',
    instruction: 'Enter the date our journey began',
    footnote: 'Two years of love, laughs, and a thousand sweet memories.',
  },
}

// Backward compatibility export
export const storyContent = defaultStoryContent
export type StoryContent = FullStoryData
