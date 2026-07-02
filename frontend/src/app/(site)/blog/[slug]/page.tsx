import Image from "next/image";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  const res = await fetch(
    `http://localhost:5000/api/public/blogs/${params.slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <h1>Blog not found</h1>;
  }

  const data = await res.json();

  const blog = data.blog;

  return (
    <main>
      <h1>{blog.title}</h1>

      <Image src={blog.featured_image} alt={blog.title} width={800} height={400} />

      <p>{blog.author}</p>

      <div>{blog.content}</div>
    </main>
  );
}