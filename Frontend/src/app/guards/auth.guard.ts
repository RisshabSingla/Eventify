import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private navbarService: NavbarService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.navbarService.getRole();

    if (userRole !== 'guest') {
      return true;
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
