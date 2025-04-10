using MakesEasy.Interfaces;
using MakesEasy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {

        private readonly ILocationInterface _locationRepo;

        public LocationController(ILocationInterface locationRepo)
        {
            _locationRepo = locationRepo;
        }

        [HttpGet]
        [Route("GetCountries")]

        public async Task<IActionResult> GetCountries()
        {
            try
            {
                var coun = await _locationRepo.GetCountries();

                if (coun != null)
                {
                    return Ok(new { message = "Getting Successfull", CountryModel = coun });
                }
                else
                {
                    return BadRequest(new { message = "Error " });
                }

            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error " });

            }
        }
        [HttpGet]
        [Route("GetStates/{countryId}")]

        public async Task<IActionResult> GetStates(int countryId)
        {
            try
            {
                var states = await _locationRepo.GetStates(countryId);

                if (states != null)
                {
                    return Ok(new { message = "Getting Successfull", StateModel = states });
                }
                else
                {
                    return BadRequest(new { message = "No states found " });
                }

            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error " });

            }
        }


        [HttpGet]
        [Route("GetDistricts/{stateId}")]

        public async Task<IActionResult> GetDistricts(int stateId)
        {
            try
            {
                var districts = await _locationRepo.GetDistricts(stateId);

                if (districts != null)
                {
                    return Ok(new { message = "Getting Successfull", DistModel = districts });
                }
                else
                {
                    return BadRequest(new { message = "No Districts found " });
                }

            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error " });

            }
        }


        [HttpGet]
        [Route("GetTalukas/{districtId}")]

        public async Task<IActionResult> GetTalukas(int districtId)
        {
            try
            {
                var talukas = await _locationRepo.GetTalukas(districtId);

                if (talukas != null)
                {
                    return Ok(new { message = "Getting Successfull", TalukaModel = talukas });
                }
                else
                {
                    return BadRequest(new { message = "No Talukas found " });
                }

            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error " });

            }
        }




        [HttpGet]
        [Route("GetVillages/{talukaId}")]

        public async Task<IActionResult> GetVillages(int talukaId)
        {
            try
            {
                var villages = await _locationRepo.GetVillages(talukaId);

                if (villages != null)
                {
                    return Ok(new { message = "Getting Successfull", VillageModel = villages });
                }
                else
                {
                    return BadRequest(new { message = "No Villages found " });
                }

            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Error " });

            }
        }
    }
}
