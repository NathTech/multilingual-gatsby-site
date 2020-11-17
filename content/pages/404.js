import React from 'react'
import { useTranslation } from 'react-i18next'
// import { Image } from '@material-ui/icons'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Link from '../components/link'

function NotFoundPage() {
    const { t } = useTranslation('error404')

    return (
        <Layout>
            <SEO title={t('title')} />
            <img src="/src/assets/images/404.jpg" alt="" />
            <Link to="/">{t('link')}</Link>
        </Layout>
    )
}

export default NotFoundPage
