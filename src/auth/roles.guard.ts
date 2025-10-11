import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // This is the payload from the JWT

    // Assuming roles are part of the Auth0 JWT payload, e.g., in a custom claim
    // Example: "https://your-namespace/roles": ["admin", "user"]
    const userRoles = user['https://your-namespace/roles'] || []; 
    
    return userRoles.some((role) => roles.includes(role));
  }
}