using MySql.Data.MySqlClient;

namespace Messe_Backend.MySQL
{
    public class Connection
    {
        public string ConnectionString { get; }

        public Connection(string dbUser, string dbPw, string dbIp, string dbName)
        {
            this.ConnectionString = string.Format(
                "server={0};uid={1};pwd={2};database={3}",
                dbIp, dbUser, dbPw, dbName);
        }

        /**
         * Executes sql statement on database and retuns the reader, so the inherit method can work with it
         */
        public MySqlDataReader GetReader(string sql)
        {
            MySqlConnection connection = new MySqlConnection(ConnectionString);
            connection.Open();
            MySqlCommand cmd = new MySqlCommand(sql, connection);
            MySqlDataReader reader = cmd.ExecuteReader();
            return reader;
        }

        /**
         * Executes sql statement on database and retuns the reader, so the inherit method can work with it
         */
        public MySqlDataReader GetReader(string sql, Dictionary<string, object> escapedValues)
        {
            MySqlConnection connection = new MySqlConnection(ConnectionString);
            connection.Open();
            MySqlCommand cmd = new MySqlCommand(sql, connection);
            foreach (string key in escapedValues.Keys)
            {
                cmd.Parameters.AddWithValue(key, escapedValues[key]);
            }
            cmd.Prepare();
            MySqlDataReader reader = cmd.ExecuteReader();
            return reader;
        }

        public int ExecuteNonQuery(string sql, Dictionary<string, object> escapedValues)
        {
            int result = 0;
            using (MySqlConnection connection = new MySqlConnection(ConnectionString))
            {
                connection.Open();
                MySqlCommand cmd = new MySqlCommand(sql, connection);
                foreach(string key in escapedValues.Keys)
                {
                    cmd.Parameters.AddWithValue(key, escapedValues[key]);
                }
                cmd.Prepare();
                result = cmd.ExecuteNonQuery();
            }
            return result;
        }

    }
}
