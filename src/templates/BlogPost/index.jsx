import React from 'react';
import Link from 'gatsby-link';
import R from 'ramda';
import Img from "gatsby-image";

import 'prismjs/themes/prism.css';
import styles from './index.module.scss';
import Subheader from 'components/Subheader';
import BlogPostMetadata from 'components/BlogPostMetadata';

export default function BlogPostTemplate(props) {
  const post = props.data.markdownRemark;
  const sizes = post.frontmatter.thumbnail.childImageSharp.sizes;
  return (
    <article>
      <BlogPostMetadata {...props} />
      <div className={styles.postCover}>
        <Img sizes={sizes} />
      </div>
      <h1>{post.frontmatter.title}</h1>
      <Subheader post={post} />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
      }
    }
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        slug
        publishedDate: published(formatString: "MMMM DD, YYYY")
        published(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        modified(formatString: "YYYY-MM-DDTHH:mm:ssZ")
        tags
        thumbnail {
          childImageSharp {
            sizes(maxWidth: 720, maxHeight: 400, quality: 90) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
