import React from 'react'
import { navigate } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { Menu, MenuItem, IconButton } from '@material-ui/core/'

import { languageDetails, default_language as defaultLanguage } from '../../data/languages.json'
import { usePageContext } from '../pageContext'

import Globe from '../../assets/svg/navIcons/globe.svg'

function LanguagePicker() {
    const { originalPath } = usePageContext()
    const { i18n } = useTranslation()

    const [anchorEl, setAnchorEl] = React.useState(null)

    const makePath = (languageCode) => {
        return languageCode === defaultLanguage ? '/' : `/${languageCode}`
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
        const path = makePath(languageCode)
        navigate(`${path}${originalPath}`)
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
                {languageDetails.map(lang => (
                    <MenuItem
                        key={lang.language_code}
                        classes={{ root: 'langSelectorItem' }}
                        data-test={`languagePicker-option-${lang.language_code}`}
                        data-value={makePath(lang.language_code)}
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
