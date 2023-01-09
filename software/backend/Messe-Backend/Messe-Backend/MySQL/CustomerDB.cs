﻿using Messe_Backend.Models;
using MySql.Data.MySqlClient;
using System.Buffers.Text;
using System.Text;

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
            if(!String.IsNullOrEmpty(personData.Company.Name))
            {
                RegisterCompany(personData);
            }
            
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

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
            LinkCustomerToProduct(personData);
        }

        private void RegisterCompany(PersonData personData)
        {
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            string findCompanySql = "SELECT * FROM companies WHERE Name = @name";
            Dictionary<string, object> parameter = new Dictionary<string, object>();
            parameter.Add("@name", personData.Company.Name);

            using(MySqlDataReader reader = mysql.GetReader(findCompanySql, parameter))
            {
                bool existing = reader.HasRows;
                if(!existing)
                {
                    string insertToCompanySql = "INSERT INTO companies (Name) VALUES (@name)";

                    mysql.ExecuteNonQuery(insertToCompanySql, parameter);
                }
                
            }
        }

        private void LinkCustomerToProduct(PersonData personData)
        {
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);

            Dictionary<string, object> parameter = new Dictionary<string, object>();
            parameter.Add("@email", personData.Email);
            foreach(Product product in personData.Interests)
            {
                mysql.ExecuteNonQuery("INSERT INTO interests (Customer, Product) VALUES ((SELECT ID FROM customers WHERE Email = @email), " + product.ID + ");", parameter);
            }

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
                reader.Close();
            }
            return products;
        }


        public List<PersonData> GetPersonDatas()
        {
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);
            string sql = "SELECT customers.ID, Surname, Firstname, Email, Phone, Street, Housenumber, City, Postcode, Picture, companies.ID, companies.Name FROM customers LEFT JOIN companies ON customers.Company = companies.ID";

            List<PersonData> personDatas = new List<PersonData>();

            using(MySqlDataReader reader = mysql.GetReader(sql))
            {
                while (reader.Read())
                {
                    Company company;
                    if(reader.IsDBNull(10))
                    {
                        company = new Company()
                        {
                         ID = -1,
                         Name = ""
                        };
                    } else
                    {
                        company = new Company()
                        {
                            ID = reader.GetInt32(10),
                            Name = reader.GetString(11)
                        };
                    }

                    string phoneNr = "";
                    if(!reader.IsDBNull(4))
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
                        Interests = GetInterests(reader.GetInt32(0))
                    });
                }
                    reader.Close();
            }
            return personDatas;
        }
        private List<Product> GetInterests(int customerId)
        {
            Connection mysql = new Connection(_dbUser, _dbPassword, _dbIp, _dbName);
            string sql = "SELECT products.ID, products.Name FROM interests INNER JOIN products ON interests.Product = products.ID WHERE interests.Customer = "+customerId;
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
