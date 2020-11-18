import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, makeStyles } from '@material-ui/core'
import classNames from 'classnames'

import LanguagePicker from '../languagePicker/languagePicker'
import ThemeToggle from '../themeToggle/themeToggle'

import Logo from '../../assets/svg/logo.svg'
import Menu from '../../assets/svg/navIcons/menu.svg'
import { direction } from '../../utils/languages'
import { usePageContext } from '../pageContext'

const useStyles = makeStyles(theme => ({
    header: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '300px',
            width: 'calc(100% - 300px)',
        }
    },
    headerRtl: {
        [theme.breakpoints.up('md')]: {
            paddingRight: '300px',
            width: 'calc(100% - 300px)',
        },
        flexDirection: 'row-reverse'
    },
    menuIcon: {
        [theme.breakpoints.up('md')]: {
            display: 'none !important',
        }
    },
    navRHSRtl: {
        flexDirection: 'row-reverse !important'
    },
    navLHSRtl: {
        justifyContent: 'flex-end !important'
    }
}))

const Header = ({ toggleDrawer }) => {

    const classes = useStyles()
    const { languageCode } = usePageContext()

    const dir = direction(languageCode)
    const isRtl = (dir === 'rtl')

    return (
        <header>
            <nav className={isRtl ? classes.headerRtl : classes.header}>
                <div className={classNames("navLHS", { [classes.navLHSRtl]: isRtl })}>
                    <IconButton
                        aria-label="menu"
                        className={classes.menuIcon}
                        classes={{ root: 'navIconButton' }}
                        color="inherit"
                        onClick={toggleDrawer(true)}
                        data-test="drawer-button"
                    >
                        <Menu />
                    </IconButton>
                </div>
                <Logo className="navLogo" />
                <div className={classNames("navRHS", { [classes.navRHSRtl]: isRtl })}>
                    <LanguagePicker />
                    <ThemeToggle />
                </div>
            </nav>
        </header >
    )
}

Header.propTypes = {
    toggleDrawer: PropTypes.func.isRequired,
}

export default Header
