import { Record, RecordAuthResponse } from 'pocketbase'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CreateUserType, StoredUser, UserCollectionType } from '../@types/users'
import { USER, USRS_COLLECTION } from '../helpers/keys'
import Settings from '../helpers/settings'
import { SettingsContext, SettingsContextType } from './SettingsContext'
import { StorageContext, StorageContextType } from './StorageContext'





export const AuthContext = createContext<AuthContextType | null>(null)



const AuthProvider = ({ children }:{ children: any}) => {


  const { pb } = Settings()
  const { getSaveData } = useContext(StorageContext) as StorageContextType


  async function authenticate(email: string, password: string) {
    try {
      const authData = await pb.collection(USRS_COLLECTION).authWithPassword(
        email,
        password
      )
      return authData

    } catch (err) {
      return err
    }
  }

  async function createUser(data: CreateUserType) {
    try {
      const user = await pb.collection(USRS_COLLECTION).create(data)
      return user
    }
    catch (err: any) {
      if (err) {
        return err
      }
    }
  }


  async function getStoredUser () {
    const user: StoredUser = await getSaveData(USER)
    return user
  }


  function logout() {
    pb.authStore.clear()
  }


  async function verifyEmail(email: string) {

  }


  async function requestPasswordReset(collection: string, email: string) {

  }


  async function confirmPasswordReset(collection: string, token: string, newPassword: string, confirmNewPassword: string) {

  }


  return (
    <AuthContext.Provider value={{
      authenticate,
      createUser,
      logout,
      getStoredUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider


export type AuthContextType = {
  authenticate(email: string, password: string): Promise<unknown>
  createUser: (data: any) => Promise<unknown>
  logout: () => void
  getStoredUser: () => Promise<StoredUser>
}

