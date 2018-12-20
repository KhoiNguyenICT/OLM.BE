using System;
using Microsoft.AspNetCore.Identity;
using Olm.Common.Interfaces;

namespace Olm.Model.Entities
{
    public class AppUser: IdentityUser<Guid>
    {
        public AppUser() { }

        public AppUser(Guid id, string fullName, string email, string phoneNumber, bool isActive, DateTime birthDay)
        {
            Id = id;
            FullName = fullName;
            Phonenumber = phoneNumber;
            IsActive = isActive;
            BirthDay = birthDay;
        }
        public string FullName { get; set; }
        public string Phonenumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime? BirthDay { set; get; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}