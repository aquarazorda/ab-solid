import { createI18nContext, I18nContext } from '@solid-primitives/i18n'
import { createMemo, createResource, on } from 'solid-js'
import { FileRoutes, Routes } from 'solid-start'
import { register } from 'swiper/element/bundle';
import { Header } from './components/Header'

register();

const fetchLangs = async () => (await (fetch('https://newstatic.adjarabet.com/static/langkaNew.json?v=1677585424'))).json();

export const App = () => {
  const [langDict] = createResource(fetchLangs);
  
  const langs = createMemo(on(langDict, () => 
    createI18nContext({ ka: langDict() }, "ka")
  ));

  return <I18nContext.Provider value={langs()}>
    <Header />
    <Routes>
      <FileRoutes />
    </Routes>
  </I18nContext.Provider>
}