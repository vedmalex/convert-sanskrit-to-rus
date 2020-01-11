// анализ санскрита
// http://sanskrit.uohyd.ac.in/scl/
// http://sanskrit.inria.fr/
import { /* max, */ orderBy } from 'lodash';

import { detectSize } from './verse-sizes';

export const transliterations = {
  XK: {
    title: 'Харвард Кийото',
    index: 0,
    default: false,
    input: true,
    output: true,
    caseSensitive: true,
  },
  Gaura: {
    title: 'Gaura Font',
    index: 1,
    default: false,
    input: true,
    output: true,
    caseSensitive: false,
  },
  html: {
    title: 'HTML код',
    index: 2,
    default: false,
    input: true,
    output: true,
    caseSensitive: false,
  },
  Unicode: {
    title: 'Юникод',
    index: 3,
    default: false,
    input: true,
    output: true,
    caseSensitive: false,
  },
  deva: {
    title: 'devanagari',
    index: 4,
    default: false,
    input: false,
    output: false,
    caseSensitive: false,
  },
  IAST: {
    title: 'IAST',
    index: 5,
    default: false,
    input: true,
    output: true,
    caseSensitive: false,
  },
  ISO15919: {
    title: 'ISO15919',
    index: 6,
    default: false,
    input: true,
    output: true,
    caseSensitive: false,
  },
  HK: {
    title: 'Harvard Kyoto',
    index: 7,
    default: false,
    input: true,
    output: true,
    caseSensitive: true,
  },
  ITRANS: {
    title: 'ITRANS',
    index: 8,
    default: false,
    input: true,
    output: true,
    caseSensitive: true,
  },
  Veltuis: {
    title: 'Veltuis',
    index: 9,
    default: false,
    input: true,
    output: true,
    caseSensitive: true,
  },
  SLP1: {
    title: 'SLP1',
    index: 10,
    default: false,
    input: true,
    output: true,
    caseSensitive: true,
  },
  WX: {
    title: 'WX',
    index: 11,
    default: false,
    input: true,
    output: true,
    caseSensitive: true,
  },
  long: {
    title: 'Длительность',
    index: 12,
    default: false,
    input: false,
    output: false,
    caseSensitive: false,
  },
  vedabase: {
    title: 'ScaGaudy',
    index: 13,
    default: true,
    input: true,
    output: false,
    caseSensitive: false,
  },
  flat: {
    title: 'Без диакритики',
    index: 14,
    default: true,
    input: false,
    output: true,
    caseSensitive: false,
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
  vedabase: 13,
  flat: 14,
};

export const sourcesNames = Object.keys(sources);
//посмотреть как переводить в деванагари
//как работать с - для разделения на слоги общих слов

export const vowels = [
  ['а', 'а', 'а', 'а', 'अ', 'a', 'a', 'a', 'a', 'a', 'a', 'a', '.', 'a', 'а'],
  [
    'А',
    ['', ''],
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
    'ä',
    'а',
  ],
  ['и', 'и', 'и', 'и', 'इ', 'i', 'i', 'i', 'i', 'i', 'i', 'i', '.', 'i', 'и'],
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
    'é',
    'и',
  ],
  ['у', 'у', 'у', 'у', 'उ', 'u', 'u', 'u', 'u', 'u', 'u', 'u', '.', 'u', 'у'],
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
    'ü',
    'у',
  ],
  // в начале слова на русском е читается как э
  [
    [' э', '^э'],
    [' э', '^э'],
    [' э', '^э'],
    [' э', '^э'],
    'ए',
    [' e', '^e'],
    [' ē', '^ē'],
    [' e', '^e'],
    [' e', '^e'],
    [' e', '^e'],
    [' e', '^e'],
    [' e', '^e'],
    '-',
    [' e', '^e'],
    [' э', '^э'],
  ],
  ['е', 'е', 'е', 'е', 'ए', 'e', 'ē', 'e', 'e', 'e', 'e', 'e', '-', 'e', 'е'],
  [
    'аи',
    'аи',
    'аи',
    'аи',
    'ऐ',
    'ai',
    'ai',
    'ai',
    'ai',
    'ai',
    'E',
    'E',
    '-',
    'ai',
    'аи',
  ],
  ['о', 'о', 'о', 'о', 'ओ', 'o', 'ō', 'o', 'o', 'o', 'o', 'o', '-', 'o', 'о'],
  [
    'ау',
    'ау',
    'ау',
    'ау',
    'औ',
    'au',
    'au',
    'au',
    'au',
    'au',
    'O',
    'O',
    '-',
    'au',
    'ау',
  ],
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
    'å',
    'ри',
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
    'è',
    'рри',
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
    'ÿ',
    'лри',
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
    'ÿ',
    'ллри',
  ],
];

export const soundless = [
  [
    'М',
    '',
    'м&#775;',
    'м̇',
    'अं',
    ['ṁ', 'm̃'],
    'ṁ',
    'M',
    ['M', '.n', '.m'],
    '.m',
    'M',
    'M',
    '||',
    'à',
    'м',
  ],
  [
    'Х',
    '',
    'х&#803;',
    'х̣',
    'अः',
    'ḥ',
    'ḥ',
    'H',
    'H',
    '.h',
    'H',
    'H',
    '||',
    'ù',
    'х',
  ],
  // do not have such symbols in Veltuis, HK, IAST -- replaced from M
  [
    '.Н',
    '',
    'м&#784;',
    'м̐',
    'अँ',
    'ṁ',
    'm̐',
    'М',
    '.N',
    '.m',
    '~',
    'az',
    '||',
    '',
    'м',
  ],
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
    ['’', "'"],
    ['’', "'"],
  ],
];

export const consonants = [
  ['к', 'к', 'к', 'к', 'क', 'k', 'k', 'k', 'k', 'k', 'k', 'k', '|', 'k', 'к'],
  [
    'кх',
    'кх',
    'кх',
    'кх',
    'ख',
    'kh',
    'kh',
    'kh',
    'kh',
    'kh',
    'K',
    'K',
    '|',
    'kh',
    'кх',
  ],
  ['г', 'г', 'г', 'г', 'ग', 'g', 'g', 'g', 'g', 'g', 'g', 'g', '|', 'g', 'г'],
  [
    'гх',
    'гх',
    'гх',
    'гх',
    'घ',
    'gh',
    'gh',
    'gh',
    'gh',
    'gh',
    'G',
    'G',
    '|',
    'gh',
    'гх',
  ],
  [
    'Г',
    '',
    'н&#775;',
    'н̇',
    'ङ',
    'ṅ',
    'ṅ',
    'G',
    '~N',
    '"n',
    'N',
    'f',
    '|',
    'ì',
    'н',
  ],
  ['ч', 'ч', 'ч', 'ч', 'च', 'c', 'c', 'c', 'ch', 'c', 'c', 'c', '|', 'c', 'ч'],
  [
    'чх',
    'чх',
    'чх',
    'чх',
    'छ',
    'ch',
    'ch',
    'ch',
    'Ch',
    'ch',
    'C',
    'C',
    '|',
    'ch',
    'чх',
  ],
  [
    'дж',
    'дж',
    'дж',
    'дж',
    'ज',
    'j',
    'j',
    'j',
    'j',
    'j',
    'j',
    'j',
    '|',
    'j',
    'дж',
  ],
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
    'jh',
    'джх',
  ],
  [
    '~Н',
    '',
    'н&#771;',
    'н̃',
    'ञ',
    'ñ',
    'ñ',
    'J',
    '~n',
    '~n',
    'Y',
    'F',
    '|',
    'ï',
    'н',
  ],
  [
    'Т',
    '',
    'т&#803;',
    'т̣',
    'ट',
    'ṭ',
    'ṭ',
    'T',
    'T',
    '.t',
    'w',
    't',
    '|',
    'ö',
    'т',
  ],
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
    'öh',
    'тх',
  ],
  [
    'Д',
    '',
    'д&#803;',
    'д̣',
    'ड',
    'ḍ',
    'ḍ',
    'D',
    'D',
    '.d',
    'q',
    'd',
    '|',
    'ò',
    'д',
  ],
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
    'òh',
    'дх',
  ],
  [
    'Н',
    '',
    'н&#803;',
    'н̣',
    'ण',
    'ṇ',
    'ṇ',
    'N',
    'N',
    '.n',
    'R',
    'N',
    '|',
    'ë',
    'н',
  ],
  ['т', 'т', 'т', 'т', 'त', 't', 't', 't', 't', 't', 't', 'w', '|', 't', 'т'],
  [
    'тх',
    'тх',
    'тх',
    'тх',
    'थ',
    'th',
    'th',
    'th',
    'th',
    'th',
    'T',
    'W',
    '|',
    'th',
    'тх',
  ],
  ['д', 'д', 'д', 'д', 'द', 'd', 'd', 'd', 'd', 'd', 'd', 'x', '|', 'd', 'д'],
  [
    'дх',
    'дх',
    'дх',
    'дх',
    'ध',
    'dh',
    'dh',
    'dh',
    'dh',
    'dh',
    'D',
    'X',
    '|',
    'dh',
    'дх',
  ],
  ['н', 'н', 'н', 'н', 'न', 'n', 'n', 'n', 'n', 'n', 'n', 'n', '|', 'n', 'н'],
  ['п', 'п', 'п', 'п', 'प', 'p', 'p', 'p', 'p', 'p', 'p', 'p', '|', 'p', 'п'],
  [
    'пх',
    'пх',
    'пх',
    'пх',
    'फ',
    'ph',
    'ph',
    'ph',
    'ph',
    'ph',
    'P',
    'P',
    '|',
    'ph',
    'пх',
  ],
  ['б', 'б', 'б', 'б', 'ब', 'b', 'b', 'b', 'b', 'b', 'b', 'b', '|', 'b', 'б'],
  [
    'бх',
    'бх',
    'бх',
    'бх',
    'भ',
    'bh',
    'bh',
    'bh',
    'bh',
    'bh',
    'B',
    'B',
    '|',
    'bh',
    'бх',
  ],
  ['м', 'м', 'м', 'м', 'म', 'm', 'm', 'm', 'm', 'm', 'm', 'm', '|', 'm', 'м'],
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
    'y',
    'й',
  ],
  ['р', 'р', 'р', 'р', 'र', 'r', 'r', 'r', 'r', 'r', 'r', 'r', '|', 'r', 'р'],
  ['л', 'л', 'л', 'л', 'ल', 'l', 'l', 'l', 'l', 'l', 'l', 'l', '|', 'l', 'л'],
  [
    'в',
    'в',
    'в',
    'в',
    'व',
    'v',
    'v',
    'v',
    ['v', 'w'],
    'v',
    'v',
    'v',
    '|',
    'v',
    'в',
  ],
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
    'ç',
    'ш',
  ],
  ['ш', 'ш', 'ш', 'ш', 'ष', 'ṣ', 'ṣ', 'S', 'Sh', '.s', 'z', 'R', '|', 'ñ', 'ш'],
  ['с', 'с', 'с', 'с', 'स', 's', 's', 's', 's', 's', 's', 's', '|', 's', 'с'],
  ['х', 'х', 'х', 'х', 'ह', 'h', 'h', 'h', 'h', 'h', 'h', 'h', '|', 'h', 'х'],
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
    'kñ',
    'кш',
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
    'tr',
    'тр',
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
    'jï',
    'джн',
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
    'çr',
    'шр',
  ],
];

export const translationTable = [
  ...consonants,
  ...irregular,
  ...vowels,
  ...soundless,
];

// export const universal1 = mapTable => (
//   _from: number | number[] = [0],
//   _to = 1,
// ) => {
//   if (!Array.isArray(_from)) _from = [_from];
//   const from = _from.map(f => (typeof f === 'string' ? sources[f] : f));
//   const to = typeof _to === 'string' ? sources[_to] : _to;
//   return orderBy(
//     mapTable.map(line => {
//       const size = max(
//         from.map(f =>
//           Array.isArray(line[f])
//             ? max(line[f].map(i => i.length))
//             : line[f].length,
//         ),
//       );

//       let result = [
//         new RegExp(
//           from
//             .map(f =>
//               Array.isArray(line[f])
//                 ? line[f].map(i => i.replace(/\./g, '\\.')).join('|')
//                 : line[f].replace(/\./g, '\\.'),
//             )
//             .join('|'),
//           'g',
//         ),
//         Array.isArray(line[to]) ? line[to][0] : line[to],
//         size,
//       ];
//       return result;
//     }),
//     ['2'],
//     ['desc'],
//   );
// };

export const universal = mapTable => (
  _from: number | number[] = [0],
  _to = 1,
) => {
  if (!Array.isArray(_from)) _from = [_from];
  const from = _from.map(f => (typeof f === 'string' ? sources[f] : f));
  const to = typeof _to === 'string' ? sources[_to] : _to;
  return orderBy(
    mapTable.reduce((res, line) => {
      const search = from
        .reduce((result, f) => {
          const caseSensitive = transliterations[sourcesNames[f]].caseSensitive;
          const res = [];
          if (Array.isArray(line[f])) {
            res.push(...line[f].map(i => i.replace(/\./g, '\\.')));
          } else {
            res.push(line[f].replace(/\./g, '\\.'));
          }
          result.push(
            ...res.map(str => ({
              str,
              preserveCase: !caseSensitive,
            })),
          );
          return result;
        }, [])
        .filter(x => x.str);
      res.push(
        ...search.map(s => [
          s.str,
          Array.isArray(line[to]) ? line[to][0] : line[to],
          s.str.length,
          s.preserveCase,
        ]),
      );

      return res.filter(s => s[0] != s[1]);
    }, []),
    ['2'],
    ['desc'],
  );
};

export const mapperAll = universal(translationTable);

export const mapperVowels = universal(vowels);

// export function replacerBase1(_text, replacer) {
//   /** для буквы э в начале слова нужен пробел */
//   let text = _text.replace(/^(.)/, ' $1');
//   /** а так же ставим пробелы в начале каждой строки */
//   text = text.replace(/\n/g, '\n ');
//   let result = replacer.reduce((text, sym) => {
//     const res = text.replace.apply(text, [sym[0], sym[1]]);
//     return res;
//   }, text);
//   return result;
// }

export function replacerBase(_text: string, replacer) {
  /** для буквы э в начале слова нужен пробел */
  let text = _text.replace(/^(.)/, ' $1');
  /** а так же ставим пробелы в начале каждой строки */
  text = text.replace(/\n/g, '\n ');
  let map = [...text].map(_ => false);
  let result = replacer.reduce((rText: string, sym) => {
    let nextmap = [...map];
    let res: string;
    if (sym[3]) {
      // в каждый шаг должен быть свой diff -- есть библиотека для работы с diff на firebase адаптере
      // console.log(sym[0], sym[1])

      res = rText.replace(new RegExp(sym[0], 'ig'), function (match, offset, _) {
        // console.log(text === _)
        if (!map[offset]) {
          // заменяем в новой карте, но с новым смещением...
          nextmap.splice(offset + nextmap.length - map.length, sym[0].length, ...[...sym[1]].map(_ => true))
        } else {
          // console.log(match, offset, !map[i], [...text].slice(offset, match.length))
          return match;
        }

        const lower = match.toLowerCase();
        if (match === lower) {
          return sym[1];
        } else {
          return sym[1]
            .split('')
            .map((c, i) => {
              if (match[i] !== lower[i]) {
                return c.toUpperCase();
              } else {
                return c;
              }
            })
            .join('');
        }
      });
      // console.log(res === rText)
    } else {
      res = rText.replace.apply(rText, [new RegExp(sym[0], 'g'), sym[1]]);
    }
    // const res = replace(text, sym[0], sym[1]);
    map = nextmap
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
    const res = text.replace(
      new RegExp(sym[0], `g${sym[3] ? 'i' : ''}`),
      '(.*)',
    );
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

// function translateCaseSensitive(text, fromAlphabet, toAlphabet) {
//   var fromAlphabet = fromAlphabet.toLowerCase(),
//     toAlphabet = toAlphabet.toLowerCase(),
//     re = new RegExp("[" + fromAlphabet + "]", "gi");

//   return text.replace(re, function (char) {
//     var charLower = char.toLowerCase(),
//       idx = fromAlphabet.indexOf(charLower);

//     if (idx > -1) {
//       if (char === charLower) {
//         return toAlphabet[idx];
//       } else {
//         return toAlphabet[idx].toUpperCase();
//       }
//     } else {
//       return char;
//     }
//   });
// };
