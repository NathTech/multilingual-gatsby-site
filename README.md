# Multilingual Gatsby Forestry Starter

Based on [multilingual-gatsby-starter](https://github.com/charbelchahine/multilingual-gatsby-starter)

This is a gatsby starter, it supports multiple languages, Forestry, styling with Sass, Material-UI components & dark mode!

[Live Preview](https://vibrant-colden-bdd2d7.netlify.app/)

## Table of Contents

- [Multilingual Gatsby Forestry Starter](#multilingual-gatsby-forestry-starter)
  - [Table of Contents](#table-of-contents)
  - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Clone the repo](#clone-the-repo)
    - [Development](#development)
    - [Sass](#sass)
    - [Set up Forestry](#set-up-forestry)
  - [Lighthouse Audit](#lighthouse-audit)
  - [Author](#author)

## Built With

-   [GatsbyJS](https://www.gatsbyjs.org) - to obtain static/offline Progressive Web App
-   [Forestry](https://www.forestry.io) - to create site pages
-   [react-i18next](https://react.i18next.com/) - Internationalization to obtain multilingual site
-   [Sass](https://sass-lang.com) - for styling
-   [Material-UI](https://material-ui.com) - React components based on Material Design
-   [Enzyme](https://enzymejs.github.io/enzyme/) & [Jest](https://jestjs.io) - for unit testing
-   [ESLint](https://eslint.org) & [Prettier](https://prettier.io) - for code formatting

## Getting Started

These instructions will get you a copy of this gastby starter up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure to have [Node](https://nodejs.org/) & [npm](https://npmjs.com/) installed on your local machine

Open a terminal window and install React & Gatsby's command line tool

```
npm i -g gatsby-cli
```

### Clone the repo

Clone the repo in the directory of your choice and then move to this new directory

```
git clone https://github.com/nathtech/multilingual-gatsby-site.git
cd multilingual-gatsby-site
```

Install all dependencies for the prototype

```
npm i
```

### Development

Start a hot-reloading development environment

```
gatsby develop
```

You will now be able to view the prototype at http://localhost:8000/. Any change you make to your React components will immediately be visible in the browser.

### Sass

Run `yarn sass` before making changes to any of the `.scss` files.

### Set up Forestry

The following steps-by-steps use [Forestry](https://www.forestry.com) to host the starter from GitHub. Other methods can be used to implement [Forestry](https://forestry.io).

1. Sign in or make a [Forestry](https://forestry.io) account
2. Click Add Site
3. Choose Gatsby as the static site generator
4. Choose GitHub (or the provider of your repo)
5. access your admin section with {your-site-url}/admin

## Lighthouse Audit

| Audits              | Score |
| ------------------- | ----: |
| Performance         |  100% |
| Progressive Web App |  100% |
| Accessibility       |  100% |
| Best Practices      |  100% |
| SEO                 |  100% |

## Author

**Nathaniel Fenton** - [LinkedIn](https://www.linkedin.com/in/nathaniel-f-6829b7102/)
