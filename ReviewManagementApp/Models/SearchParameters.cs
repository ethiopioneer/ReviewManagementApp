using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReviewManagementApp.Models
{
    public class SearchParameters
    {
        public bool HasNext { get; set; }
        public bool HasPrevious { get; set; }
        public bool SortByDate { get; set; }
        public bool SortByReviewer { get; set; }
        public bool SortByRating { get; set; }
        public bool SortByTitle { get; set; }
        public bool IsAscending { get; set; }
        public int Page { get; set; }
    }
}
