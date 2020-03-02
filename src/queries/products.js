export default `
query checkout($id: ID! $domainId: ID!) {
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
            insuranceAmount
            quantity
            slug
            unitOfWeight
            unitOfDimensions
            productSeo {
              edges {
                node {
                  title
                  description
                }
              }
            }
            attributes
            ... on ProductNode {
              skus {
                edges {
                  node {
                    id
                    sku
                    width
                    height
                    length
                    unitOfDimensions
                    unitOfWeight
                    salePrice
                    weight
                    attributes
                    stripeId
                    orderSkus {
                      edges {
                        node {
                          sku {
                            id
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
              profile(domainId: $domainId) {
                edges {
                  node {
                    id
                    avatar
                    bio
                    label
                    name
                    address1
                    address2
                    city
                    state
                    zipCode
                    country
                    email
                    phoneNumber
                    stripeConnectUserId
                    paypalPayoutEmail
                    domainCommission
                    slug
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
