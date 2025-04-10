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
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();

                System.Console.WriteLine("connectionn   ");
                var query = "INSERT INTO USERS(fname,lname,email,mobile,password,country,state,dist,taluka,village)values(@fname,@lname,@email,@mobile,@pass,@country,@state,@dist,@taluka,@village)";
                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@fname", user.FirstName);
                    cmd.Parameters.AddWithValue("@lname", user.LastName);
                    cmd.Parameters.AddWithValue("@email", user.Email);
                    cmd.Parameters.AddWithValue("@mobile", user.Mobile);
                    cmd.Parameters.AddWithValue("@pass", user.Password);
                    cmd.Parameters.AddWithValue("@country", user.CountryId);
                    cmd.Parameters.AddWithValue("@state", user.StateId);
                    cmd.Parameters.AddWithValue("@dist", user.DistId);
                    cmd.Parameters.AddWithValue("@taluka", user.TalukaId);
                    cmd.Parameters.AddWithValue("@village", user.VillageId);

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

    public async Task<Dictionary<string, object>> UserLogin(string identifier, string password)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "SELECT fname,lname,email,mobile,role,village FROM users WHERE (email=@identifier OR mobile=@identifier) AND password=@pass";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@identifier", identifier);
                    cmd.Parameters.AddWithValue("@pass", password);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            var user = new Dictionary<string, object>{
                                {"Name",reader.GetString(0) +" "+reader.GetString(1)},
                                {"Email",reader.GetString(2)},
                                {"Mobile",reader.GetString(3)},
                                {"Role",reader.GetString(4)},
                                {"Village",reader.GetInt32(5)}

                            };

                            if (user["Role"].ToString() == "User")
                            {
                                System.Console.WriteLine("User talha");
                            }
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
                                {"no.",reader.GetInt32(0)},
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

    public async Task<int> UpdateStatus(int id, string status)
    {
        try
        {
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = "UPDATE users SET status=@status WHERE id=@id";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@status", status);
                    cmd.Parameters.AddWithValue("@id", id);
                    int row = await cmd.ExecuteNonQueryAsync ();
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




}