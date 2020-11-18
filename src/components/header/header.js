import React from 'react'
import PropTypes from 'prop-types'

import { IconButton, makeStyles } from '@material-ui/core'
import classNames from 'classnames'

import LanguagePicker from '../languagePicker/languagePicker'
import ThemeToggle from '../themeToggle/themeToggle'

import Logo from '../../assets/svg/logo.svg'
import Menu from '../../assets/svg/navIcons/menu.svg'

const useStyles = makeStyles(theme => ({
    header: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '300px',
        }
    },
    menuIcon: {
        [theme.breakpoints.up('md')]: {
            display: 'none !important',
        }
    }
}))

const Header = ({ toggleDrawer }) => {

    const classes = useStyles()

    return (
        <header className={classes.header}>
            <nav>
                <div className={classNames("navLHS")}>
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
                <div className="navRHS">
                    <LanguagePicker />
                    <ThemeToggle />
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    toggleDrawer: PropTypes.node.isRequired,
}

export default Header
