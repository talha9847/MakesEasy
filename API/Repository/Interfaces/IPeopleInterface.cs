using MakesEasy.Models;

namespace MakesEasy.Interfaces;
public interface IPeopleInterface{
    Task<int> InsertPeople(PeopleModel people,int vId,int tId,int dId,int sId,int cId);

    Task<List<PeopleModel>> GetPeopleByVillage(int villageId);

    Task<int> UpdatePeople(PeopleModel people);


}