using LiteDB;
using System;

namespace ReviewManagementApp.Models
{
    public class Review
    {
        [BsonId]
        public Guid ReviewId { get; set; }
        public string Reviewer { get; set; }
        public DateTime PostDate { get; set; }
        public string Title { get; set; }
        public string Detail { get; set; }
        public string Pros { get; set; }
        public string Cons { get; set; }
        public decimal Rating { get; set; }
    }
  
}
