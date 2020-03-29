import GoogleAuth = gapi.auth2.GoogleAuth
import GoogleUser = gapi.auth2.GoogleUser
import CurrentUser = gapi.auth2.CurrentUser

export interface GoogleService {
  init(): Promise<any>
  signIn(): Promise<GoogleUser>
  signOut(): void
  isSignIn(): Promise<boolean>
  getCurrentGoogleUser(): Promise<GoogleUser>
  getCurrentUser(): Promise<CurrentUser>
}

class GoogleServiceImpl implements GoogleService {
  auth2: GoogleAuth

  constructor() {
    this.auth2 = null
  }

  init() {
    return new Promise(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '298958821124-bpn976c48gqth5prkho0jl8qtb7i88fa.apps.googleusercontent.com',
          scope: 'profile email',
          ux_mode: 'popup'
        })
        resolve()
      })
    })
  }

  signIn() {
    return this.auth2.signIn()
  }

  signOut() {
    this.auth2.signOut()
  }

  async isSignIn() {
    const user = await this.getCurrentGoogleUser()
    return user && user.isSignedIn()
  }

  async getCurrentGoogleUser() {
    return (await this.getCurrentUser()).get()
  }

  async getCurrentUser() {
    return this.auth2.currentUser
  }
}

export function createGoogleService(): GoogleService {
  return new GoogleServiceImpl()
}

export default GoogleService
