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
        [Route("GetPeopleByVillage")]

        public async Task<IActionResult> GetPeopleByVillage()
        {
            try
            {
               int  villageId=Convert.ToInt32(HttpContext.Session.GetInt32("id"));
                string role=HttpContext.Session.GetString("role");
                System.Console.WriteLine(villageId+"  villageid");
               
                var people = await _peopleRepo.GetPeopleByVillage(role,villageId);
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
        public async Task<IActionResult> UpdatePeople([FromBody] PeopleModel people)
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


        [HttpDelete]
        [Route("DeletePeople/{id}")]
        public async Task<IActionResult> DeletePeople(int id)
        {
            try
            {
                var user = await _peopleRepo.DeletePeople(id);
                if (user == 1)
                {
                    return Ok(new { message = "Deleted Successfully" });
                }
                else
                {
                    return BadRequest(new { message = "User not Found" });
                }

            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error in Deleting" + ex.Message });
            }
        }

        [HttpGet]
        [Route("GetCount/{role}/{villageId}")]

        public async Task<IActionResult> GetCount(string role,int villageId)
        {
            try
            {
                var count = await _peopleRepo.GetCount(role,villageId);
                if (count != null)
                {
                    return Ok(new { message = "Count Getting Successfull", Count = count });
                }
                else
                {
                    return BadRequest(new { message = "Not Found" });
                }
            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Not Found" + ex.Message });
            }
        }
    }
}
