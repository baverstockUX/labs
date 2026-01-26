'use client'

import { useActionState } from 'react'
import { login, type State } from '@/app/actions/auth'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const initialState: State = { error: undefined }
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] p-4">
      <div className="w-full max-w-md space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-tangerine/20 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-tangerine" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-white">
            Restricted Access
          </h2>
          <p className="mt-2 text-white/50">
            Please enter the password to view this site.
          </p>
        </div>

        <form action={formAction} className="mt-8 space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none relative block w-full px-4 py-3 border border-white/10 placeholder-white/30 text-white bg-black/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-tangerine focus:border-transparent sm:text-sm"
              placeholder="Enter password"
            />
          </div>

          {state.error && (
            <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-tangerine to-coral-red hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tangerine disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-tangerine/20"
          >
            {isPending ? 'Unlocking...' : 'Unlock Portal'}
          </button>
        </form>
      </div>
    </div>
  )
}
