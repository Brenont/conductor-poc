import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Welcome to Conductor POC
        </h1>
        <p className="mt-4 text-lg text-foreground/70 max-w-md">
          A proof-of-concept for multi-agent collaboration
        </p>
      </main>
    </div>
  );
}
