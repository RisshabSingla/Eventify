import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private role: 'admin' | 'user' | 'guest' = 'guest'; 

  setRole(role: 'admin' | 'user' | 'guest'): void {
    this.role = role;
  }

  getRole(): 'admin' | 'user' | 'guest' {
    return this.role;
  }
}
