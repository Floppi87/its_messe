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

        //Post Endpunkt "data" mit ein Kunde Regestiert werden kann
        [HttpPost("data")]
        public IActionResult Register(PersonData data)
        {
            try
            {
                db.RegisterCustomer(data);
                return Ok(data);
            }
            catch(Exception ex) {
                return BadRequest(ex.Message);
            }
            
        }

        //Get Endpunkt "products" um die verfügbaren Produkte abzurufen
        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            try
            {
                List<Product> products = db.GetProducts();
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            
        }

        //Get Endpunkt "customers" um die Regestrierten Kunden abzurufen.
        [HttpGet("customers")]
        public IActionResult GetCustomers()
        {
            try
            {
                List<PersonData> personDatas = db.GetPersonDatas();
                return Ok(personDatas);
            } 
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Get Endpunkt um die offline und Online Datenbank zu Syncronisieren 
        [HttpGet("sync")]
        public IActionResult Sync()
        {
                if (db.SyncDatabases())
                    return Ok();
                else
                    return BadRequest("Sync Failed ");
            } 
        }
    }
