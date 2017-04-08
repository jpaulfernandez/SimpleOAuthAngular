using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AngularDemoProject.Interface;

namespace AngularDemoProject.Entities
{
    public class AttendeesRegistrants:IAttendeesRegistrants
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string MidName { get; set; }

        public string FullName
        {
            get { return _fullName; }
        }

        public int Age { get; set; }

        public string EmailAddress { get; set; }

        private string _fullName
        {
            get
            {
                string fName = (FirstName ?? "") + " " + (MidName ?? "") + " " + (LastName ?? "");

                return fName ?? " ";
            }
        }

        
    }

    public class AttendeesRegistrantsDatabase:List<AttendeesRegistrants>
    {
        public AttendeesRegistrantsDatabase()
        {
            Add(new AttendeesRegistrants()
            {
                Id= 1,
                FirstName = "John",
                MidName = "Doe",
                LastName = "Doe",
                Age = 20,
                EmailAddress = "jdoe@gmail.com"
            });
            Add(new AttendeesRegistrants()
            {
                Id = 2,
                FirstName = "Jane",
                MidName = "Doe",
                LastName = "Doe",
                Age = 20,
                EmailAddress = "janedoe@gmail.com"
            });
            Add(new AttendeesRegistrants()
            {
                Id = 3,
                FirstName = "Juan",
                MidName = "Doe",
                LastName = "Doe",
                Age = 20,
                EmailAddress = "juandoe@gmail.com"
            });
        }


    }
}