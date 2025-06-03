// src/app/app.routes.ts
import { Routes } from '@angular/router';

// Import all components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { HomeComponent } from './home/home.component';
import { TranslateDescriptionComponent } from './translate-description/translate-description.component';
import { TextToSpeechComponent } from './text-to-speech/text-to-speech.component'; // Import TextToSpeechComponent
import { GenerativeAiComponent } from './generative-ai/generative-ai.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { LogoutComponent } from './logout/logout.component';


// Define the routes and export them
export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]}, // Default route to Home
  { path: 'header', component: HeaderComponent , canActivate: [AuthGuard] },
  { path: 'footer', component: FooterComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-driver', component: AddDriverComponent, canActivate: [AuthGuard] },
  { path: 'list-drivers', component: ListDriversComponent, canActivate: [AuthGuard] },
  { path: 'delete-driver', component: DeleteDriverComponent, canActivate: [AuthGuard] },
  { path: 'update-driver', component: UpdateDriverComponent , canActivate: [AuthGuard]},
  { path: 'add-package', component: AddPackageComponent , canActivate: [AuthGuard]},
  { path: 'list-packages', component: ListPackagesComponent , canActivate: [AuthGuard]},
  { path: 'delete-package', component: DeletePackageComponent, canActivate: [AuthGuard] },
  { path: 'update-package', component: UpdatePackageComponent , canActivate: [AuthGuard]},
  { path: 'translate-description', component: TranslateDescriptionComponent, canActivate: [AuthGuard] },
  { path: 'text-to-speech', component: TextToSpeechComponent, canActivate: [AuthGuard] }, // Add TextToSpeechComponent route
  { path: 'generative-ai', component: GenerativeAiComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent , canActivate: [AuthGuard]},
  {path: 'logout' , component:LogoutComponent, canActivate: [AuthGuard] },
  { path: 'invalid-data', component: InvalidDataComponent },
  { path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page
];
