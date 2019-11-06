const list = {
  deva: 0,
  IAST: 1,
  ISO15919: 2,
  HK: 3,
  ITRANS: 4,
  Veltuis: 5,
  SLP1: 6,
  WX: 7,
};

vowels = [
  ['अ', 'a', 'a', 'a', 'a', 'a', 'a', 'a'],
  ['आ', 'ā', 'ā', 'A', ['A', 'aa'], 'aa', 'A', 'A'],
  ['इ', 'i', 'i', 'i', 'i', 'i', 'i', 'i'],
  ['ई', 'ī', 'ī', 'I', ['I', 'ii'], 'ii', 'I', 'I'],
  ['उ', 'u', 'u', 'u', 'u', 'u', 'u', 'u'],
  ['ऊ', 'ū', 'ū', 'U', ['U', 'uu'], 'uu', 'U', 'U'],
  ['ए', 'e', 'ē', 'e', 'e', 'e', 'e', 'e'],
  ['ऐ', 'ai', 'ai', 'ai', 'ai', 'ai', 'E', 'E'],
  ['ओ', 'o', 'ō', 'o', 'o', 'o', 'o', 'o'],
  ['औ', 'au', 'au', 'au', 'au', 'au', 'O', 'O'],
  ['ऋ', 'ṛ', 'r̥', 'R', ['RRi', 'R^i'], '.r', 'f', 'q'],
  ['ॠ', 'ṝ', 'r̥̄', 'RR', ['RRI', 'R^I'], '.rr', 'F', 'Q'],
  ['ऌ', 'ḷ', 'l̥', 'lR', ['LLi', 'L^i'], '.l', 'x', 'L'],
  ['ॡ', 'ḹ', 'l̥̄', 'lRR', ['LLI', 'L^I'], '.ll', 'X', 'LY'],
  ['अं', 'ṃ', 'ṁ', 'M', ['M', '.n', '.m'], '.m', 'M', 'M'],
  ['अः', 'ḥ', 'ḥ', 'H', 'H', '.h', 'H', 'H'],
  ['अँ', 'm̐', '.N', '~', 'az'],
  ['ऽ', "'", '’', "'", '.a', '.a', "'", 'Z'],
];

consanants = [
  ['क', 'ka', 'ka', 'ka', 'ka', 'ka', 'ka', 'ka'],
  ['ख', 'kha', 'kha', 'kha', 'kha', 'kha', 'Ka', 'Ka'],
  ['ग', 'ga', 'ga', 'ga', 'ga', 'ga', 'ga', 'ga'],
  ['घ', 'gha', 'gha', 'gha', 'gha', 'gha', 'Ga', 'Ga'],
  ['ङ', 'ṅa', 'ṅa', 'Ga', '~Na', '"na', 'Na', 'fa'],
  ['च', 'ca', 'ca', 'ca', 'cha', 'ca', 'ca', 'ca'],
  ['छ', 'cha', 'cha', 'cha', 'Cha', 'cha', 'Ca', 'Ca'],
  ['ज', 'ja', 'ja', 'ja', 'ja', 'ja', 'ja', 'ja'],
  ['झ', 'jha', 'jha', 'jha', 'jha', 'jha', 'Ja', 'Ja'],
  ['ञ', 'ña', 'ña', 'Ja', '~na', '~na', 'Ya', 'Fa'],
  ['ट', 'ṭa', 'ṭa', 'Ta', 'Ta', '.ta', 'wa', 'ta'],
  ['ठ', 'ṭha', 'ṭha', 'Tha', 'Tha', '.tha', 'Wa', 'Ta'],
  ['ड', 'ḍa', 'ḍa', 'Da', 'Da', '.da', 'qa', 'da'],
  ['ढ', 'ḍha', 'ḍha', 'Dha', 'Dha', '.dha', 'Qa', 'Da'],
  ['ण', 'ṇa', 'ṇa', 'Na', 'Na', '.na', 'Ra', 'Na'],
  ['त', 'ta', 'ta', 'ta', 'ta', 'ta', 'ta', 'wa'],
  ['थ', 'tha', 'tha', 'tha', 'tha', 'tha', 'Ta', 'Wa'],
  ['द', 'da', 'da', 'da', 'da', 'da', 'da', 'xa'],
  ['ध', 'dha', 'dha', 'dha', 'dha', 'dha', 'Da', 'Xa'],
  ['न', 'na', 'na', 'na', 'na', 'na', 'na', 'na'],
  ['प', 'pa', 'pa', 'pa', 'pa', 'pa', 'pa', 'pa'],
  ['फ', 'pha', 'pha', 'pha', 'pha', 'pha', 'Pa', 'Pa'],
  ['ब', 'ba', 'ba', 'ba', 'ba', 'ba', 'ba', 'ba'],
  ['भ', 'bha', 'bha', 'bha', 'bha', 'bha', 'Ba', 'Ba'],
  ['म', 'ma', 'ma', 'ma', 'ma', 'ma', 'ma', 'ma'],
  ['य', 'ya', 'ya', 'ya', 'ya', 'ya', 'ya', 'ya'],
  ['र', 'ra', 'ra', 'ra', 'ra', 'ra', 'ra', 'ra'],
  ['ल', 'la', 'la', 'la', 'la', 'la', 'la', 'la'],
  ['व', 'va', 'va', 'va', ['va', 'wa'], 'va', 'va', 'va'],
  ['श', 'śa', 'śa', 'za', 'sha', '"sa', 'Sa', 'Sa'],
  ['ष', 'ṣa', 'ṣa', 'Sa', 'Sha', '.sa', 'za', 'Ra'],
  ['स', 'sa', 'sa', 'sa', 'sa', 'sa', 'sa', 'sa'],
  ['ह', 'ha', 'ha', 'ha', 'ha', 'ha', 'ha', 'ha'],
];

const irregular = [
  ['क्ष', 'kṣa', 'kṣa', 'kSa', ['kSa', 'kSha', 'xa'], 'k.sa', 'kza', 'kRa'],
  ['त्र', 'tra', 'tra', 'tra', 'tra', 'tra', 'tra', 'wra'],
  ['ज्ञ', 'jña', 'jña', 'jJa', ['GYa', 'j~na'], 'j~na', 'jYa', 'jFa'],
  ['श्र', 'śra', 'śra', 'zra', 'shra', '"sra', 'Sra', 'Sra'],
];

const other = [
  ['क़', '', 'qa', '', 'qa', '', '', 'kZa'],
  ['ख़', '', 'k͟ha', '', 'Ka', '', '', 'KZa'],
  ['ग़', '', 'ġa', '', 'Ga', '', '', 'gZa'],
  ['ज़', '', 'za', '', 'za', '', '', 'jZa'],
  ['फ़', '', 'fa', '', 'fa', '', '', 'PZa'],
  ['ड़', '', 'ṛa', '', '.Da', '', '', 'dZa'],
  ['ढ़', '', 'ṛha', '', ['.Dha', 'Rha'], '', '', 'DZa'],
];

// анализ санскрита
// http://sanskrit.uohyd.ac.in/scl/
// http://sanskrit.inria.fr/
