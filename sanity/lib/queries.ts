// lib/sanity/queries.ts

export const PROJECT_CARD_FIELDS = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  shortDescription,
  projectType,
  status,
  featured,
  order,
  publishedAt,
  technologies,
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
    "logo": logo{
    alt,
    asset->
  },
  "featuredImage": featuredImage{
    alt,
    asset->
  },
  "links": {
    live,
    github
  }
`;

export const POST_CARD_FIELDS = /* groq */ `
  _id,
  _type,
  title,
  "slug": slug.current,
  publishedAt,
  "mainImage": mainImage{
    alt,
    asset->
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  }
`;

export const FEATURED_PROJECTS_QUERY = /* groq */ `
  *[_type == "project" && featured == true]
  | order(order asc, publishedAt desc)
  [0...$limit]{
    ${PROJECT_CARD_FIELDS}
  }
`;

export const FILTERED_PROJECTS_QUERY = /* groq */ `
  *[
    _type == "project" &&
    defined(publishedAt) && publishedAt <= now() &&
    // category filter
    (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&
    // projectType filter
    (!defined($projectType) || projectType == $projectType) &&
    // technology filter
    (!defined($technology) || $technology in technologies[]) &&
    // search filter
    (
      !defined($search) || $search == "" ||
      title match $search ||
      shortDescription match $search ||
      pt::text(caseStudy) match $search
    )
  ]
  | order(order asc, publishedAt desc)
  [$offset...$offset + $limit]{
    ${PROJECT_CARD_FIELDS}
  }
`;

export const FILTERED_PROJECTS_COUNT_QUERY = /* groq */ `
  count(
    *[
      _type == "project" &&
      defined(publishedAt) && publishedAt <= now() &&
      (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&
      (!defined($projectType) || projectType == $projectType) &&
      (!defined($technology) || $technology in technologies[]) &&
      (
        !defined($search) || $search == "" ||
        title match $search ||
        shortDescription match $search ||
        pt::text(caseStudy) match $search
      )
    ]
  )
`;

export const FEATURED_POSTS_QUERY = /* groq */ `
  *[_type == "post" && featured == true && defined(publishedAt) && publishedAt <= now()]
  | order(publishedAt desc)
  [0...$limit]{
    ${POST_CARD_FIELDS}
  }
`;

export const FILTERED_POSTS_QUERY = /* groq */ `
  *[
    _type == "post" &&
    defined(publishedAt) && publishedAt <= now() &&
    (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&
    (
      !defined($search) || $search == "" ||
      title match $search ||
      pt::text(body) match $search
    )
  ]
  | order(publishedAt desc)
  [$offset...$offset + $limit]{
    ${POST_CARD_FIELDS}
  }
`;

export const FILTERED_POSTS_COUNT_QUERY = /* groq */ `
  count(
    *[
      _type == "post" &&
      defined(publishedAt) && publishedAt <= now() &&
      (!defined($categorySlug) || $categorySlug in categories[]->slug.current) &&
      (
        !defined($search) || $search == "" ||
        title match $search ||
        pt::text(body) match $search
      )
    ]
  )
`;

export const PROJECT_BY_SLUG_QUERY = /* groq */ `
  *[_type == "project" && slug.current == $slug][0]{
    ${PROJECT_CARD_FIELDS},
    caseStudy
  }
`;

export const POST_BY_SLUG_QUERY = /* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    ${POST_CARD_FIELDS},
    body
  }
`;

export const EXPERIENCE_QUERY = /* groq */ `
  *[_type == "experience"]
  | order(order asc, startDate desc) {
    _id,
    role,
    company,
    location,
    employmentType,
    startDate,
    endDate,
    current,
    description,
    "logo": logo{
      asset->
    }
  }
`;

export const EDUCATION_QUERY = /* groq */ `
  *[_type == "education"]
  | order(order asc, startDate desc) {
    _id,
    institution,
    degree,
    field,
    startDate,
    endDate,
    current,
    grade,
    description,
    "logo": logo{
      asset->
    }
  }
`;

export const CERTIFICATIONS_QUERY = /* groq */ `
  *[_type == "certification"]
  | order(order asc, issueDate desc) {
    _id,
    name,
    issuer,
    issueDate,
    doesNotExpire,
    expiryDate,
    credentialId,
    credentialUrl,
    description,
    "logo": logo{
      asset->
    }
  }
`;

export const HOME_QUERY = /* groq */ `
{
  "featuredProjects": *[_type == "project" && featured == true]
    | order(order asc, publishedAt desc)
    [0...2]{
      ${PROJECT_CARD_FIELDS}
    },

  "latestPosts": *[_type == "post" && defined(publishedAt) && publishedAt <= now()]
    | order(publishedAt desc)
    [0...3]{
      ${POST_CARD_FIELDS}
    },

  "experiencePreview": *[_type == "experience"]
    | order(startDate desc)
    [0...2]{
      _id, role, company, location, employmentType,
      startDate, endDate, current,
      description,
      "logo": logo{ asset-> }
    },

  "educationPreview": *[_type == "education"]
    | order(startDate desc)
    [0...1]{
      _id, institution, degree, field,
      startDate, endDate, current, grade,
      "logo": logo{ asset-> }
    },

  "certificationsPreview": *[_type == "certification"]
    | order(issueDate desc)
    [0...3]{
      _id, name, issuer, issueDate, doesNotExpire, expiryDate,
      "logo": logo{ asset-> }
    }
}
`;
