export type UserTier = 'demo' | 'trial' | 'trial_expired' | 'pro' | 'agency'

interface Profile {
  trial_ends_at: string
  subscription_status: string
  tier?: string | null
}

export function getUserTier(profile: Profile | null): UserTier {
  if (!profile) return 'demo'

  if (profile.subscription_status === 'active') {
    return profile.tier === 'agency' ? 'agency' : 'pro'
  }

  const trialEnd = new Date(profile.trial_ends_at)
  if (trialEnd > new Date()) return 'trial'

  return 'trial_expired'
}

export function canExportPdf(tier: UserTier): boolean {
  return tier !== 'demo'
}

export function shouldWatermark(tier: UserTier): boolean {
  return tier === 'trial_expired'
}

export function canExportPptx(tier: UserTier): boolean {
  return tier === 'pro' || tier === 'agency'
}

export function canUseBranding(tier: UserTier): boolean {
  return tier === 'pro' || tier === 'agency'
}

export function getTrialDaysLeft(profile: Profile | null): number {
  if (!profile) return 0
  const end = new Date(profile.trial_ends_at)
  const now = new Date()
  const diff = end.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
