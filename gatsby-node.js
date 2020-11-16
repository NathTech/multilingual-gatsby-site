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
    languages,
} = require('./src/data/languages.json')

const {
    menu_structure: menuStructure,
    pages,
} = require('./src/data/menuStructure.json')

const makeLocalisedPath = (languageCode, pagePath, isIndexPage) => {
    const isDefaultLanguage = languageCode === defaultLanguage

    if (isIndexPage) {
        return isDefaultLanguage ? '/' : `/${languageCode}`
    }

    return isDefaultLanguage ? `/${pagePath}` : `/${languageCode}/${pagePath}`
}

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
                    slug: ''
                }))
            return ({
                pageKey: item.page_key,
                homePage: item.home_page,
                slug: '',
                subMenu,
            })
        })
    }

    const dictionarySkeleton = {}
    pages.forEach((pageKey) => {
        dictionarySkeleton[pageKey] = ''
    })

    const menus = {}
    const pageDictionary = {}
    languages.forEach((languageCode) => {
        menus[languageCode] = makeMenuSkeleton()
        pageDictionary[languageCode] = { ...dictionarySkeleton }
    })

    const addSlugToDictionary = (language, pageKey, slug) => {
        if (!languages.includes(language)) return
        if (typeof slug !== 'string') return
        if (typeof pageKey !== 'string') return
        pageDictionary[language][pageKey] = slug
    }

    nodes.forEach(({ node: { frontmatter: { slug, page_key: pageKey, language } } }) => {
        addSlugToDictionary(language, pageKey, slug, pageDictionary)
    })

    const getPageSlug = (language, pageKey) => {
        if (!Object.keys(pageDictionary).includes(language)) return ''
        if (!Object.keys(pageDictionary[language]).includes(pageKey)) return ''

        return pageDictionary[language][pageKey]
    }

    const addSlugToMenu = (language, slug, firstLevelIndex, secondLevelIndex = -1) => {
        const firstLevel = menus[language][firstLevelIndex]
        if (secondLevelIndex > -1) {
            if (firstLevel.subMenu && firstLevel.subMenu.length > 0) {
                firstLevel.subMenu[secondLevelIndex].slug = slug
            }
            return
        }
        firstLevel.slug = slug
    }

    Object.keys(menus).forEach((languageCode) => {
        const menu = menus[languageCode]
        menu.forEach((item, i) => {
            const pageSlug = getPageSlug(languageCode, item.pageKey)
            addSlugToMenu(languageCode, pageSlug, i)

            if (item.subMenu && item.subMenu.length > 0) {
                item.subMenu.forEach((subItem, j) => {
                    const subPageSlug = getPageSlug(languageCode, subItem.pageKey)
                    addSlugToMenu(languageCode, subPageSlug, i, j)
                })
            }
        })
    })

    return [menus, pageDictionary]
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
    const [languageMenuStructures, pageKeyDictionary] = makeLanguageMenuDictionary(result.data.allMarkdownRemark.edges)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        const currentLanguage = languageDetails.find(
            ({ language_code: languageCode }) => node.frontmatter.language === languageCode,
        )
        const currentMenuItem = node.frontmatter.page_key

        const menuItem = menuStructure.find(({ page_key: pageKey }) => currentMenuItem === pageKey)

        const isIndexPage = menuItem ? menuItem.home_page : false

        if (!currentLanguage) return

        const languageMenuStructure = languageMenuStructures[currentLanguage.language_code]

        createPage({
            path: makeLocalisedPath(currentLanguage.language_code, node.frontmatter.slug, isIndexPage),
            component: pageTemplate,
            context: {
                // additional data can be passed via context
                languageCode: currentLanguage.language_code,
                pageKey: node.frontmatter.page_key,
                menuStructure: languageMenuStructure,
                pageKeyDictionary,
            },
        })
    })
}
