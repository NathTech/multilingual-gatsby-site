import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Markdown from 'react-markdown'
import { Card, CardContent } from '@material-ui/core'

import Layout from '../components/layout'
import SEO from '../components/seo'
import { usePageContext } from '../components/pageContext'
import { direction } from '../utils/languages'

function PageTemplate({ data }) {
    // this data prop will be injected by the GraphQL query below.
    const { frontmatter, html } = data.markdownRemark // data.markdownRemark holds your post data
    const { languageCode } = usePageContext()

    const dir = direction(languageCode)

    return (
        <Layout>
            <SEO title={frontmatter.title} />
            <Card>
                <CardContent dir={dir}>
                    <h1>{frontmatter.title}</h1>
                    <Markdown source={html} escapeHtml={false} />
                </CardContent>
            </Card>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($pageKey: String!, $languageCode: String!) {
        markdownRemark(frontmatter: { page_key: { eq: $pageKey }, language: { eq: $languageCode } }) {
            html
            frontmatter {
                title
                language
                page_key
            }
        }
    }
`

PageTemplate.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.shape({
                title: PropTypes.string,
            }),
            html: PropTypes.string,
        }),
    }),
}

PageTemplate.defaultProps = {
    data: {},
}

export default PageTemplate
