/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'

import { languages } from '../data/languages.json'
import { makeLanguagePath } from '../utils/paths'
import { usePageContext } from './pageContext'

const Link = ({ to, ref, ...rest }) => {
    const { languageCode } = usePageContext()
    const currentLanguage = languages.find(language => language === languageCode)

    return <GatsbyLink {...rest} to={`${makeLanguagePath(currentLanguage)}${to}`} />
}

Link.propTypes = {
    to: PropTypes.string,
    ref: PropTypes.shape({}),
}

Link.defaultProps = {
    to: '',
    ref: {},
}

export default Link
