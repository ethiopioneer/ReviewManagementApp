using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReviewManagementApp.Models
{
    public class SearchResults
    {
        public SearchParameters SearchParameters { get; set; }
        public IList<Review> Reviews { get; set; }

    }
}
