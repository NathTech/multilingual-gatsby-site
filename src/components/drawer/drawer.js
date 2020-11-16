import React, { useState } from 'react'
import { IconButton, SwipeableDrawer, Tooltip } from '@material-ui/core'
import { Link } from 'gatsby'

import Menu from '../../assets/svg/navIcons/menu.svg'
import { usePageContext } from '../pageContext'
import { makeLocalisedPath } from '../../utils/paths'

const Drawer = () => {
    const {
        menuStructure,
        languageCode,
        pageSlugDictionary,
        pageTitleDictionary,
    } = usePageContext()
    const [openDrawer, setDrawerOpen] = useState(false)
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setDrawerOpen(open)
    }

    const createMenu = (menu) => menu
        .filter(({ pageKey }) => Object.keys(pageSlugDictionary[languageCode]).includes(pageKey))
        .filter(({ pageKey }) => pageSlugDictionary[languageCode][pageKey] !== '')
        .map(({ pageKey, subMenu }) => {

            const slug = pageSlugDictionary[languageCode][pageKey]
            const title = pageTitleDictionary[languageCode][pageKey]
            const path = makeLocalisedPath(languageCode, slug, pageKey)

            const subMenuLinks = subMenu && createMenu(subMenu)
            const isSubMenuItem = typeof subMenu === 'undefined'

            return (
                <>
                    <Link to={path} key={pageKey} className="navLink" data-submenu-item={isSubMenuItem} style={{ color: isSubMenuItem ? 'green' : 'inherit' }}>
                        {title}
                    </Link>
                    {subMenuLinks && (
                        <div className="navSubMenu">
                            {subMenuLinks}
                        </div>
                    )}
                </>
            )
        })

    const mobileNavContents = (
        <div
            role="presentation"
            className="drawerContents"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {createMenu(menuStructure)}
        </div>
    )

    return (
        <>
            <Tooltip
                title="Menu"
                aria-label="Menu"
                classes={{ popper: 'navPopper', tooltip: 'navTooltip' }}
            >
                <IconButton
                    aria-label="menu"
                    classes={{ root: 'navIconButton' }}
                    color="inherit"
                    onClick={toggleDrawer(true)}
                    data-test="drawer-button"
                >
                    <Menu />
                </IconButton>
            </Tooltip>
            <SwipeableDrawer
                open={openDrawer}
                classes={{ paper: 'drawer' }}
                disableDiscovery={iOS}
                onOpen={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                disableBackdropTransition={!iOS}
                data-test="drawer-sidebar"
            >
                {mobileNavContents}
            </SwipeableDrawer>
        </>
    )
}

export default Drawer
