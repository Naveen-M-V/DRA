import { getProjectBySlug } from "@/lib/projects";
import Hero from "@/components/projects/Hero";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [{ slug: "secura" }, { slug: "inara" }, { slug: "securari" }];
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#073a2f] text-white">
        <p className="text-2xl">Project not found</p>
      </div>
    );
  }

  return <Hero project={project} />;
}
