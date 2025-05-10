using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

        [HttpPost("SetRoles/{id}/{role}")]
        public IActionResult SetRoles(int id, string role)
        {
            try
            {
                HttpContext.Session.SetString("role", role);
                HttpContext.Session.SetInt32("id", id);
                var roles = HttpContext.Session.GetString("role");
                int ids=Convert.ToInt32(HttpContext.Session.GetInt32("id"));
                System.Console.WriteLine(roles);
                System.Console.WriteLine(ids);


                return Ok(new { message = "Role Setting Successfull" });

            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error :" + ex.Message);
                return BadRequest(new { message = "Error in Setting Role: " + ex.Message });
            }
        }
    }
}
