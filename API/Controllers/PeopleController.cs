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
        [Route("InsertPeoplebd")]
        public async Task<IActionResult> InsertPeople([FromBody] PeopleModel people)
        {
            try
            {
                int vId = Convert.ToInt32(HttpContext.Session.GetInt32("villageId"));
                int tId = Convert.ToInt32(HttpContext.Session.GetInt32("talukaId"));
                int dId = Convert.ToInt32(HttpContext.Session.GetInt32("distId"));
                int sId = Convert.ToInt32(HttpContext.Session.GetInt32("stateId"));
                int cId = Convert.ToInt32(HttpContext.Session.GetInt32("countryId"));
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
                int villageId = Convert.ToInt32(HttpContext.Session.GetInt32("id"));
                string role = HttpContext.Session.GetString("role");

                var people = await _peopleRepo.GetPeopleByVillage(role, villageId);
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
        [Route("GetCount")]

        public async Task<IActionResult> GetCount()
        {
            try
            {
                string role = HttpContext.Session.GetString("role");
                int villageId = Convert.ToInt32(HttpContext.Session.GetInt32("id"));
                var count = await _peopleRepo.GetCount(role, villageId);
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

        [HttpPost("InsertStudent")]
        public async Task<IActionResult> InsertStudent(StudentModel student)
        {
            try
            {
                student.VillageId = Convert.ToInt32(HttpContext.Session.GetInt32("villageId"));
                student.TalukaId = Convert.ToInt32(HttpContext.Session.GetInt32("talukaId"));
                student.DistId = Convert.ToInt32(HttpContext.Session.GetInt32("distId"));
                student.StateId = Convert.ToInt32(HttpContext.Session.GetInt32("stateId"));
                student.CountryId = Convert.ToInt32(HttpContext.Session.GetInt32("countryId"));

                if (student.VillageId == 0 || student.TalukaId == 0 || student.DistId == 0 || student.StateId == 0 || student.CountryId == 0)
                {
                    return BadRequest(new { message = "Session is over" });
                }
                var result = await _peopleRepo.InsertStudent(student);
                if (result == 1)
                {
                    return Ok(new { meessage = "Student Inserted Successfully", success = true });
                }
                else
                {
                    return BadRequest(new { message = "Errrorr in Inserting Student" });
                }
            }
            catch (System.Exception ex)
            {

                return BadRequest(new { message = "Error Found: " + ex.Message });
            }
        }
    }
}
