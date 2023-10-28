export const createSlug = (word: string): string => {
  const mappings: { [key: string]: string } = {
    Ё: 'YO',
    Й: 'I',
    Ц: 'TS',
    У: 'U',
    К: 'K',
    Е: 'E',
    Н: 'N',
    Г: 'G',
    Ш: 'SH',
    Щ: 'SCH',
    З: 'Z',
    Х: 'H',
    Ъ: "'",
    Ы: 'Y',
    Ф: 'F',
    В: 'V',
    А: 'A',
    П: 'P',
    Р: 'R',
    О: 'O',
    Л: 'L',
    Д: 'D',
    Ж: 'ZH',
    Э: 'E',
    Я: 'YA',
    Ч: 'CH',
    С: 'S',
    М: 'M',
    И: 'I',
    Т: 'T',
    Ь: "'",
    Б: 'B',
    Ю: 'YU',
    Є: 'YE',
    І: 'Y',
    Ї: 'YI',
    ё: 'yo',
    й: 'i',
    ц: 'ts',
    у: 'u',
    к: 'k',
    е: 'e',
    н: 'n',
    г: 'g',
    ш: 'sh',
    щ: 'sch',
    з: 'z',
    х: 'h',
    ъ: "'",
    ы: 'y',
    ф: 'f',
    в: 'v',
    а: 'a',
    п: 'p',
    р: 'r',
    о: 'o',
    л: 'l',
    д: 'd',
    ж: 'zh',
    э: 'e',
    я: 'ya',
    ч: 'ch',
    с: 's',
    м: 'm',
    и: 'y',
    т: 't',
    ь: "'",
    б: 'b',
    ю: 'yu',
    є: 'ye',
    і: 'i',
    ї: 'yi',
  }

  let answer = ''

  for (const char of word) {
    if (mappings[char] !== undefined) {
      answer += mappings[char]
    } else {
      answer += char
    }
  }

  return answer
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}
