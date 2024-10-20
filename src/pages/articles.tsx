import Layout from "@/components/layout";
import SEO from "@/components/layout/Head";
import Image from "next/image";
import { GetStaticProps } from "next";
import Link from "next/link";
import { client } from "@/lib/graphql-client";
import { GET_ARTICLE_POSTS } from "@/lib/queries";

interface Article {
  title: string;
  slug: string;
  excerpt: string;
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

function ArticlesPage({ articles }: { articles: Article[] }) {
  return (
    <>
      <SEO
        title="MDJ Studios | Articles"
        description="Explore our latest Articles covering everything tech"
        url="https://mdjstudios.com/articles"
        image="/images/logo.svg"
      />

      <Layout>
        <section className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            Articles
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.slug} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={article.coverImage.url}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                  <p className="text-gray-500 text-sm mb-2">
                    By {article.author.name}
                  </p>
                  <p className="text-gray-700 mb-4">
                    {article.excerpt}
                  </p>
                  <Link className="text-indigo-600 hover:text-indigo-800 font-semibold" href={`/articles/${article.slug}`}>
                    Read more &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { articles } = await client.request<{ articles: Article[] }>(GET_ARTICLE_POSTS);
  return {
    props: {
      articles,
    },
    revalidate: 60,
  };
};

export default ArticlesPage;
