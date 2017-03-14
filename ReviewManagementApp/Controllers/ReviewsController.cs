using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReviewManagementApp.Models;
using ReviewManagementApp.Services;
using LiteDB;

namespace ReviewManagementApp.Controllers
{
    [Route("api/[controller]")]
    public class ReviewsController : Controller
    {
        private IReviewService _reviewService;

        public ReviewsController(IReviewService reviewService)
        {
            this._reviewService = reviewService;
        }

        [HttpGet("[action]")]
        public IEnumerable<Review> ReviewList()
        {
            return this._reviewService.List();
        }

        [HttpGet("[action]")]
        public SearchResults Search()
        {
            var field = Request.Query["field"].FirstOrDefault();
            var asc = Request.Query["asc"].FirstOrDefault();
            var page = Request.Query["page"].FirstOrDefault();

            var searchParameters = new SearchParameters()
            {
                Page = int.Parse(page),
                HasNext = true,
                HasPrevious = true,
                IsAscending = asc.Equals("1") ,
                SortByDate = field.Equals("date"),
                SortByRating = field.Equals("rating"),
                SortByReviewer = field.Equals("reviewer"),
                SortByTitle = field.Equals("title")
            };
            
            return this._reviewService.Search(searchParameters);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Review request)
        {
            this._reviewService.Add(request);

            return Ok(request);
        }

    }
}
