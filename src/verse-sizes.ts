import { mapperAll, converter } from './trans-new';

export const verseSizes = [
  {
    name: 'уктхА',
    size: 1,
  },
  {
    name: 'атйуктхА',
    size: 2,
  },
  {
    name: 'мадхйа',
    size: 3,
  },
  {
    name: 'пратишТхА',
    size: 4,
  },
  {
    name: 'супратишТхА',
    size: 5,
  },
  {
    name: 'гАйатри',
    size: 6,
  },
  {
    name: 'ушНик',
    size: 7,
  },
  {
    name: 'анушТуп',
    size: 8,
  },
  {
    name: 'неровный анушТуп(1)',
    size: 8,
    mask: /....U——./g,
  },
  {
    name: 'неровный анушТуп(2)',
    size: 8,
    mask: /....U—U./g,
  },
  {
    name: 'гаджагатИ',
    size: 8,
    mask: /UUU—UUU—/g,
  },
  {
    name: 'витАна',
    size: 8,
    mask: /UU——UU——/g,
  },
  {
    name: 'сувилАсА',
    size: 8,
    mask: /UU——U——(U|—)/g,
  },
  {
    name: 'прамАНикА',
    size: 8,
    mask: /U—U—U—U—/g,
  },
  {
    name: 'Йаданйат',
    size: 8,
    mask: /U—U——U—(U|—)/g,
  },
  {
    name: 'сучандрАбхА',
    size: 8,
    mask: /U—U—U——(U|—)/g,
  },
  {
    name: 'ЧитрападА',
    size: 8,
    mask: /—UU—UU——/g,
  },
  {
    name: 'мАНавакаХ',
    size: 8,
    mask: /—UU——UU—/g,
  },
  {
    name: 'самАникА',
    size: 8,
    mask: /—U—U—U—(U|—)/g,
  },
  {
    name: 'падмаМалА',
    size: 8,
    mask: /—U——U———/g,
  },
  {
    name: 'карабха',
    size: 8,
    mask: /——UU——U(U|—)/g,
  },
  {
    name: 'нАрАчикА',
    size: 8,
    mask: /——U—U—U—/g,
  },
  {
    name: '[хаМсарута]',
    size: 8,
    mask: /———UUU——/g,
  },
  {
    name: 'видйунмАлА',
    size: 8,
    mask: /————————/g,
  },
  {
    name: 'бРхатИ',
    size: 9,
  },
  {
    name: 'паГкти',
    size: 10,
  },
  {
    name: 'вийогинИ(1)',
    size: 10,
    mask: /UU—UU—U—U—/g,
  },
  {
    name: 'вийогинИ(2)',
    size: 11,
    mask: /UU——UU—U—U—/g,
  },
  {
    name: 'тришТуп',
    size: 11,
  },
  {
    name: 'индра-ваджра',
    size: 11,
    mask: /——U——UU—U——/,
  },
  {
    name: 'упендра-ваджра',
    size: 11,
    mask: /U—U——UU—U——/,
  },
  {
    name: 'упджАти',
    size: 11,
    mask: /U—U——UU—U——/,
  },
  {
    name: 'вАтормИ',
    size: 11,
    mask: /————UU——U——/,
  },
  {
    name: 'индирА',
    size: 11,
    mask: /UUU—U——U—U—/,
  },
  {
    name: 'ШалиНИ',
    size: 11,
    mask: /—————U——U——/,
  },
  {
    name: 'свАгатА',
    size: 11,
    mask: /—U—UUU—UU——/,
  },
  {
    name: 'джагатИ',
    size: 12,
  },
  {
    name: 'друта-виламбита',
    size: 12,
    mask: /UUU—UU—UU—U—/,
  },
  {
    name: 'индраваМши',
    size: 12,
    mask: /——U——UU—U—U—/,
  },
  {
    name: 'аджагатИ',
    size: 13,
  },
  {
    name: 'Шакравари',
    size: 14,
  },
  {
    name: 'атиШакравари',
    size: 15,
  },
  {
    name: 'ашТи',
    size: 16,
  },
  {
    name: 'атйашТи',
    size: 17,
  },
  {
    name: 'мандАкрАнтА',
    size: 17,
    mask: /————UUUUU——U——U——/,
  },
  {
    name: 'ШикхариНи',
    size: 17,
    mask: /U—————UUUUU——UUU—/,
  },
  {
    name: 'дхРти',
    size: 18,
  },
  {
    name: 'атидхРти',
    size: 19,
  },
  {
    name: 'ШАрдУла викРти',
    size: 19,
    mask: /———UU—U—UUU———U——U—/,
  },
  {
    name: 'кРти',
    size: 20,
  },
  {
    name: 'пракРити',
    size: 21,
  },
  {
    name: 'срагдхарА',
    size: 21,
    mask: /————U——UUUUUU——U——U——/,
  },
  {
    name: 'АкРити',
    size: 22,
  },
  {
    name: 'викРити',
    size: 23,
  },
  {
    name: 'самскРити',
    size: 24,
  },
  {
    name: 'атикРити',
    size: 25,
  },
  {
    name: 'уткРити',
    size: 26,
  },
  {
    name: 'даНДака',
    size: 27,
  },
];

export function detectSize(str) {
  const transliterate = converter(mapperAll(0, 3));
  let result = str.map(s => {
    let candidates = verseSizes.filter(vs =>
      s.length < 27 ? vs.size === s.length : vs.size === 27,
    );
    let mask = transliterate(
      candidates
        .filter(c => c.mask)
        .filter(m => m.mask.test(s))
        .map(r => r.name)
        .join(','),
    );
    let group = transliterate(
      candidates
        .filter(c => !c.mask)
        .map(n => n.name)
        .join(','),
    );

    return {
      group,
      mask,
    };
  });
  return result;
}
