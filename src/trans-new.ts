// анализ санскрита
// http://sanskrit.uohyd.ac.in/scl/
// http://sanskrit.inria.fr/
import { max, orderBy } from 'lodash';

import { detectSize } from './verse-sizes';

export const transliterations = {
  XK: {
    title: 'Харвард Кийото',
    index: 0,
    default: false,
    input: true,
    output: true,
  },
  Gaura: {
    title: 'Gaura Font',
    index: 1,
    default: false,
    input: true,
    output: true,
  },
  html: {
    title: 'HTML код',
    index: 2,
    default: false,
    input: true,
    output: true,
  },
  Unicode: {
    title: 'Юникод',
    index: 3,
    default: false,
    input: true,
    output: true,
  },
  deva: {
    title: 'devanagari',
    index: 4,
    default: false,
    input: false,
    output: false,
  },
  IAST: { title: 'IAST', index: 5, default: false, input: true, output: true },
  ISO15919: {
    title: 'ISO15919',
    index: 6,
    default: false,
    input: true,
    output: true,
  },
  HK: {
    title: 'Harvard Kyoto',
    index: 7,
    default: false,
    input: true,
    output: true,
  },
  ITRANS: {
    title: 'ITRANS',
    index: 8,
    default: false,
    input: true,
    output: true,
  },
  Veltuis: {
    title: 'Veltuis',
    index: 9,
    default: false,
    input: true,
    output: true,
  },
  SLP1: { title: 'SLP1', index: 10, default: false, input: true, output: true },
  WX: { title: 'WX', index: 11, default: false, input: true, output: true },
  long: {
    title: 'Длительность',
    index: 12,
    default: false,
    input: false,
    output: false,
  },
};

export const sources = {
  XK: 0,
  Gaura: 1,
  html: 2,
  Unicode: 3,
  deva: 4,
  IAST: 5,
  ISO15919: 6,
  HK: 7,
  ITRANS: 8,
  Veltuis: 9,
  SLP1: 10,
  WX: 11,
  long: 12,
};

export const sourcesNames = Object.keys(sources);
//посмотреть как переводить в деванагари
//как работать с - для разделения на слоги общих слов

export const vowels = [
  ['а', 'а', 'а', 'а', 'अ', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '.'],
  [
    'А',
    '',
    'а&#772;',
    'а̄',
    'आ',
    'ā',
    'ā',
    'A',
    ['A', 'aa'],
    'aa',
    'A',
    'A',
    '-',
  ],
  ['и', 'и', 'и', 'и', 'इ', 'i', 'i', 'i', 'i', 'i', 'i', 'i', '.'],
  [
    'И',
    'ӣ',
    'и&#772;',
    'ӣ',
    'ई',
    'ī',
    'ī',
    'I',
    ['I', 'ii'],
    'ii',
    'I',
    'I',
    '-',
  ],
  ['у', 'у', 'у', 'у', 'उ', 'u', 'u', 'u', 'u', 'u', 'u', 'u', '.'],
  [
    'У',
    'ӯ',
    'у&#772;',
    'ӯ',
    'ऊ',
    'ū',
    'ū',
    'U',
    ['U', 'uu'],
    'uu',
    'U',
    'U',
    '-',
  ],
  // в начале слова на русском е читается как э
  [
    [' э', '^э', 'э'],
    [' э', '^э', 'э'],
    [' э', '^э', 'э'],
    [' э', '^э', 'э'],
    'ए',
    [' e', '^e'],
    [' ē', '^ē'],
    [' e', '^e'],
    [' e', '^e'],
    [' e', '^e'],
    [' e', '^e'],
    [' e', '^e'],
    '-',
  ],
  ['е', 'е', 'е', 'е', 'ए', 'e', 'ē', 'e', 'e', 'e', 'e', 'e', '-'],
  ['аи', 'аи', 'аи', 'аи', 'ऐ', 'ai', 'ai', 'ai', 'ai', 'ai', 'E', 'E', '-'],
  ['о', 'о', 'о', 'о', 'ओ', 'o', 'ō', 'o', 'o', 'o', 'o', 'o', '-'],
  ['ау', 'ау', 'ау', 'ау', 'औ', 'au', 'au', 'au', 'au', 'au', 'O', 'O', '-'],
  [
    'Р',
    '',
    'р&#803;',
    'р̣',
    'ऋ',
    'ṛ',
    'r̥',
    'R',
    ['RRi', 'R^i'],
    '.r',
    'f',
    'q',
    '.',
  ],
  [
    'РР',
    '',
    '&#772;&#803;',
    'р̣̄',
    'ॠ',
    'ṝ',
    'r̥̄',
    'RR',
    ['RRI', 'RRI', 'R^I'],
    '.rr',
    'F',
    'Q',
    '-',
  ],
  [
    'лР',
    '',
    'л&#803',
    'л̣',
    'ऌ',
    'ḷ',
    'l̥',
    'lR',
    ['LLi', 'L^i'],
    '.l',
    'x',
    'L',
    '.',
  ],
  [
    'лРР',
    '',
    'л&#772;&#803',
    'л̣̄',
    'ॡ',
    'ḹ',
    'l̥̄',
    'lRR',
    ['LLI', 'L^I'],
    '.ll',
    'X',
    'LY',
    '-',
  ],
];

export const soundless = [
  [
    'М',
    '',
    'м&#775;',
    'м̇',
    'अं',
    'ṁ',
    'ṁ',
    'M',
    ['M', '.n', '.m'],
    '.m',
    'M',
    'M',
    '||',
  ],
  ['Х', '', 'х&#803;', 'х̣', 'अः', 'ḥ', 'ḥ', 'H', 'H', '.h', 'H', 'H', '||'],
  // do not have such symbols in Veltuis, HK, IAST -- replaced from M
  ['.Н', '', 'м&#784;', 'м̐', 'अँ', 'ṁ', 'm̐', 'М', '.N', '.m', '~', 'az', '||'],
  // не учитывается в слогах
  [
    ["'", '’', '‘'],
    ["'", '’', '‘'],
    ["'", '’', '‘'],
    ["'", '’', '‘'],
    'ऽ',
    ["'", '’', '‘'],
    ["'", '’', '‘'],
    ["'", '’', '‘'],
    '.a',
    '.a',
    ["'", '’', '‘'],
    'Z',
    '',
  ],
];

export const consonants = [
  ['к', 'к', 'к', 'к', 'क', 'k', 'k', 'k', 'k', 'k', 'k', 'k', '|'],
  ['кх', 'кх', 'кх', 'кх', 'ख', 'kh', 'kh', 'kh', 'kh', 'kh', 'K', 'K', '|'],
  ['г', 'г', 'г', 'г', 'ग', 'g', 'g', 'g', 'g', 'g', 'g', 'g', '|'],
  ['гх', 'гх', 'гх', 'гх', 'घ', 'gh', 'gh', 'gh', 'gh', 'gh', 'G', 'G', '|'],
  ['Г', '', 'н&#775;', 'н̇', 'ङ', 'ṅ', 'ṅ', 'G', '~N', '"n', 'N', 'f', '|'],
  ['ч', 'ч', 'ч', 'ч', 'च', 'c', 'c', 'c', 'ch', 'c', 'c', 'c', '|'],
  ['чх', 'чх', 'чх', 'чх', 'छ', 'ch', 'ch', 'ch', 'Ch', 'ch', 'C', 'C', '|'],
  ['дж', 'дж', 'дж', 'дж', 'ज', 'j', 'j', 'j', 'j', 'j', 'j', 'j', '|'],
  [
    'джх',
    'джх',
    'джх',
    'джх',
    'झ',
    'jh',
    'jh',
    'jh',
    'jh',
    'jh',
    'J',
    'J',
    '|',
  ],
  ['~Н', '', 'н&#771;', 'н̃', 'ञ', 'ñ', 'ñ', 'J', '~n', '~n', 'Y', 'F', '|'],
  ['Т', '', 'т&#803;', 'т̣', 'ट', 'ṭ', 'ṭ', 'T', 'T', '.t', 'w', 't', '|'],
  [
    'Тх',
    'х',
    'т&#803;х',
    'т̣х',
    'ठ',
    'ṭh',
    'ṭh',
    'Th',
    'Th',
    '.th',
    'W',
    'T',
    '|',
  ],
  ['Д', '', 'д&#803;', 'д̣', 'ड', 'ḍ', 'ḍ', 'D', 'D', '.d', 'q', 'd', '|'],
  [
    'Дх',
    'х',
    'д&#803;х',
    'д̣х',
    'ढ',
    'ḍh',
    'ḍh',
    'Dh',
    'Dh',
    '.dh',
    'Q',
    'D',
    '|',
  ],
  ['Н', '', 'н&#803;', 'н̣', 'ण', 'ṇ', 'ṇ', 'N', 'N', '.n', 'R', 'N', '|'],
  ['т', 'т', 'т', 'т', 'त', 't', 't', 't', 't', 't', 't', 'w', '|'],
  ['тх', 'тх', 'тх', 'тх', 'थ', 'th', 'th', 'th', 'th', 'th', 'T', 'W', '|'],
  ['д', 'д', 'д', 'д', 'द', 'd', 'd', 'd', 'd', 'd', 'd', 'x', '|'],
  ['дх', 'дх', 'дх', 'дх', 'ध', 'dh', 'dh', 'dh', 'dh', 'dh', 'D', 'X', '|'],
  ['н', 'н', 'н', 'н', 'न', 'n', 'n', 'n', 'n', 'n', 'n', 'n', '|'],
  ['п', 'п', 'п', 'п', 'प', 'p', 'p', 'p', 'p', 'p', 'p', 'p', '|'],
  ['пх', 'пх', 'пх', 'пх', 'फ', 'ph', 'ph', 'ph', 'ph', 'ph', 'P', 'P', '|'],
  ['б', 'б', 'б', 'б', 'ब', 'b', 'b', 'b', 'b', 'b', 'b', 'b', '|'],
  ['бх', 'бх', 'бх', 'бх', 'भ', 'bh', 'bh', 'bh', 'bh', 'bh', 'B', 'B', '|'],
  ['м', 'м', 'м', 'м', 'म', 'm', 'm', 'm', 'm', 'm', 'm', 'm', '|'],
  [
    ['й', 'й'],
    ['й', 'й'],
    ['й', 'й'],
    ['й', 'й'],
    'य',
    'y',
    'y',
    'y',
    'y',
    'y',
    'y',
    'y',
    '|',
  ],
  ['р', 'р', 'р', 'р', 'र', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|'],
  ['л', 'л', 'л', 'л', 'ल', 'l', 'l', 'l', 'l', 'l', 'l', 'l', '|'],
  ['в', 'в', 'в', 'в', 'व', 'v', 'v', 'v', ['v', 'w'], 'v', 'v', 'v', '|'],
  [
    'Ш',
    ['', ''],
    'ш&#769;',
    'ш́',
    'श',
    'ś',
    'ś',
    'z',
    'sh',
    '"s',
    'S',
    'S',
    '|',
  ],
  ['ш', 'ш', 'ш', 'ш', 'ष', 'ṣ', 'ṣ', 'S', 'Sh', '.s', 'z', 'R', '|'],
  ['с', 'с', 'с', 'с', 'स', 's', 's', 's', 's', 's', 's', 's', '|'],
  ['х', 'х', 'х', 'х', 'ह', 'h', 'h', 'h', 'h', 'h', 'h', 'h', '|'],
];

/// всегда двойные
export const irregular = [
  [
    'кш',
    'кш',
    'кш',
    'кш',
    'क्ष',
    'kṣ',
    'kṣ',
    'kS',
    ['kS', 'kSh', 'x'],
    'k.s',
    'kz',
    'kR',
    '||',
  ],
  [
    'тр',
    'тр',
    'тр',
    'тр',
    'त्र',
    'tr',
    'tr',
    'tr',
    'tr',
    'tr',
    'tr',
    'wr',
    '||',
  ],
  [
    'дж~Н',
    'дж',
    'джн&#771;',
    'джн̃',
    'ज्ञ',
    'jñ',
    'jñ',
    'jJ',
    ['GY', 'j~n'],
    'j~n',
    'jY',
    'jF',
    '||',
  ],
  [
    'Шр',
    'р',
    'ш&#769;р',
    'ш́р',
    'श्र',
    'śr',
    'śr',
    'zr',
    'shr',
    '"sr',
    'Sr',
    'Sr',
    '||',
  ],
];

export const translationTable = [
  ...consonants,
  ...irregular,
  ...vowels,
  ...soundless,
];

export const universal = mapTable => (
  _from: number | number[] = [0],
  _to = 1,
) => {
  if (!Array.isArray(_from)) _from = [_from];
  const from = _from.map(f => (typeof f === 'string' ? sources[f] : f));
  const to = typeof _to === 'string' ? sources[_to] : _to;
  return orderBy(
    mapTable.map(line => {
      const size = max(
        from.map(f =>
          Array.isArray(line[f])
            ? max(line[f].map(i => i.length))
            : line[f].length,
        ),
      );

      let result = [
        new RegExp(
          from
            .map(f =>
              Array.isArray(line[f])
                ? line[f].map(i => i.replace(/\./g, '\\.')).join('|')
                : line[f].replace(/\./g, '\\.'),
            )
            .join('|'),
          'g',
        ),
        Array.isArray(line[to]) ? line[to][0] : line[to],
        size,
      ];
      return result;
    }),
    ['2'],
    ['desc'],
  );
};

export const mapperAll = universal(translationTable);

export const mapperVowels = universal(vowels);

function replacerBase(_text, replacer) {
  /** для буквы э в начале слова нужен пробел */
  let text = _text.replace(/^(.)/, ' $1');
  /** а так же ставим пробелы в начале каждой строки */
  text = text.replace(/\n/g, '\n ');
  let result = replacer.reduce((text, sym) => {
    const res = text.replace.apply(text, [sym[0], sym[1]]);
    return res;
  }, text);
  return result;
}

function replacerColorizer(_text, replacer) {
  /** для буквы э в начале слова нужен пробел */
  let text = _text.replace(/^(.)/, ' $1');
  /** а так же ставим пробелы в начале каждой строки */
  text = text.replace(/\n/g, '\n ');
  let result = replacer.reduce((text, sym) => {
    const res = text.replace(sym[0], '(.*)');
    return res;
  }, text);
  return result;
}

export const converter = replacer => text =>
  replacerBase(text, replacer)
    .replace(/^ (.)/, '$1')
    .replace(/\n /g, '\n');

export const verseColor = replacer => text => {
  text = text
    .split('\n')
    /** заменяем пробелы на подчеркивание */
    .join('\n');

  return replacerColorizer(text, replacer)
    .replace(/^ (.)/, '$1')
    .replace(/\n /g, '\n');
};

export const verseSize = replacer => text => {
  text = text.replace(/-(\n)*/g, '$1');
  // в строках убрать пробелы тоже
  text = text
    .split('\n')
    /** заменяем пробелы на подчеркивание */
    .map(s => s.replace(/\s/g, '_'))
    .map(s => s.replace(/-/g, ''))
    .join('\n');
  let result = replacerBase(text, replacer)
    /** заменяем пробелы наподчеркивание */
    // .replace(/ /gi, '_')
    .replace(/(\||\.)_\|/gi, '$1|')
    /** короткую или длинную гласную перед двумя согласными на один согласный и длинный звук */
    .replace(/(\.|-)\|\|+/gi, '-|')
    /** убираем согласные звуки */
    .replace(/\|+/gi, '')
    /** заменяем концы строк на спец символ */
    .replace(/\n/g, 'SUPER')
    /** удаляем все пробельные символы */
    .replace(/\s+/gi, '')
    /**  последний слог в строке всегда длинный */
    .replace(/\.SUPER/g, '-SUPER')
    .replace(/\.$/g, '-')
    /** возвращаем переносы строк */
    .replace(/SUPER/g, '\n')
    /** убираем пробельные символы */
    .replace(/_/gi, '')
    /** ставим символ короткого звука */
    .replace(/\./g, 'U')
    /** ставим длинное тире вместо короткого */
    .replace(/-/g, '—');

  result = result.split('\n').map(l => l.split(''));

  result = result.map(l => (l.some(s => !(s === '—' || s === 'U')) ? [] : l));

  const size = detectSize(result);
  return { result, size };
};

// вариант для сопоставления
// ищем гласные буквы и красим в соответствии с полученным паттерном

//
