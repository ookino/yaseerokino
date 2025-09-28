// scripts/seed-data.ts
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import "dotenv/config"; // Load environment variables

const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion,
});

// Post Categories Data
const postCategories = [
    {
        _type: "postCategory",
        _id: "post-cat-web-dev",
        title: "Web Development",
        slug: { _type: "slug", current: "web-development" },
        description:
            "Articles about modern web development, frameworks, and best practices",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-javascript",
        title: "JavaScript",
        slug: { _type: "slug", current: "javascript" },
        description:
            "Deep dives into JavaScript concepts, ES6+, and modern JS frameworks",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-react",
        title: "React",
        slug: { _type: "slug", current: "react" },
        description:
            "React tutorials, hooks, state management, and ecosystem updates",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-ui-ux",
        title: "UI/UX Design",
        slug: { _type: "slug", current: "ui-ux-design" },
        description:
            "Design principles, user experience insights, and design system creation",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-ai-ml",
        title: "AI & Machine Learning",
        slug: { _type: "slug", current: "ai-machine-learning" },
        description:
            "AI integration, ML models, and practical applications in web development",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-career",
        title: "Career & Growth",
        slug: { _type: "slug", current: "career-growth" },
        description:
            "Professional development, learning paths, and industry insights",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-tutorial",
        title: "Tutorial",
        slug: { _type: "slug", current: "tutorial" },
        description: "Step-by-step guides and how-to articles for developers",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-devops",
        title: "DevOps",
        slug: { _type: "slug", current: "devops" },
        description:
            "Deployment, CI/CD, containerization, and cloud infrastructure",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-open-source",
        title: "Open Source",
        slug: { _type: "slug", current: "open-source" },
        description:
            "Contributing to open source, project maintenance, and community building",
    },
    {
        _type: "postCategory",
        _id: "blog-cat-performance",
        title: "Performance",
        slug: { _type: "slug", current: "performance" },
        description:
            "Web performance optimization, Core Web Vitals, and speed improvements",
    },
];

// Project Categories Data
const projectCategories = [
    {
        _type: "projectCategory",
        _id: "proj-cat-frontend",
        title: "Frontend Development",
        slug: { _type: "slug", current: "frontend-development" },
        description:
            "Client-side applications, interactive user interfaces, and modern web experiences",
        color: "#3B82F6",
        icon: "💻",
        order: 1,
        featured: true,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-backend",
        title: "Backend Development",
        slug: { _type: "slug", current: "backend-development" },
        description:
            "Server-side logic, APIs, databases, and cloud infrastructure",
        color: "#10B981",
        icon: "⚙️",
        order: 2,
        featured: true,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-fullstack",
        title: "Full Stack Development",
        slug: { _type: "slug", current: "fullstack-development" },
        description:
            "End-to-end applications with both frontend and backend components",
        color: "#8B5CF6",
        icon: "🚀",
        order: 3,
        featured: true,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-ui-ux",
        title: "UI/UX Design",
        slug: { _type: "slug", current: "ui-ux-design" },
        description:
            "User interface design, user experience research, and design systems",
        color: "#F59E0B",
        icon: "🎨",
        order: 4,
        featured: true,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-mobile",
        title: "Mobile Development",
        slug: { _type: "slug", current: "mobile-development" },
        description:
            "iOS and Android applications, React Native, and cross-platform solutions",
        color: "#EF4444",
        icon: "📱",
        order: 5,
        featured: false,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-ai-ml",
        title: "AI/ML Integration",
        slug: { _type: "slug", current: "ai-ml-integration" },
        description:
            "Machine learning models, AI-powered features, and intelligent automation",
        color: "#06B6D4",
        icon: "🤖",
        order: 6,
        featured: true,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-data-science",
        title: "Data Science",
        slug: { _type: "slug", current: "data-science" },
        description:
            "Data analysis, visualization, and insights from complex datasets",
        color: "#84CC16",
        icon: "📊",
        order: 7,
        featured: false,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-ecommerce",
        title: "E-commerce",
        slug: { _type: "slug", current: "ecommerce" },
        description:
            "Online stores, payment integration, and shopping experiences",
        color: "#F97316",
        icon: "🛒",
        order: 8,
        featured: false,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-api",
        title: "API Development",
        slug: { _type: "slug", current: "api-development" },
        description:
            "RESTful APIs, GraphQL, microservices, and backend integrations",
        color: "#6366F1",
        icon: "🔗",
        order: 9,
        featured: false,
    },
    {
        _type: "projectCategory",
        _id: "proj-cat-devops",
        title: "DevOps",
        slug: { _type: "slug", current: "devops" },
        description:
            "CI/CD pipelines, containerization, cloud deployment, and infrastructure",
        color: "#14B8A6",
        icon: "🔧",
        order: 10,
        featured: false,
    },
];

async function seedData() {
    try {
        console.log("🌱 Starting data seeding...");

        // Check if categories already exist
        const existingBlogCats = await client.fetch(
            '*[_type == "postCategory"]',
        );
        const existingProjectCats = await client.fetch(
            '*[_type == "projectCategory"]',
        );

        if (existingBlogCats.length > 0 || existingProjectCats.length > 0) {
            console.log("⚠️  Categories already exist. Skipping seeding.");
            console.log(
                `Found ${existingBlogCats.length} blog categories and ${existingProjectCats.length} project categories`,
            );
            return;
        }

        // Create blog categories
        console.log("📝 Creating blog categories...");
        const blogCatResults = await Promise.all(
            postCategories.map((category) => client.create(category)),
        );
        console.log(`✅ Created ${blogCatResults.length} blog categories`);

        // Create project categories
        console.log("🎯 Creating project categories...");
        const projectCatResults = await Promise.all(
            projectCategories.map((category) => client.create(category)),
        );
        console.log(
            `✅ Created ${projectCatResults.length} project categories`,
        );

        console.log("🎉 Data seeding completed successfully!");
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
}

// Run the seeding function
seedData();

export { seedData, type postCategories, projectCategories };
