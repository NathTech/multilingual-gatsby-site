import React from 'react'
import PropTypes from 'prop-types'
import { Hidden, SwipeableDrawer, Drawer as MuDrawer } from '@material-ui/core'
import { Link } from 'gatsby'

import { usePageContext } from '../pageContext'
import { makeLocalisedPath } from '../../utils/paths'

const Drawer = ({ toggleDrawer, open }) => {
    const {
        menuStructure,
        languageCode,
        pageSlugDictionary,
        pageTitleDictionary,
    } = usePageContext()

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

    const createMenu = (menu) => menu
        .filter(({ pageKey }) => Object.keys(pageSlugDictionary[languageCode]).includes(pageKey))
        .filter(({ pageKey }) => pageSlugDictionary[languageCode][pageKey] !== '')
        .map(({ pageKey, subMenu }) => {

            const slug = pageSlugDictionary[languageCode][pageKey]
            const title = pageTitleDictionary[languageCode][pageKey]
            const path = makeLocalisedPath(languageCode, slug, pageKey)

            const subMenuLinks = subMenu && createMenu(subMenu)
            const isSubMenuItem = typeof subMenu === 'undefined'
            const hasSubMenu = subMenuLinks && subMenuLinks.length > 0

            return (
                <div className="navItem" key={`${pageKey}wrap`}>
                    <Link to={path} key={pageKey} className="navLink" data-submenu-item={isSubMenuItem} data-submenu-parent={hasSubMenu}>
                        {title}
                    </Link>
                    {hasSubMenu && (
                        <div className="navSubMenu" key={`${pageKey}submenu`}>
                            {subMenuLinks}
                        </div>
                    )}
                </div>
            )
        })

    const menuList = createMenu(menuStructure)

    const mobileNavContents = (
        <div
            role="presentation"
            className="drawerContents"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            {menuList}
        </div>
    )

    return (
        <>

            <Hidden mdUp>
                <SwipeableDrawer
                    open={open}
                    classes={{ paper: 'drawer' }}
                    disableDiscovery={iOS}
                    onOpen={toggleDrawer(true)}
                    onClose={toggleDrawer(false)}
                    disableBackdropTransition={!iOS}
                    data-test="drawer-sidebar"
                >
                    {mobileNavContents}
                </SwipeableDrawer>
            </Hidden>
            <Hidden smDown>
                <MuDrawer
                    variant="permanent"
                    classes={{ paper: 'drawer' }}
                >
                    {mobileNavContents}
                </MuDrawer>
            </Hidden>
        </>
    )
}

Drawer.propTypes = {
    toggleDrawer: PropTypes.node.isRequired,
    open: PropTypes.node.isRequired,
}

export default Drawer
