using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AngularDemoProject.Interface
{
    public interface IAttendeesRegistrants
    {
        string FirstName { get; set; }

        string LastName { get; set; }

        string MidName { get; set; }

        int Age { get; set; }

        string EmailAddress { get; set; }
    }
}
