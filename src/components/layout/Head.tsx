import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, url, image }) => {
  return (
    <Head>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Favicon */}
      <link rel="icon" href="/images/logo.svg" type="image/svg+xml" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional SEO meta tags */}
      <meta name="author" content="MDJ Studios" />
      <meta name="keywords" content="web development, software solutions, SaaS products" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;
