using System.Threading.Tasks;
using MakesEasy.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class FourMonthController : ControllerBase
    {
        private readonly IFourMonthInterface _fourMonthReop;
        public FourMonthController(IFourMonthInterface fourMonthRepo)
        {
            _fourMonthReop = fourMonthRepo;
        }

        [HttpGet("GetFourMonth")]
        public async Task<IActionResult> GetCompanions()
        {
            int roleId = Convert.ToInt32(User.Claims.FirstOrDefault(c => c.Type == "id")?.Value);
            var role = Convert.ToString(User.Claims.FirstOrDefault(c => c.Type == "type")?.Value);
            var result = await _fourMonthReop.GetCompanions(role, roleId);
            return Ok(new
            {
                message = "Found Successfully",
                result
            
             });
        }
    }
}
