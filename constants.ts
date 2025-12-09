import { QuizPools, GenreMap, KeywordMap } from './types';

export const TMDB_GENRES: GenreMap = {
  "Action": 28,
  "Adventure": 12,
  "Animation": 16,
  "Comedy": 35,
  "Crime": 80,
  "Documentary": 99,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  "Thriller": 53,
  "War": 10752,
  "Western": 37
};

export const TMDB_KEYWORDS: KeywordMap = {
  "zombie": "12375",
  "time_travel": "4379",
  "superhero": "9715",
  "aliens": "9951",
  "robots": "6150",
  "monsters": "4767",
  "dystopia": "2853",
  "sports": "10755",
  "biography": "5565",
  "spies": "10727",
  "magic": "2343",
  "vampires": "3133",
  "serial_killer": "10714",
  "high_school": "6270",
  "prison": "378",
  "haunted_house": "3358",
  "heist": "642",
  "ghosts": "15133",
  "detective": "703"
};

export const QUIZ_POOLS: QuizPools = {
  "genre_anchors": [
    {
      "id": "ga_1",
      "question": "What is your current energy level?",
      "options": [
        { "text": "Comatose. I want to turn my brain off.", "vibe_score": { "Action": 3, "Comedy": 3, "Family": 2 }, "strict_filter": {} },
        { "text": "Active. I want to solve a mystery.", "vibe_score": { "Mystery": 4, "Crime": 3, "Thriller": 2 }, "strict_filter": {} },
        { "text": "Contemplative. Make me think about life.", "vibe_score": { "Drama": 4, "Documentary": 3, "Science Fiction": 2 }, "strict_filter": {} },
        { "text": "Chaotic. I want overstimulation.", "vibe_score": { "Horror": 3, "Action": 3, "Animation": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "ga_2",
      "question": "How much reality do you want right now?",
      "options": [
        { "text": "None. Take me to a completely different world.", "vibe_score": { "Fantasy": 4, "Science Fiction": 4, "Animation": 3 }, "strict_filter": {} },
        { "text": "Some. Real world, but heightened/impossible.", "vibe_score": { "Action": 3, "Horror": 3, "Comedy": 2 }, "strict_filter": {} },
        { "text": "Strict realism. Raw and gritty.", "vibe_score": { "Drama": 4, "History": 3, "Crime": 3, "Documentary": 3 }, "strict_filter": { "without_genres": "878,14,16" } }
      ]
    },
    {
      "id": "ga_3",
      "question": "What is the goal of this movie session?",
      "options": [
        { "text": "To laugh.", "vibe_score": { "Comedy": 5, "Animation": 3, "Family": 3 }, "strict_filter": {} },
        { "text": "To be scared.", "vibe_score": { "Horror": 5, "Thriller": 3 }, "strict_filter": {} },
        { "text": "To feel an adrenaline rush.", "vibe_score": { "Action": 4, "Adventure": 3 }, "strict_filter": {} },
        { "text": "To feel deep emotions.", "vibe_score": { "Drama": 4, "Romance": 3 }, "strict_filter": {} }
      ]
    },
    {
      "id": "ga_4",
      "question": "Choose a color palette.",
      "options": [
        { "text": "Bright, colorful, and saturated.", "vibe_score": { "Animation": 4, "Comedy": 3, "Family": 3, "Fantasy": 2 }, "strict_filter": {} },
        { "text": "Dark, shadowy, and moody.", "vibe_score": { "Horror": 3, "Thriller": 3, "Crime": 3, "Action": 1 }, "strict_filter": {} },
        { "text": "Sepia-toned or dusty.", "vibe_score": { "Western": 4, "History": 3, "War": 2 }, "strict_filter": {} },
        { "text": "Cold blues and sleek chrome.", "vibe_score": { "Science Fiction": 4, "Thriller": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "ga_5",
      "question": "Who are you watching this with?",
      "options": [
        { "text": "My family / kids.", "vibe_score": { "Family": 5, "Animation": 4, "Adventure": 2 }, "strict_filter": { "include_adult": false } },
        { "text": "A date.", "vibe_score": { "Romance": 4, "Comedy": 2, "Drama": 1 }, "strict_filter": {} },
        { "text": "My friends (Rowdy crowd).", "vibe_score": { "Horror": 3, "Comedy": 3, "Action": 3 }, "strict_filter": {} },
        { "text": "Myself (No judgment zone).", "vibe_score": { "Drama": 2, "Romance": 1, "Fantasy": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "ga_6",
      "question": "Pick a protagonist vibe.",
      "options": [
        { "text": "An unstoppable hero.", "vibe_score": { "Action": 4, "Adventure": 3, "Fantasy": 2 }, "strict_filter": {} },
        { "text": "An underdog trying their best.", "vibe_score": { "Drama": 3, "Comedy": 3, "Family": 2, "Sports": 2 }, "strict_filter": {} },
        { "text": "A morally gray anti-hero.", "vibe_score": { "Crime": 4, "Thriller": 3, "Western": 2 }, "strict_filter": {} },
        { "text": "A group of friends.", "vibe_score": { "Horror": 2, "Comedy": 3, "Adventure": 2 }, "strict_filter": {} }
      ]
    }
  ],
  "setting": [
    {
      "id": "set_1",
      "question": "Where should the story take place?",
      "options": [
        { "text": "Somewhere that doesn't exist.", "vibe_score": { "Fantasy": 4, "Science Fiction": 4, "Animation": 2 }, "strict_filter": { "with_genres": "14|878|16" } },
        { "text": "The real world, here and now.", "vibe_score": { "Drama": 2, "Comedy": 2, "Thriller": 2, "Romance": 2 }, "strict_filter": {} },
        { "text": "The past.", "vibe_score": { "History": 4, "Western": 3, "War": 3 }, "strict_filter": {} }
      ]
    },
    {
      "id": "set_2",
      "question": "What kind of scale are we talking?",
      "options": [
        { "text": "Epic. Entire worlds at stake.", "vibe_score": { "Adventure": 4, "Science Fiction": 3, "Fantasy": 3, "War": 2 }, "strict_filter": {} },
        { "text": "Intimate. Just a few people in a room.", "vibe_score": { "Drama": 4, "Thriller": 2, "Mystery": 2 }, "strict_filter": {} },
        { "text": "Standard city life.", "vibe_score": { "Comedy": 2, "Romance": 2, "Crime": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "set_3",
      "question": "How comfortable is the environment?",
      "options": [
        { "text": "Cozy and warm.", "vibe_score": { "Romance": 3, "Family": 3, "Comedy": 2 }, "strict_filter": {} },
        { "text": "Hostile and dangerous.", "vibe_score": { "Horror": 3, "Thriller": 3, "War": 3, "Western": 2 }, "strict_filter": {} },
        { "text": "Sterile and cold.", "vibe_score": { "Science Fiction": 3, "Thriller": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "set_4",
      "question": "Do you want technology to play a role?",
      "options": [
        { "text": "Yes, future tech or hacking.", "vibe_score": { "Science Fiction": 5 }, "strict_filter": { "with_genres": "878" } },
        { "text": "No, give me swords or fists.", "vibe_score": { "Fantasy": 3, "History": 3, "Action": 2 }, "strict_filter": {} },
        { "text": "Just normal phones and cars.", "vibe_score": { "Drama": 1, "Comedy": 1 }, "strict_filter": {} }
      ]
    }
  ],
  "tone": [
    {
      "id": "tone_1",
      "question": "How serious should this be?",
      "options": [
        { "text": "Dead serious.", "vibe_score": { "Drama": 3, "Thriller": 3, "War": 3 }, "strict_filter": {} },
        { "text": "Mostly serious, but with jokes.", "vibe_score": { "Action": 3, "Adventure": 3 }, "strict_filter": {} },
        { "text": "Silly and lighthearted.", "vibe_score": { "Comedy": 4, "Animation": 3, "Family": 3 }, "strict_filter": {} }
      ]
    },
    {
      "id": "tone_2",
      "question": "What about the ending?",
      "options": [
        { "text": "I need a happy ending.", "vibe_score": { "Romance": 3, "Family": 3, "Comedy": 2, "Animation": 2 }, "strict_filter": {} },
        { "text": "I like ambiguous or sad endings.", "vibe_score": { "Drama": 4, "Horror": 2, "Mystery": 2 }, "strict_filter": {} },
        { "text": "I don't care, as long as it's wild.", "vibe_score": { "Science Fiction": 2, "Fantasy": 2, "Action": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "tone_3",
      "question": "Pacing preference?",
      "options": [
        { "text": "Slow burn. Let it simmer.", "vibe_score": { "Thriller": 3, "Western": 3, "Drama": 3, "Mystery": 3 }, "strict_filter": {} },
        { "text": "Fast-paced. Don't bore me.", "vibe_score": { "Action": 4, "Adventure": 3, "Comedy": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "tone_4",
      "question": "Do you want to see something strange?",
      "options": [
        { "text": "Yes, weird is good.", "vibe_score": { "Fantasy": 3, "Science Fiction": 3, "Horror": 2, "Animation": 2 }, "strict_filter": {} },
        { "text": "No, keep it grounded.", "vibe_score": { "Drama": 2, "Romance": 2, "History": 2 }, "strict_filter": {} }
      ]
    }
  ],
  "keywords": [
    {
      "id": "key_1",
      "question": "Pick a central theme.",
      "options": [
        { "text": "Love and relationships.", "vibe_score": { "Romance": 4, "Drama": 2 }, "strict_filter": {} },
        { "text": "Crime and Justice.", "vibe_score": { "Crime": 4, "Mystery": 3, "Thriller": 2 }, "strict_filter": {} },
        { "text": "Survival against odds.", "vibe_score": { "Adventure": 3, "Horror": 3, "War": 3 }, "strict_filter": {} },
        { "text": "Coming of age / Growing up.", "vibe_score": { "Drama": 3, "Comedy": 2, "Family": 2 }, "strict_filter": {} }
      ]
    },
    {
      "id": "key_2",
      "question": "What drives the conflict?",
      "options": [
        { "text": "A monster or creature.", "vibe_score": { "Horror": 3, "Science Fiction": 3, "Fantasy": 3 }, "strict_filter": { "with_keywords": "4767|12375|9951" } },
        { "text": "A human villain.", "vibe_score": { "Action": 2, "Thriller": 2, "Crime": 2 }, "strict_filter": {} },
        { "text": "Society / The System.", "vibe_score": { "Drama": 3, "Documentary": 3, "History": 2 }, "strict_filter": {} },
        { "text": "Misunderstandings.", "vibe_score": { "Comedy": 3, "Romance": 3 }, "strict_filter": {} }
      ]
    },
    {
      "id": "key_3",
      "question": "How loud should the movie be?",
      "options": [
        { "text": "Explosions loud.", "vibe_score": { "Action": 4, "War": 4, "Science Fiction": 2 }, "strict_filter": {} },
        { "text": "Screaming loud.", "vibe_score": { "Horror": 4 }, "strict_filter": {} },
        { "text": "Conversational.", "vibe_score": { "Drama": 2, "Comedy": 2, "Romance": 2 }, "strict_filter": {} },
        { "text": "Musical numbers.", "vibe_score": { "Music": 5, "Animation": 2, "Family": 2 }, "strict_filter": { "with_genres": "10402" } }
      ]
    },
    {
      "id": "key_4",
      "question": "Are you interested in the supernatural?",
      "options": [
        { "text": "Yes, magic/ghosts/powers.", "vibe_score": { "Fantasy": 3, "Horror": 3, "Science Fiction": 2 }, "strict_filter": {} },
        { "text": "No, keep it strictly natural.", "vibe_score": { "Drama": 2, "Comedy": 2, "Crime": 2 }, "strict_filter": { "without_genres": "14,878,27" } }
      ]
    }
  ]
};