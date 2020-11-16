import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { Menu, MenuItem, IconButton } from '@material-ui/core/'

import {
    language_details as languageDetails,
    default_language as defaultLanguage,
    languages,
} from '../../data/languages.json'
import { menu_structure as menuStructure } from '../../data/menuStructure.json'
import { usePageContext } from '../pageContext'

import Globe from '../../assets/svg/navIcons/globe.svg'

function LanguagePicker() {
    const {
        pageKey,
        pageKeyDictionary,
    } = usePageContext()
    const { i18n } = useTranslation()

    const [anchorEl, setAnchorEl] = React.useState(null)

    const makeLanguagePath = (languageCode) => {
        return languageCode === defaultLanguage ? '/' : `/${languageCode}`
    }

    const isHomePage = () => {
        const menuItem = menuStructure.find((firstLevelItem) => {
            if (firstLevelItem.page_key === pageKey) {
                return true
            }
            return false
        })
        return menuItem ? menuItem.home_page : false
    }

    const makeLocalisedPath = (languageCode) => {
        const languagePath = makeLanguagePath(languageCode)
        if (isHomePage()) return languagePath

        const newSlug = pageKeyDictionary[languageCode][pageKey]

        const isDefaultLanguage = languageCode === defaultLanguage
        return isDefaultLanguage ? `/${newSlug}` : `/${languageCode}/${newSlug}`
    }

    const handleOpenMenu = event => {
        setAnchorEl(event.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const handleLangChange = ({ language_code: languageCode }) => {
        handleCloseMenu()
        i18n.changeLanguage(languageCode)
        const path = makeLocalisedPath(languageCode)
        navigate(path)
    }

    return (
        <>
            <IconButton
                aria-haspopup="true"
                aria-label="Language Selector"
                aria-controls="lang-selector"
                classes={{ root: 'navIconButton' }}
                color="inherit"
                onClick={handleOpenMenu}
            >
                <Globe />
            </IconButton>
            <Menu
                keepMounted
                id="lang-selector"
                disableAutoFocusItem
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                getContentAnchorEl={null}
                onClose={handleCloseMenu}
                classes={{ list: 'langSelectorOptions' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                {languageDetails
                    .filter((lang) => languages.includes(lang.language_code))
                    .map(lang => (
                        <MenuItem
                            key={lang.language_code}
                            classes={{ root: 'langSelectorItem' }}
                            data-test={`languagePicker-option-${lang.language_code}`}
                            data-value={makeLanguagePath(lang.language_code)}
                            onClick={() => handleLangChange(lang)}
                        >
                            {lang.language_name.toUpperCase()}
                        </MenuItem>
                    ))}
            </Menu>
        </>
    )
}

export default LanguagePicker
