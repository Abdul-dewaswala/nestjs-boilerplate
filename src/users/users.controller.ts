import { Controller, Get, Request, UseGuards, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Patch('onboarding')
  async updateOnboardingStatus(@Request() req, @Body('onboardingCompleted') onboardingCompleted: boolean) {
    const auth0Id = req.user.sub; // Assuming 'sub' is the Auth0 user ID in the JWT payload
    const user = await this.usersService.findOrCreate(auth0Id, req.user.email); // Assuming email is also in payload
    await this.usersService.updateOnboardingStatus(user.id, onboardingCompleted);
    return { message: 'Onboarding status updated successfully' };
  }

  @Get('admin-data')
  @Roles('admin') // Only users with the 'admin' role can access this endpoint
  getAdminData(@Request() req) {
    return { message: `Welcome admin ${req.user.name}! This is sensitive admin data.` };
  }
}