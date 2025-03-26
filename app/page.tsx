import { SearchDialog } from '@/components/search-dialog';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          AI Tools Finder
        </h1>
      </div>

      <div className="relative flex place-items-center w-full max-w-2xl">
        <SearchDialog />
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left gap-6">
        <FeatureCard
          title="Conversational Search"
          description="Ask questions naturally and get personalized tool recommendations."
        />
        <FeatureCard
          title="Smart Filtering"
          description="Find tools based on your specific needs and use cases."
        />
        <FeatureCard
          title="Comprehensive Database"
          description="Access a vast collection of AI tools across multiple categories."
        />
        <FeatureCard
          title="Real-time Updates"
          description="Stay up to date with the latest AI tools and technologies."
        />
      </div>
    </main>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
      <h2 className="mb-3 text-2xl font-semibold">
        {title}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          →
        </span>
      </h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">
        {description}
      </p>
    </div>
  );
}