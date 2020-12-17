import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next + Tailwind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-6">
        <h1 className="text-2xl text-center font-bold text-blue-700 py-20">
          Next.js + TailwindCSS setup
        </h1>
      </main>
    </div>
  );
}
