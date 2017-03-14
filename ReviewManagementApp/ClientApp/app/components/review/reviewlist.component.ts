import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { ReviewService } from './shared/index'
import { IReview } from './shared/index'

@Component({
    selector: 'review-list',
    templateUrl: './reviewlist.component.html',
    styleUrls: ['./reviewlist.component.css']
})
export class ReviewListComponent implements OnInit {
    public reviews: IReview[];
    private errorMessage: string;

    constructor(private reviewService: ReviewService) {
    }

    ngOnInit(): void  {
        this.reviewService.getReviews().subscribe(
            reviews => this.reviews = reviews as IReview[] ,
            error => this.errorMessage = error as any
        )
    }

    sortByDate() {
        this.reviewService.sort("date").subscribe(
            reviews => this.reviews = reviews as IReview[],
            error => this.errorMessage = error as any
        )
    }

    sortByReviewer() {
        this.reviewService.sort("reviewer").subscribe(
            reviews => this.reviews = reviews as IReview[],
            error => this.errorMessage = error as any
        )
    }

    sortByTitle() {
        this.reviewService.sort("title").subscribe(
            reviews => this.reviews = reviews as IReview[],
            error => this.errorMessage = error as any
        )
    }

    sortByRating() {
        this.reviewService.sort("rating").subscribe(
            reviews => this.reviews = reviews as IReview[],
            error => this.errorMessage = error as any
        )
    }

    getPreviousPage() {
        this.reviewService.paging("previous").subscribe(
            reviews => this.reviews = reviews as IReview[],
            error => this.errorMessage = error as any
        )
    }

    getNextPage() {
        this.reviewService.paging("next").subscribe(
            reviews => this.reviews = reviews as IReview[],
            error => this.errorMessage = error as any
        )
    }


}
