import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "@/lib/graphql-client";
import { GET_ARTICLE_POSTS, GET_ARTICLE_POST } from "@/lib/queries";
import SEO from "@/components/layout/Head";
import Layout from "@/components/layout";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";

interface Article {
  title: string;
  excerpt: string;
  content: {
    raw: RichTextContent; 
  };
  coverImage: {
    url: string;
  };
  author: {
    name: string;
    jobTitle: string;
    profilePhoto: {
      url: string;
    };
  };
}

type Props = {
  article: Article;
};

function ArticlePage({ article }: Props) {
  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        url={`https://mdjstudios.com/articles/${article.title}`}
        image={article.coverImage.url}
      />

      <Layout coverImageSourceURL={article.coverImage.url} articleTitle={article.title}>
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="text-lg">
                <RichText
                  content={article.content.raw}
                  renderers={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl font-bold mb-4">{children}</h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl font-bold mb-4">{children}</h2>
                    ),
                    p: ({ children }) => <p className="mb-4">{children}</p>,
                    bold: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-indigo-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    )
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { articles } = await client.request<{ articles: { slug: string }[] }>(GET_ARTICLE_POSTS);

  const paths = articles.map((article) => ({
    params: { slug: article.slug },
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
