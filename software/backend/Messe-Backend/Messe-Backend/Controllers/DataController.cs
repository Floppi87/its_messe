using Messe_Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Messe_Backend.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class DataController : ControllerBase
    {
        public DataController()
        {

        }

        [HttpPost("data")]
        public IActionResult Register(PersonData data)
        {
            return Ok(data);
        }
    }
}
