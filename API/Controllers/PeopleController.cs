using System.Threading.Tasks;
using MakesEasy.Interfaces;
using MakesEasy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPeopleInterface _peopleRepo;

        public PeopleController(IPeopleInterface peopleRepo)
        {
            _peopleRepo = peopleRepo;
        }

        [HttpPost]
        [Route("InsertPeople/{vId}/{tId}/{dId}/{sId}/{cId}")]
        public async Task<IActionResult> InsertPeople([FromBody] PeopleModel people, int vId, int tId, int dId, int sId, int cId)
        {
            try
            {
                var peopels = await _peopleRepo.InsertPeople(people, vId, tId, dId, sId, cId);

                if (peopels == 1)
                {
                    return Ok(new { message = "People Inserted successfully", People = peopels });
                }
                else
                {
                    return BadRequest(new { message = "Error in Inserting People" });
                }

            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error in Inserting" + ex.Message });
            }
        }
        [HttpGet]
        [Route("GetPeopleByVillage/{villageId}")]

        public async Task<IActionResult> GetPeopleByVillage(int villageId)
        {
            try
            {

                var people = await _peopleRepo.GetPeopleByVillage(villageId);
                if (people != null)
                {
                    return Ok(new { message = "Getting Successfull", People = people });
                }
                else
                {
                    return BadRequest(new { message = "Error in GEtting" });
                }
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error in GEtting" + ex.Message });
            }
        }

        [HttpPut]
        [Route("UpdatePeople")]
        public async Task<IActionResult> UpdatePeople([FromBody]PeopleModel people)
        {
            try
            {
                var user = await _peopleRepo.UpdatePeople(people);
                if (user == 1)
                {
                    return Ok(new { message = "People updated successfully" });
                }
                else
                {
                    return BadRequest(new { message = "People Not Found" });
                }
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "People Not Found" + ex.Message });
            }
        }
    }
}
