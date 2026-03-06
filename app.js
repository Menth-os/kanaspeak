

  function pickRandomIndex(n, prevIdx = -1) {
    // Try a few times to avoid repeats; fallback to any.
    if (!Number.isFinite(n) || n <= 0) return 0;
    if (n === 1) return 0;
    let idx = prevIdx;
    for (let k = 0; k < 6; k++) {
      const r = Math.floor(Math.random() * n);
      if (r !== prevIdx) { idx = r; break; }
    }
    if (idx === prevIdx) idx = (prevIdx + 1) % n;
    return idx;
  }
/* JP Speak & Read Trainer
   - Web Speech API speech recognition + synthesis
   - UI i18n (EN/DE) stored in localStorage
   - Highlighting + lenient matching with near-match scoring
*/

(() => {
  'use strict';

  // ---------- i18n ----------
  const I18N = {
    en: {
      tagline: "Reading + speaking practice with speech APIs",
      unsupported_title: "Not supported",
      unsupported_body: "This site needs Web Speech API (speech recognition + synthesis). Use Chrome / Edge / a compatible browser.",
      start_title: "Choose a mode",
      start_body: "Speak Japanese into the mic. The text highlights as you match it.",
      mode_word: "Word",
      mode_sentence: "Sentence",
      mode_dialog: "Dialog",
      chip_mic: "Mic required",
      chip_tts: "Japanese TTS",
      chip_local: "Runs locally",
      tips_title: "Tips",
      tips_1: "Allow microphone access when prompted.",
      tips_2: "Speak clearly; short pauses help.",
      tips_3: "If recognition is strict, try again — near matches are counted.",
      tips_4: "The sample content uses spaces between Japanese “chunks” to improve highlighting.",
      btn_listen: "Listen",
      btn_stop: "Stop",
      btn_speak: "Play",
	  btn_speak_slow: "Slow",
      btn_retry: "Retry",
      btn_next: "Next",
      shuffle_label: "Shuffle",
      recognized_label: "Recognized:",
      dialog_title: "Dialog",
      footer_note: "Works best in Chrome/Edge. No data leaves your device.",
      settings_title: "Settings",
      settings_voice: "Japanese voice",
      settings_voice_help: "Pick a Japanese voice if available.",
      settings_leniency: "Leniency",
      settings_leniency_strict: "Strict",
      settings_leniency_loose: "Loose",
      settings_success: "Success threshold",
      settings_pause: "Listening timeout",
      settings_pause_help: "How long the app keeps listening after you stop speaking. Increase this if you need more time or pause between words.",
      settings_recog: "Recognition language",
      settings_recog_help: "Use ja-JP for best Japanese results.",
      settings_reset: "Reset progress",
      settings_note: "Note: Web Speech behavior varies by device/OS. This app uses interim results for highlighting.",
      pill_no_recognition: "Speech recognition not available",
      pill_no_synthesis: "Speech synthesis not available",
      pill_partial: "Limited support detected",
      rating_success: "Success",
      rating_almost: "Almost",
      rating_fail: "Try again",
      mode_hiragana: "Hiragana",
      mode_katakana: "Katakana",
      dialog_done: "Dialog finished"
    },
    de: {
      tagline: "Lese- und Sprechtraining mit Speech-APIs",
      unsupported_title: "Nicht unterstützt",
      unsupported_body: "Diese Seite braucht die Web Speech API (Erkennung + Sprachausgabe). Nutze Chrome/Edge oder einen kompatiblen Browser.",
      start_title: "Modus auswählen",
      start_body: "Sprich Japanisch ins Mikrofon. Der Text wird beim Treffen hervorgehoben.",
      mode_word: "Wort",
      mode_sentence: "Satz",
      mode_dialog: "Dialog",
      chip_mic: "Mikro nötig",
      chip_tts: "Japanische Stimme",
      chip_local: "Lokal im Browser",
      tips_title: "Tipps",
      tips_1: "Mikrofonzugriff erlauben, wenn gefragt.",
      tips_2: "Deutlich sprechen; kurze Pausen helfen.",
      tips_3: "Wenn es zu streng ist: nochmal — ähnliche Treffer zählen.",
      tips_4: "Die Beispieltexte enthalten Leerzeichen zwischen japanischen „Chunks“ für bessere Hervorhebung.",
      btn_listen: "Sprechen",
      btn_stop: "Stopp",
      btn_speak: "Abspielen",
	  btn_speak_slow: "Langsam",
      btn_retry: "Nochmal",
      btn_next: "Weiter",
      shuffle_label: "Shuffle",
      recognized_label: "Erkannt:",
      dialog_title: "Dialog",
      footer_note: "Am besten in Chrome/Edge. Keine Daten verlassen dein Gerät.",
      settings_title: "Einstellungen",
      settings_voice: "Japanische Stimme",
      settings_voice_help: "Wenn verfügbar, eine japanische Stimme wählen.",
      settings_leniency: "Toleranz",
      settings_leniency_strict: "Streng",
      settings_leniency_loose: "Locker",
      settings_success: "Erfolgs-Schwelle",
      settings_pause: "Hör-Timeout",
      settings_pause_help: "Wie lange die App nach einer Sprechpause weiter zuhört. Erhöhe den Wert, wenn du mehr Zeit brauchst oder zwischen Wörtern pausierst.",
      settings_recog: "Erkennungs-Sprache",
      settings_recog_help: "Für Japanisch ist ja-JP meist am besten.",
      settings_reset: "Fortschritt zurücksetzen",
      settings_note: "Hinweis: Web Speech verhält sich je nach Gerät/OS unterschiedlich. Diese App nutzt Zwischenresultate zum Hervorheben.",
      pill_no_recognition: "Spracherkennung nicht verfügbar",
      pill_no_synthesis: "Sprachausgabe nicht verfügbar",
      pill_partial: "Eingeschränkte Unterstützung erkannt",
      rating_success: "Erfolg",
      rating_almost: "Fast",
      rating_fail: "Nochmal versuchen",
      dialog_done: "Dialog fertig"
    }
  };

  const IGNORE_PUNCT = new Set(['。','、','「','」','…','・','—','～','（','）','『','』']);

  const LS = {
    uiLang: 'jpTrainer.uiLang',
    voiceUri: 'jpTrainer.voiceUri',
    leniency: 'jpTrainer.leniency',
    success: 'jpTrainer.success',
    recogLang: 'jpTrainer.recogLang',
    pauseMs: 'jpTrainer.pauseMs',
    shuffle: 'jpTrainer.shuffle',
    progress: 'jpTrainer.progress'
  };
  const JOYO_KANJI_JSON_URL = 'joyo_kanji_readings.json';
  let JOYO_KANJI_DICT = Object.create(null);
  let PROJECT_READING_LEXICON = null;

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  function safeJsonParse(s, fallback) {
    try { return JSON.parse(s); } catch { return fallback; }
  }

  function normalizeWs(s) {
    // Normalize weird whitespace: fullwidth space, zero-width, BOM, etc.
    return (s || '')
      .replace(/[\u3000]/g, ' ')
      .replace(/[\u200B-\u200F\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeSpaces(s) {
    return normalizeWs(s);
  }

  // Katakana -> Hiragana
  function kataToHira(str) {
    return (str || '').replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  // Keep only kana/kanji/latin/digits/spaces (remove most punctuation)
  function cleanForMatch(str) {
    // Clean transcript/expected for matching: remove punctuation/symbols and normalize whitespace.
    const noP = stripPunct(str);
    return normalizeWs(noP);
  }

  function stripPunct(str) {
    // Remove punctuation/symbols broadly (covers Japanese/Unicode punctuation).
    // Keep letters/numbers/kana/kanji and spaces; replace everything punctuation-like with spaces.
    return (str || '')
      .replace(/[\p{P}\p{S}]/gu, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Basic kana confusables (small ya/yu/yo, long vowel mark, etc.)
  function normalizeKanaLoose(str) {
    let s = kataToHira(str);
    s = s.replace(/ー/g, 'ー'); // keep but allow later removal
    // reduce some common variations
    s = s.replace(/づ/g, 'ず').replace(/ぢ/g, 'じ');
    // sometimes long vowels appear as う or ー; later we remove both for comparison (depending on leniency)
    return s;
  }


  function stripOkuriganaMarkers(s) {
    return (s || '').replace(/[.\-!]/g, '');
  }

  function normalizeReadingText(str) {
    return normalizeKanaLoose(stripPunct(stripOkuriganaMarkers(str))).replace(/\s+/g, '');
  }

  function isKanaChar(ch) {
    return /[ぁ-ゟァ-ヿー]/u.test(ch || '');
  }

  function isKanjiChar(ch) {
    return /[㐀-䶿一-鿿々〆ヵヶ]/u.test(ch || '');
  }

  function cleanLatin(str) {
    return ((str || '').toLowerCase().match(/[a-z0-9]+/g) || []).join('');
  }

  const HIRA_ROMAJI_DIGRAPHS = {
    'きゃ':'kya','きゅ':'kyu','きょ':'kyo','ぎゃ':'gya','ぎゅ':'gyu','ぎょ':'gyo',
    'しゃ':'sha','しゅ':'shu','しょ':'sho','じゃ':'ja','じゅ':'ju','じょ':'jo',
    'ちゃ':'cha','ちゅ':'chu','ちょ':'cho','にゃ':'nya','にゅ':'nyu','にょ':'nyo',
    'ひゃ':'hya','ひゅ':'hyu','ひょ':'hyo','びゃ':'bya','びゅ':'byu','びょ':'byo',
    'ぴゃ':'pya','ぴゅ':'pyu','ぴょ':'pyo','みゃ':'mya','みゅ':'myu','みょ':'myo',
    'りゃ':'rya','りゅ':'ryu','りょ':'ryo'
  };

  const HIRA_ROMAJI_BASE = {
    'あ':'a','い':'i','う':'u','え':'e','お':'o','か':'ka','き':'ki','く':'ku','け':'ke','こ':'ko',
    'さ':'sa','し':'shi','す':'su','せ':'se','そ':'so','た':'ta','ち':'chi','つ':'tsu','て':'te','と':'to',
    'な':'na','に':'ni','ぬ':'nu','ね':'ne','の':'no','は':'ha','ひ':'hi','ふ':'fu','へ':'he','ほ':'ho',
    'ま':'ma','み':'mi','む':'mu','め':'me','も':'mo','や':'ya','ゆ':'yu','よ':'yo','ら':'ra','り':'ri','る':'ru','れ':'re','ろ':'ro',
    'わ':'wa','を':'o','ん':'n','が':'ga','ぎ':'gi','ぐ':'gu','げ':'ge','ご':'go','ざ':'za','じ':'ji','ず':'zu','ぜ':'ze','ぞ':'zo',
    'だ':'da','ぢ':'ji','づ':'zu','で':'de','ど':'do','ば':'ba','び':'bi','ぶ':'bu','べ':'be','ぼ':'bo','ぱ':'pa','ぴ':'pi','ぷ':'pu','ぺ':'pe','ぽ':'po',
    'ぁ':'a','ぃ':'i','ぅ':'u','ぇ':'e','ぉ':'o','ゔ':'vu','ゐ':'i','ゑ':'e','ゎ':'wa'
  };

  function hiraToRomaji(str) {
    const s = normalizeReadingText(str);
    let out = '';
    let geminate = false;

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (ch === 'っ') {
        geminate = true;
        continue;
      }
      if (ch === 'ー') {
        const m = out.match(/([aeiou])[^aeiou]*$/);
        if (m) out += m[1];
        continue;
      }

      const pair = s.slice(i, i + 2);
      let roma = '';
      if (HIRA_ROMAJI_DIGRAPHS[pair]) {
        roma = HIRA_ROMAJI_DIGRAPHS[pair];
        i++;
      } else {
        roma = HIRA_ROMAJI_BASE[ch] || ch;
      }

      if (geminate && roma) {
        roma = roma[0] + roma;
        geminate = false;
      }

      out += roma;
    }

    return cleanLatin(out);
  }

  function addLexiconEntry(map, surface, reading) {
    const key = cleanForMatch(surface).replace(/\s+/g, '');
    const value = normalizeReadingText(reading);
    if (!key || !value) return;
    if (!map[key]) map[key] = new Set();
    map[key].add(value);
  }

  function buildProjectReadingLexicon() {
    const map = Object.create(null);
    const data = window.JP_DATA || {};
    const groups = ['words', 'sentences', 'dialogs', 'hiragana', 'katakana'];

    const ingestItem = (item) => {
      if (!item) return;
      const ruby = getRubyMap(item) || {};
      if (item.jp && item.reading) addLexiconEntry(map, item.jp, item.reading);
      if (item.jp && item.furigana) addLexiconEntry(map, item.jp, item.furigana);
      if (item.reading && item.tokens && item.tokens.length === 1) addLexiconEntry(map, tokenToText(item.tokens[0]), item.reading);
      if (item.furigana && item.tokens && item.tokens.length === 1) addLexiconEntry(map, tokenToText(item.tokens[0]), item.furigana);
      Object.entries(ruby).forEach(([surface, reading]) => addLexiconEntry(map, surface, reading));

      const tokens = getTokensFromItem(item);
      tokens.forEach((tok) => {
        const surface = tokenToText(tok);
        const reading = tokenToReading(tok) || ruby[surface] || '';
        if (surface && reading) addLexiconEntry(map, surface, reading);
      });
    };

    groups.forEach((group) => {
      const items = Array.isArray(data[group]) ? data[group] : [];
      items.forEach((item) => {
        ingestItem(item);
        if (Array.isArray(item.turns)) item.turns.forEach(ingestItem);
      });
    });

    return map;
  }

  function projectReadingsForSurface(surface) {
    if (!PROJECT_READING_LEXICON) PROJECT_READING_LEXICON = buildProjectReadingLexicon();
    const key = cleanForMatch(surface).replace(/\s+/g, '');
    return key && PROJECT_READING_LEXICON[key] ? Array.from(PROJECT_READING_LEXICON[key]) : [];
  }

  function joyoReadingsForKanji(ch) {
    const entry = JOYO_KANJI_DICT && JOYO_KANJI_DICT[ch];
    return entry && Array.isArray(entry.hiragana) ? entry.hiragana.map(normalizeReadingText).filter(Boolean) : [];
  }

  function getReadingsForSurface(surface) {
    const key = cleanForMatch(surface).replace(/\s+/g, '');
    if (!key) return [];

    const out = [];
    const seen = new Set();
    const push = (value) => {
      const v = normalizeReadingText(value);
      if (!v || seen.has(v)) return;
      seen.add(v);
      out.push(v);
    };

    projectReadingsForSurface(key).forEach(push);
    if (Array.from(key).every(ch => !isKanjiChar(ch) && (isKanaChar(ch) || /[a-z0-9]/i.test(ch)))) push(key);
    if (key.length === 1 && isKanjiChar(key)) joyoReadingsForKanji(key).forEach(push);

    return out;
  }

  function readingCoverageScore(expectedReading, spokenSurface) {
    const expected = normalizeReadingText(expectedReading);
    const spoken = cleanForMatch(spokenSurface).replace(/\s+/g, '');
    if (!expected || !spoken) return 0;

    const exactSurfaceReadings = getReadingsForSurface(spoken);
    let best = 0;
    exactSurfaceReadings.forEach((rd) => { best = Math.max(best, similarity(expected, rd)); });

    let states = new Set([0]);
    for (const ch of Array.from(spoken)) {
      const candidates = [];
      if (isKanaChar(ch)) {
        candidates.push(normalizeReadingText(ch));
      } else if (isKanjiChar(ch)) {
        joyoReadingsForKanji(ch).forEach((rd) => candidates.push(rd));
      } else if (/[a-z0-9]/i.test(ch)) {
        candidates.push(cleanLatin(ch));
      } else if (ch === 'ー') {
        candidates.push('');
      }

      const next = new Set(states);
      for (const pos of states) {
        for (const cand of candidates) {
          if (!cand) {
            next.add(pos);
            continue;
          }
          if (expected.startsWith(cand, pos)) next.add(pos + cand.length);
        }
      }
      states = next;
    }

    for (const pos of states) best = Math.max(best, pos / Math.max(expected.length, 1));
    return clamp(best, 0, 1);
  }

  function scoreExpectedVsSpokenAdvanced(surface, reading, spoken, leniency01) {
    const spokenClean = cleanForMatch(spoken);
    if (!spokenClean) return 0;

    const expectedSurface = cleanForMatch(surface || '');
    const expectedReading = normalizeReadingText(reading || '');
    const expectedFallbackReading = normalizeReadingText(surface || '');
    const expectedReadings = [];
    const pushExpected = (value) => {
      const v = normalizeReadingText(value);
      if (v && !expectedReadings.includes(v)) expectedReadings.push(v);
    };

    if (expectedReading) pushExpected(expectedReading);
    if (expectedSurface) {
      getReadingsForSurface(expectedSurface).forEach(pushExpected);
      if (!expectedReadings.length) pushExpected(expectedSurface);
    }
    if (expectedFallbackReading) pushExpected(expectedFallbackReading);

    const spokenReadings = getReadingsForSurface(spokenClean);
    const spokenRomaji = [];
    const spokenLatin = cleanLatin(spokenClean);
    if (spokenLatin) spokenRomaji.push(spokenLatin);
    const spokenKanaRomaji = hiraToRomaji(spokenClean);
    if (spokenKanaRomaji) spokenRomaji.push(spokenKanaRomaji);
    spokenReadings.forEach((rd) => {
      const roma = hiraToRomaji(rd);
      if (roma) spokenRomaji.push(roma);
    });

    let best = expectedSurface ? tokenScore(expectedSurface, spokenClean, leniency01) : 0;

    expectedReadings.forEach((expRd) => {
      best = Math.max(best, tokenScore(expRd, spokenClean, leniency01));
      spokenReadings.forEach((spRd) => {
        best = Math.max(best, tokenScore(expRd, spRd, leniency01));
      });
      best = Math.max(best, readingCoverageScore(expRd, spokenClean));

      const expRoma = hiraToRomaji(expRd);
      if (expRoma) {
        spokenRomaji.forEach((spRoma) => {
          best = Math.max(best, similarity(expRoma, spRoma));
        });
      }
    });

    return clamp(best, 0, 1);
  }

  async function loadJoyoKanjiDictionary() {
    try {
      const res = await fetch(JOYO_KANJI_JSON_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      JOYO_KANJI_DICT = data && typeof data === 'object' ? data : Object.create(null);
    } catch (err) {
      JOYO_KANJI_DICT = Object.create(null);
      console.warn('Failed to load Joyo kanji dictionary:', err);
    }
  }

  function levenshtein(a, b) {
    a = a || ''; b = b || '';
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;
    for (let i = 1; i <= m; i++) {
      let prev = dp[0];
      dp[0] = i;
      for (let j = 1; j <= n; j++) {
        const tmp = dp[j];
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
        prev = tmp;
      }
    }
    return dp[n];
  }

  // similarity in [0..1]
  function similarity(a, b) {
    a = a || ''; b = b || '';
    if (!a && !b) return 1;
    const dist = levenshtein(a, b);
    const denom = Math.max(a.length, b.length, 1);
    return 1 - (dist / denom);
  }

  // Token similarity with leniency slider
  function tokenScore(expected, spoken, leniency01) {
    const e0 = normalizeKanaLoose(stripPunct(expected)).replace(/\s+/g,'');
    const s0 = normalizeKanaLoose(stripPunct(spoken)).replace(/\s+/g,'');

    const removeLong = leniency01 >= 0.40;
    const removeSmall = leniency01 >= 0.65;

    const cleanup = (x) => {
      let t = x;
      if (removeLong) t = t.replace(/[ーう]/g, '');
      if (removeSmall) t = t.replace(/[っ]/g, '');
      return t;
    };

    const e = cleanup(e0);
    const s = cleanup(s0);

    let best = similarity(e, s);

    // Prevent nonsense matches: only allow a weak "contains" bump if the chunk is substantial.
    const chunk = (s.length < e.length) ? s : e;
    const big = (s.length < e.length) ? e : s;

    if (chunk.length >= 3 && big.includes(chunk)) {
      best = Math.max(best, 0.70);
    }

    return clamp(best, 0, 1);
  }

  // Align expected tokens with spoken tokens allowing skips.
  // Returns {matches: boolean[], score: 0..1, matchedCount}
  function alignTokens(expectedTokens, spokenTokens, leniency01, rubyMap) {
    const exp = expectedTokens.slice();
    const spk = spokenTokens.slice();

    const matches = new Array(exp.length).fill(false);
    const threshold = (0.84 - leniency01 * 0.18);

    let i = 0, j = 0;
    let matched = 0;

    const scoreExpectedVsSpoken = (expTok, spTok) => {
      const { surface, reading } = normalizeExpectedForMatch(expTok, rubyMap);
      return scoreExpectedVsSpokenAdvanced(surface, reading || surface, spTok, leniency01);
    };

    while (i < exp.length && j < spk.length) {
      const s = scoreExpectedVsSpoken(exp[i], spk[j]);

      if (s >= threshold) {
        matches[i] = true;
        matched++;
        i++; j++;
        continue;
      }

      const sSkipSpoken = (j + 1 < spk.length) ? scoreExpectedVsSpoken(exp[i], spk[j + 1]) : 0;
      const sSkipExpected = (i + 1 < exp.length) ? scoreExpectedVsSpoken(exp[i + 1], spk[j]) : 0;

      if (sSkipSpoken >= sSkipExpected && sSkipSpoken >= threshold) j++;
      else if (sSkipExpected >= threshold) i++;
      else {
        if ((spk[j] || '').length <= 1) j++;
        else i++;
      }
    }

    const score = exp.length ? matched / exp.length : 0;
    return { matches, score, matchedCount: matched };
  }

  // For transcripts without spaces, score the whole sequence against the joined expected reading/surface.
  function roughCharProgress(expectedTokens, transcript, leniency01, rubyMap) {
    const spokenJoined = cleanForMatch(transcript).replace(/\s+/g,'');
    if (!spokenJoined) return 0;

    const surfaceJoined = expectedTokens.map(tok => normalizeExpectedForMatch(tok, rubyMap).surface).join('');
    const readingJoined = expectedTokens.map(tok => {
      const ex = normalizeExpectedForMatch(tok, rubyMap);
      return ex.reading || ex.surface;
    }).join('');

    return scoreExpectedVsSpokenAdvanced(surfaceJoined, readingJoined, spokenJoined, leniency01);
  }

  // Token helpers: token can be string or {t, r}
  function tokenToText(tok) {
    if (tok == null) return '';
    if (typeof tok === 'string') return tok;
    return tok.t || '';
  }

  function tokenToReading(tok) {
    if (tok == null) return '';
    if (typeof tok === 'string') return '';
    return tok.r || '';
  }

  function normalizeExpectedForMatch(tok, rubyMap) {
    // Accept:
    // - display token: string or {t,r}
    // - match token: {surface, reading} (already cleaned)
    if (tok && typeof tok === 'object' && (Object.prototype.hasOwnProperty.call(tok, 'surface') || Object.prototype.hasOwnProperty.call(tok, 'reading')) && !Object.prototype.hasOwnProperty.call(tok, 't')) {
      const surface = cleanForMatch(tok.surface || '');
      const reading = cleanForMatch(tok.reading || '');
      return { surface, reading };
    }

    const surfaceRaw = tokenToText(tok);
    let readingRaw = tokenToReading(tok);
    if (!readingRaw && rubyMap && surfaceRaw && rubyMap[surfaceRaw]) readingRaw = rubyMap[surfaceRaw];

    const surface = cleanForMatch(surfaceRaw);
    const reading = cleanForMatch(readingRaw);

    return { surface, reading };
  }

  function splitTokensMaybe(str) {
    const s = normalizeSpaces(stripPunct(str));
    if (!s) return [];
    if (/\s/.test(s)) return s.split(' ');
    return [s];
  }

  function nowYear() { return new Date().getFullYear(); }

  // ---------- State ----------
  const state = {
    uiLang: localStorage.getItem(LS.uiLang) || 'en',
    mode: null, // 'word' | 'sentence' | 'dialog'
    index: 0,
    dialogTurn: 0,
    listening: false,
    lastTranscript: '',
    voices: [],
    voiceUri: localStorage.getItem(LS.voiceUri) || '',
    leniency: Number(localStorage.getItem(LS.leniency) || '45'), // 0..100
    success: Number(localStorage.getItem(LS.success) || '90'),   // 50..95
    recogLang: localStorage.getItem(LS.recogLang) || 'ja-JP',
    pauseMs: Number(localStorage.getItem(LS.pauseMs) || '6000'),
    shuffle: (localStorage.getItem(LS.shuffle) || '0') === '1',
    progress: safeJsonParse(localStorage.getItem(LS.progress) || '{}', {})
  };

  function t(key) {
    return (I18N[state.uiLang] && I18N[state.uiLang][key]) || I18N.en[key] || key;
  }

  function setUiLang(lang) {
    state.uiLang = lang;
    localStorage.setItem(LS.uiLang, lang);
    $('#uiLangLabel').textContent = lang === 'de' ? 'Deutsch' : 'English';
    $$('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      el.textContent = t(k);
    });
    // Update dynamic bits
    renderCurrent();
    renderDialogTranscript();
  }

  // ---------- Feature checks ----------
  function detectSpeechSupport() {
    const hasRecognition = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
    const hasSynthesis = !!(window.speechSynthesis);
    return { hasRecognition, hasSynthesis };
  }

  function showFeaturePill(message) {
    const pill = $('#featurePill');
    $('#featurePillText').textContent = message;
    pill.classList.remove('d-none');
  }

  function hideFeaturePill() {
    $('#featurePill').classList.add('d-none');
  }

  function showUnsupported(details) {
    $('#unsupportedCard').classList.remove('d-none');
    $('#startScreen').classList.add('d-none');
    $('#trainerScreen').classList.add('d-none');
    $('#unsupportedDetails').textContent = details || '';
  }

  function showStart() {
    $('#unsupportedCard').classList.add('d-none');
    $('#startScreen').classList.remove('d-none');
    $('#trainerScreen').classList.add('d-none');
  }

  function showTrainer() {
    $('#unsupportedCard').classList.add('d-none');
    $('#startScreen').classList.add('d-none');
    $('#trainerScreen').classList.remove('d-none');
  }

  // ---------- Speech synthesis ----------
  function refreshVoices() {
    const voicesAll = (window.speechSynthesis?.getVoices?.() || []);
    // Only Japanese voices. (If you have just one installed, the list will still be short.)
    const jaRaw = voicesAll.filter(v => ((v.lang || '').toLowerCase().startsWith('ja')));
    // De-duplicate by voiceURI (some platforms return duplicates)
    const seen = new Set();
    const ja = jaRaw.filter(v => {
      if (!v.voiceURI) return false;
      if (seen.has(v.voiceURI)) return false;
      seen.add(v.voiceURI);
      return true;
    });

    state.voices = ja;

    const sel = $('#voiceSelect');
    sel.innerHTML = '';

    ja.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.voiceURI;
      opt.textContent = `${v.name} (${v.lang})`;
      sel.appendChild(opt);
    });

    const stored = state.voiceUri;
    const hasStored = ja.some(v => v.voiceURI === stored);

    if (hasStored) sel.value = stored;
    else if (ja.length) sel.value = ja[0].voiceURI;

    // Only persist when we actually have a selection
    if (sel.value) {
      state.voiceUri = sel.value;
      localStorage.setItem(LS.voiceUri, state.voiceUri);
    }
  }

function pickVoice() {
    const uri = state.voiceUri;
    const v = state.voices.find(x => x.voiceURI === uri);
    return v || state.voices[0] || null;
  }

  function ttsTextForNaturalProsody(text) {
    const s = (text || '').toString().trim();
    if (!s) return s;

    // If already a question mark exists, keep it.
    if (/[？?]\s*$/.test(s)) return s;

    // Check if the sentence ends with か (question particle), allowing trailing punctuation.
    const core = s.replace(/[。！？!…]+$/g, '').trim();
    if (core.endsWith('か')) return s + '？';

    return s;
  }




  
  function speak(text, rate = 0.90) {
  if (!window.speechSynthesis) return;
  // Any new speak request cancels the previous one.
  state.ttsSeqId = (state.ttsSeqId || 0) + 1;
  window.speechSynthesis.cancel();

  // Add ? only for speech synthesis (does not affect displayed text / matching)
  const ttsText = ttsTextForNaturalProsody(text);

  const utt = new SpeechSynthesisUtterance(ttsText);
  const v = pickVoice();
  if (v) {
    utt.voice = v;
    if (v.lang) utt.lang = v.lang;
  } else {
    utt.lang = 'ja-JP';
  }

  utt.rate = rate;
  utt.pitch = 1.0;

  window.speechSynthesis.speak(utt);
}

// Speak chunk-by-chunk with small pauses (better for learners + clearer prosody).
function speakChunks(text, rate = 0.75, pauseMs = 220) {
  if (!window.speechSynthesis) return;
  const seqId = (state.ttsSeqId = (state.ttsSeqId || 0) + 1);
  window.speechSynthesis.cancel();

  const raw = (text || '').toString();
  const ttsFull = ttsTextForNaturalProsody(raw);

  // Split on spaces you already provide between “chunks”.
  // Fallback: split by common punctuation if no spaces exist.
  let chunks = raw.includes(' ')
    ? raw.split(/\s+/).filter(Boolean)
    : raw.split(/[、。！？!?]/).map(s => s.trim()).filter(Boolean);

  if (!chunks.length) return;

  const v = pickVoice();
  // If we added a question mark, attach it to the LAST chunk only (more natural).
  const addedQ = /[？?]\s*$/.test(ttsFull) && !/[？?]\s*$/.test(raw);

  const speakOne = (i) => {
    if (seqId !== state.ttsSeqId) return; // cancelled/replaced
    if (i >= chunks.length) return;

    let chunk = chunks[i];
    if (addedQ && i === chunks.length - 1) chunk = chunk + '？';

    const utt = new SpeechSynthesisUtterance(chunk);
    if (v) {
      utt.voice = v;
      if (v.lang) utt.lang = v.lang;
    } else {
      utt.lang = 'ja-JP';
    }

    utt.rate = rate;
    utt.pitch = 1.0;

    utt.onend = () => {
      if (seqId !== state.ttsSeqId) return;
      setTimeout(() => speakOne(i + 1), pauseMs);
    };

    window.speechSynthesis.speak(utt);
  };

  speakOne(0);
}

  // ---------- Speech recognition ----------
  let recognizer = null;
  let silenceTimer = null;
  let finishTimer = null;

  
  function attachRecognitionHandlers() {
    // Ensure recognizer exists and has handlers
    if (!recognizer) recognizer = createRecognizer();
    if (!recognizer) return;

    recognizer.onresult = (event) => {
      let interim = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const alt = res && res[0] ? res[0].transcript : '';
        if (res.isFinal) finalText += alt;
        else interim += alt;
      }

      const transcriptRaw = normalizeSpaces(finalText || interim);
      const transcriptClean = cleanForMatch(transcriptRaw);

      // Chrome sometimes injects spaces/zero-width chars. Matching should ignore whitespace.
      const transcriptForMatch = transcriptClean.replace(/\s+/g, '');

      state.lastTranscript = transcriptForMatch;
      $('#recognizedText').textContent = transcriptClean;

      clearFinishTimer();

      // extend time window for slow speakers
      clearSilenceTimer();
      const initial = clamp(Math.max(state.pauseMs || 6000, 2000 + (currentSpeakText(false).length * 140)), 1200, 30000);
    silenceTimer = window.setTimeout(finalizeByTimeout, initial);

      const isFinal = !!finalText;
      const resEval = evaluateTranscript(transcriptForMatch, isFinal);
      if (isFinal) {
        // Wait after a final result so Chrome can stop rewriting the transcript.
        clearFinishTimer();
        finishTimer = window.setTimeout(() => {
          const successThreshold = clamp(state.success / 100, 0.7, 0.98);
          showRating(resEval.score, successThreshold);

          if (state.mode === 'dialog') {
            const dialog = getItem();
            const turn = dialog?.turns?.[state.dialogTurn];
            if (turn?.who === 'user' && resEval.score >= successThreshold) {
              window.setTimeout(() => nextDialogTurn(), 450);
            }
          }
        }, 650);
      }
    };

    recognizer.onerror = () => {
      clearSilenceTimer();
      stopListening();
    };

    recognizer.onend = () => {
      clearSilenceTimer();
      // do not auto-stop state.listening here; stopListening handles UI
      if (state.listening) {
        // In some browsers, onend fires even when we still want to listen; keep state but unlock buttons
        state.listening = false;
        $('#btnListen').disabled = false;
        $('#btnStop').disabled = true;
      }
    };
  }


  function createRecognizer() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    const r = new SR();
    r.lang = state.recogLang || 'ja-JP';
    r.interimResults = true;
    r.continuous = true; // keep running until stop
    r.maxAlternatives = 3;
    return r;
  }

  
  function clearFinishTimer() {
    if (finishTimer) {
      window.clearTimeout(finishTimer);
      finishTimer = null;
    }
  }

  function clearSilenceTimer() {
    if (silenceTimer) {
      window.clearTimeout(silenceTimer);
      silenceTimer = null;
    }
  }

  function finalizeByTimeout() {
    if (!state.listening) return;
    const transcript = state.lastTranscript || '';
    stopListening();
    if (!transcript) return;

    const successThreshold = clamp(state.success / 100, 0.7, 0.98);
    const res = evaluateTranscript(transcript, true);
    showRating(res.score, successThreshold);

    if (state.mode === 'dialog') {
      const dialog = getItem();
      const turn = dialog?.turns?.[state.dialogTurn];
      if (turn?.who === 'user' && res.score >= successThreshold) window.setTimeout(() => nextDialogTurn(), 450);
    }
  }

function startListening() {
    if (!recognizer) recognizer = createRecognizer();
    if (!recognizer) return;
    // ensure handlers are attached
    if (!recognizer.onresult) attachRecognitionHandlers();

    // ensure language updated
    recognizer.lang = state.recogLang || 'ja-JP';

    state.listening = true;
    $('#btnListen').disabled = true;
    $('#btnStop').disabled = false;
    $('#ratingPill').classList.add('d-none');
    $('#recognizedText').textContent = '';

    try { recognizer.start(); } catch {}

    // schedule silence timeout
    const initial = clamp(Math.max(state.pauseMs || 6000, 2000 + (currentSpeakText(false).length * 140)), 1200, 30000);
    silenceTimer = window.setTimeout(finalizeByTimeout, initial);
  }

  function stopListening() {
    state.listening = false;
    clearFinishTimer();
    $('#btnListen').disabled = false;
    $('#btnStop').disabled = true;

    try { recognizer.stop(); } catch {}
  }

  function resetHighlights() {
    $$('.jp-token').forEach(el => {
      if (el.dataset.ignorable === '1' || el.classList.contains('punct')) return;
      el.classList.remove('good','missed','active');
      el.classList.add('pending');
    });
  }

  // ---------- Content rendering ----------
  function getTokensFromItem(item) {
    if (!item) return [];
    if (Array.isArray(item.tokens)) return item.tokens.slice();
    if (typeof item.jp === 'string') return splitTokensMaybe(item.jp);
    return [];
  }

  function getRubyMap(item) {
    return (item && item.ruby && typeof item.ruby === 'object') ? item.ruby : null;
  }

  function currentSet() {
    if (state.mode === 'word') return JP_DATA.words;
    if (state.mode === 'sentence') return JP_DATA.sentences;
    if (state.mode === 'dialog') return JP_DATA.dialogs;
    if (state.mode === 'hiragana') return JP_DATA.hiragana;
    if (state.mode === 'katakana') return JP_DATA.katakana;
    return [];
  }


  function setRandomIndexForMode() {
    const set = currentSet();
    const n = set.length;
    if (!n) { state.index = 0; return; }
    const prev = Number.isFinite(state.index) ? state.index : -1;
    state.index = pickRandomIndex(n, prev);
  }

  
  function advanceIndex() {
    const set = currentSet();
    const n = set.length;
    if (!n) return;

    if (state.shuffle) {
      const prev = Number.isFinite(state.index) ? state.index : -1;
      state.index = pickRandomIndex(n, prev);
    } else {
      state.index = ((Number.isFinite(state.index) ? state.index : 0) + 1) % n;
    }
  }

function getItem() {
    const set = currentSet();
    if (!set.length) return null;
    return set[state.index % set.length];
  }

  function renderPromptTokens(tokens, rubyMap) {
    const line = document.createElement('div');
    line.className = 'jp-line';
    tokens.forEach((tok, idx) => {
      const span = document.createElement('span');
      span.className = 'jp-token pending';
      span.dataset.idx = String(idx);

      const surface = tokenToText(tok);
      const reading = tokenToReading(tok) || (rubyMap && surface ? rubyMap[surface] : '');

      if (IGNORE_PUNCT.has(surface)) {
        span.className = 'jp-token punct';
        span.dataset.ignorable = '1';
        span.textContent = surface;
        line.appendChild(span);
        return;
      }

      if (reading && surface && surface !== reading) {
        const ruby = document.createElement('ruby');
        ruby.textContent = surface;
        const rt = document.createElement('rt');
        rt.textContent = reading;
        ruby.appendChild(rt);
        span.appendChild(ruby);
      } else {
        span.textContent = surface;
      }

      line.appendChild(span);
    });
    return line;
  }

  function renderCurrent() {
    if (!state.mode) return;

    const prompt = $('#promptArea');
    prompt.innerHTML = '';

    const modeLabel = state.mode === 'word' ? t('mode_word')
                      : state.mode === 'sentence' ? t('mode_sentence')
                      : t('mode_dialog');
    $('#modeLabel').textContent = modeLabel;

    $('#dialogPane').classList.toggle('d-none', state.mode !== 'dialog');

    if (state.mode === 'dialog') {
      const dialog = getItem();
      const title = state.uiLang === 'de' ? dialog.title_de : dialog.title_en;
      const titleEl = document.createElement('div');
      titleEl.className = 'text-white-70 mb-2';
      titleEl.innerHTML = `<i class="fa-solid fa-comments me-2"></i>${escapeHtml(title)}`;
      prompt.appendChild(titleEl);

      const turn = dialog.turns[state.dialogTurn];
      const tokens = getTokensFromItem(turn);
      const rubyMap = getRubyMap(turn);
      prompt.appendChild(renderPromptTokens(tokens, rubyMap));

      // If tokens include ruby readings, skip extra reading line
      if (turn.reading && turn.reading !== turn.jp && !rubyMap) {
        const f = document.createElement('div');
        f.className = 'furigana';
        f.textContent = turn.reading;
        prompt.appendChild(f);
      }

      const tr = document.createElement('div');
      tr.className = 'translation';
      tr.textContent = state.uiLang === 'de' ? turn.de : turn.en;
      prompt.appendChild(tr);

      // In dialog mode, disable Play for bot turns (we auto-play)
      $('#btnSpeak').disabled = (turn.who === 'bot');
	  $('#btnSpeakSlow').disabled = (turn.who === 'bot');

      updateProgressText();
      resetHighlights();
      return;
    }

    const item = getItem();
    if (!item) return;

    const tokens = getTokensFromItem(item);
    const rubyMap = getRubyMap(item);

    prompt.appendChild(renderPromptTokens(tokens, rubyMap));

    const jp = tokens.map(tokenToText).join(' ');
    const reading = item.reading || item.furigana || tokensToSpeakText(tokens, false) || jp.replace(/\s+/g,'');

    if (item.furigana && !rubyMap) {
      const f = document.createElement('div');
      f.className = 'furigana';
      f.textContent = item.furigana;
      prompt.appendChild(f);
    } else if (reading && reading !== jp && !rubyMap) {
      const f = document.createElement('div');
      f.className = 'furigana';
      f.textContent = reading;
      prompt.appendChild(f);
    }

    const tr = document.createElement('div');
    tr.className = 'translation';
    tr.textContent = state.uiLang === 'de' ? item.de : item.en;
    prompt.appendChild(tr);

    $('#btnSpeak').disabled = false;
	$('#btnSpeakSlow').disabled = false;

    updateProgressText();
    resetHighlights();
  }

  function escapeHtml(s){
    return (s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function updateProgressText() {
    const set = currentSet();
    if (!set.length) return;
    if (state.mode === 'dialog') {
      const dialog = getItem();
      $('#progressText').textContent = `${state.index + 1}/${set.length} • ${state.dialogTurn + 1}/${dialog.turns.length}`;
    } else {
      $('#progressText').textContent = `${state.index + 1}/${set.length}`;
    }
  }

  // ---------- Matching + highlighting ----------
  function currentRubyMap() {
    if (state.mode === 'dialog') {
      const dialog = getItem();
      const turn = dialog.turns[state.dialogTurn];
      return getRubyMap(turn);
    }
    const item = getItem();
    return getRubyMap(item);
  }

  function currentExpectedTokens() {
    if (state.mode === 'dialog') {
      const dialog = getItem();
      const turn = dialog.turns[state.dialogTurn];
      return getTokensFromItem(turn);
    }
    const item = getItem();
    return getTokensFromItem(item);
  }

  
  
  function tokensToSpeakText(tokens, withSpaces = false) {
    const parts = (tokens || []).map(tokenToText).filter(Boolean);
    return withSpaces ? parts.join(' ') : parts.join('');
  }

  function currentSpeakText(withSpaces = false) {
    if (state.mode === 'dialog') {
      const dialog = getItem();
      const turn = dialog?.turns?.[state.dialogTurn];
      if (!turn) return '';
      return tokensToSpeakText(getTokensFromItem(turn), withSpaces);
    }
    const item = getItem();
    if (!item) return '';
    return tokensToSpeakText(getTokensFromItem(item), withSpaces);
  }


  function applyTokenClasses(matches) {
    $$('.jp-token').forEach((el) => {
      if (el.dataset.ignorable === '1' || el.classList.contains('punct')) return;
      const idx = Number(el.dataset.idx);
      el.classList.remove('good','missed','active','pending');
      if (matches[idx]) el.classList.add('good');
      else el.classList.add('pending');
    });
  }

  function setActiveIndex(activeIdx) {
    $$('.jp-token').forEach(el => {
      if (el.dataset.ignorable === '1' || el.classList.contains('punct')) {
        el.classList.remove('active');
        return;
      }
      el.classList.toggle('active', Number(el.dataset.idx) === activeIdx);
    });
  }

  function evaluateTranscript(transcript, isFinal) {
    const expected = currentExpectedTokens();
    const rubyMap = currentRubyMap();
    // Build a cleaned expected token list for matching (so punctuation/spaces in data won't break scoring).
    const expectedRaw = expected;
    const expectedMatch = [];
    const matchToRaw = [];
    const rawMatchesPreset = new Array(expectedRaw.length).fill(false);

    for (let k = 0; k < expectedRaw.length; k++) {
      const ex = normalizeExpectedForMatch(expectedRaw[k], rubyMap);
      // If token becomes empty after cleaning, treat it as ignorable (punctuation-only etc.)
      if (!ex.surface && !ex.reading) {
        rawMatchesPreset[k] = true;
        continue;
      }
      expectedMatch.push(ex); // {surface, reading} cleaned
      matchToRaw.push(k);
    }

    const leniency01 = clamp(state.leniency / 100, 0, 1);
    const successThreshold = clamp(state.success / 100, 0.7, 0.98);

    const cleaned = normalizeSpaces(stripPunct(transcript));
    if (!cleaned) return { score: 0, matches: new Array(expected.length).fill(false), done: false };

    const spokenTokens = splitTokensMaybe(cleaned);

    let matches = new Array(expectedRaw.length).fill(false);
    matches = rawMatchesPreset.slice();
    let score = 0;

    if (spokenTokens.length > 1 || expected.length > 1) {
      // token-based alignment
      const aligned = alignTokens(expectedMatch, spokenTokens, leniency01, rubyMap);
      // map matches back to raw token indices
      const rawMatches = rawMatchesPreset.slice();
      for (let p = 0; p < aligned.matches.length; p++) rawMatches[matchToRaw[p]] = aligned.matches[p];
      matches = rawMatches;
      score = aligned.score;

    } else {
      // single token: use similarity
      const ex = normalizeExpectedForMatch(expectedMatch[0] || '', rubyMap);
      score = scoreExpectedVsSpokenAdvanced(ex.surface, ex.reading || ex.surface, spokenTokens[0] || cleaned, leniency01);
      matches[0] = score >= (0.86 - leniency01 * 0.20);
      // map single match back to raw indices (if raw had ignorable tokens)
      const rawMatches = rawMatchesPreset.slice();
      if (expectedMatch.length && matchToRaw.length) rawMatches[matchToRaw[0]] = matches[0];
      matches = rawMatches;

    }

    // Fallback for no spaces (common in ja-JP)
    if (!/\s/.test(cleaned) && expected.length > 1) {
      const prog = roughCharProgress(expectedMatch, cleaned, leniency01, rubyMap);
      // mark tokens whose cumulative length <= progress
      const tokenLengths = expectedRaw.map((tok) => {
        const exTok = normalizeExpectedForMatch(tok, rubyMap);
        return (exTok.reading || exTok.surface || '').length;
      });
      const totalChars = tokenLengths.reduce((sum, n) => sum + n, 0);
      const targetChars = Math.round(totalChars * prog);
      let acc = 0;
      for (let i = 0; i < expected.length; i++) {
        acc += tokenLengths[i] || 0;
        if (acc <= targetChars) matches[i] = true;
      }
      score = Math.max(score, prog);
    }

    applyTokenClasses(matches);

    // active token = first not matched
    const firstPending = matches.findIndex(x => !x);
    setActiveIndex(firstPending >= 0 ? firstPending : -1);

    const done = isFinal && score >= successThreshold;

    return { score, matches, done };
  }

  function showRating(score, successThreshold) {
    const pill = $('#ratingPill');
    pill.classList.remove('d-none','good','bad','warn');

    const pct = Math.round(score * 100);
    let label = '';
    let cls = '';

    if (pct >= Math.round(successThreshold * 100)) { label = t('rating_success'); cls = 'good'; }
    else if (pct >= Math.round((successThreshold - 0.10) * 100)) { label = t('rating_almost'); cls = 'warn'; }
    else { label = t('rating_fail'); cls = 'bad'; }

    pill.classList.add(cls);
    pill.innerHTML = `<i class="fa-solid fa-chart-simple me-2"></i>${label} • ${pct}%`;
  }

  // ---------- Dialog flow ----------
  function renderDialogTranscript() {
    const box = $('#dialogTranscript');
    if (!box) return;
    box.innerHTML = '';
    if (state.mode !== 'dialog') return;

    const dialog = getItem();
    if (!dialog) return;

    for (let i = 0; i < dialog.turns.length; i++) {
      const turn = dialog.turns[i];
      const el = document.createElement('div');
      el.className = `turn ${turn.who === 'bot' ? 'bot' : 'user'}`;
      const who = document.createElement('div');
      who.className = 'who';
      who.textContent = turn.who === 'bot' ? 'BOT' : 'YOU';
      const jp = document.createElement('div');
      jp.className = 'text-white';
      jp.style.fontWeight = '700';
      jp.textContent = (getTokensFromItem(turn).map(tokenToText).join(' ')).replace(/\s+/g,' ');
      const tr = document.createElement('div');
      tr.className = 'text-white-60 small mt-1';
      tr.textContent = state.uiLang === 'de' ? turn.de : turn.en;
      el.appendChild(who); el.appendChild(jp); el.appendChild(tr);
      box.appendChild(el);
    }
  }

  function nextDialogTurn() {
    const dialog = getItem();
    if (!dialog) return;

    state.dialogTurn++;
    if (state.dialogTurn >= dialog.turns.length) {
      // dialog finished
      const progKey = `dialog:${dialog.id}`;
      state.progress[progKey] = (state.progress[progKey] || 0) + 1;
      localStorage.setItem(LS.progress, JSON.stringify(state.progress));
      $('#recognizedText').textContent = t('dialog_done');
      showRating(1, state.success/100); // simplistic final label; we also show last score
      state.dialogTurn = 0;
      // move to next dialog
      advanceIndex();
    }

    renderCurrent();
    renderDialogTranscript();

    // if next is bot, auto speak and then advance
    const nextDialog = getItem();
    const turn = nextDialog.turns[state.dialogTurn];
    if (turn.who === 'bot') {
      stopListening();
      resetHighlights();
      $('#recognizedText').textContent = '';
      speak(currentSpeakText(false));
      // advance after a conservative delay based on text length
      const delay = clamp(900 + ((getTokensFromItem(turn).map(tokenToText).join('')).length * 400), 1200, 12000);
      window.setTimeout(() => {
        nextDialogTurn();
      }, delay);
    }
  }

  // ---------- UI events ----------

  function bindUi() {
    $('#year').textContent = String(nowYear());
    // UI language dropdown
    $$('[data-set-ui-lang]').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-set-ui-lang') || 'en';
        setUiLang(lang);
      });
    });


    $('#btnHome').addEventListener('click', () => {
      stopListening();
      state.mode = null;
      state.index = 0;
      state.dialogTurn = 0;
      $('#recognizedText').textContent = '';
      $('#ratingPill').classList.add('d-none');
      showStart();
    });

    function pickForMode(mode) {
      const set = currentSet();
      const n = set.length;
      if (!n) { state.index = 0; return; }

      if (state.shuffle) {
        const prev = (state.lastPick && Number.isFinite(state.lastPick[mode])) ? state.lastPick[mode] : -1;
        const idx = pickRandomIndex(n, prev);
        if (!state.lastPick) state.lastPick = {};
        state.lastPick[mode] = idx;
        state.index = idx;
      } else {
        // deterministic order
        state.index = 0;
      }
    }

    $$('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stopListening();
        const mode = btn.dataset.mode;
        state.mode = mode;
        state.dialogTurn = 0;
        $('#recognizedText').textContent = '';
        $('#ratingPill').classList.add('d-none');
        if (mode === 'dialog') {
          pickForMode(mode); // random dialog
        } else if (['hiragana','katakana','word','sentence'].includes(mode)) {
          pickForMode(mode);
        } else {
          state.index = 0;
        }

        showTrainer();
        renderCurrent();
        renderDialogTranscript();

        // If dialog starts with bot (not in sample), auto-advance
        if (state.mode === 'dialog') {
          const dialog = getItem();
          if (dialog?.turns?.[0]?.who === 'bot') nextDialogTurn();
        }
      });
    });

    $('#btnListen').addEventListener('click', () => {
      if (state.mode === 'dialog') {
        const dialog = getItem();
        const turn = dialog?.turns?.[state.dialogTurn];
        if (turn && turn.who === 'bot') return;
      }
      resetHighlights();
      startListening();
    });

    $('#btnStop').addEventListener('click', () => stopListening());

    $('#btnRetry').addEventListener('click', () => {
      stopListening();
      $('#recognizedText').textContent = '';
      $('#ratingPill').classList.add('d-none');
      resetHighlights();
    });

    $('#btnNext').addEventListener('click', () => {
      stopListening();
      $('#recognizedText').textContent = '';
      $('#ratingPill').classList.add('d-none');

      if (state.mode === 'dialog') {
        state.dialogTurn = 0;
        advanceIndex();
      } else {
        advanceIndex();
      }

      renderCurrent();
      renderDialogTranscript();
    });


    const btnShuffle = $('#btnShuffle');
    if (btnShuffle) {
      const applyShuffleUi = () => {
        const on = !!state.shuffle;
        btnShuffle.classList.toggle('active', on);
        btnShuffle.setAttribute('aria-pressed', on ? 'true' : 'false');
        btnShuffle.title = t('shuffle_label');
      };
      applyShuffleUi();
      btnShuffle.addEventListener('click', () => {
        state.shuffle = !state.shuffle;
        localStorage.setItem(LS.shuffle, state.shuffle ? '1' : '0');
        applyShuffleUi();
      });
    }


    const sh = $('#shuffleToggle');
    if (sh) {
      sh.checked = !!state.shuffle;
      sh.addEventListener('change', (e) => {
        state.shuffle = !!e.target.checked;
        localStorage.setItem(LS.shuffle, state.shuffle ? '1' : '0');
      });
    }


$('#btnSpeak').addEventListener('click', () => {
      if (state.mode === 'dialog') {
        const dialog = getItem();
        const turn = dialog?.turns?.[state.dialogTurn];
        if (!turn) return;
        speak(currentSpeakText(false));
        return;
      }
      const item = getItem();
      if (!item) return;
      speak(currentSpeakText(false));
    });
	
	$('#btnSpeakSlow').addEventListener('click', () => {
	  const slowRate = 0.65;

	  if (state.mode === 'dialog') {
		const dialog = getItem();
		const turn = dialog?.turns?.[state.dialogTurn];
		if (!turn) return;
		speakChunks(currentSpeakText(false), slowRate, 240);
		return;
	  }

	  const item = getItem();
	  if (!item) return;
	  speakChunks(currentSpeakText(false), slowRate, 240);
	});

    // Settings bindings are elsewhere in this file (sliders/selects); keep those intact.
  }

async function boot() {
    // Apply i18n to static nodes
    setUiLang(state.uiLang);

    await loadJoyoKanjiDictionary();
    PROJECT_READING_LEXICON = buildProjectReadingLexicon();

    // Feature check
    const { hasRecognition, hasSynthesis } = detectSpeechSupport();

    if (!hasRecognition || !hasSynthesis) {
      const msgs = [];
      if (!hasRecognition) msgs.push(t('pill_no_recognition'));
      if (!hasSynthesis) msgs.push(t('pill_no_synthesis'));
      showFeaturePill(t('pill_partial'));
      showUnsupported(msgs.join(' • '));
    } else {
      hideFeaturePill();
      showStart();
    }

    // voices can load async
    if (window.speechSynthesis) {
      refreshVoices();
      window.speechSynthesis.onvoiceschanged = () => refreshVoices();
    }

    // recognition handlers
    attachRecognitionHandlers();

    // Settings reflect state
    $('#leniencyRange').value = String(state.leniency);
    $('#successRange').value = String(state.success);
    $('#leniencyValue').textContent = `${state.leniency}%`;
    $('#successValue').textContent = `${state.success}%`;
    $('#recogLang').value = state.recogLang;

    // Settings listeners
    $('#leniencyRange').addEventListener('input', (e) => {
      state.leniency = Number(e.target.value);
      localStorage.setItem(LS.leniency, String(state.leniency));
      $('#leniencyValue').textContent = `${state.leniency}%`;
    });

    $('#successRange').addEventListener('input', (e) => {
      state.success = Number(e.target.value);
      localStorage.setItem(LS.success, String(state.success));
      $('#successValue').textContent = `${state.success}%`;
    });

    $('#recogLang').addEventListener('change', (e) => {
      state.recogLang = String(e.target.value || 'ja-JP');
      localStorage.setItem(LS.recogLang, state.recogLang);
      // recreate recognizer with new language next time
      stopListening();
      recognizer = null;
      attachRecognitionHandlers();
    });


    // show app anyway; unsupported handled above
  }

  // Bind UI after DOM ready
  document.addEventListener('DOMContentLoaded', async () => {
    bindUi();
    await boot();
  });

})();
