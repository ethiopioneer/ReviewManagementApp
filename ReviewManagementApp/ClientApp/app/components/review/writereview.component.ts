import { Component } from '@angular/core';
import { ReviewService, IReview } from './shared/index';
import { Router } from '@angular/router';

@Component({
    selector: 'write-review',
    templateUrl: './writereview.component.html',
    styleUrls: ['./writereview.component.css']
})
export class WriteReviewComponent {
    isDirty: boolean = true;

    constructor(private reviewService: ReviewService, private router: Router) {
    }

    save(reviewForm) {
        console.log(reviewForm);

        let review = {
            reviewer : reviewForm.reviewer,
            title: reviewForm.title,
            detail: reviewForm.detail,
            pros: reviewForm.pros,
            cons: reviewForm.cons
        } as IReview;

        if (reviewForm.star1)
            review.rating = 20;
        else if (reviewForm.star2)
            review.rating = 40;
        else if (reviewForm.star3)
            review.rating = 60;
        else if (reviewForm.star4)
            review.rating = 80;
        else if (reviewForm.star5)
            review.rating = 100;
        else
            review.rating = 0;

        this.reviewService.saveReview(review).subscribe(r => {
            this.router.navigate(['/reviews']);
            this.isDirty = false;
        });

    }
}
