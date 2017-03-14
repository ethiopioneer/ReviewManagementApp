import { Component, Input } from '@angular/core';
import { IReview } from './shared/review.model'

@Component({
    selector: 'review-item',
    template: require( './review.component.html'),
    styles: [require('./review.component.css')]
})
export class ReviewItemComponent {
    @Input() review: IReview;
}