const { default_language: defaultLanguage } = require('../data/languages.json')
const { menu_structure: menuStructure } = require('../data/menuStructure.json')

const makeLanguagePath = (languageCode) => {
    return languageCode === defaultLanguage ? '/' : `/${languageCode}`
}

const isHomePage = (pageKey) => {
    const menuItem = menuStructure.find((firstLevelItem) => {
        if (firstLevelItem.page_key === pageKey) {
            return true
        }
        return false
    })
    return menuItem ? menuItem.home_page : false
}

const makeLocalisedPath = (languageCode, slug, pageKey) => {
    const languagePath = makeLanguagePath(languageCode)
    if (isHomePage(pageKey)) return languagePath

    const isDefaultLanguage = languageCode === defaultLanguage
    return isDefaultLanguage ? `/${slug}` : `/${languageCode}/${slug}`
}

module.exports = {
    makeLanguagePath,
    makeLocalisedPath,
}