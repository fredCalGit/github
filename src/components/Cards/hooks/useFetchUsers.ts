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

    const mergeData = (prev: QueryResult, newUsers: QueryResult) => {
      let result = [...prev.search.edges];
      newUsers.search.edges.forEach((newUser) => {
        if (!result.find((user) => user.node.id === newUser.node.id)) {
          result.push(newUser);
        }
      });

      return result;
    };
    if (data) {
      fetchMore({
        variables: {
          query: queryString,
          type: "USER",
          after: data.search.edges[data.search.edges.length - 1].cursor,
          first: 10,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            search: {
              __typename: "SearchResultItemConnection",
              edges: mergeData(prev, fetchMoreResult),
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
