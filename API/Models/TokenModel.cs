namespace MakesEasy.Models;

public class TokenModel
{
    public int Id { get; set; }
    public int UserId{ get; set; }
    public string Token { get; set; }
    public DateTime expiry { get; set; }
    public bool Used { get; set; }
}