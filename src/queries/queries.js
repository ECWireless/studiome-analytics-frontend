import { gql } from 'apollo-boost';

const getProductsQuery = gql`
    {
        products {
            id
            name
            impressions {
                date
            }
        }
    }
`

const addProductQuery = gql`
    mutation($name: String!) {
            addProduct(name: $name) {
                name
                id
        }
    }
`

const getImpressionsQuery = gql`
    query($id: ID) {
        product(id: $id) {
            name
            impressions {
                id
                date
            }
        }
    }
`

const addImpressionQuery = gql`
    mutation($date: String!, $productId: String!) {
        addImpression(date: $date, productId: $productId) {
            date
            id
        }
    }
`

export { getProductsQuery, addProductQuery, getImpressionsQuery, addImpressionQuery };