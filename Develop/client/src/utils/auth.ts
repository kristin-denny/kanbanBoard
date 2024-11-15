import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';


class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const userToken = this.getToken();
    const decodedToken = jwtDecode<UserData>(userToken);
    return decodedToken;
    
  } 

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try{  
    const decodedToken = jwtDecode<JwtPayload>(token);

      if(decodedToken.exp && decodedToken.exp*1000 < Date.now()){
        return true;
      }
    }catch(err){
      return false;
    }

    
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('userToken') || '';
    return loggedUser;
  }

  login(userToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    console.log(userToken);
    localStorage.setItem('userToken', userToken);
    window.location.assign('/');
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('userToken');
    window.location.assign('/');
  }
}

export default new AuthService();
