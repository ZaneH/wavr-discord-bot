export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any
}

export enum AccountType {
  Free = 'FREE',
  Pro = 'PRO',
  Proplus = 'PROPLUS',
}

export type Tag = {
  __typename?: 'Tag'
  id: Scalars['String']
  name: Scalars['String']
  products: Array<Product>
}

export type Product = {
  __typename?: 'Product'
  id: Scalars['String']
  amount: Scalars['Float']
  createdAt: Scalars['DateTime']
  description: Scalars['String']
  name: Scalars['String']
  onSale: Scalars['Boolean']
  salePrice?: Maybe<Scalars['Float']>
  owner?: Maybe<User>
  tags: Array<Tag>
  reviews: Array<Review>
  updatedAt: Scalars['DateTime']
  transactions: Array<Transaction>
  /** Returns true if a user has bought the specified product */
  ownsProduct: Scalars['Boolean']
  filename: Scalars['String']
  hasReviewed: Scalars['Boolean']
  stars: Scalars['Float']
  images: Array<Scalars['String']>
}

export type Transaction = {
  __typename?: 'Transaction'
  id: Scalars['String']
  amount: Scalars['Float']
  buyer?: Maybe<User>
  createdAt: Scalars['DateTime']
  products: Array<Product>
  licenseKeyShown: Scalars['Int']
  licenseRedeemed: Scalars['Boolean']
  licenseKey?: Maybe<Scalars['String']>
}

export type Review = {
  __typename?: 'Review'
  id: Scalars['String']
  author: User
  createdAt: Scalars['DateTime']
  message: Scalars['String']
  product: Product
  stars: Scalars['Int']
  updatedAt: Scalars['DateTime']
}

export type User = {
  __typename?: 'User'
  id: Scalars['String']
  accountType: AccountType
  adTokens: Scalars['Int']
  avatarURL?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  displayName?: Maybe<Scalars['String']>
  email: Scalars['String']
  emailOnSale: Scalars['Boolean']
  emailUpdates: Scalars['Boolean']
  emailVerified: Scalars['Boolean']
  paidBalance: Scalars['Float']
  paypalEmail?: Maybe<Scalars['String']>
  products: Array<Product>
  transactions: Array<Transaction>
  unpaidBalance: Scalars['Float']
  username: Scalars['String']
  storageQuotaPercent: Scalars['Int']
  productQuotaPercent: Scalars['Int']
}
