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
            ... on ProductNode {
              skus {
                edges {
                  node {
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
