import { request, gql } from 'graphql-request'
import { Message } from 'discord.js'
import { Maybe, Product } from './types'

const endpoint = 'https://api.wavr.me:4000'

const productQuery = gql`
  query GetProduct($where: ProductWhereUniqueInput!) {
    product(where: $where) {
      name
      description
      tags {
        name
      }
      images
      onSale
      salePrice
      amount
      owner {
        avatarURL
        displayName
        username
      }
    }
  }
`

export const getProduct = async ({
  id,
}: {
  id: string
}): Promise<Maybe<Product>> => {
  const product = await request(endpoint, productQuery, {
    where: {
      id,
    },
  })

  return product?.product as Product
}
