/***************************************************************************************** 
 *** DEPENDENCY INJECTION & SINGLETON PATTERN CONFIGURATION *** 
 ***************************************************************************************** 
 * 
 * 1. WHAT IS THIS FILE? 
 * This is the "Container" or "Composition Root". Its job is to create all objects 
 * (Repositories, Services, Controllers) and connect them together in one place. 
 * 
 * 2. WHY USE SINGLETON PATTERN? 
 * Instead of creating a "new" service for every request, we create only ONE instance 
 * (Singleton) and reuse it. This saves memory (RAM) and improves performance. 
 * 
 * 3. WHY USE DEPENDENCY INJECTION (DI)? 
 * Instead of a Controller creating its own Service, we "Inject" the Service into 
 * the Controller's constructor. 
 * - Benefit: It makes the code "Decoupled" (not tightly locked together). 
 * - Benefit: It makes Testing very easy because we can inject "Mock" objects. 
 * 
 * 4. HOW IT WORKS: 
 * Repo -> Injected into Service -> Injected into Controller -> Exported to Routes. 
 * 
 *****************************************************************************************/ 

/*******************************
 * IMPORT REPOSITORIES, SERVICES, CONTROLLERS
 *******************************/
import { OrganizationRepository } from "./repositories/organization.repository.js"; 
import { OrganizationController } from "./controllers/organization.controller.js"; 
import { OrganizationService } from "./services/organization.service.js"; 

import { AccountRepository } from "./repositories/account.repository.js"; 
import { AccountController } from "./controllers/account.controller.js"; 
import { AccountService } from "./services/account.service.js"; 

import { LocationRepository } from "./repositories/location.repository.js"; 
import { LocationService } from "./services/location.service.js"; 

import { UserService } from "./services/user.service.js"; 
import { UserRepository } from "./repositories/user.repository.js"; 

import { TokenRepository } from "./repositories/token.repository.js"; 

import { AuthService } from "./services/auth.service.js"; 
import { AuthRepository } from "./repositories/auth.repository.js"; 
import { AuthController } from "./controllers/auth.controller.js"; 

import { OtpRepository } from "./repositories/otp.repository.js"; 

/*******************************
 * CREATE SINGLETON INSTANCES
 *******************************/

/***** AUTH *****/
const otpRepository=new OtpRepository();
/***** AUTH *****/
const authRepository = new AuthRepository();
const authService = new AuthService(authRepository);
export const authController = new AuthController(authService);

/***** TOKEN *****/
export const tokenRepository = new TokenRepository();

/***** USER *****/
const userRepo = new UserRepository();
export const userService = new UserService(userRepo);

/***** ACCOUNT *****/
const accountRepo = new AccountRepository();
export const accountService = new AccountService(
  accountRepo,
  userService,
  tokenRepository,
  authService,
  otpRepository
);
export const accountController = new AccountController(accountService);

/***** LOCATION *****/
const locationRepo = new LocationRepository();
export const locationService = new LocationService(locationRepo);

/***** ORGANIZATION *****/
const orgRepo = new OrganizationRepository();
const orgService = new OrganizationService(
  orgRepo,
  accountService,
  locationService
);
export const orgController = new OrganizationController(orgService);

/************************************************************************************************
 * TECHNICAL OBSERVATION (Scalability Note):
 * "Current implementation uses Manual Order-of-Declaration.
 * Dependencies like 'userRepo' must be defined before 'userService'.
 * While highly performant for the current scope, I acknowledge that
 * managing 100+ dependencies manually can become complex, which is
 * where an automated DI Container (Auto-wiring) would be the next logical step."
 ************************************************************************************************/