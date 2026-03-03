// Sample content (you can expand freely).
// Tokens are arrays for highlighting; display keeps Japanese punctuation.
// Tokens can be strings or objects: { t: "私", r: "わたし" } for ruby/furigana.

window.JP_DATA = {
  "words": [
    {
      "id": "w1",
      "tokens": [
        "こんにちは"
      ],
      "en": "Hello",
      "de": "Hallo",
      "speak": "こんにちは"
    },
    {
      "id": "w2",
      "tokens": [
        "ありがとう"
      ],
      "en": "Thank you",
      "de": "Danke",
      "speak": "ありがとう"
    },
    {
      "id": "w3",
      "tokens": [
        {
          "t": "猫",
          "r": "ねこ"
        }
      ],
      "en": "Cat",
      "de": "Katze",
      "speak": "ねこ"
    },
    {
      "id": "w4",
      "tokens": [
        {
          "t": "学生",
          "r": "がくせい"
        }
      ],
      "en": "Student",
      "de": "Student(in)",
      "speak": "がくせい"
    },
    {
      "id": "w5",
      "tokens": [
        "コーヒー"
      ],
      "en": "Coffee",
      "de": "Kaffee",
      "speak": "コーヒー"
    },
    {
      "id": "w6",
      "tokens": [
        {
          "t": "私",
          "r": "わたし"
        }
      ],
      "en": "I / me",
      "de": "ich / mich",
      "speak": "わたし"
    },
    {
      "id": "w7",
      "tokens": [
        "テレビ"
      ],
      "en": "TV",
      "de": "Fernseher",
      "speak": "テレビ"
    },
    {
      "id": "w8",
      "tokens": [
        {
          "t": "日本",
          "r": "にほん"
        }
      ],
      "en": "Japan",
      "de": "Japan",
      "speak": "にほん"
    },
    {
      "id": "w9",
      "tokens": [
        "ホテル"
      ],
      "en": "Hotel",
      "de": "Hotel",
      "speak": "ホテル"
    }
  ],
  "sentences": [
    {
      "id": "s1",
      "tokens": [
        {
          "t": "私",
          "r": "わたし"
        },
        "は",
        "ペーター",
        "です",
        "。"
      ],
      "en": "I am Peter.",
      "de": "Ich bin Peter.",
      "speak": "わたしはぺえたあです"
    },
    {
      "id": "s2",
      "tokens": [
        "これ",
        "は",
        "何",
        "です",
        "か",
        "。"
      ],
      "ruby": {
        "何": "なに"
      },
      "en": "What is this。",
      "de": "Was ist das。",
      "speak": "これはなんですか"
    },
    {
      "id": "s3",
      "tokens": [
        "すみません",
        "、",
        {
          "t": "駅",
          "r": "えき"
        },
        "は",
        "どこ",
        "です",
        "か",
        "。"
      ],
      "en": "Excuse me, where is the station。",
      "de": "Entschuldigung, wo ist der Bahnhof。",
      "speak": "すみませんえきはどこですか"
    },
    {
      "id": "s4",
      "tokens": [
        {
          "t": "明日",
          "r": "あした"
        },
        "は",
        "ひま",
        "です",
        "。"
      ],
      "en": "I am free tomorrow.",
      "de": "Ich habe morgen Zeit.",
      "speak": "あしたはひまです"
    },
    {
      "id": "s5",
      "tokens": [
        "コーヒー",
        "を",
        "ください",
        "。"
      ],
      "en": "Coffee, please.",
      "de": "Einen Kaffee bitte.",
      "speak": "コーヒーをください"
    },
    {
      "id": "s6",
      "tokens": [
        {
          "t": "日本語",
          "r": "にほんご"
        },
        "を",
        "べんきょう",
        "します",
        "。"
      ],
      "en": "I study Japanese.",
      "de": "Ich lerne Japanisch.",
      "speak": "にほんごをべんきょうします"
    }
  ],
  "dialogs": [
    {
      "id": "d1",
      "title_en": "At a café",
      "title_de": "Im Café",
      "turns": [
        {
          "who": "user",
          "tokens": [
            "すみません",
            "、",
            "コーヒー",
            "を",
            "ください",
            "。"
          ],
          "en": "Excuse me, coffee please.",
          "de": "Entschuldigung, einen Kaffee bitte.",
          "speak": "すみませんコーヒーをください"
        },
        {
          "who": "bot",
          "tokens": [
            "はい",
            "。",
            "わかりました",
            "。"
          ],
          "en": "Sure.",
          "de": "Gern.",
          "speak": "はい、わかりました"
        },
        {
          "who": "user",
          "tokens": [
            {
              "t": "砂糖",
              "r": "さとう"
            },
            "は",
            "いりません",
            "。"
          ],
          "en": "No sugar.",
          "de": "Kein Zucker.",
          "speak": "さとうはいりません"
        },
        {
          "who": "bot",
          "tokens": [
            "かしこまりました",
            "。"
          ],
          "en": "Understood.",
          "de": "Verstanden.",
          "speak": "かしこまりました"
        }
      ]
    },
    {
      "id": "d2",
      "title_en": "Meeting someone",
      "title_de": "Jemanden treffen",
      "turns": [
        {
          "who": "user",
          "tokens": [
            "はじめまして",
            "。"
          ],
          "en": "Nice to meet you.",
          "de": "Freut mich.",
          "speak": "はじめまして"
        },
        {
          "who": "bot",
          "tokens": [
            "はじめまして",
            "。"
          ],
          "en": "Nice to meet you too.",
          "de": "Freut mich auch.",
          "speak": "はじめまして"
        },
        {
          "who": "user",
          "tokens": [
            {
              "t": "私",
              "r": "わたし"
            },
            "は",
            "マリア",
            "です",
            "。"
          ],
          "en": "I am Maria.",
          "de": "Ich bin Maria.",
          "speak": "わたしはマリアです"
        },
        {
          "who": "bot",
          "tokens": [
            "よろしく",
            "おねがいします",
            "。"
          ],
          "en": "Please treat me well.",
          "de": "Freut mich / auf gute Zusammenarbeit.",
          "speak": "よろしくおねがいします"
        }
      ]
    },
    {
      "id": "d3",
      "title_en": "Asking directions",
      "title_de": "Nach dem Weg fragen",
      "turns": [
        {
          "who": "user",
          "tokens": [
            "すみません",
            "、",
            {
              "t": "駅",
              "r": "えき"
            },
            "は",
            "どこ",
            "です",
            "か",
            "。"
          ],
          "en": "Excuse me, where is the station。",
          "de": "Entschuldigung, wo ist der Bahnhof。",
          "speak": "すみませんえきはどこですか"
        },
        {
          "who": "bot",
          "tokens": [
            "まっすぐ",
            "です",
            "。"
          ],
          "en": "Go straight.",
          "de": "Geradeaus.",
          "speak": "まっすぐです"
        },
        {
          "who": "user",
          "tokens": [
            "ありがとう",
            "ございます",
            "。"
          ],
          "en": "Thank you very much.",
          "de": "Vielen Dank.",
          "speak": "ありがとうございます"
        },
        {
          "who": "bot",
          "tokens": [
            "どういたしまして",
            "。"
          ],
          "en": "You're welcome.",
          "de": "Gern geschehen.",
          "speak": "どういたしまして"
        }
      ]
    },
    {
      "id": "d4",
      "title_en": "At a hotel",
      "title_de": "Im Hotel",
      "turns": [
        {
          "who": "user",
          "tokens": [
            "チェックイン",
            {
              "t": "お願い",
              "r": "おねがい"
            },
            "します",
            "。"
          ],
          "en": "I'd like to check in.",
          "de": "Ich möchte einchecken.",
          "speak": "チェックインお願いします"
        },
        {
          "who": "bot",
          "tokens": [
            "おなまえ",
            "は",
            "。"
          ],
          "en": "Your name。",
          "de": "Ihr Name。",
          "speak": "おなまえは"
        },
        {
          "who": "user",
          "tokens": [
            "ペーター",
            "です",
            "。"
          ],
          "en": "It's Peter.",
          "de": "Peter.",
          "speak": "ぺえたあです"
        },
        {
          "who": "bot",
          "tokens": [
            "こちら",
            "へ",
            "どうぞ",
            "。"
          ],
          "en": "This way, please.",
          "de": "Bitte hier entlang.",
          "speak": "こちらへどうぞ"
        }
      ]
    }
  ],
  "hiragana": [
    {
      "id": "h1",
      "tokens": [
        "あ"
      ],
      "en": "a",
      "de": "a",
      "speak": "あ"
    },
    {
      "id": "h2",
      "tokens": [
        "い"
      ],
      "en": "i",
      "de": "i",
      "speak": "い"
    },
    {
      "id": "h3",
      "tokens": [
        "う"
      ],
      "en": "u",
      "de": "u",
      "speak": "う"
    },
    {
      "id": "h4",
      "tokens": [
        "え"
      ],
      "en": "e",
      "de": "e",
      "speak": "え"
    },
    {
      "id": "h5",
      "tokens": [
        "お"
      ],
      "en": "o",
      "de": "o",
      "speak": "お"
    },
    {
      "id": "h6",
      "tokens": [
        "か"
      ],
      "en": "ka",
      "de": "ka",
      "speak": "か"
    },
    {
      "id": "h7",
      "tokens": [
        "き"
      ],
      "en": "ki",
      "de": "ki",
      "speak": "き"
    },
    {
      "id": "h8",
      "tokens": [
        "く"
      ],
      "en": "ku",
      "de": "ku",
      "speak": "く"
    },
    {
      "id": "h9",
      "tokens": [
        "け"
      ],
      "en": "ke",
      "de": "ke",
      "speak": "け"
    },
    {
      "id": "h10",
      "tokens": [
        "こ"
      ],
      "en": "ko",
      "de": "ko",
      "speak": "こ"
    },
    {
      "id": "h11",
      "tokens": [
        "さ"
      ],
      "en": "sa",
      "de": "sa",
      "speak": "さ"
    },
    {
      "id": "h12",
      "tokens": [
        "し"
      ],
      "en": "shi",
      "de": "shi",
      "speak": "し"
    },
    {
      "id": "h13",
      "tokens": [
        "す"
      ],
      "en": "su",
      "de": "su",
      "speak": "す"
    },
    {
      "id": "h14",
      "tokens": [
        "せ"
      ],
      "en": "se",
      "de": "se",
      "speak": "せ"
    },
    {
      "id": "h15",
      "tokens": [
        "そ"
      ],
      "en": "so",
      "de": "so",
      "speak": "そ"
    },
    {
      "id": "h16",
      "tokens": [
        "た"
      ],
      "en": "ta",
      "de": "ta",
      "speak": "た"
    },
    {
      "id": "h17",
      "tokens": [
        "ち"
      ],
      "en": "chi",
      "de": "chi",
      "speak": "ち"
    },
    {
      "id": "h18",
      "tokens": [
        "つ"
      ],
      "en": "tsu",
      "de": "tsu",
      "speak": "つ"
    },
    {
      "id": "h19",
      "tokens": [
        "て"
      ],
      "en": "te",
      "de": "te",
      "speak": "て"
    },
    {
      "id": "h20",
      "tokens": [
        "と"
      ],
      "en": "to",
      "de": "to",
      "speak": "と"
    },
    {
      "id": "h21",
      "tokens": [
        "な"
      ],
      "en": "na",
      "de": "na",
      "speak": "な"
    },
    {
      "id": "h22",
      "tokens": [
        "に"
      ],
      "en": "ni",
      "de": "ni",
      "speak": "に"
    },
    {
      "id": "h23",
      "tokens": [
        "ぬ"
      ],
      "en": "nu",
      "de": "nu",
      "speak": "ぬ"
    },
    {
      "id": "h24",
      "tokens": [
        "ね"
      ],
      "en": "ne",
      "de": "ne",
      "speak": "ね"
    },
    {
      "id": "h25",
      "tokens": [
        "の"
      ],
      "en": "no",
      "de": "no",
      "speak": "の"
    },
    {
      "id": "h26",
      "tokens": [
        "は"
      ],
      "en": "ha",
      "de": "ha",
      "speak": "は"
    },
    {
      "id": "h27",
      "tokens": [
        "ひ"
      ],
      "en": "hi",
      "de": "hi",
      "speak": "ひ"
    },
    {
      "id": "h28",
      "tokens": [
        "ふ"
      ],
      "en": "fu",
      "de": "fu",
      "speak": "ふ"
    },
    {
      "id": "h29",
      "tokens": [
        "へ"
      ],
      "en": "he",
      "de": "he",
      "speak": "へ"
    },
    {
      "id": "h30",
      "tokens": [
        "ほ"
      ],
      "en": "ho",
      "de": "ho",
      "speak": "ほ"
    },
    {
      "id": "h31",
      "tokens": [
        "ま"
      ],
      "en": "ma",
      "de": "ma",
      "speak": "ま"
    },
    {
      "id": "h32",
      "tokens": [
        "み"
      ],
      "en": "mi",
      "de": "mi",
      "speak": "み"
    },
    {
      "id": "h33",
      "tokens": [
        "む"
      ],
      "en": "mu",
      "de": "mu",
      "speak": "む"
    },
    {
      "id": "h34",
      "tokens": [
        "め"
      ],
      "en": "me",
      "de": "me",
      "speak": "め"
    },
    {
      "id": "h35",
      "tokens": [
        "も"
      ],
      "en": "mo",
      "de": "mo",
      "speak": "も"
    },
    {
      "id": "h36",
      "tokens": [
        "や"
      ],
      "en": "ya",
      "de": "ya",
      "speak": "や"
    },
    {
      "id": "h37",
      "tokens": [
        "ゆ"
      ],
      "en": "yu",
      "de": "yu",
      "speak": "ゆ"
    },
    {
      "id": "h38",
      "tokens": [
        "よ"
      ],
      "en": "yo",
      "de": "yo",
      "speak": "よ"
    },
    {
      "id": "h39",
      "tokens": [
        "ら"
      ],
      "en": "ra",
      "de": "ra",
      "speak": "ら"
    },
    {
      "id": "h40",
      "tokens": [
        "り"
      ],
      "en": "ri",
      "de": "ri",
      "speak": "り"
    },
    {
      "id": "h41",
      "tokens": [
        "る"
      ],
      "en": "ru",
      "de": "ru",
      "speak": "る"
    },
    {
      "id": "h42",
      "tokens": [
        "れ"
      ],
      "en": "re",
      "de": "re",
      "speak": "れ"
    },
    {
      "id": "h43",
      "tokens": [
        "ろ"
      ],
      "en": "ro",
      "de": "ro",
      "speak": "ろ"
    },
    {
      "id": "h44",
      "tokens": [
        "わ"
      ],
      "en": "wa",
      "de": "wa",
      "speak": "わ"
    },
    {
      "id": "h45",
      "tokens": [
        "を"
      ],
      "en": "o",
      "de": "o",
      "speak": "を"
    },
    {
      "id": "h46",
      "tokens": [
        "ん"
      ],
      "en": "n",
      "de": "n",
      "speak": "ん"
    },
    {
      "id": "h47",
      "tokens": [
        "が"
      ],
      "en": "ga",
      "de": "ga",
      "speak": "が"
    },
    {
      "id": "h48",
      "tokens": [
        "ぎ"
      ],
      "en": "gi",
      "de": "gi",
      "speak": "ぎ"
    },
    {
      "id": "h49",
      "tokens": [
        "ぐ"
      ],
      "en": "gu",
      "de": "gu",
      "speak": "ぐ"
    },
    {
      "id": "h50",
      "tokens": [
        "げ"
      ],
      "en": "ge",
      "de": "ge",
      "speak": "げ"
    },
    {
      "id": "h51",
      "tokens": [
        "ご"
      ],
      "en": "go",
      "de": "go",
      "speak": "ご"
    },
    {
      "id": "h52",
      "tokens": [
        "ざ"
      ],
      "en": "za",
      "de": "za",
      "speak": "ざ"
    },
    {
      "id": "h53",
      "tokens": [
        "じ"
      ],
      "en": "ji",
      "de": "ji",
      "speak": "じ"
    },
    {
      "id": "h54",
      "tokens": [
        "ず"
      ],
      "en": "zu",
      "de": "zu",
      "speak": "ず"
    },
    {
      "id": "h55",
      "tokens": [
        "ぜ"
      ],
      "en": "ze",
      "de": "ze",
      "speak": "ぜ"
    },
    {
      "id": "h56",
      "tokens": [
        "ぞ"
      ],
      "en": "zo",
      "de": "zo",
      "speak": "ぞ"
    },
    {
      "id": "h57",
      "tokens": [
        "だ"
      ],
      "en": "da",
      "de": "da",
      "speak": "だ"
    },
    {
      "id": "h58",
      "tokens": [
        "ぢ"
      ],
      "en": "ji",
      "de": "ji",
      "speak": "ぢ"
    },
    {
      "id": "h59",
      "tokens": [
        "づ"
      ],
      "en": "zu",
      "de": "zu",
      "speak": "づ"
    },
    {
      "id": "h60",
      "tokens": [
        "で"
      ],
      "en": "de",
      "de": "de",
      "speak": "で"
    },
    {
      "id": "h61",
      "tokens": [
        "ど"
      ],
      "en": "do",
      "de": "do",
      "speak": "ど"
    },
    {
      "id": "h62",
      "tokens": [
        "ば"
      ],
      "en": "ba",
      "de": "ba",
      "speak": "ば"
    },
    {
      "id": "h63",
      "tokens": [
        "び"
      ],
      "en": "bi",
      "de": "bi",
      "speak": "び"
    },
    {
      "id": "h64",
      "tokens": [
        "ぶ"
      ],
      "en": "bu",
      "de": "bu",
      "speak": "ぶ"
    },
    {
      "id": "h65",
      "tokens": [
        "べ"
      ],
      "en": "be",
      "de": "be",
      "speak": "べ"
    },
    {
      "id": "h66",
      "tokens": [
        "ぼ"
      ],
      "en": "bo",
      "de": "bo",
      "speak": "ぼ"
    },
    {
      "id": "h67",
      "tokens": [
        "ぱ"
      ],
      "en": "pa",
      "de": "pa",
      "speak": "ぱ"
    },
    {
      "id": "h68",
      "tokens": [
        "ぴ"
      ],
      "en": "pi",
      "de": "pi",
      "speak": "ぴ"
    },
    {
      "id": "h69",
      "tokens": [
        "ぷ"
      ],
      "en": "pu",
      "de": "pu",
      "speak": "ぷ"
    },
    {
      "id": "h70",
      "tokens": [
        "ぺ"
      ],
      "en": "pe",
      "de": "pe",
      "speak": "ぺ"
    },
    {
      "id": "h71",
      "tokens": [
        "ぽ"
      ],
      "en": "po",
      "de": "po",
      "speak": "ぽ"
    },
    {
      "id": "h72",
      "tokens": [
        "きゃ"
      ],
      "en": "kya",
      "de": "kya",
      "speak": "きゃ"
    },
    {
      "id": "h73",
      "tokens": [
        "きゅ"
      ],
      "en": "kyu",
      "de": "kyu",
      "speak": "きゅ"
    },
    {
      "id": "h74",
      "tokens": [
        "きょ"
      ],
      "en": "kyo",
      "de": "kyo",
      "speak": "きょ"
    },
    {
      "id": "h75",
      "tokens": [
        "ぎゃ"
      ],
      "en": "gya",
      "de": "gya",
      "speak": "ぎゃ"
    },
    {
      "id": "h76",
      "tokens": [
        "ぎゅ"
      ],
      "en": "gyu",
      "de": "gyu",
      "speak": "ぎゅ"
    },
    {
      "id": "h77",
      "tokens": [
        "ぎょ"
      ],
      "en": "gyo",
      "de": "gyo",
      "speak": "ぎょ"
    },
    {
      "id": "h78",
      "tokens": [
        "しゃ"
      ],
      "en": "sha",
      "de": "sha",
      "speak": "しゃ"
    },
    {
      "id": "h79",
      "tokens": [
        "しゅ"
      ],
      "en": "shu",
      "de": "shu",
      "speak": "しゅ"
    },
    {
      "id": "h80",
      "tokens": [
        "しょ"
      ],
      "en": "sho",
      "de": "sho",
      "speak": "しょ"
    },
    {
      "id": "h81",
      "tokens": [
        "じゃ"
      ],
      "en": "ja",
      "de": "ja",
      "speak": "じゃ"
    },
    {
      "id": "h82",
      "tokens": [
        "じゅ"
      ],
      "en": "ju",
      "de": "ju",
      "speak": "じゅ"
    },
    {
      "id": "h83",
      "tokens": [
        "じょ"
      ],
      "en": "jo",
      "de": "jo",
      "speak": "じょ"
    },
    {
      "id": "h84",
      "tokens": [
        "ちゃ"
      ],
      "en": "cha",
      "de": "cha",
      "speak": "ちゃ"
    },
    {
      "id": "h85",
      "tokens": [
        "ちゅ"
      ],
      "en": "chu",
      "de": "chu",
      "speak": "ちゅ"
    },
    {
      "id": "h86",
      "tokens": [
        "ちょ"
      ],
      "en": "cho",
      "de": "cho",
      "speak": "ちょ"
    },
    {
      "id": "h87",
      "tokens": [
        "ぢゃ"
      ],
      "en": "ja",
      "de": "ja",
      "speak": "ぢゃ"
    },
    {
      "id": "h88",
      "tokens": [
        "ぢゅ"
      ],
      "en": "ju",
      "de": "ju",
      "speak": "ぢゅ"
    },
    {
      "id": "h89",
      "tokens": [
        "ぢょ"
      ],
      "en": "jo",
      "de": "jo",
      "speak": "ぢょ"
    },
    {
      "id": "h90",
      "tokens": [
        "にゃ"
      ],
      "en": "nya",
      "de": "nya",
      "speak": "にゃ"
    },
    {
      "id": "h91",
      "tokens": [
        "にゅ"
      ],
      "en": "nyu",
      "de": "nyu",
      "speak": "にゅ"
    },
    {
      "id": "h92",
      "tokens": [
        "にょ"
      ],
      "en": "nyo",
      "de": "nyo",
      "speak": "にょ"
    },
    {
      "id": "h93",
      "tokens": [
        "ひゃ"
      ],
      "en": "hya",
      "de": "hya",
      "speak": "ひゃ"
    },
    {
      "id": "h94",
      "tokens": [
        "ひゅ"
      ],
      "en": "hyu",
      "de": "hyu",
      "speak": "ひゅ"
    },
    {
      "id": "h95",
      "tokens": [
        "ひょ"
      ],
      "en": "hyo",
      "de": "hyo",
      "speak": "ひょ"
    },
    {
      "id": "h96",
      "tokens": [
        "びゃ"
      ],
      "en": "bya",
      "de": "bya",
      "speak": "びゃ"
    },
    {
      "id": "h97",
      "tokens": [
        "びゅ"
      ],
      "en": "byu",
      "de": "byu",
      "speak": "びゅ"
    },
    {
      "id": "h98",
      "tokens": [
        "びょ"
      ],
      "en": "byo",
      "de": "byo",
      "speak": "びょ"
    },
    {
      "id": "h99",
      "tokens": [
        "ぴゃ"
      ],
      "en": "pya",
      "de": "pya",
      "speak": "ぴゃ"
    },
    {
      "id": "h100",
      "tokens": [
        "ぴゅ"
      ],
      "en": "pyu",
      "de": "pyu",
      "speak": "ぴゅ"
    },
    {
      "id": "h101",
      "tokens": [
        "ぴょ"
      ],
      "en": "pyo",
      "de": "pyo",
      "speak": "ぴょ"
    },
    {
      "id": "h102",
      "tokens": [
        "みゃ"
      ],
      "en": "mya",
      "de": "mya",
      "speak": "みゃ"
    },
    {
      "id": "h103",
      "tokens": [
        "みゅ"
      ],
      "en": "myu",
      "de": "myu",
      "speak": "みゅ"
    },
    {
      "id": "h104",
      "tokens": [
        "みょ"
      ],
      "en": "myo",
      "de": "myo",
      "speak": "みょ"
    },
    {
      "id": "h105",
      "tokens": [
        "りゃ"
      ],
      "en": "rya",
      "de": "rya",
      "speak": "りゃ"
    },
    {
      "id": "h106",
      "tokens": [
        "りゅ"
      ],
      "en": "ryu",
      "de": "ryu",
      "speak": "りゅ"
    },
    {
      "id": "h107",
      "tokens": [
        "りょ"
      ],
      "en": "ryo",
      "de": "ryo",
      "speak": "りょ"
    }
  ],
  "katakana": [
    {
      "id": "k1",
      "tokens": [
        "ア"
      ],
      "en": "a",
      "de": "a",
      "speak": "ア"
    },
    {
      "id": "k2",
      "tokens": [
        "イ"
      ],
      "en": "i",
      "de": "i",
      "speak": "イ"
    },
    {
      "id": "k3",
      "tokens": [
        "ウ"
      ],
      "en": "u",
      "de": "u",
      "speak": "ウ"
    },
    {
      "id": "k4",
      "tokens": [
        "エ"
      ],
      "en": "e",
      "de": "e",
      "speak": "エ"
    },
    {
      "id": "k5",
      "tokens": [
        "オ"
      ],
      "en": "o",
      "de": "o",
      "speak": "オ"
    },
    {
      "id": "k6",
      "tokens": [
        "カ"
      ],
      "en": "ka",
      "de": "ka",
      "speak": "カ"
    },
    {
      "id": "k7",
      "tokens": [
        "キ"
      ],
      "en": "ki",
      "de": "ki",
      "speak": "キ"
    },
    {
      "id": "k8",
      "tokens": [
        "ク"
      ],
      "en": "ku",
      "de": "ku",
      "speak": "ク"
    },
    {
      "id": "k9",
      "tokens": [
        "ケ"
      ],
      "en": "ke",
      "de": "ke",
      "speak": "ケ"
    },
    {
      "id": "k10",
      "tokens": [
        "コ"
      ],
      "en": "ko",
      "de": "ko",
      "speak": "コ"
    },
    {
      "id": "k11",
      "tokens": [
        "サ"
      ],
      "en": "sa",
      "de": "sa",
      "speak": "サ"
    },
    {
      "id": "k12",
      "tokens": [
        "シ"
      ],
      "en": "shi",
      "de": "shi",
      "speak": "シ"
    },
    {
      "id": "k13",
      "tokens": [
        "ス"
      ],
      "en": "su",
      "de": "su",
      "speak": "ス"
    },
    {
      "id": "k14",
      "tokens": [
        "セ"
      ],
      "en": "se",
      "de": "se",
      "speak": "セ"
    },
    {
      "id": "k15",
      "tokens": [
        "ソ"
      ],
      "en": "so",
      "de": "so",
      "speak": "ソ"
    },
    {
      "id": "k16",
      "tokens": [
        "タ"
      ],
      "en": "ta",
      "de": "ta",
      "speak": "タ"
    },
    {
      "id": "k17",
      "tokens": [
        "チ"
      ],
      "en": "chi",
      "de": "chi",
      "speak": "チ"
    },
    {
      "id": "k18",
      "tokens": [
        "ツ"
      ],
      "en": "tsu",
      "de": "tsu",
      "speak": "ツ"
    },
    {
      "id": "k19",
      "tokens": [
        "テ"
      ],
      "en": "te",
      "de": "te",
      "speak": "テ"
    },
    {
      "id": "k20",
      "tokens": [
        "ト"
      ],
      "en": "to",
      "de": "to",
      "speak": "ト"
    },
    {
      "id": "k21",
      "tokens": [
        "ナ"
      ],
      "en": "na",
      "de": "na",
      "speak": "ナ"
    },
    {
      "id": "k22",
      "tokens": [
        "ニ"
      ],
      "en": "ni",
      "de": "ni",
      "speak": "ニ"
    },
    {
      "id": "k23",
      "tokens": [
        "ヌ"
      ],
      "en": "nu",
      "de": "nu",
      "speak": "ヌ"
    },
    {
      "id": "k24",
      "tokens": [
        "ネ"
      ],
      "en": "ne",
      "de": "ne",
      "speak": "ネ"
    },
    {
      "id": "k25",
      "tokens": [
        "ノ"
      ],
      "en": "no",
      "de": "no",
      "speak": "ノ"
    },
    {
      "id": "k26",
      "tokens": [
        "ハ"
      ],
      "en": "ha",
      "de": "ha",
      "speak": "ハ"
    },
    {
      "id": "k27",
      "tokens": [
        "ヒ"
      ],
      "en": "hi",
      "de": "hi",
      "speak": "ヒ"
    },
    {
      "id": "k28",
      "tokens": [
        "フ"
      ],
      "en": "fu",
      "de": "fu",
      "speak": "フ"
    },
    {
      "id": "k29",
      "tokens": [
        "ヘ"
      ],
      "en": "he",
      "de": "he",
      "speak": "ヘ"
    },
    {
      "id": "k30",
      "tokens": [
        "ホ"
      ],
      "en": "ho",
      "de": "ho",
      "speak": "ホ"
    },
    {
      "id": "k31",
      "tokens": [
        "マ"
      ],
      "en": "ma",
      "de": "ma",
      "speak": "マ"
    },
    {
      "id": "k32",
      "tokens": [
        "ミ"
      ],
      "en": "mi",
      "de": "mi",
      "speak": "ミ"
    },
    {
      "id": "k33",
      "tokens": [
        "ム"
      ],
      "en": "mu",
      "de": "mu",
      "speak": "ム"
    },
    {
      "id": "k34",
      "tokens": [
        "メ"
      ],
      "en": "me",
      "de": "me",
      "speak": "メ"
    },
    {
      "id": "k35",
      "tokens": [
        "モ"
      ],
      "en": "mo",
      "de": "mo",
      "speak": "モ"
    },
    {
      "id": "k36",
      "tokens": [
        "ヤ"
      ],
      "en": "ya",
      "de": "ya",
      "speak": "ヤ"
    },
    {
      "id": "k37",
      "tokens": [
        "ユ"
      ],
      "en": "yu",
      "de": "yu",
      "speak": "ユ"
    },
    {
      "id": "k38",
      "tokens": [
        "ヨ"
      ],
      "en": "yo",
      "de": "yo",
      "speak": "ヨ"
    },
    {
      "id": "k39",
      "tokens": [
        "ラ"
      ],
      "en": "ra",
      "de": "ra",
      "speak": "ラ"
    },
    {
      "id": "k40",
      "tokens": [
        "リ"
      ],
      "en": "ri",
      "de": "ri",
      "speak": "リ"
    },
    {
      "id": "k41",
      "tokens": [
        "ル"
      ],
      "en": "ru",
      "de": "ru",
      "speak": "ル"
    },
    {
      "id": "k42",
      "tokens": [
        "レ"
      ],
      "en": "re",
      "de": "re",
      "speak": "レ"
    },
    {
      "id": "k43",
      "tokens": [
        "ロ"
      ],
      "en": "ro",
      "de": "ro",
      "speak": "ロ"
    },
    {
      "id": "k44",
      "tokens": [
        "ワ"
      ],
      "en": "wa",
      "de": "wa",
      "speak": "ワ"
    },
    {
      "id": "k45",
      "tokens": [
        "ヲ"
      ],
      "en": "o",
      "de": "o",
      "speak": "ヲ"
    },
    {
      "id": "k46",
      "tokens": [
        "ン"
      ],
      "en": "n",
      "de": "n",
      "speak": "ン"
    },
    {
      "id": "k47",
      "tokens": [
        "ガ"
      ],
      "en": "ga",
      "de": "ga",
      "speak": "ガ"
    },
    {
      "id": "k48",
      "tokens": [
        "ギ"
      ],
      "en": "gi",
      "de": "gi",
      "speak": "ギ"
    },
    {
      "id": "k49",
      "tokens": [
        "グ"
      ],
      "en": "gu",
      "de": "gu",
      "speak": "グ"
    },
    {
      "id": "k50",
      "tokens": [
        "ゲ"
      ],
      "en": "ge",
      "de": "ge",
      "speak": "ゲ"
    },
    {
      "id": "k51",
      "tokens": [
        "ゴ"
      ],
      "en": "go",
      "de": "go",
      "speak": "ゴ"
    },
    {
      "id": "k52",
      "tokens": [
        "ザ"
      ],
      "en": "za",
      "de": "za",
      "speak": "ザ"
    },
    {
      "id": "k53",
      "tokens": [
        "ジ"
      ],
      "en": "ji",
      "de": "ji",
      "speak": "ジ"
    },
    {
      "id": "k54",
      "tokens": [
        "ズ"
      ],
      "en": "zu",
      "de": "zu",
      "speak": "ズ"
    },
    {
      "id": "k55",
      "tokens": [
        "ゼ"
      ],
      "en": "ze",
      "de": "ze",
      "speak": "ゼ"
    },
    {
      "id": "k56",
      "tokens": [
        "ゾ"
      ],
      "en": "zo",
      "de": "zo",
      "speak": "ゾ"
    },
    {
      "id": "k57",
      "tokens": [
        "ダ"
      ],
      "en": "da",
      "de": "da",
      "speak": "ダ"
    },
    {
      "id": "k58",
      "tokens": [
        "ヂ"
      ],
      "en": "ji",
      "de": "ji",
      "speak": "ヂ"
    },
    {
      "id": "k59",
      "tokens": [
        "ヅ"
      ],
      "en": "zu",
      "de": "zu",
      "speak": "ヅ"
    },
    {
      "id": "k60",
      "tokens": [
        "デ"
      ],
      "en": "de",
      "de": "de",
      "speak": "デ"
    },
    {
      "id": "k61",
      "tokens": [
        "ド"
      ],
      "en": "do",
      "de": "do",
      "speak": "ド"
    },
    {
      "id": "k62",
      "tokens": [
        "バ"
      ],
      "en": "ba",
      "de": "ba",
      "speak": "バ"
    },
    {
      "id": "k63",
      "tokens": [
        "ビ"
      ],
      "en": "bi",
      "de": "bi",
      "speak": "ビ"
    },
    {
      "id": "k64",
      "tokens": [
        "ブ"
      ],
      "en": "bu",
      "de": "bu",
      "speak": "ブ"
    },
    {
      "id": "k65",
      "tokens": [
        "ベ"
      ],
      "en": "be",
      "de": "be",
      "speak": "ベ"
    },
    {
      "id": "k66",
      "tokens": [
        "ボ"
      ],
      "en": "bo",
      "de": "bo",
      "speak": "ボ"
    },
    {
      "id": "k67",
      "tokens": [
        "パ"
      ],
      "en": "pa",
      "de": "pa",
      "speak": "パ"
    },
    {
      "id": "k68",
      "tokens": [
        "ピ"
      ],
      "en": "pi",
      "de": "pi",
      "speak": "ピ"
    },
    {
      "id": "k69",
      "tokens": [
        "プ"
      ],
      "en": "pu",
      "de": "pu",
      "speak": "プ"
    },
    {
      "id": "k70",
      "tokens": [
        "ペ"
      ],
      "en": "pe",
      "de": "pe",
      "speak": "ペ"
    },
    {
      "id": "k71",
      "tokens": [
        "ポ"
      ],
      "en": "po",
      "de": "po",
      "speak": "ポ"
    },
    {
      "id": "k72",
      "tokens": [
        "キャ"
      ],
      "en": "kya",
      "de": "kya",
      "speak": "キャ"
    },
    {
      "id": "k73",
      "tokens": [
        "キュ"
      ],
      "en": "kyu",
      "de": "kyu",
      "speak": "キュ"
    },
    {
      "id": "k74",
      "tokens": [
        "キョ"
      ],
      "en": "kyo",
      "de": "kyo",
      "speak": "キョ"
    },
    {
      "id": "k75",
      "tokens": [
        "ギャ"
      ],
      "en": "gya",
      "de": "gya",
      "speak": "ギャ"
    },
    {
      "id": "k76",
      "tokens": [
        "ギュ"
      ],
      "en": "gyu",
      "de": "gyu",
      "speak": "ギュ"
    },
    {
      "id": "k77",
      "tokens": [
        "ギョ"
      ],
      "en": "gyo",
      "de": "gyo",
      "speak": "ギョ"
    },
    {
      "id": "k78",
      "tokens": [
        "シャ"
      ],
      "en": "sha",
      "de": "sha",
      "speak": "シャ"
    },
    {
      "id": "k79",
      "tokens": [
        "シュ"
      ],
      "en": "shu",
      "de": "shu",
      "speak": "シュ"
    },
    {
      "id": "k80",
      "tokens": [
        "ショ"
      ],
      "en": "sho",
      "de": "sho",
      "speak": "ショ"
    },
    {
      "id": "k81",
      "tokens": [
        "ジャ"
      ],
      "en": "ja",
      "de": "ja",
      "speak": "ジャ"
    },
    {
      "id": "k82",
      "tokens": [
        "ジュ"
      ],
      "en": "ju",
      "de": "ju",
      "speak": "ジュ"
    },
    {
      "id": "k83",
      "tokens": [
        "ジョ"
      ],
      "en": "jo",
      "de": "jo",
      "speak": "ジョ"
    },
    {
      "id": "k84",
      "tokens": [
        "チャ"
      ],
      "en": "cha",
      "de": "cha",
      "speak": "チャ"
    },
    {
      "id": "k85",
      "tokens": [
        "チュ"
      ],
      "en": "chu",
      "de": "chu",
      "speak": "チュ"
    },
    {
      "id": "k86",
      "tokens": [
        "チョ"
      ],
      "en": "cho",
      "de": "cho",
      "speak": "チョ"
    },
    {
      "id": "k87",
      "tokens": [
        "ヂャ"
      ],
      "en": "ja",
      "de": "ja",
      "speak": "ヂャ"
    },
    {
      "id": "k88",
      "tokens": [
        "ヂュ"
      ],
      "en": "ju",
      "de": "ju",
      "speak": "ヂュ"
    },
    {
      "id": "k89",
      "tokens": [
        "ヂョ"
      ],
      "en": "jo",
      "de": "jo",
      "speak": "ヂョ"
    },
    {
      "id": "k90",
      "tokens": [
        "ニャ"
      ],
      "en": "nya",
      "de": "nya",
      "speak": "ニャ"
    },
    {
      "id": "k91",
      "tokens": [
        "ニュ"
      ],
      "en": "nyu",
      "de": "nyu",
      "speak": "ニュ"
    },
    {
      "id": "k92",
      "tokens": [
        "ニョ"
      ],
      "en": "nyo",
      "de": "nyo",
      "speak": "ニョ"
    },
    {
      "id": "k93",
      "tokens": [
        "ヒャ"
      ],
      "en": "hya",
      "de": "hya",
      "speak": "ヒャ"
    },
    {
      "id": "k94",
      "tokens": [
        "ヒュ"
      ],
      "en": "hyu",
      "de": "hyu",
      "speak": "ヒュ"
    },
    {
      "id": "k95",
      "tokens": [
        "ヒョ"
      ],
      "en": "hyo",
      "de": "hyo",
      "speak": "ヒョ"
    },
    {
      "id": "k96",
      "tokens": [
        "ビャ"
      ],
      "en": "bya",
      "de": "bya",
      "speak": "ビャ"
    },
    {
      "id": "k97",
      "tokens": [
        "ビュ"
      ],
      "en": "byu",
      "de": "byu",
      "speak": "ビュ"
    },
    {
      "id": "k98",
      "tokens": [
        "ビョ"
      ],
      "en": "byo",
      "de": "byo",
      "speak": "ビョ"
    },
    {
      "id": "k99",
      "tokens": [
        "ピャ"
      ],
      "en": "pya",
      "de": "pya",
      "speak": "ピャ"
    },
    {
      "id": "k100",
      "tokens": [
        "ピュ"
      ],
      "en": "pyu",
      "de": "pyu",
      "speak": "ピュ"
    },
    {
      "id": "k101",
      "tokens": [
        "ピョ"
      ],
      "en": "pyo",
      "de": "pyo",
      "speak": "ピョ"
    },
    {
      "id": "k102",
      "tokens": [
        "ミャ"
      ],
      "en": "mya",
      "de": "mya",
      "speak": "ミャ"
    },
    {
      "id": "k103",
      "tokens": [
        "ミュ"
      ],
      "en": "myu",
      "de": "myu",
      "speak": "ミュ"
    },
    {
      "id": "k104",
      "tokens": [
        "ミョ"
      ],
      "en": "myo",
      "de": "myo",
      "speak": "ミョ"
    },
    {
      "id": "k105",
      "tokens": [
        "リャ"
      ],
      "en": "rya",
      "de": "rya",
      "speak": "リャ"
    },
    {
      "id": "k106",
      "tokens": [
        "リュ"
      ],
      "en": "ryu",
      "de": "ryu",
      "speak": "リュ"
    },
    {
      "id": "k107",
      "tokens": [
        "リョ"
      ],
      "en": "ryo",
      "de": "ryo",
      "speak": "リョ"
    }
  ]
};
