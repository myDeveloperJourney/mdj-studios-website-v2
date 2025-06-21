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
      <link rel="canonical" href={url} />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/images/logo-dark-bg.png" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="MDJ Studios" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {/* <meta name="twitter:creator" content="@yourhandle" /> */} {/* optional */}

      {/* Additional */}
      <meta name="author" content="MDJ Studios" />
      <meta name="keywords" content="web development, software solutions, SaaS products" />
      <meta name="robots" content="index, follow" />
    </Head>
  );
};

export default SEO;
