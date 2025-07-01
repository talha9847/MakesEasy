using MakesEasy.Interfaces;
using MakesEasy.Models;
using Npgsql;

namespace MakesEasy.Repo;

public class FourMonthRepo : IFourMonthInterface
{
    private readonly string _connectionString;

    public FourMonthRepo(string connectionString)
    {
        _connectionString = connectionString;
    }

    public async Task<List<FourMonthModel>> GetCompanions(string role, int roleId)
    {
        try
        {
            var columnMap = new Dictionary<string, string>{
                    {"village_id","village_id"},
                    {"taluka_id","taluka_id"},
                    {"dist_id","dist_id"}
            };
            if (!columnMap.ContainsKey(role))
            {
                return null;
            }

            string columnName = columnMap[role];
            var CompanionList = new List<FourMonthModel>();
            using (var conn = new NpgsqlConnection(_connectionString))
            {
                await conn.OpenAsync();
                var query = $"SELECT p.id,p.name,GREATEST(COUNT(d.id),1) AS Total, COALESCE(MAX(d.date),DATE '1111-11-11') As LastTime FROM people p  LEFT JOIN fourmonthsdata d ON p.id=d.peopleid WHERE p.waqt='4 Month' AND p.{columnName}=@id GROUP BY p.id ORDER BY COUNT(d.id) DESC";

                using (var cmd = new NpgsqlCommand(query, conn))
                {
                    cmd.Parameters.AddWithValue("@id", roleId);
                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            var comp = new FourMonthModel
                            {
                                Id = reader.GetInt32(0),
                                Name = reader.GetString(1),
                                Total = reader.GetInt32(2),
                                LastTime=DateOnly.FromDateTime(reader.GetDateTime(3))
                            };
                            CompanionList.Add(comp);
                        }
                    }
                }
            }
            return CompanionList;

        }
        catch (System.Exception ex)
        {

            System.Console.WriteLine("Error: " + ex.Message);
            return null;
        }
    }
}