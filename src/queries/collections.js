export default `
query collections($domainId: ID!) {
  node(id: $domainId) {
    ... on DomainNode {
      id
      collections {
        edges {
          node {
            id
            name
            productCount
            products {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
