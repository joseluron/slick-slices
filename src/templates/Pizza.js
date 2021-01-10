import React from 'react';
import { graphql } from 'gatsby';

export default function SinglePizzaPage({ data }) {
  return <p>{data.pizza.name}</p>;
}

// This needs to be dynamic based on the slug pased via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
    }
  }
`;
