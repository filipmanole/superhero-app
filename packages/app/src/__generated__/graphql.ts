/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  AWSDate: { input: string; output: string; }
  AWSDateTime: { input: string; output: string; }
  AWSEmail: { input: string; output: string; }
  AWSIPAddress: { input: string; output: string; }
  AWSJSON: { input: string; output: string; }
  AWSPhone: { input: string; output: string; }
  AWSTime: { input: string; output: string; }
  AWSTimestamp: { input: number; output: number; }
  AWSURL: { input: string; output: string; }
};

export type Address = {
  __typename?: 'Address';
  addressLine: Scalars['String']['output'];
  country: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertSubscription: SubscriptionResponse;
};


export type MutationUpsertSubscriptionArgs = {
  input: UpsertSubscriptionInput;
};

export type Organization = {
  __typename?: 'Organization';
  address: Address;
  createdAt: Scalars['AWSDateTime']['output'];
  members?: Maybe<Array<OrganizationUser>>;
  name: Scalars['String']['output'];
  organizationId: Scalars['ID']['output'];
  subscription?: Maybe<OrganizationSubscription>;
  timezone: Scalars['String']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type OrganizationBase = {
  __typename?: 'OrganizationBase';
  address: Address;
  createdAt: Scalars['AWSDateTime']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['ID']['output'];
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type OrganizationPaginatedResponse = {
  __typename?: 'OrganizationPaginatedResponse';
  lastKey?: Maybe<Scalars['String']['output']>;
  nodes: Array<OrganizationBase>;
};

export enum OrganizationRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  OWNER = 'OWNER',
  STAFF = 'STAFF'
}

export type OrganizationSubscription = {
  __typename?: 'OrganizationSubscription';
  createdAt: Scalars['AWSDateTime']['output'];
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export type OrganizationUser = {
  __typename?: 'OrganizationUser';
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['AWSDateTime']['output'];
  email: Scalars['AWSEmail']['output'];
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['AWSPhone']['output']>;
  roles: Array<OrganizationRole>;
  updatedAt: Scalars['AWSDateTime']['output'];
  userId: Scalars['ID']['output'];
};

export type PaginationOption = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  startKey?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getOrganization?: Maybe<Organization>;
  getOrganizations: OrganizationPaginatedResponse;
  searchOrganization: Array<OrganizationBase>;
};


export type QueryGetOrganizationArgs = {
  organizationId: Scalars['ID']['input'];
};


export type QueryGetOrganizationsArgs = {
  pagination?: InputMaybe<PaginationOption>;
};


export type QuerySearchOrganizationArgs = {
  namePrefix: Scalars['String']['input'];
};

export enum SubscriptionPlan {
  BASIC = 'BASIC',
  PRO = 'PRO'
}

export type SubscriptionResponse = {
  __typename?: 'SubscriptionResponse';
  createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
  organizationId: Scalars['ID']['output'];
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  updatedAt: Scalars['AWSDateTime']['output'];
};

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  EXPIRED = 'EXPIRED',
  TRIAL = 'TRIAL'
}

export type UpsertSubscriptionInput = {
  organizationId: Scalars['ID']['input'];
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
};

export type GetOrganizationQueryVariables = Exact<{
  organizationId: Scalars['ID']['input'];
}>;


export type GetOrganizationQuery = { __typename?: 'Query', getOrganization?: { __typename?: 'Organization', organizationId: string, name: string, timezone: string, createdAt: string, updatedAt: string, address: { __typename?: 'Address', country: string, addressLine: string }, subscription?: { __typename?: 'OrganizationSubscription', plan: SubscriptionPlan, status: SubscriptionStatus, createdAt: string } | null, members?: Array<{ __typename?: 'OrganizationUser', userId: string, name?: string | null, email: string, phone?: string | null, roles: Array<OrganizationRole>, createdAt: string }> | null } | null };

export type UpsertSubscriptionMutationVariables = Exact<{
  input: UpsertSubscriptionInput;
}>;


export type UpsertSubscriptionMutation = { __typename?: 'Mutation', upsertSubscription: { __typename?: 'SubscriptionResponse', organizationId: string, plan: SubscriptionPlan, status: SubscriptionStatus, createdAt?: string | null, updatedAt: string } };

export type SearchOrganizationQueryVariables = Exact<{
  namePrefix: Scalars['String']['input'];
}>;


export type SearchOrganizationQuery = { __typename?: 'Query', searchOrganization: Array<{ __typename?: 'OrganizationBase', organizationId: string, name: string, createdAt: string, updatedAt: string, address: { __typename?: 'Address', country: string, addressLine: string } }> };

export type GetOrganizationsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationOption>;
}>;


export type GetOrganizationsQuery = { __typename?: 'Query', getOrganizations: { __typename?: 'OrganizationPaginatedResponse', lastKey?: string | null, nodes: Array<{ __typename?: 'OrganizationBase', organizationId: string, name: string, createdAt: string, updatedAt: string, address: { __typename?: 'Address', country: string, addressLine: string } }> } };


export const GetOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine"}}]}},{"kind":"Field","name":{"kind":"Name","value":"timezone"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"roles"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationQuery, GetOrganizationQueryVariables>;
export const UpsertSubscriptionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertSubscription"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertSubscriptionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertSubscription"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"plan"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<UpsertSubscriptionMutation, UpsertSubscriptionMutationVariables>;
export const SearchOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"namePrefix"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"namePrefix"},"value":{"kind":"Variable","name":{"kind":"Name","value":"namePrefix"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<SearchOrganizationQuery, SearchOrganizationQueryVariables>;
export const GetOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationOption"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getOrganizations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organizationId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"addressLine"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastKey"}}]}}]}}]} as unknown as DocumentNode<GetOrganizationsQuery, GetOrganizationsQueryVariables>;