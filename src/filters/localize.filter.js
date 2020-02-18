import store from '../store'
import en from '../localize/en'
import ru from '../localize/ru'
const locales = {
  'en-US': en,
  'ru-RU': ru
};

export default function localizeFilter (key) {
  const local = store.getters.info.local || 'en-US';
  return locales[local][key] || `[LOCALIZE ERROR]: KEY ${key} not found`
}
