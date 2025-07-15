
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    resources: {
      en: {
        translation: {
          title: 'Aquaxperience',
          description: 'The content of this page will be available soon.',
          login: 'Login',
          register: 'Register'
        }
      },
      es: {
        translation: {
          title: 'Aquaxperience',
          description: 'El contenido de esta página estará disponible próximamente.',
          login: 'Iniciar sesión',
          register: 'Registrarse'
        }
      }
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
