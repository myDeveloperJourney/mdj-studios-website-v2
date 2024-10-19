import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/graphql-client";
import { GET_ARTICLE_POSTS, GET_ARTICLE_POST } from "@/lib/queries";
import SEO from "@/components/layout/Head";

interface Article {
    title: string;
    content: {
        html: string;
    }
    coverImage: {
        url: string;
    };
    author: {
        name: string;
        jobTitle: string;
        profilePhoto: {
            url: string;
        };
    }[];
};

type Props = {
    article: Article;
};

function ArticlePage({ article }: Props) {
    <>
        <SEO
            title={article.title}
            description={article.content.html}
            url={`https://mdjstudios.com/articles/${article.title}`}
            image={article.coverImage.url}
        />

        <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-96">
                    <img
                        src={article.coverImage.url}
                        alt={article.title}
                        className="rounded-t-lg"
                    />
                </div>
                <div className="p-6">
                    <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
                    <div
                        dangerouslySetInnerHTML={{ __html: article.content.html }}
                        className="text-lg"
                    />
                </div>
            </div>
        </div>
    </>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { articles } = await client.request<{ articles: { slug: string }[] }>(GET_ARTICLE_POSTS);

    const paths = articles.map((post: { slug: string }) => ({
        params: { slug: post.slug },
    }));

    return {
        paths,
        fallback: 'blocking', 
    };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const { article } = await client.request<{ article: Article }>(GET_ARTICLE_POST, { slug });

    if (!article) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            article,
        },
        revalidate: 60, 
    };
};

export default ArticlePage;