using System.Threading.Tasks;
using MakesEasy.Interfaces;
using MakesEasy.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MakesEasy.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserInterface _userRepo;
        private readonly JwtService _jwtService;
        private readonly EmailService _emailService;

        private readonly ILocationInterface _locationRepo;
        private readonly IConfiguration _config;
        public UserController(IUserInterface userRepo, ILocationInterface locationRepo, JwtService jwtService, IConfiguration config, EmailService emailService)
        {
            _userRepo = userRepo;
            _locationRepo = locationRepo;
            _jwtService = jwtService;
            _config = config;
            _emailService = emailService;
        }


        [Route("Register")]
        [HttpPost]

        public async Task<IActionResult> Register(UserModel user)
        {
            try
            {
                if (user.Password != user.ConfirmPassword)
                {
                    return Conflict(new { message = "Some thing is wrong buddy" });
                }
                user.Role = "User";
                var entry = await _userRepo.UserRegister(user);
                // var entry = 1;
                if (entry == 1)
                {
                    return Ok(new { message = "User REgister successfull" });
                }
                if (entry == 2)
                {
                    return StatusCode(356, new { message = "Email Or Mobile Number Already Exist" });
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

        public async Task<IActionResult> Login([FromForm] string identifier, [FromForm] string password)
        {
            try
            {

                var user = await _userRepo.UserLogin(identifier, password);


                if (user != null)
                {

                    var token = _jwtService.GenerateTempToken(user.Id);

                    return Ok(new { message = "Login sucessfull", success = true, Token = token, Role = user.Role.ToString() });
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
        [HttpPost("SetScope")]
        public async Task<IActionResult> SetScope([FromForm] string role, [FromForm] string tempToken)
        {
            try
            {
                string[] validRole = new string[5];
                var validRo = new[] { "User", "Admin1", "Admin2", "Admin3" };
                if (!validRo.Contains(role))
                {
                    return BadRequest(new { message = "Invalid Roles" });
                }


                var handler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]);

                var principal = handler.ValidateToken(tempToken, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero,
                    ValidateLifetime = true
                }, out SecurityToken validatedToken);


                var token = validatedToken as JwtSecurityToken;

                var typeClaim = token.Claims.FirstOrDefault(c => c.Type == "type")?.Value;
                if (typeClaim != "temporary")
                {
                    return BadRequest(new { message = "Inavalid Token    " });

                }
                var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

                if (string.IsNullOrEmpty(userIdClaim))
                {
                    return BadRequest(new { message = "Invalid request" });
                }

                var userId = int.Parse(userIdClaim);

                var user = await _userRepo.GetOne(userId);
                if (user.Role == "Admin2")
                {
                    validRole[0] = "Admin1";
                    validRole[1] = "Admin2";
                    if (!validRole.Contains(role))
                    {
                        return BadRequest(new { message = "Unexpected errror" });
                    }
                    else
                    {
                        user.Role = role;
                    }
                }
                else if (user.Role == "Admin3")
                {
                    validRole[0] = "Admin1";
                    validRole[1] = "Admin2";
                    validRole[2] = "Admin3";
                    if (!validRole.Contains(role))
                    {
                        return BadRequest(new { message = "Unexpected errror" });
                    }
                    else
                    {
                        user.Role = role;
                    }
                }
                else
                {
                    user.Role = role;
                }

                var authToken = _jwtService.GenerateJwtToken(user);

                HttpContext.Response.Cookies.Append("AuthToken", authToken, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(30)
                });

                if (user != null)
                {
                    return Ok(new { message = "Login Successfull", UserDetail = user, AuthToken = authToken });
                }

                else
                {
                    return BadRequest(new { message = "Sorry there was an error" });
                }

            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { message = "Sorry :" });
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {

                var villageClaim = User.Claims.FirstOrDefault(c => c.Type == "id");
                var typeClaim = User.Claims.FirstOrDefault(c => c.Type == "type")?.Value;
                if (typeClaim != "village_id")
                {
                    return Ok(new { message = "This is not a bad news", Pending = new object[] { }, Approved = new object[] { }, Rejected = new object[] { } });
                }

                if (villageClaim == null || string.IsNullOrEmpty(villageClaim.Value))
                {
                    return BadRequest(new { message = "VillageId claim is missing or invalid." });
                }

                int villageId = int.Parse(villageClaim.Value);
                var pendingUser = await _userRepo.PendingUsers(villageId);
                var approvedUser = await _userRepo.ApprovedUsers(villageId);
                var rejectedUser = await _userRepo.RejectedUsers(villageId);

                if (pendingUser != null || approvedUser != null || rejectedUser != null)
                {
                    return Ok(new { message = "All type of Users are fetched", Pending = pendingUser, Approved = approvedUser, Rejected = rejectedUser });
                }
                else
                {
                    return BadRequest(new { message = "No Pending Users found" });
                }

            }
            catch (System.Exception ex)
            {
                return BadRequest(new { message = "Error:  " + ex.Message });
            }
        }



        [HttpPatch]
        [Route("UpdateStatus/{id}/{status}")]
        public async Task<IActionResult> UpdateUser(int id, string status)
        {
            try
            {
                string type = User.Claims.FirstOrDefault(c => c.Type == "type")?.Value;
                string claimTypeId = User.Claims.FirstOrDefault(c => c.Type == "id")?.Value;

                if (type == "village_id")
                {
                    type = "village";
                }

                else if (type == "taluka_id")
                {
                    type = "taluka";
                }

                else if (type == "dist_id")
                {
                    type = "dist";
                }
                int typeId = int.Parse(claimTypeId);
                var stat = await _userRepo.UpdateStatus(id, status, type, typeId);
                if (stat == 1)
                {
                    return Ok(new { sucess = true, message = "Updated Successfully" });
                }
                if (stat == 0)
                {
                    return Ok(new { success = false, message = "No rows affected" });
                }
                else
                {
                    return BadRequest(new { success = false, message = "No task Found" });
                }
            }
            catch (System.Exception ex)
            {
                System.Console.WriteLine("Error: " + ex.Message);
                return BadRequest(new { success = false, message = "Error: " + ex.Message });
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> SendEmail(string email)
        {
            int Id = await _userRepo.GetUserByEmail(email);
            if (Id == 0)
            {
                return Ok(new { message = "If Email is Ok then email has been sent" });
            }
            var token = Guid.NewGuid().ToString();
            var expiry = DateTime.UtcNow.AddMinutes(30);

            var setData = await _userRepo.TokenData(Id, token, expiry);
            if (setData != 1)
            {
                return StatusCode(500, new { message = "Error while generating token." });

            }
                var resetLink = $"http://localhost:5173/reset-password?token={token}";


            await _emailService.SendEmail(email, "Reset Your Password", resetLink);

            return Ok(new { message = "If this email exists, a reset link has been sent." });

        }


        [HttpPost("UpdatePassword")]
        public IActionResult UpdatePassword()
        {
            var expiry = DateTime.UtcNow.AddMinutes(30);
            return Ok(new { message = "Lkkjlkj ", expiry });
        }

    }
}
