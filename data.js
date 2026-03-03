// Sample content.
// IMPORTANT: For better highlighting, sentences/dialog lines are tokenized with spaces between Japanese chunks.
// You can expand these lists freely.

window.JP_DATA = {
  words: [
    {
      id: "w1",
      jp: "こんにちは",
      reading: "こんにちは",
      en: "Hello",
      de: "Hallo",
      speak: "こんにちは",
      alts: ["こん に ち は"]
    },
    {
      id: "w2",
      jp: "ありがとう",
      reading: "ありがとう",
      en: "Thank you",
      de: "Danke",
      speak: "ありがとう"
    },
    {
      id: "w3",
      jp: "猫",
      furigana: "ねこ",
      reading: "ねこ",
      en: "Cat",
      de: "Katze",
      speak: "ねこ"
    },
    {
      id: "w4",
      jp: "学生",
      furigana: "がくせい",
      reading: "がくせい",
      en: "Student",
      de: "Student(in)",
      speak: "がくせい"
    },
    {
      id: "w5",
      jp: "コーヒー",
      reading: "こーひー",
      en: "Coffee",
      de: "Kaffee",
      speak: "コーヒー"
    }
  ],

  sentences: [
    {
      id: "s1",
      jp: "わたし は ペーター です",
      reading: "わたし は ぺーたー です",
      en: "I am Peter.",
      de: "Ich bin Peter.",
      speak: "わたしはペーターです",
      alts: ["わたし は ぺーたー です"]
    },
    {
      id: "s2",
      jp: "これ は なん です か",
      reading: "これ は なん です か",
      en: "What is this?",
      de: "Was ist das?",
      speak: "これはなんですか"
    },
    {
      id: "s3",
      jp: "すみません が えき は どこ です か",
      reading: "すみません が えき は どこ です か",
      en: "Excuse me, where is the station?",
      de: "Entschuldigung, wo ist der Bahnhof?",
      speak: "すみませんが駅はどこですか"
    }
  ],

  dialogs: [
    {
      id: "d1",
      title_en: "At a café",
      title_de: "Im Café",
      turns: [
        { who: "user", jp: "すみません こーひー を ください", reading: "すみません こーひー を ください", speak:"すみません、コーヒーをください", en:"Excuse me, coffee please.", de:"Entschuldigung, einen Kaffee bitte." },
        { who: "bot",  jp: "はい わかりました", reading: "はい わかりました", speak:"はい、わかりました", en:"Sure.", de:"Gern." },
        { who: "user", jp: "さとう は いりません", reading:"さとう は いりません", speak:"砂糖はいりません", en:"No sugar.", de:"Kein Zucker." },
        { who: "bot",  jp: "かしこまりました", reading:"かしこまりました", speak:"かしこまりました", en:"Understood.", de:"Verstanden." }
      ]
    }
  ]
};
