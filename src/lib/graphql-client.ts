import { GraphQLClient } from "graphql-request";

const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string;

export const client = new GraphQLClient(endpoint, {
    headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
    }
});