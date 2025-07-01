using MakesEasy.Models;
namespace MakesEasy.Interfaces;
public interface IFourMonthInterface
{
    Task<List<FourMonthModel>> GetCompanions(string role, int roleId);
}