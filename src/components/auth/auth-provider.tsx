'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'
import type { UserTier } from '@/lib/auth/tier'
import { getUserTier, getTrialDaysLeft } from '@/lib/auth/tier'

interface Profile {
  id: string
  email: string
  company_name: string | null
  trial_ends_at: string
  subscription_status: string
  stripe_customer_id: string | null
}

interface AuthContextValue {
  user: User | null
  profile: Profile | null
  tier: UserTier
  trialDaysLeft: number
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  profile: null,
  tier: 'demo',
  trialDaysLeft: 0,
  loading: true,
  signOut: async () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function load() {
      const { data: { user: u } } = await supabase.auth.getUser()
      setUser(u)

      if (u) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', u.id)
          .single()
        setProfile(data)
      }
      setLoading(false)
    }

    load()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        setProfile(data)
      } else {
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const tier = getUserTier(profile)
  const trialDaysLeft = getTrialDaysLeft(profile)

  const signOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <AuthContext.Provider value={{ user, profile, tier, trialDaysLeft, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
