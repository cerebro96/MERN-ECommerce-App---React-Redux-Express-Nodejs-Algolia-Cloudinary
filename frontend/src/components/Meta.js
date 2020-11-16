import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description'content={description} />
            <meta name='keyword'content={keywords} />
        </Helmet>
    )
}

Meta.defaultProps = {
    title: "Welcome to Gamu",
    keywords: "Laptops,Buy Laptops,Buy Electronics",
    description: "We sell the best product"
}

export default Meta
