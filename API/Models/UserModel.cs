namespace MakesEasy.Models;

public class UserModel
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
    public string Mobile { get; set; }
    public int CountryId { get; set; }
    public int DistId { get; set; }
    public int StateId { get; set; }
    public int TalukaId { get; set; }
    public int VillageId { get; set; }

}