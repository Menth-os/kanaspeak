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
      btn_retry: "Retry",
      btn_next: "Next",
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
      btn_listen: "Hören",
      btn_stop: "Stopp",
      btn_speak: "Abspielen",
      btn_retry: "Nochmal",
      btn_next: "Weiter",
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

  const LS = {
    uiLang: 'jpTrainer.uiLang',
    voiceUri: 'jpTrainer.voiceUri',
    leniency: 'jpTrainer.leniency',
    success: 'jpTrainer.success',
    recogLang: 'jpTrainer.recogLang',
    progress: 'jpTrainer.progress'
  };

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

  function safeJsonParse(s, fallback) {
    try { return JSON.parse(s); } catch { return fallback; }
  }

  function normalizeSpaces(s) {
    return (s || '').replace(/\s+/g, ' ').trim();
  }

  // Katakana -> Hiragana
  function kataToHira(str) {
    return (str || '').replace(/[\u30a1-\u30f6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
  }

  // Keep only kana/kanji/latin/digits/spaces (remove most punctuation)
  function stripPunct(str) {
    return (str || '')
      .replace(/[、。！？!?,.\(\)\[\]「」『』"“”'’：:;・…]/g, ' ')
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
    const e0 = normalizeKanaLoose(stripPunct(expected));
    const s0 = normalizeKanaLoose(stripPunct(spoken));

    // leniency: remove long vowel marks and small tsu effects increasingly
    const removeLong = leniency01 >= 0.35;
    const removeSmall = leniency01 >= 0.55;

    const cleanup = (x) => {
      let t = x;
      if (removeLong) t = t.replace(/[ーう]/g, '');
      if (removeSmall) t = t.replace(/[っ]/g, '');
      return t;
    };

    const e = cleanup(e0);
    const s = cleanup(s0);

    // direct similarity
    let best = similarity(e, s);

    // bonus: if one contains the other (common when recognition merges tokens)
    if (e && s) {
      if (s.includes(e) || e.includes(s)) best = Math.max(best, 0.92);
    }

    return clamp(best, 0, 1);
  }

  // Align expected tokens with spoken tokens allowing skips.
  // Returns {matches: boolean[], score: 0..1, matchedCount}
  function alignTokens(expectedTokens, spokenTokens, leniency01) {
    const exp = expectedTokens.slice();
    const spk = spokenTokens.slice();

    const matches = new Array(exp.length).fill(false);

    // Greedy with lookahead:
    // - try match current expected against current spoken
    // - if low score, allow skipping expected OR skipping spoken to recover
    let i = 0, j = 0;
    let matched = 0;

    while (i < exp.length && j < spk.length) {
      const s = tokenScore(exp[i], spk[j], leniency01);

      if (s >= (0.78 - leniency01 * 0.18)) {
        matches[i] = true;
        matched++;
        i++; j++;
        continue;
      }

      // Lookahead one step: can we match expected[i] with spoken[j+1]?
      const sSkipSpoken = j + 1 < spk.length ? tokenScore(exp[i], spk[j + 1], leniency01) : 0;
      // Or expected[i+1] with spoken[j]?
      const sSkipExpected = i + 1 < exp.length ? tokenScore(exp[i + 1], spk[j], leniency01) : 0;

      if (sSkipSpoken >= sSkipExpected && sSkipSpoken >= (0.78 - leniency01 * 0.18)) {
        j++; // skip one spoken token
      } else if (sSkipExpected >= (0.78 - leniency01 * 0.18)) {
        i++; // skip expected token (mark missed)
      } else {
        // if both low, skip the one that looks more plausible to skip:
        // prefer skipping spoken if it's very short (noise), otherwise skip expected
        if ((spk[j] || '').length <= 1) j++;
        else i++;
      }
    }

    const score = exp.length ? matched / exp.length : 0;
    return { matches, score, matchedCount: matched };
  }

  // For transcripts without spaces, approximate "matched chars" against expected joined string
  function roughCharProgress(expectedTokens, transcript, leniency01) {
    const expectedJoined = normalizeKanaLoose(stripPunct(expectedTokens.join(''))).replace(/\s+/g,'');
    const spokenJoined = normalizeKanaLoose(stripPunct(transcript)).replace(/\s+/g,'');

    if (!expectedJoined.length) return 0;

    // similarity by LCS-ish heuristic using sliding window:
    // count how many expected chars appear in order in spoken
    let i = 0, j = 0, matched = 0;
    while (i < expectedJoined.length && j < spokenJoined.length) {
      if (expectedJoined[i] === spokenJoined[j]) { matched++; i++; j++; }
      else {
        // leniency allows skipping in spoken
        j++;
      }
    }
    const progress = matched / expectedJoined.length;
    return clamp(progress, 0, 1);
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
    success: Number(localStorage.getItem(LS.success) || '75'),   // 50..95
    recogLang: localStorage.getItem(LS.recogLang) || 'ja-JP',
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
    const voices = (window.speechSynthesis?.getVoices?.() || []);
    state.voices = voices;
    const sel = $('#voiceSelect');
    sel.innerHTML = '';

    const ja = voices.filter(v => (v.lang || '').toLowerCase().startsWith('ja'));
    const other = voices.filter(v => !((v.lang || '').toLowerCase().startsWith('ja')));

    const addGroup = (label, list) => {
      if (!list.length) return;
      const og = document.createElement('optgroup');
      og.label = label;
      list.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.voiceURI;
        opt.textContent = `${v.name} (${v.lang})`;
        og.appendChild(opt);
      });
      sel.appendChild(og);
    };

    addGroup('Japanese', ja);
    addGroup('Other', other);

    // pick stored voice if still present; otherwise pick first JA
    const stored = state.voiceUri;
    const hasStored = voices.some(v => v.voiceURI === stored);
    if (hasStored) sel.value = stored;
    else if (ja.length) sel.value = ja[0].voiceURI;
    else if (voices.length) sel.value = voices[0].voiceURI;

    state.voiceUri = sel.value || '';
    localStorage.setItem(LS.voiceUri, state.voiceUri);
  }

  function pickVoice() {
    const uri = state.voiceUri;
    const v = state.voices.find(x => x.voiceURI === uri);
    if (v) return v;
    // fallback to JA
    const ja = state.voices.find(x => (x.lang || '').toLowerCase().startsWith('ja'));
    return ja || state.voices[0] || null;
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ja-JP';
    const v = pickVoice();
    if (v) utt.voice = v;
    utt.rate = 0.95;
    utt.pitch = 1.0;
    window.speechSynthesis.speak(utt);
  }

  // ---------- Speech recognition ----------
  let recognizer = null;

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

  function startListening() {
    if (!recognizer) recognizer = createRecognizer();
    if (!recognizer) return;

    // ensure language updated
    recognizer.lang = state.recogLang || 'ja-JP';

    state.listening = true;
    $('#btnListen').disabled = true;
    $('#btnStop').disabled = false;
    $('#ratingPill').classList.add('d-none');
    $('#recognizedText').textContent = '';

    try { recognizer.start(); } catch {}
  }

  function stopListening() {
    state.listening = false;
    $('#btnListen').disabled = false;
    $('#btnStop').disabled = true;

    try { recognizer.stop(); } catch {}
  }

  function resetHighlights() {
    $$('.jp-token').forEach(el => {
      el.classList.remove('good','missed','active');
      el.classList.add('pending');
    });
  }

  // ---------- Content rendering ----------
  function currentSet() {
    if (state.mode === 'word') return JP_DATA.words;
    if (state.mode === 'sentence') return JP_DATA.sentences;
    if (state.mode === 'dialog') return JP_DATA.dialogs;
    return [];
  }

  function getItem() {
    const set = currentSet();
    if (!set.length) return null;
    return set[state.index % set.length];
  }

  function renderPromptTokens(tokens) {
    const line = document.createElement('div');
    line.className = 'jp-line';
    tokens.forEach((tok, idx) => {
      const span = document.createElement('span');
      span.className = 'jp-token pending';
      span.dataset.idx = String(idx);
      span.textContent = tok;
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
      const tokens = splitTokensMaybe(turn.jp);
      prompt.appendChild(renderPromptTokens(tokens));

      if (turn.reading && turn.reading !== turn.jp) {
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

      updateProgressText();
      resetHighlights();
      return;
    }

    const item = getItem();
    if (!item) return;

    const jp = item.jp;
    const reading = item.reading || item.furigana || item.jp;
    const tokens = splitTokensMaybe(jp);

    prompt.appendChild(renderPromptTokens(tokens));

    if (item.furigana) {
      const f = document.createElement('div');
      f.className = 'furigana';
      f.textContent = item.furigana;
      prompt.appendChild(f);
    } else if (reading && reading !== jp) {
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
  function currentExpectedTokens() {
    if (state.mode === 'dialog') {
      const dialog = getItem();
      const turn = dialog.turns[state.dialogTurn];
      return splitTokensMaybe(turn.jp);
    }
    const item = getItem();
    return splitTokensMaybe(item.jp);
  }

  function currentSpeakText() {
    if (state.mode === 'dialog') {
      const dialog = getItem();
      const turn = dialog.turns[state.dialogTurn];
      return turn.speak || turn.reading || turn.jp;
    }
    const item = getItem();
    return item.speak || item.reading || item.furigana || item.jp;
  }

  function applyTokenClasses(matches) {
    $$('.jp-token').forEach((el) => {
      const idx = Number(el.dataset.idx);
      el.classList.remove('good','missed','active','pending');
      if (matches[idx]) el.classList.add('good');
      else el.classList.add('pending');
    });
  }

  function setActiveIndex(activeIdx) {
    $$('.jp-token').forEach(el => {
      el.classList.toggle('active', Number(el.dataset.idx) === activeIdx);
    });
  }

  function evaluateTranscript(transcript, isFinal) {
    const expected = currentExpectedTokens();
    const leniency01 = clamp(state.leniency / 100, 0, 1);
    const successThreshold = clamp(state.success / 100, 0.5, 0.95);

    const cleaned = normalizeSpaces(stripPunct(transcript));
    if (!cleaned) return { score: 0, matches: new Array(expected.length).fill(false), done: false };

    const spokenTokens = splitTokensMaybe(cleaned);

    let matches = new Array(expected.length).fill(false);
    let score = 0;

    if (spokenTokens.length > 1 || expected.length > 1) {
      // token-based alignment
      const aligned = alignTokens(expected, spokenTokens, leniency01);
      matches = aligned.matches;
      score = aligned.score;
    } else {
      // single token: use similarity
      score = tokenScore(expected[0] || '', spokenTokens[0] || cleaned, leniency01);
      matches[0] = score >= (0.82 - leniency01 * 0.20);
    }

    // Fallback for no spaces (common in ja-JP)
    if (!/\s/.test(cleaned) && expected.length > 1) {
      const prog = roughCharProgress(expected, cleaned, leniency01);
      // mark tokens whose cumulative length <= progress
      const expJoined = expected.join('');
      const targetChars = Math.round(expJoined.length * prog);
      let acc = 0;
      for (let i = 0; i < expected.length; i++) {
        acc += expected[i].length;
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
      jp.textContent = turn.jp.replace(/\s+/g,' ');
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
      state.index = (state.index + 1) % currentSet().length;
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
      speak(turn.speak || turn.jp);
      // advance after a conservative delay based on text length
      const delay = clamp(900 + (turn.jp.length * 140), 1200, 6500);
      window.setTimeout(() => {
        nextDialogTurn();
      }, delay);
    }
  }

  // ---------- UI events ----------
  function bindUi() {
    $('#year').textContent = String(nowYear());

    $('#btnHome').addEventListener('click', () => {
      stopListening();
      state.mode = null;
      state.index = 0;
      state.dialogTurn = 0;
      showStart();
    });

    $$('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        stopListening();
        state.mode = btn.dataset.mode;
        state.index = 0;
        state.dialogTurn = 0;
        $('#recognizedText').textContent = '';
        $('#ratingPill').classList.add('d-none');

        showTrainer();
        renderCurrent();
        renderDialogTranscript();

        // if dialog starts with bot (not in sample), auto speak; else wait for user
        if (state.mode === 'dialog') {
          const dialog = getItem();
          if (dialog?.turns?.[0]?.who === 'bot') nextDialogTurn();
        }
      });
    });

    $('#btnListen').addEventListener('click', () => {
      if (state.mode === 'dialog') {
        const dialog = getItem();
        const turn = dialog.turns[state.dialogTurn];
        if (turn.who === 'bot') return; // should not happen (auto handled)
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
        // move to next dialog
        state.index = (state.index + 1) % currentSet().length;
        state.dialogTurn = 0;
        renderCurrent();
        renderDialogTranscript();
        return;
      }

      state.index = (state.index + 1) % currentSet().length;
      renderCurrent();
    });

    $('#btnSpeak').addEventListener('click', () => {
      const text = currentSpeakText();
      speak(text);
    });

    // Language menu
    $$('[data-set-ui-lang]').forEach(el => {
      el.addEventListener('click', () => setUiLang(el.getAttribute('data-set-ui-lang')));
    });

    // Settings
    $('#voiceSelect').addEventListener('change', (e) => {
      state.voiceUri = e.target.value;
      localStorage.setItem(LS.voiceUri, state.voiceUri);
    });

    const leniencyRange = $('#leniencyRange');
    const successRange = $('#successRange');
    const leniencyValue = $('#leniencyValue');
    const successValue = $('#successValue');

    leniencyRange.value = String(state.leniency);
    successRange.value = String(state.success);
    leniencyValue.textContent = `${state.leniency}%`;
    successValue.textContent = `${state.success}%`;

    leniencyRange.addEventListener('input', (e) => {
      state.leniency = Number(e.target.value);
      localStorage.setItem(LS.leniency, String(state.leniency));
      leniencyValue.textContent = `${state.leniency}%`;
    });

    successRange.addEventListener('input', (e) => {
      state.success = Number(e.target.value);
      localStorage.setItem(LS.success, String(state.success));
      successValue.textContent = `${state.success}%`;
    });

    $('#recogLang').value = state.recogLang;
    $('#recogLang').addEventListener('change', (e) => {
      state.recogLang = e.target.value;
      localStorage.setItem(LS.recogLang, state.recogLang);
      if (recognizer) recognizer.lang = state.recogLang;
    });

    $('#btnReset').addEventListener('click', () => {
      state.progress = {};
      localStorage.removeItem(LS.progress);
      $('#recognizedText').textContent = '';
      $('#ratingPill').classList.add('d-none');
      resetHighlights();
    });
  }

  function attachRecognitionHandlers() {
    if (!recognizer) recognizer = createRecognizer();
    if (!recognizer) return;

    recognizer.onresult = (event) => {
      let interim = '';
      let finalText = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i];
        const txt = res[0]?.transcript || '';
        if (res.isFinal) finalText += txt + ' ';
        else interim += txt + ' ';
      }

      const transcript = normalizeSpaces(finalText || interim);
      state.lastTranscript = transcript;
      $('#recognizedText').textContent = transcript;

      const isFinal = !!finalText;
      const evalRes = evaluateTranscript(transcript, isFinal);

      const successThreshold = clamp(state.success / 100, 0.5, 0.95);
      if (isFinal) showRating(evalRes.score, successThreshold);

      // dialog progression
      if (state.mode === 'dialog' && isFinal) {
        const dialog = getItem();
        const turn = dialog.turns[state.dialogTurn];

        // only advance if it's user's turn AND the attempt is "good enough"
        if (turn.who === 'user' && evalRes.score >= successThreshold) {
          stopListening();
          nextDialogTurn();
        }
      }

      // for word/sentence: if final and success, stop listening
      if ((state.mode === 'word' || state.mode === 'sentence') && isFinal) {
        if (evalRes.score >= successThreshold) {
          stopListening();
          // save basic progress
          const item = getItem();
          const key = `${state.mode}:${item.id}`;
          state.progress[key] = (state.progress[key] || 0) + 1;
          localStorage.setItem(LS.progress, JSON.stringify(state.progress));
        }
      }
    };

    recognizer.onerror = (e) => {
      // common errors: not-allowed, no-speech
      $('#recognizedText').textContent = `Error: ${e.error || 'unknown'}`;
      stopListening();
    };

    recognizer.onend = () => {
      // on some platforms recognition ends unexpectedly; reflect in UI
      state.listening = false;
      $('#btnListen').disabled = false;
      $('#btnStop').disabled = true;
    };
  }

  // ---------- Boot ----------
  function boot() {
    // Apply i18n to static nodes
    setUiLang(state.uiLang);

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

    // show app anyway; unsupported handled above
  }

  // Bind UI after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    bindUi();
    boot();
  });

})();
