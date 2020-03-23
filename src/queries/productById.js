export default `
query product($productId: ID!) {
  node(id: $productId) {
    ... on ProductNode {
      id
      skus {
        edges {
          node {
            id
            quantity
          }
        }
      }
    }
  }
}
`;
