export default {
  data: () => ({
    languageList: {
      en: { name: 'English', translation: 'English', flag: 'GB' },
      es: { name: 'Spanish', translation: 'Español', flag: 'ES' }
    }
  }),
  methods: {
    sleep (ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
}
