import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Markdown from 'react-markdown'
import { Card, CardContent } from '@material-ui/core'

import Layout from '../components/layout'
import SEO from '../components/seo'

function PageTemplate({ data }) {
    // this data prop will be injected by the GraphQL query below.
    const { frontmatter, html } = data.markdownRemark // data.markdownRemark holds your post data

    return (
        <Layout>
            <SEO title={frontmatter.title} />
            <Card>
                <CardContent>
                    <h1>{frontmatter.title}</h1>
                    <Markdown source={html} escapeHtml={false} />
                </CardContent>
            </Card>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($originalPath: String!, $lang: String!) {
        markdownRemark(frontmatter: { slug: { eq: $originalPath }, language: { eq: $lang } }) {
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
                date: PropTypes.string,
            }),
            html: PropTypes.string,
        }),
    }),
}

PageTemplate.defaultProps = {
    data: {},
}

export default PageTemplate
