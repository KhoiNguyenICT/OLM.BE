using System;

namespace Olm.Web.Models
{
    public class ContactViewModel
    {
        public string Fullname { get; set; }
        public DateTime Wasborn { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string ProductName { get; set; }
        public int Amount { get; set; }
        public string Address { get; set; }
        public string UtmCampaign { get; set; }
        public string UtmAdset { get; set; }
        public string UtmAds { get; set; }
        public string UtmAgent { get; set; }
        public string UtmMedium { get; set; }
        public string UtmSource { get; set; }
        public string UtmTeam { get; set; }
        public string Keyword { get; set; }
        public string AdsLink { get; set; }
    }
}