import {
    language_details as languageDetails
} from '../data/languages.json'

const getLanguageDetails = (languageCode) => {
    return languageDetails.find((language) => {
        return language.language_code === languageCode
    })
}

const direction = (languageCode) => {
    const language = getLanguageDetails(languageCode)

    return language.right_to_left ? 'rtl' : 'ltr'
}

export {
    getLanguageDetails,
    direction,
}