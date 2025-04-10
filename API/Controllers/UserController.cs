using System.Threading.Tasks;
using MakesEasy.Interfaces;
using MakesEasy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface _userRepo;
        private readonly ILocationInterface _locationRepo;
        public UserController(IUserInterface userRepo, ILocationInterface locationRepo)
        {
            _userRepo = userRepo;
            _locationRepo = locationRepo;
        }


        [Route("Register")]
        [HttpPost]

        public async Task<IActionResult> Register(UserModel user)
        {
            try
            {
                var entry = await _userRepo.UserRegister(user);
                if (entry == 1)
                {
                    return Ok(new { message = "User REgister successfull" });
                }
                else
                {
                    return BadRequest(new { message = "Error" });
                }
            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error :" + ex.Message);
                return BadRequest(new { message = "Error" });

            }
        }

        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult> Login([FromBody] Dictionary<string, string> body)
        {
            try
            {
                string identifier = body["identifier"];
                string password = body["password"];
                var user = await _userRepo.UserLogin(identifier, password);

                if (user != null)
                {
                    return Ok(new { message = "Login sucessfull", UserDetail = user, Role = user["Role"].ToString() });
                }
                else
                {
                    return BadRequest(new { message = "No user Found" });
                }
            }
            catch (System.Exception ex)
            {

                System.Console.WriteLine("Error :" + ex.Message);
                return BadRequest(new { message = "Some error occured:  " + ex.Message });
            }
        }

        [HttpGet]
        [Route("PendingUser/{villageId}")]
        public async Task<IActionResult> PendingUser(int villageId)
        {
            try
            {
                var pendingUser = await _userRepo.PendingUsers(villageId);
                var approvedUser = await _userRepo.ApprovedUsers(villageId);
                var rejectedUser = await _userRepo.RejectedUsers(villageId);

                if (pendingUser != null || approvedUser != null || rejectedUser != null)
                {
                    return Ok(new { message = "Pending Users are fetched", Pending = pendingUser, Approved = approvedUser, Rejected = rejectedUser });
                }
                else
                {
                    return BadRequest(new { message = "No Pending Users found" });
                }

            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error: " + ex.Message });
            }
        }

        // [HttpGet]
        // [Route("ApprovedUsers/{villageId}")]

        // public async Task<IActionResult> ApprovedUser(int villageId)  
        // {
        //     try
        //     {
        //         var users = await _userRepo.ApprovedUsers(villageId);
        //         if (users != null)
        //         {
        //             return Ok(new { message = "Approved fetched", User = users });
        //         }
        //         else
        //         {
        //             return Ok(new { message = "No user found" });
        //         }

        //     }
        //     catch (System.Exception ex)
        //     {
        //         System.Console.WriteLine("Error: " + ex.Message);
        //         return BadRequest(new { message = "Error: " + ex.Message });
        //     }
        // }


        // [HttpGet]
        // [Route("RejectedUsers/{villageId}")]

        // public async Task<IActionResult> RejectedUser(int villageId)
        // {
        //     try
        //     {
        //         var users = await _userRepo.RejectedUsers(villageId);
        //         if (users != null)
        //         {
        //             return Ok(new { message = "Rejected fetched", User = users });
        //         }
        //         else
        //         {
        //             return Ok(new { message = "No user found" });
        //         }

        //     }
        //     catch (System.Exception ex)
        //     {
        //         System.Console.WriteLine("Error: " + ex.Message);
        //         return BadRequest(new { message = "Error: " + ex.Message });
        //     }
        // }

        [HttpPut]
        [Route("UpdateStatus/{id}/{status}")]
        public async Task<IActionResult> UpdateUser(int id,string status){
            try
            {
                var stat=await _userRepo.UpdateStatus(id,status);
                if(stat==1){
                    return Ok(new{sucess=true,message="Updated Successfully"});
                }
                if(stat==0){
                    return Ok(new{success=false,message="No rows affected"});
                }
                else{
                    return BadRequest(new{success=false,message="No task Found"});
                }
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: "+ex.Message);
                return BadRequest(new{success=false,message="Error: "+ex.Message});
            }
        }

    }
}
