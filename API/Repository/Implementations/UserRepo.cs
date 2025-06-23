using System.ComponentModel;
using System.Data;
using MakesEasy.Interfaces;
using MakesEasy.Models;
using Npgsql;

namespace MakesEasy.Repo;

public class UserRepo : IUserInterface
{

    private readonly string _connectionString;

    public UserRepo(string connectionString)
    {
        _connectionString = connectionString;
    }
    public async Task<int> UserRegister(UserModel user)
    {
        try
        {
            if (user.ConfirmPassword != user.Password)
            {
                return 0;
            }
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var querry = "SELECT 1 FROM users WHERE email=@email OR mobile=@mobile";
                using (var cmd = new NpgsqlCommand(querry, conn))
                {
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@mobile", user.Mobile);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            return 2;
                        }
                    }
                }

                var query = "INSERT INTO USERS(fname,lname,email,mobile,password,country,state,dist,taluka,village,role)values(@fname,@lname,@email,@mobile,@pass,@country,@state,@dist,@taluka,@village,@role)";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@fname", user.FirstName);
                    cmd.Parameters.AddWithValue("@lname", user.LastName);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@mobile", user.Mobile);
                    var hashedPass = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    cmd.Parameters.AddWithValue("@pass", hashedPass);
                    cmd.Parameters.AddWithValue("@country", user.CountryId);
                    cmd.Parameters.AddWithValue("@state", user.StateId);
                    cmd.Parameters.AddWithValue("@dist", user.DistId);
                    cmd.Parameters.AddWithValue("@taluka", user.TalukaId);
                    cmd.Parameters.AddWithValue("@village", user.VillageId);
                    cmd.Parameters.AddWithValue("@role", user.Role);

                    int row = await cmd.ExecuteNonQueryAsync();
                    if (row == 1)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }

        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return -1;
        }
    }

    public async Task<UserModel> UserLogin(string identifier, string password)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id,role,password FROM users WHERE (email=@identifier OR mobile=@identifier)  AND status='Approved'";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@identifier", identifier);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var hashedPass = reader.GetString(2);
                            bool verified = BCrypt.Net.BCrypt.Verify(password, hashedPass);
                            if (!verified)
                            {
                                return null;
                            }
                            return new UserModel
                            {
                                Id = reader.GetInt32(0),
                                Role = reader.GetString(1),
                                Password = null
                            };
                        }
                    }
                }
            }
            return null;

        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return null;

        }
    }

    public async Task<List<Dictionary<string, object>>> PendingUsers(int villageId)
    {
        try
        {
            var Users = new List<Dictionary<string, object>>();
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id,fname,lname,mobile,status,email FROM users WHERE role='User' AND status='Pending' AND village=@id";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", villageId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new Dictionary<string, object>{
                                {"id",reader.GetInt32(0)},
                                {"name",reader.GetString(1)+ " "+reader.GetString(2)},
                                {"mobile",reader.GetString(3)},
                                {"status",reader.GetString(4)},
                                {"email",reader.GetString(5)}
                                // {"villageId",reader.GetInt32(5)}
                            };
                            Users.Add(user);
                        }
                    }
                }
            }

            return Users;

        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return null;
        }
    }


    public async Task<List<Dictionary<string, object>>> ApprovedUsers(int villageId)
    {
        try
        {
            var users = new List<Dictionary<string, object>>();
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id,fname,lname,mobile,status,email FROM users  WHERE role = 'User' AND status = 'Approved' AND village = @id ORDER BY id;";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", villageId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new Dictionary<string, object>{
                                {"id",reader.GetInt32(0)},
                                {"name",reader.GetString(1)+" "+reader.GetString(2)},
                                {"mobile",reader.GetString(3)},
                                {"status",reader.GetString(4)},
                                {"email",reader.GetString(5)}
                            };
                            users.Add(user);

                        }
                    }
                }
            }
            return users;

        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine("Error: " + ex.Message);
            return null;
        }
    }



    public async Task<List<Dictionary<string, object>>> RejectedUsers(int villageId)
    {
        try
        {
            var users = new List<Dictionary<string, object>>();
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id,fname,lname,mobile,status,email FROM users  WHERE role = 'User' AND status = 'Rejected' AND village = @id ORDER BY id;";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", villageId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var user = new Dictionary<string, object>{
                                {"id",reader.GetInt32(0)},
                                {"name",reader.GetString(1)+" "+reader.GetString(2)},
                                {"mobile",reader.GetString(3)},
                                {"status",reader.GetString(4)},
                                {"email",reader.GetString(5)}
                            };
                            users.Add(user);

                        }
                    }
                }
            }
            return users;

        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine("Error: " + ex.Message);
            return null;
        }
    }

    public async Task<int> UpdateStatus(int id, string status, string type, int typeId)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var allowedColumns = new HashSet<string> { "village", "taluka", "dist" };
                if (!allowedColumns.Contains(type))
                {
                    return -1;
                }
                var query = $"UPDATE users SET status=@status WHERE id=@id AND {type}=@typeId ";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@status", status);
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@typeId", typeId);
                    int row = cmd.ExecuteNonQuery();
                    if (row == 1)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }


                }
            }
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine("Error: " + ex.Message);
            return -1;
        }
    }



    public async Task<UserModel> GetOne(int id)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                var query = "SELECT fname,lname,email,mobile,village,taluka,dist,state,country,role FROM users WHERE id=@id";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var user = new UserModel
                            {
                                FirstName = reader.GetString(0),
                                LastName = reader.GetString(1),
                                Email = reader.GetString(2),
                                Mobile = reader.GetString(3),
                                VillageId = reader.GetInt32(4),
                                TalukaId = reader.GetInt32(5),
                                DistId = reader.GetInt32(6),
                                StateId = reader.GetInt32(7),
                                CountryId = reader.GetInt32(8),
                                Role = reader.GetString(9),

                            };
                            return user;
                        }

                    }
                }
            }

            return null;
        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return null;
        }
    }

    public async Task<int> GetUserByEmail(string email)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT id FROM users WHERE email=@email";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@email", email);

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        int Id = 0;

                        if (await reader.ReadAsync())
                        {
                            Id = reader.GetInt32(0);

                        }
                        if (Id != 0)
                        {
                            return Id;
                        }
                    }
                }
            }
            return 0;

        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return 0;
        }
    }

    public async Task<int> TokenData(int id, string token, DateTime expiry)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                var query = "INSERT INTO TokenData(userid,token,expiration)VALUES(@id,@token,@expiration)";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    cmd.Parameters.AddWithValue("@token", token);
                    cmd.Parameters.AddWithValue("@expiration", expiry);

                    int row = await cmd.ExecuteNonQueryAsync();
                    if (row == 1)
                    {
                        return 1;
                    }
                }
            }
            return 0;
        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return -1;
        }
    }

}