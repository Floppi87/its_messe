using System.Diagnostics.CodeAnalysis;

namespace Messe_Backend.Models
{
    public class PersonData
    {
        public string Surname { get; set; }
        public string Firstname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; } = "";
        public Adress Adress { get; set; }
        public string Picture { get; set; }

    }
}
