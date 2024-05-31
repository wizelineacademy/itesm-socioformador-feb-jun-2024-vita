export interface UserData {
  idUser: number
  name: string
  email: string
  password: string | null
  phoneNumber: string | null
}

export interface UserAdmin {
  idUser: number
  name: string
  email: string
  password: string | null
  phoneNumber: string | null
  membership: string
  type: string
}

export interface UserPost {
  idUser: number
  name: string
  email: string
  password?: string
  phoneNumber?: string
  username?: string
  profilePhoto?: string
  createdAt: string
  followerId?: number | null
}

export interface Follower {
  idUser: number
  followerId?: number | null
  name: string
  profilePhoto: string
}
