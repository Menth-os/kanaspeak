// Sample content.
// IMPORTANT: For better highlighting, sentences/dialog lines are tokenized into chunks/tokens.
// Tokens can be either strings or objects: { t: "私", r: "わたし" } for ruby/furigana.

window.JP_DATA = {
  words: [
    { id: "w1", tokens: ["こんにちは"], en: "Hello", de: "Hallo", speak: "こんにちは" },
    { id: "w2", tokens: ["ありがとう"], en: "Thank you", de: "Danke", speak: "ありがとう" },
    { id: "w3", tokens: [{ t: "猫", r: "ねこ" }], en: "Cat", de: "Katze", speak: "ねこ" },
    { id: "w4", tokens: [{ t: "学生", r: "がくせい" }], en: "Student", de: "Student(in)", speak: "がくせい" },
    // Katakana loanwords should stay katakana
    { id: "w5", tokens: ["コーヒー"], en: "Coffee", de: "Kaffee", speak: "コーヒー" },
    { id: "w6", tokens: [{ t: "私", r: "わたし" }], en: "I / me", de: "ich / mich", speak: "わたし" },

    // +3 additional words
    { id: "w7", tokens: ["テレビ"], en: "TV", de: "Fernseher", speak: "テレビ" },
    { id: "w8", tokens: [{ t: "日本", r: "にほん" }], en: "Japan", de: "Japan", speak: "にほん" },
    { id: "w9", tokens: ["ホテル"], en: "Hotel", de: "Hotel", speak: "ホテル" }
  ],

  sentences: [
    { id: "s1", tokens: [{ t: "私", r: "わたし" }, "は", "ペーター", "です"], en: "I am Peter.", de: "Ich bin Peter.", speak: "わたしはぺえたあです" },
    { id: "s2", tokens: ["これ", "は", "何", "です", "か"], ruby: { "何": "なに" }, en: "What is this?", de: "Was ist das?", speak: "これはなんですか" },
    { id: "s3", tokens: ["すみません", "が", { t: "駅", r: "えき" }, "は", "どこ", "です", "か"], en: "Excuse me, where is the station?", de: "Entschuldigung, wo ist der Bahnhof?", speak: "すみませんが駅はどこですか" },

    // +3 additional sentences
    { id: "s4", tokens: [{ t: "明日", r: "あした" }, "は", "ひま", "です"], en: "I am free tomorrow.", de: "Ich habe morgen Zeit.", speak: "あしたはひまです" },
    { id: "s5", tokens: ["コーヒー", "を", "ください"], en: "Coffee, please.", de: "Einen Kaffee bitte.", speak: "コーヒーをください" },
    { id: "s6", tokens: [{ t: "日本語", r: "にほんご" }, "を", "べんきょう", "します"], en: "I study Japanese.", de: "Ich lerne Japanisch.", speak: "にほんごをべんきょうします" }
  ],

  dialogs: [
    {
      id: "d1",
      title_en: "At a café",
      title_de: "Im Café",
      turns: [
        { who: "user", tokens: ["すみません", "コーヒー", "を", "ください"], en:"Excuse me, coffee please.", de:"Entschuldigung, einen Kaffee bitte.", speak:"すみません、コーヒーをください" },
        { who: "bot",  tokens: ["はい", "わかりました"], en:"Sure.", de:"Gern.", speak:"はい、わかりました" },
        { who: "user", tokens: [{ t:"砂糖", r:"さとう" }, "は", "いりません"], en:"No sugar.", de:"Kein Zucker.", speak:"さとうはいりません" },
        { who: "bot",  tokens: ["かしこまりました"], en:"Understood.", de:"Verstanden.", speak:"かしこまりました" }
      ]
    },

    // +3 additional dialogs
    {
      id: "d2",
      title_en: "Meeting someone",
      title_de: "Jemanden treffen",
      turns: [
        { who: "user", tokens: ["はじめまして"], en:"Nice to meet you.", de:"Freut mich.", speak:"はじめまして" },
        { who: "bot",  tokens: ["はじめまして"], en:"Nice to meet you too.", de:"Freut mich auch.", speak:"はじめまして" },
        { who: "user", tokens: [{ t:"私", r:"わたし" }, "は", "マリア", "です"], en:"I am Maria.", de:"Ich bin Maria.", speak:"わたしはマリアです" },
        { who: "bot",  tokens: ["よろしく", "おねがいします"], en:"Please treat me well.", de:"Freut mich / auf gute Zusammenarbeit.", speak:"よろしくおねがいします" }
      ]
    },
    {
      id: "d3",
      title_en: "Asking directions",
      title_de: "Nach dem Weg fragen",
      turns: [
        { who: "user", tokens: ["すみません", { t:"駅", r:"えき" }, "は", "どこ", "です", "か"], en:"Excuse me, where is the station?", de:"Entschuldigung, wo ist der Bahnhof?", speak:"すみません、えきはどこですか" },
        { who: "bot",  tokens: ["まっすぐ", "です"], en:"Go straight.", de:"Geradeaus.", speak:"まっすぐです" },
        { who: "user", tokens: ["ありがとう", "ございます"], en:"Thank you very much.", de:"Vielen Dank.", speak:"ありがとうございます" },
        { who: "bot",  tokens: ["どういたしまして"], en:"You're welcome.", de:"Gern geschehen.", speak:"どういたしまして" }
      ]
    },
    {
      id: "d4",
      title_en: "At a hotel",
      title_de: "Im Hotel",
      turns: [
        { who: "user", tokens: ["チェックイン", "おねがいします"], en:"I'd like to check in.", de:"Ich möchte einchecken.", speak:"チェックインおねがいします" },
        { who: "bot",  tokens: ["おなまえ", "は", "？"], en:"Your name?", de:"Ihr Name?", speak:"おなまえは？" },
        { who: "user", tokens: ["ペーター", "です"], en:"It's Peter.", de:"Peter.", speak:"ぺえたあです" },
        { who: "bot",  tokens: ["こちら", "へ", "どうぞ"], en:"This way, please.", de:"Bitte hier entlang.", speak:"こちらへどうぞ" }
      ]
    }
  ]
};
