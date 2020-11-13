/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

/**
 * Creates localized paths for each file in the /pages folder.
 * For example, pages/404.js will be converted to /en/404.js and /el/404.js and
 * it will be accessible from https:// .../en/404/ and https:// .../el/404/
 */
const {
    language_details: languageDetails,
    default_language: defaultLanguage,
} = require('./src/data/languages.json')

const makeLocalisedPath = (languageCode, pagePath) => (languageCode === defaultLanguage) ? `/${pagePath}` : `/${languageCode}/${pagePath}`

exports.onCreatePage = async ({ page, actions: { createPage, deletePage } }) => {
    // Delete the original page (since we are gonna create localized versions of it)
    await deletePage(page)

    // Create one page for each locale
    await Promise.all(
        languageDetails.map(async ({ language_code: languageCode }) => {
            const originalPath = page.path
            const localizedPath = makeLocalisedPath(languageCode, page.path)

            await createPage({
                ...page,
                path: localizedPath,
                context: {
                    ...page.context,
                    originalPath,
                    lang: languageCode,
                },
            })
        }),
    )
}

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const pageTemplate = require.resolve(`./src/templates/PageTemplate.js`)
    const result = await graphql(`
        {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            language
                            page_key
                            slug
                        }
                    }
                }
            }
        }
    `)
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const currentLanguage = languageDetails.find(
            ({ language_code: languageCode }) => node.frontmatter.language === languageCode,
        )
        if (!currentLanguage) return
        createPage({
            path: makeLocalisedPath(currentLanguage.language_code, node.frontmatter.slug),
            component: pageTemplate,
            context: {
                // additional data can be passed via context
                originalPath: node.frontmatter.slug,
                lang: currentLanguage.language_code,
                pageKey: node.frontmatter.page_key,
            },
        })
    })
}
