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
                    salePrice
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
