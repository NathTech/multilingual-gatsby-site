import React from 'react'
import { graphql, useStaticQuery } from "gatsby"
import Img from 'gatsby-image'

import Layout from '../../src/components/layout'
import SEO from '../../src/components/seo'

function NotFoundPage() {

    const data = useStaticQuery(graphql`
    {
      file(relativePath: {regex: "/404.jpg/"}) {
        childImageSharp {
            fluid {
            base64
            aspectRatio
            src
            srcSet
            sizes
            }
        }
      }
    }
  `)

    return (
        <Layout>
            <SEO title="404" />
            <Img fluid={data.file.childImageSharp.fluid} alt="404" />
            <a href="http://www.freepik.com">Designed by pikisuperstar / Freepik</a>
        </Layout>
    )
}

export default NotFoundPage
