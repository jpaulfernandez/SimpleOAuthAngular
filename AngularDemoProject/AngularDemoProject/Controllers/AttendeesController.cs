using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AngularDemoProject.Entities;
using AngularDemoProject.Interface;

namespace AngularDemoProject.Controllers
{
    [RoutePrefix("api/attendees")]
    public class AttendeesController : ApiController
    {

        private static AttendeesRegistrantsDatabase _attendeesList;

        public AttendeesController()
        {
            if(_attendeesList == null)
            _attendeesList = new AttendeesRegistrantsDatabase();
        }

        [Route("attendees")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            return Ok(_attendeesList);
        }

        [Route("attendees")]
        [HttpPost]
        public IHttpActionResult Post([FromBody] AttendeesRegistrants attendees)
        {
            Random rand = new Random();
            attendees.Id = rand.Next(4, 1000);
            _attendeesList.Add(attendees);
            return Ok();
        }

        [Route("attendees")]
        [HttpPut]
        public IHttpActionResult Put([FromBody] AttendeesRegistrants attendees)
        {
            var objToUpdate = _attendeesList.FirstOrDefault(x => x.Id == attendees.Id);
            if (objToUpdate != null)
            {
                objToUpdate.FirstName = attendees.FirstName;
                objToUpdate.MidName = attendees.MidName;
                objToUpdate.LastName = attendees.LastName;
                objToUpdate.Age = attendees.Age;
                objToUpdate.EmailAddress = attendees.EmailAddress;
            }
            return Ok();
        }

        [Route("attendees")]
        [HttpDelete]
        public IHttpActionResult Delete([FromBody]AttendeesRegistrantDto attendeesId)
        {
            _attendeesList.RemoveAll(x => x.Id == attendeesId.Id);
            return Ok();
        }

        
    }

}