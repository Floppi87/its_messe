using Messe_Backend.Models;
using MySql.Data.MySqlClient;
using System.Buffers.Text;

namespace Messe_Backend.MySQL
{
    public class CustomerDB
    {

        private readonly string _dbUser;
        private readonly string _dbPassword;
        private readonly string _dbName;
        private readonly string _dbIp;

        public CustomerDB()
        {
            this._dbUser = "its_messe";
            this._dbName = "messe";
            this._dbIp = "ks.kivitas.de";
            this._dbPassword = "ICF!U0jlWNapKj.L";
        }

        public void RegisterCustomer(PersonData personData)
        {
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            string sql = "INSERT INTO customers (Surname, Firstname, Email, Phone, Street, Housenumber, City, Postcode, Picture) VALUES (@surname, @firstname, @email, @phone, @street, @housenr, @city, @postcode, @picture)";
            Dictionary<string, object> parameter = new Dictionary<string, object>();
            parameter.Add("@surname", personData.Surname);
            parameter.Add("@firstname", personData.Firstname);
            parameter.Add("@email", personData.Email);
            parameter.Add("@phone", personData.Phone);
            parameter.Add("@street", personData.Adress.Street);
            parameter.Add("@housenr", personData.Adress.HouseNr);
            parameter.Add("@city", personData.Adress.City);
            parameter.Add("@postcode", personData.Adress.Plz);
            parameter.Add("@picture", personData.Picture);

            mysql.ExecuteNonQuery(sql, parameter);
        }

        public List<Product> GetProducts()
        {
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);
            string sql = "SELECT * FROM products";
            List<Product> products = new List<Product>();
            using (MySqlDataReader reader = mysql.GetReader(sql))
            {
                while(reader.Read())
                {
                    products.Add(new Product()
                    {
                        ID = reader.GetInt32(0),
                        Name = reader.GetString(1)
                    });
                }
            }
            return products;
        }

        public static string Base64Encode(string plainText)
        {
            byte[] plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }
        public static string Base64Decode(string base64EncodedData)
        {
            byte[] base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
    }
}
