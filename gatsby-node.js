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
    languages,
} = require('./src/data/languages.json')

const {
    menu_structure: menuStructure,
    pages,
} = require('./src/data/menuStructure.json')
const { makeLocalisedPath, makeLanguagePath } = require('./src/utils/paths')

/**
 * Create a dictionary of page_keys and slugs for the menu structure for each language
 */
const makeLanguageMenuDictionary = (nodes) => {
    const makeMenuSkeleton = () => {
        return menuStructure.map((item) => {
            const subMenu = (item.submenu_page_keys.length === 0)
                ? []
                : item.submenu_page_keys.map((key) => ({
                    pageKey: key,
                    homePage: false,
                    // slug: ''
                }))
            return ({
                pageKey: item.page_key,
                homePage: item.home_page ? true : false,
                // slug: '',
                subMenu,
            })
        })
    }

    const dictionarySkeleton = {}
    pages.forEach((pageKey) => {
        dictionarySkeleton[pageKey] = ''
    })

    const menus = makeMenuSkeleton()
    const pageSlugDictionary = {}
    const pageTitleDictionary = {}
    languages.forEach((languageCode) => {
        pageSlugDictionary[languageCode] = { ...dictionarySkeleton }
        pageTitleDictionary[languageCode] = { ...dictionarySkeleton }
    })

    const addSlugToDictionary = (language, pageKey, slug) => {
        if (!languages.includes(language)) return
        if (typeof slug !== 'string') return
        if (typeof pageKey !== 'string') return
        pageSlugDictionary[language][pageKey] = slug
    }

    const addTitleToDictionary = (language, pageKey, slug) => {
        if (!languages.includes(language)) return
        if (typeof slug !== 'string') return
        if (typeof pageKey !== 'string') return
        pageTitleDictionary[language][pageKey] = slug
    }

    nodes.forEach(({ node: { frontmatter: { slug, title, page_key: pageKey, language } } }) => {
        addSlugToDictionary(language, pageKey, slug)
        addTitleToDictionary(language, pageKey, title)
    })

    return [menus, pageSlugDictionary, pageTitleDictionary]
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
    const [siteStructure, pageSlugDictionary, pageTitleDictionary] = makeLanguageMenuDictionary(result.data.allMarkdownRemark.edges)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const currentLanguage = languageDetails.find(
            ({ language_code: languageCode }) => node.frontmatter.language === languageCode,
        )

        if (!currentLanguage) return

        createPage({
            path: makeLocalisedPath(currentLanguage.language_code, node.frontmatter.slug, node.frontmatter.page_key),
            component: pageTemplate,
            context: {
                // additional data can be passed via context
                languageCode: currentLanguage.language_code,
                pageKey: node.frontmatter.page_key,
                menuStructure: siteStructure,
                pageSlugDictionary,
                pageTitleDictionary,
            },
        })
    })

    const pageTemplates = {
        404: require.resolve('./content/pages/404.js'),
    }

    const sitePages = await graphql(`
    {
      allFile(filter: {absolutePath: {regex: "/content\\/pages\\/[0-9a-zA-Z]*.js/"}}) {
        edges {
          node {
            id
            absolutePath
            relativePath
            name
          }
        }
      }
    }
  `)
    // Handle errors
    if (sitePages.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    sitePages.data.allFile.edges.forEach(({ node }) => {
        const pageName = node.name

        if (!Object.keys(pageTemplates).includes(pageName)) return

        languages.forEach((language) => {
            createPage({
                path: `${makeLanguagePath(language)}/${pageName}`,
                component: pageTemplates[pageName],
                context: {
                    // additional data can be passed via context
                    languageCode: language,
                    pageKey: pageName,
                    menuStructure: siteStructure,
                    pageSlugDictionary,
                    pageTitleDictionary,
                },
            })
        })
    })
}
