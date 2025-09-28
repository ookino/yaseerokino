export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && featured == true] | order(order asc, publishedAt desc) [0...10] {
    _id,
    title,
    slug,
    shortDescription,
    featuredImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    categories[]-> {
      _id,
      title,
      slug,
      color,
      icon
    },
    status,
    projectType,
    links {
      live,
      github,
      design
    },
    timeline {
      duration
    },
    technologies[] {
      name,
      category
    },
    publishedAt,
    order
  }
`;
