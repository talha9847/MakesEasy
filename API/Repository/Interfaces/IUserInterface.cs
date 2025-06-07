using MakesEasy.Models;

namespace MakesEasy.Interfaces;

public interface IUserInterface
{
    Task<int> UserRegister(UserModel user);
    Task<UserModel> UserLogin(string identifier, string password);

    Task<List<Dictionary<string, object>>> PendingUsers(int villageId);
    Task<List<Dictionary<string, object>>> ApprovedUsers(int villageId);
    Task<List<Dictionary<string, object>>> RejectedUsers(int villageId);

    Task<int> UpdateStatus(int id, string status,string type,int typeId);


    Task<UserModel> GetOne(int id);
}