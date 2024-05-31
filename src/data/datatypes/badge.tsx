export interface Badge {
  idBadge: number
  name: string
  description: string
}

export interface UserBadge {
  idUserBadges: number
  userId: number
  badgeId: number
}
