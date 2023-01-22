import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { User } from "@/types";

interface UseFetchUsersProps {
  queryString: string;
}

export function useFetchUsers({ queryString }: UseFetchUsersProps) {
  const [queryVariables, setQueryVariables] = useState<QueryVariables>({
    query: queryString,
    type: "USER",
    after: null,
    first: 20,
  });
  const [users, setUsers] = useState<User[]>([]);

  const { data, loading, error, fetchMore, networkStatus } =
    useQuery<QueryResult>(FETCH_USERS, {
      variables: queryVariables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "cache-and-network",
    });

  const serializeUser = (data: QueryResult): User[] =>
    data?.search?.edges?.map((item) => {
      const { node } = item;
      return {
        avatarUrl: node.avatarUrl,
        bio: node.bio,
        company: node.company,
        createdAt: node.createdAt,
        email: node.email,
        id: node.id,
        location: node.location,
        name: node.name,
        login: node.login,
        repositories: node.repositories,
      };
    });

  const handleScroll = (index: number) => {
    if (index !== users.length - 10) return;
    if (data) {
      fetchMore({
        variables: {
          query: queryString,
          type: "USER",
          after: data.search.edges[index].cursor,
          first: 20,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            search: {
              __typename: "SearchResultItemConnection",
              edges: [...prev.search.edges, ...fetchMoreResult.search.edges],
              cursor: data.search.edges[index].cursor,
            },
          };
        },
      });
    }
  };

  useEffect(() => {
    setQueryVariables({
      query: queryString,
      type: "USER",
      after: null,
      first: 20,
    });
  }, [queryString]);

  useEffect(() => {
    if (!data || error || loading) return;

    const fetchedUsers = serializeUser(data);

    setUsers(fetchedUsers);
  }, [loading, error, data]);

  return {
    data: {
      users,
      isLoading: loading,
      error,
      networkStatus,
    },
    actions: {
      handleScroll,
    },
  };
}

type QueryResult = {
  search: {
    edges: {
      cursor: string;
      node: User;
    }[];
  };
};

type QueryVariables = {
  query: string;
  type: "USER";
  after: string | null;
  first?: number;
  last?: number;
};

const FETCH_USERS = gql`
  query ExampleQuery(
    $query: String!
    $type: SearchType!
    $first: Int
    $after: String
  ) {
    search(query: $query, type: $type, first: $first, after: $after) {
      edges {
        cursor
        node {
          ... on User {
            avatarUrl
            bio
            company
            createdAt
            email
            id
            location
            name
            login
            repositories {
              totalCount
            }
          }
        }
      }
    }
  }
`;
