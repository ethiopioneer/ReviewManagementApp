import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ReviewListComponent } from './components/review/reviewlist.component';
import { ReviewItemComponent } from './components/review/review.component';
import { WriteReviewComponent } from './components/review/writereview.component';
import { ReviewService } from './components/review/shared/review.service';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        ReviewListComponent,
        ReviewItemComponent,
        WriteReviewComponent
    ],
    providers: [
        ReviewService
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'reviews', pathMatch: 'full' },
            { path: 'reviews', component: ReviewListComponent },
            { path: 'write', component: WriteReviewComponent }, 
            { path: '**', redirectTo: 'reviews' }
        ]),
        HttpModule,
        FormsModule
    ]
})
export class AppModule {
}
