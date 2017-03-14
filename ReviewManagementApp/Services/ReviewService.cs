using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReviewManagementApp.Models;
using LiteDB;

namespace ReviewManagementApp.Services
{
    public class ReviewService : IReviewService
    {
        public ReviewService()
        {

        }

        public void Add(Review review)
        {
            using (var db = new LiteDatabase(@"ReviewManagement.db"))
            {
                review.ReviewId = Guid.NewGuid();
                review.PostDate = DateTime.Now;

                var col = db.GetCollection<Review>("Review");
                // insert 

                col.Insert(review);
            }

        }

        public IEnumerable<Review> List()
        {
            // Open database (or create if not exits)
            using (var db = new LiteDatabase(@"ReviewManagement.db"))
            {
                // Get review collection
                var reviews = db.GetCollection<Review>("Review");

                // Use Linq to query documents
                //var results = reviews.FindAll().OrderByDescending(x => x.PostDate).ToList();
                var results = Search(new SearchParameters()
                {
                    IsAscending = false,
                    SortByReviewer = true,
                    SortByDate = false,
                    SortByRating = false,
                    SortByTitle = false,
                    Page = 2
                });

                return results.Reviews;
            }
        }

        public SearchResults Search(SearchParameters searchParameters)
        {
            using (var db = new LiteDatabase(@"ReviewManagement.db"))
            {
                // Get review collection
                var reviews = db.GetCollection<Review>("Review");

                // Use Linq to query documents
                var query = reviews.FindAll();

                var results = sortQuery(query, searchParameters);

                var total = results.Select(p => p.ReviewId).Count();

                var pageSize = 5; 

                var page = searchParameters.Page; // set current page number, must be >= 1

                var skip = pageSize * (page - 1);

                searchParameters.HasPrevious = page > 1;
                searchParameters.HasNext = total > (pageSize * page);
                
                var canPage = skip < total;

                if (!canPage) // do what you wish if you can page no further
                {
                    return new SearchResults()
                    {
                        SearchParameters = searchParameters,
                        Reviews = new List<Review>()
                    };
                }

                return new SearchResults()
                {
                    SearchParameters = searchParameters,
                    Reviews = results.Skip(skip).Take(pageSize).ToList()
                };
                
            }
        }

        private IEnumerable<Review> sortQuery(IEnumerable<Review> query, SearchParameters searchParameters)
        {

            if (searchParameters.SortByRating)
            {
                if (searchParameters.IsAscending)
                    return query.OrderBy(x => x.Rating);
                else
                    return query.OrderByDescending(x => x.Rating);
            }

            if (searchParameters.SortByReviewer)
            {
                if (searchParameters.IsAscending)
                    return query.OrderBy(x => x.Reviewer);
                else
                    return query.OrderByDescending(x => x.Reviewer);
            }

            if (searchParameters.SortByTitle)
            {
                if (searchParameters.IsAscending)
                    return query.OrderBy(x => x.Title);
                else
                    return query.OrderByDescending(x => x.Title);
            }

            if (searchParameters.IsAscending)
                return query.OrderBy(x => x.PostDate);
            else
                return query.OrderByDescending(x => x.PostDate);
        }
    }
}
