import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-background border-b border-foreground/10">
      <div className="max-w-screen-lg mx-auto px-4 flex items-center justify-between h-14">
        <span className="text-foreground font-semibold">Conductor POC</span>
        <Link
          href="/login"
          className="rounded-md px-4 py-1.5 text-sm font-medium bg-foreground text-background hover:opacity-80 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}
