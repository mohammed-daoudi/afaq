import content from '../../messages/site-content.json';

export type SiteLocale = 'fr' | 'en' | 'ar';
type Translation = readonly [string, string, string];
export type TextTranslator = ReturnType<typeof createTextTranslator>;

export const REGISTERED_NAMES = new Set([
  'AFAQ HEALTH', 'AFAQ Health', 'Afaq Health', 'SOTYA', 'Sotya', 'Naturamins', 'NATURAMINS KIDS', 'Naturamins Kids',
  'COLAGENOVA', 'COLAGENOVA®', 'DAWA MAGHREB', 'Dawa Maghreb',
  'Bisglycinate de Magnésium', 'Complexe de Vitamines B', 'Complexe de Mélatonine', 'Mélatonine',
  'Mélatonine plantes', 'Mélatonine — Plantes', 'Ashwagandha', 'Complexe de Vitamine C',
  'Complexe de Propolis Forte', "Complexe d'Oméga 3, 6, 9", 'Prostal', "Huile d'Onagre",
  'Charbon Actif avec Probiotiques', 'Collagène', 'Peau, Cheveux et Ongles', 'Multivitamines & Minéraux',
  'COLAGENOVA® Antiox+ Collagène marin', 'Naturamins Kids Gummies Défenses et Vitamines',
  'Naturamins Kids Sirop Sommeil et Relaxation',
]);

export const normalizeText = (text: string) => text.replace(/\s+/g, ' ').trim();
const translations = new Map((content as unknown as Translation[]).map(([fr, en, ar]) => [normalizeText(fr), { en, ar }]));
const registeredNamePattern = new RegExp([...REGISTERED_NAMES].sort((a, b) => b.length - a.length).map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'g');

function isolateNames(text: string, language: 'en' | 'ar') {
  // Keep French names and the registered trademark symbol in LTR order inside Arabic prose.
  return language === 'ar' ? text.replace(registeredNamePattern, name => `\u2066${name}\u2069`) : text;
}

/** Translate presentation copy only. IDs, filter values, names and source data stay intact. */
export function createTextTranslator(locale: string) {
  return function translate<T>(value: T): T {
    if (locale === 'fr' || typeof value !== 'string' || !value.trim()) return value;
    const language = locale === 'ar' ? 'ar' : 'en';
    const normalized = normalizeText(value);
    if (REGISTERED_NAMES.has(normalized)) return value;
    const entry = translations.get(normalized);
    if (entry) {
      const leading = value.match(/^\s*/)?.[0] ?? '';
      const trailing = value.match(/\s*$/)?.[0] ?? '';
      return `${leading}${isolateNames(entry[language], language)}${trailing}` as T;
    }
    if (value.includes('\n')) return value.split(/(\n+)/).map(part => translate(part)).join('') as T;
    if (value.includes(' · ')) return value.split(' · ').map(part => translate(part)).join(' · ') as T;
    const imageView = normalized.match(/^(.+) view (\d+)$/);
    if (imageView) return `${imageView[1]} — ${language === 'ar' ? 'الصورة' : 'view'} ${imageView[2]}` as T;
    const minutes = normalized.match(/^(\d+) min$/);
    if (minutes && language === 'ar') return `${minutes[1]} دقائق` as T;
    const days = normalized.match(/^(\d+) jours$/);
    if (days) return `${days[1]} ${language === 'ar' ? 'يوماً' : 'days'}` as T;
    const pack = normalized.match(/^(\d+)(?: et (\d+))? (gélules végétales|gélules|perles|comprimés)(?: de (.+))?$/);
    if (pack) {
      const [, first, second, form, weight] = pack;
      const forms: Record<string, [string, string]> = {
        'gélules végétales': ['vegetable capsules', 'كبسولة نباتية'],
        'gélules': ['capsules', 'كبسولة'], 'perles': ['softgels', 'كبسولة رخوة'], 'comprimés': ['tablets', 'قرص'],
      };
      const count = second ? `${first}${language === 'ar' ? ' و' : ' and '}${second}` : first;
      return `${count} ${forms[form][language === 'ar' ? 1 : 0]}${weight ? `${language === 'ar' ? ' بوزن ' : ' of '}${weight}` : ''}` as T;
    }
    const date = normalized.match(/^(\d{1,2}) (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) (\d{4})$/i);
    if (date) {
      const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
      return new Intl.DateTimeFormat(language === 'ar' ? 'ar-MA' : 'en-GB', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(Date.UTC(Number(date[3]), months.indexOf(date[2].toLowerCase()), Number(date[1])))) as T;
    }
    return value as T;
  };
}
