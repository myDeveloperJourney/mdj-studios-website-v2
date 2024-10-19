import { gql } from "graphql-request";

export const GET_ARTICLE_POSTS = gql`
    {
        articles {
            title
            slug
            excerpt
            author {
                name
                jobTitle
                profilePhoto {
                    url
                }
            }
            coverImage {
                url
            }
        }
    }
`;

export const GET_ARTICLE_POST = gql`
    query getArticlePost($slug: String!) {
        article(slug: $slug) {
            title
            content {
                html
            }
            author {
                name
                jobTitle
                profilePhoto {
                    url
                }
            }
            coverImage {
                url
            }
        }
    }
`;