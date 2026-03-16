'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import * as Label from '@radix-ui/react-label'
import { createClient } from '@/lib/supabase/client'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError(authError.message)
      setIsLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm bg-card text-card-foreground border border-border rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold mb-6">Sign In</h1>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label.Root
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </Label.Root>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label.Root
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </Label.Root>
              <a
                href="#"
                className="text-xs text-muted-foreground hover:text-foreground transition"
                tabIndex={0}
              >
                Forgot password?
              </a>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            />
          </div>

          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="text-sm text-destructive"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="mt-1 w-full rounded-lg bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </main>
  )
}
