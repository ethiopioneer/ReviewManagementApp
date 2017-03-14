using ReviewManagementApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReviewManagementApp.Services
{
    public interface IReviewService
    {
        void Add(Review review);
        IEnumerable<Review> List();
        SearchResults Search(SearchParameters searchParameters);
    }
}
