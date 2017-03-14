import { Http, Response, Headers, Request, RequestOptions, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';
import { IReview } from './review.model';
import { SearchParameters } from './search.parameters.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReviewService 
{
    headers: Headers;
    options: RequestOptions;
    searchParameters: SearchParameters = new SearchParameters( );

    constructor(private http: Http) {

        this.searchParameters = {
            hasNext : true,
            hasPrevious : false,  
            sortByDate : true,
            sortByReviewer : false,
            sortByTitle : false,
            sortByRating : false,
            isAscending : false,
            page: 1,
            pageCount: 1
        };
        

        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9'
        });

        this.options = new RequestOptions({ headers: this.headers });

    }

    getCurrentPage() {
        return this.searchParameters.page;
    }

    getPageCount() {
        return this.searchParameters.pageCount;
    }

    getReviews(): Observable<IReview[]> {
        let params: URLSearchParams = new URLSearchParams();

        params.set("field", "date");
        params.set("asc", this.searchParameters.isAscending == true ? "1" : "0");
        params.set("page", this.searchParameters.page.toString());

        this.options = new RequestOptions({ headers: this.headers, search: params });

        return this.http.get('/api/Reviews/search', 
            this.options).map((response: Response) => {
                let params = response.json().searchParameters as SearchParameters;

                this.searchParameters.hasNext = params.hasNext;
                this.searchParameters.hasPrevious = params.hasPrevious;
                this.searchParameters.page = params.page;
                this.searchParameters.pageCount = params.pageCount;

                return response.json().reviews as IReview[];
            })
            .do(data => console.log('ALL : ' + JSON.stringify(data)))
            .catch(this.handleError);

    }

    paging(value: string): Observable<IReview[]> {

        let field: string;

        if (this.searchParameters.sortByTitle == true)
            field = "title";
        else if (this.searchParameters.sortByReviewer == true)
            field = "reviewer";
        else if (this.searchParameters.sortByRating == true)
            field = "rating";
        else
            field = "date";

        if (value == "previous" && this.searchParameters.page > 1)
            this.searchParameters.page--;
        else
            this.searchParameters.page++;

        let params: URLSearchParams = new URLSearchParams();

        params.set("field", field);

        params.set("asc", this.searchParameters.isAscending == true ? "1" : "0");
        params.set("page", this.searchParameters.page.toString());

        this.options = new RequestOptions({ headers: this.headers, search: params });

        return this.http.get('/api/Reviews/search',
            this.options).map((response: Response) => {
                let params = response.json().searchParameters as SearchParameters;

                this.searchParameters.hasNext = params.hasNext;
                this.searchParameters.hasPrevious = params.hasPrevious;
                this.searchParameters.page = params.page;
                this.searchParameters.pageCount = params.pageCount;

                return response.json().reviews as IReview[];
            })
            .do(data => console.log('ALL : ' + JSON.stringify(data)))
            .catch(this.handleError);

    }

    sort(sortBy: string): Observable<IReview[]> {
        this.searchParameters.isAscending = !this.searchParameters.isAscending;

        let params: URLSearchParams = new URLSearchParams();

        params.set("field", sortBy);
        params.set("asc", this.searchParameters.isAscending == true ? "1" : "0");
        params.set("page", this.searchParameters.page.toString());
  
        this.options = new RequestOptions({ headers: this.headers, search: params });

        return this.http.get('/api/Reviews/search',
            this.options).map((response: Response) => {
                let params = response.json().searchParameters as SearchParameters;

                this.searchParameters.hasNext = params.hasNext;
                this.searchParameters.hasPrevious = params.hasPrevious;
                this.searchParameters.page = params.page;
                this.searchParameters.pageCount = params.pageCount;

                return response.json().reviews as IReview[];
            })
            .do(data => console.log('ALL : ' + JSON.stringify(data)))
            .catch(this.handleError);

    }
    sortedByDate(): boolean {
        return this.searchParameters.sortByDate;
    }

    sortedByReviewer(): boolean {
        return this.searchParameters.sortByReviewer;
    }

    sortedByTitle(): boolean {
        return this.searchParameters.sortByTitle;
    }

    sortedByRating(): boolean {
        return this.searchParameters.sortByRating;
    }

    hasNext(): boolean {
        return this.searchParameters.hasNext;
    }

    hasPrevious(): boolean {
        return this.searchParameters.hasPrevious;
    }



    saveReview(review: IReview): Observable<IReview> {
        console.log(review);

        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        let options = new RequestOptions({ headers: headers });

        return this.http.post('/api/Reviews', JSON.stringify(review),
            options).map((response: Response) => {
                return response.json() as IReview;
            }).catch(this.handleError);
    }

    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error || 'Server Error');
    }

}
