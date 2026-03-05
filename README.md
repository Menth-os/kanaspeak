# KanaSpeak

KanaSpeak is a **browser-based Japanese speaking trainer** designed to
help learners practice reading and pronouncing Japanese words,
sentences, and short dialogs.

It combines:

-   Speech recognition (Web Speech API)
-   Speech synthesis (TTS)
-   Token-based Japanese text parsing
-   Ruby / furigana rendering
-   Accuracy scoring

The goal is simple: **see Japanese text, speak it aloud, and get instant
feedback.**

The app runs entirely in the browser --- **no server required**.

------------------------------------------------------------------------

# Demo

Live version: https://menth-os.github.io/kanaspeak/

------------------------------------------------------------------------

# Features

## Speaking Practice

KanaSpeak lets you practice speaking Japanese in three modes.

### Words

Single vocabulary items.

Example:

猫

You read the word aloud and the speech recognizer checks if it matches.

------------------------------------------------------------------------

### Sentences

Short sentences used in everyday Japanese.

Example:

チェックインお願いします。

The app evaluates whether the spoken sentence matches the expected
reading.

------------------------------------------------------------------------

### Dialogs

Short multi-turn conversations.

Example:

太郎: 予約しています。\
店員: お名前は太郎様ですね？

The app alternates between:

-   bot speaking
-   user responding

This simulates basic conversation flow.

------------------------------------------------------------------------

# Speech Recognition

KanaSpeak uses the **Web Speech API** for recognition.

The recognizer:

1.  Listens to the microphone
2.  Converts speech to text
3.  Compares the result with the expected reading

Matching is tolerant and configurable.

Settings include:

-   Leniency
-   Success threshold
-   Listening timeout

------------------------------------------------------------------------

# Speech Synthesis

The app can read text aloud using the browser's **speech synthesis
engine**.

Controls:

-   Speak
-   Slow speak
-   Dialog bot speaking

Japanese voices are automatically detected and selectable in the
settings.

------------------------------------------------------------------------

## Natural Question Intonation

Japanese questions often end with the particle:

か

Example:

予約していますか

Since browser TTS engines do not reliably support pitch control,
KanaSpeak improves the natural sounding output by **adding a question
mark internally for speech synthesis**.

Example:

予約していますか → 予約していますか？

This change:

-   affects **only the spoken audio**
-   does **not change the displayed text**
-   does **not affect speech recognition**

------------------------------------------------------------------------

# Ruby / Furigana Support

Japanese text is stored as token objects.

Example:

``` js
{
  "t": "会社",
  "r": "かいしゃ"
}
```

Where:

  field   meaning
  ------- ----------------------------------
  t       text shown to the user
  r       reading used for speech matching

Tokens allow:

-   accurate speech matching
-   furigana rendering
-   flexible display formatting

------------------------------------------------------------------------

# Data Structure

All learning content is stored in **data.js**.

The structure includes:

-   WORDS
-   SENTENCES
-   DIALOGS

Each entry contains:

-   id
-   tokens
-   translations

Example sentence:

``` js
{
  id: "sentence_01",
  tokens: [
    { "t": "チェックイン" },
    { "t": "お願いします", "r": "おねがいします" }
  ],
  en: "Please check me in.",
  de: "Bitte checken Sie mich ein."
}
```

------------------------------------------------------------------------

# Matching System

KanaSpeak does **not require exact speech recognition results**.

The algorithm:

1.  Converts tokens to expected reading
2.  Removes punctuation
3.  Normalizes hiragana / katakana
4.  Computes similarity score

If the score exceeds the configured **success threshold**, the answer is
accepted.

------------------------------------------------------------------------

# Shuffle Mode

By default the trainer presents items **in order**.

Example:

1 → 2 → 3 → 4 → loop

Shuffle mode randomizes the order.

The shuffle button toggles:

Sequential → Random

------------------------------------------------------------------------

# Settings

Available options:

  Setting             Description
  ------------------- ----------------------------
  UI language         English / German
  Japanese voice      Voice used for TTS
  Leniency            Speech matching tolerance
  Success threshold   Required score
  Listening timeout   How long recognition waits
  Shuffle             Random item order

------------------------------------------------------------------------

# Technology

KanaSpeak is intentionally lightweight.

Stack:

-   HTML
-   CSS
-   JavaScript
-   Bootstrap 5.3
-   Font Awesome
-   Web Speech API

No build step is required.

Everything runs directly in the browser.

------------------------------------------------------------------------

# Browser Compatibility

Best support:

-   Chrome
-   Edge

Speech recognition is **not supported in Safari** and **partially
limited in Firefox**.

------------------------------------------------------------------------

# Running Locally

Clone the repository:

``` bash
git clone https://github.com/yourusername/kanaspeak.git
```

Then open:

index.html

No server required.

If microphone access fails, run a simple local server:

``` bash
python -m http.server
```

------------------------------------------------------------------------

# Contributing

Suggestions and improvements are welcome.

Possible contributions:

-   more vocabulary
-   more dialogs
-   better scoring algorithms
-   additional UI languages

------------------------------------------------------------------------

# License

MIT License
