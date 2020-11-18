import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'

import Header from './header/header'
import Drawer from './drawer/drawer'
import Footer from './footer/footer'

const useStyles = makeStyles(theme => ({
    content: {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '300px',
        }
    }
}))

const Layout = ({ children }) => {

    const [openDrawer, setDrawerOpen] = useState(false)
    const classes = useStyles()

    const toggleDrawer = open => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setDrawerOpen(open)
    }

    return (
        <>
            <Header toggleDrawer={toggleDrawer} />
            <Drawer
                toggleDrawer={toggleDrawer}
                open={openDrawer}
            />
            <div className={classNames("content", classes.content)}>
                <main>{children}</main>
                <Footer />
            </div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
