export default `
query checkout($id: ID!) {
  node(id: $id) {
    ... on CheckoutNode {
      products {
        edges {
          node {
            id
            name
            gender
            variantCount
            description
            quantity
            slug
            productSeo {
              edges {
                node {
                  title
                  description
                }
              }
            }
            ... on ProductNode {
              skus {
                edges {
                  node {
                    id
                    width
                    height
                    length
                    salePrice
                    weight
                    attributes
                    orderSkus {
                      edges {
                        node {
                          sku {
                            sku
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            vendor {
              id
            }
            images(orderBy: "orderingPosition") {
              edges {
                node {
                  id
                  image
                }
              }
            }
          }
        }
      }
    }
  }
}`;
