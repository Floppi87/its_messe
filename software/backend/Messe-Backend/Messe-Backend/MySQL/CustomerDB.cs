using Messe_Backend.Models;
using MySql.Data.MySqlClient;
using MySqlX.XDevAPI;
using System.Buffers.Text;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Xml.Linq;

namespace Messe_Backend.MySQL
{
    public class CustomerDB
    {

        private readonly string _dbUser;
        private readonly string _dbPassword;
        private readonly string _dbName;
        private readonly string _dbIp;
        private readonly string _dbIpAlt;

        public CustomerDB()
        {
            this._dbUser = "its_messe";
            this._dbName = "messe";
            this._dbIp = "ks.kivitas.de";
            this._dbPassword = "ICF!U0jlWNapKj.L";
            this._dbIpAlt = "127.0.0.1";
        }

        public void RegisterCustomer(PersonData personData, bool useAlt = false)
        {


            Connection mysql;
            if (useAlt)
                mysql = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            else
                mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);


            try
            {
                string sqlMail = "SELECT * FROM customers WHERE customers.Email = @email";
                Dictionary<string, object> parameterMail = new Dictionary<string, object>();
                parameterMail.Add("@email", personData.Email);

                using (MySqlDataReader reader = mysql.GetReader(sqlMail, parameterMail))
                {
                    if (reader.Read())
                        throw new Exception("Duplicate entry '"+personData.Email+"' for key 'Email'");
                    reader.Close();
                }

                if (!String.IsNullOrEmpty(personData.Company.Name))
                {
                    RegisterCompany(personData, useAlt);
                }

                string sql = "INSERT INTO customers (Surname, Firstname, Email, Phone, Street, Housenumber, City, Postcode, Picture, Company) VALUES (@surname, @firstname, @email, @phone, @street, @housenr, @city, @postcode, @picture, (SELECT ID FROM companies WHERE Name = @company))";
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
                parameter.Add("@company", personData.Company.Name);

                mysql.ExecuteNonQuery(sql, parameter);
                LinkCustomerToProduct(personData, useAlt);
            }
            catch (MySqlException ex)
            {
                if (useAlt)
                {
                    throw ex;
                }
                RegisterCustomer(personData, true);
            }
        }

        private void RegisterCompany(PersonData personData, bool useAlt)
        {
            Connection mysql;
            if (useAlt)
                mysql = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            else
                mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            string findCompanySql = "SELECT * FROM companies WHERE Name = @name";
            Dictionary<string, object> parameter = new Dictionary<string, object>();
            parameter.Add("@name", personData.Company.Name);

            using (MySqlDataReader reader = mysql.GetReader(findCompanySql, parameter))
            {
                bool existing = reader.HasRows;
                if (!existing)
                {
                    string insertToCompanySql = "INSERT INTO companies (Name) VALUES (@name)";

                    mysql.ExecuteNonQuery(insertToCompanySql, parameter);
                }
                reader.Close();

            }
        }

        private void LinkCustomerToProduct(PersonData personData, bool useAlt)
        {
            Connection mysql;
            if (useAlt)
                mysql = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            else
                mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            Dictionary<string, object> parameter = new Dictionary<string, object>();
            parameter.Add("@email", personData.Email);
            foreach (Product product in personData.Interests)
            {
                mysql.ExecuteNonQuery("INSERT INTO interests (Customer, Product) VALUES ((SELECT ID FROM customers WHERE Email = @email), " + product.ID + ");", parameter);
            }

        }

        public List<Product> GetProducts(bool useAlt = false)
        {
            Connection mysql;

            if (useAlt)
                mysql = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            else
            {
                mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);
                SyncDatabases();
            }


            string sql = "SELECT * FROM products";
            List<Product> products = new List<Product>();
            try
            {
                using (MySqlDataReader reader = mysql.GetReader(sql))
                {
                    while (reader.Read())
                    {
                        products.Add(new Product()
                        {
                            ID = reader.GetInt32(0),
                            Name = reader.GetString(1)
                        });
                    }
                    reader.Close();
                }
                return products;
            }
            catch (MySqlException ex)
            {
                if (useAlt)
                {
                    throw ex;
                }
                return GetProducts(true);
            }
        }


        public List<PersonData> GetPersonDatas(bool useAlt = false)
        {
            Connection mysql;

            if (useAlt)
                mysql = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            else
                mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            string sql = "SELECT customers.ID, Surname, Firstname, Email, Phone, Street, Housenumber, City, Postcode, Picture, companies.ID, companies.Name FROM customers LEFT JOIN companies ON customers.Company = companies.ID";

            List<PersonData> personDatas = new List<PersonData>();

            using (MySqlDataReader reader = mysql.GetReader(sql))
            {
                while (reader.Read())
                {
                    Company company;
                    if (reader.IsDBNull(10))
                    {
                        company = new Company()
                        {
                            ID = -1,
                            Name = ""
                        };
                    }
                    else
                    {
                        company = new Company()
                        {
                            ID = reader.GetInt32(10),
                            Name = reader.GetString(11)
                        };
                    }

                    string phoneNr = "";
                    if (!reader.IsDBNull(4) || !String.IsNullOrEmpty(reader.GetString(4)))
                    {
                        phoneNr = reader.GetString(4);
                    }
                    personDatas.Add(new PersonData()
                    {
                        Surname = reader.GetString(1),
                        Firstname = reader.GetString(2),
                        Email = reader.GetString(3),
                        Phone = phoneNr,
                        Adress = new Adress()
                        {
                            Street = reader.GetString(5),
                            HouseNr = reader.GetString(6),
                            City = reader.GetString(7),
                            Plz = reader.GetInt32(8)
                        },
                        Picture = reader.GetString(9),
                        Company = company,
                        Interests = GetIntrests(reader.GetInt32(0), useAlt)
                    });
                }
                reader.Close();
            }
            return personDatas;
        }


        public bool SyncDatabases()
        {
            Connection mysqlOnline = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);
            Connection mysqlOffline = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            try
            {
                List<PersonData> savedPersons = GetPersonDatas(true);

                foreach (PersonData personData in savedPersons)
                {

                    RegisterCustomer(personData);
                    string sqlDelIn = "DELETE FROM interests WHERE interests.Customer = (SELECT customers.ID FROM customers WHERE Email = @email)";
                    Dictionary<string, object> parameterDelIn = new Dictionary<string, object>();
                    parameterDelIn.Add("@email", personData.Email);
                    using (MySqlDataReader reader = mysqlOffline.GetReader(sqlDelIn, parameterDelIn))
                    {
                        reader.Close();
                    }
                    string sqlDel = "DELETE FROM customers WHERE customers.Email = @email";
                    Dictionary<string, object> parameterDel = new Dictionary<string, object>();
                    parameterDel.Add("@email", personData.Email);
                    using (MySqlDataReader reader = mysqlOffline.GetReader(sqlDel, parameterDel))
                    {
                        reader.Close();
                    }
                }

                }
                catch (Exception ex)
                {
                    return false;
                }
            
            return true;
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

        private List<Product> GetIntrests(int customerId, bool useAlt)
        {
            Connection mysql;

            if (useAlt)
                mysql = new Connection(_dbUser, _dbPassword, _dbIpAlt, _dbName);
            else
                mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            string sql = "SELECT products.ID, products.Name FROM interests INNER JOIN products ON interests.Product = products.ID WHERE interests.Customer = " + customerId;
            List<Product> products = new List<Product>();
            using (MySqlDataReader reader = mysql.GetReader(sql))
            {
                while (reader.Read())
                {
                    products.Add(new Product()
                    {
                        ID = reader.GetInt32(0),
                        Name = reader.GetString(1)
                    });
                }
                reader.Close();
            }
            return products;
        }
    }
}
