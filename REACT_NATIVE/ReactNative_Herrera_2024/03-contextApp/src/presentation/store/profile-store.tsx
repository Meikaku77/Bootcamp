import { create } from "zustand"


interface ProfileState{
    name: string
    email: string
}

export const useProfileStore = create<ProfileState>()((set, get)=>({
    name: 'Bill Murray',
    email: "billybilly@gmail.com"
}))