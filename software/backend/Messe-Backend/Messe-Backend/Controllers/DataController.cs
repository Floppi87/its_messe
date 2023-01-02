using Messe_Backend.Models;
using Messe_Backend.MySQL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Messe_Backend.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private CustomerDB db;
        public DataController()
        {
            this.db= new CustomerDB();
        }

        [HttpPost("data")]
        public IActionResult Register(PersonData data)
        {
            db.RegisterCustomer(data);
            return Ok(data);
        }
    }
}
