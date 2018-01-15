using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace ADP.CommandAdapter
{
    public class SqlCmdBuilder
    {
        //private const string ConnectionStringFormat = @"Data Source={0};Initial Catalog={1}; User ID={2};Password={3};";

        private const string ConnectionStringFormat = @"Server = {0}; Database={1};Uid={2}; Pwd={3}";

        public List<SqlParameter> Parameters { get; private set; }
        public string ConnectionString { get; private set; }
        public string Query { get; set; }
        public bool IsStoredProcedure { get; set; }

        public SqlCmdBuilder(string server, string dataBase, string userId, string password)
        {
            Parameters = new List<SqlParameter>();

            ConnectionString = string.Format(ConnectionStringFormat, server, dataBase, userId, password);
            IsStoredProcedure = false;
        }

        public void AddParameter(string name, System.Data.ParameterDirection direction, object value)
        {
            SqlParameter newParameter = new SqlParameter();
            newParameter.Direction = direction;
            newParameter.ParameterName = name;
            newParameter.Value = value;
            Parameters.Add(newParameter);
        }

        public int ExecuteNonQueryWithoutTransactionOperation()
        {
            if (string.IsNullOrEmpty(Query))
            {
                throw new Exception("Query not initialized");
            }

            int affectedRows = 0;
            using (SqlConnection conn = CreateConnection())
            {
                try
                {
                    SqlCommand cmd = CreateCommand(conn);
                    conn.Open();
                    affectedRows = cmd.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    affectedRows = -1;
                    throw ex;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return affectedRows;
        }

        public int ExecuteNonQuery()
        {
            if (string.IsNullOrEmpty(Query))
            {
                throw new Exception("Query not initialized");
            }

            int affectedRows = 0;
            using (SqlConnection conn = CreateConnection())
            {
                SqlTransaction trans = null;
                try
                {
                    SqlCommand cmd = CreateCommand(conn);
                    conn.Open();
                    trans = conn.BeginTransaction();
                    cmd.Transaction = trans;
                    affectedRows = cmd.ExecuteNonQuery();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    if (trans != null)
                    {
                        trans.Rollback();
                    }
                    throw ex;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return affectedRows;
        }

        public object ExecuteScalar()
        {
            if (string.IsNullOrEmpty(Query))
            {
                throw new Exception("Query not initialized");
            }

            object result = 0;
            using (SqlConnection conn = CreateConnection())
            {
                SqlTransaction trans = null;
                try
                {
                    SqlCommand cmd = CreateCommand(conn);
                    conn.Open();
                    trans = conn.BeginTransaction();
                    cmd.Transaction = trans;
                    result = cmd.ExecuteScalar();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    if (trans != null)
                    {
                        trans.Rollback();
                    }
                    throw ex;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return result;
        }

        public System.Data.DataTable GetTable()
        {
            if (string.IsNullOrEmpty(Query))
            {
                throw new Exception("Query not initialized");
            }

            System.Data.DataTable result = null;
            using (SqlConnection conn = CreateConnection())
            {
                try
                {
                    SqlCommand cmd = CreateCommand(conn);

                    SqlDataAdapter da = new SqlDataAdapter(cmd);
                    result = new System.Data.DataTable("Output");
                    da.Fill(result);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    CloseConnection(conn);
                }
            }

            return result;
        }

        public bool TestConnection(out string errMsg)
        {
            errMsg = string.Empty;
            bool result = true;
            using (SqlConnection conn = CreateConnection())
            {
                try
                {
                    conn.Open();
                }
                catch (Exception ex)
                {
                    result = false;
                    errMsg = ex.Message;
                }
                finally
                {
                    try
                    {
                        CloseConnection(conn);
                    }
                    catch (Exception ex)
                    {
                        result = false;
                        errMsg = ex.Message;
                    }
                }
            }

            return result;
        }

        private SqlCommand CreateCommand(SqlConnection conn)
        {
            try
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = Query;
                cmd.CommandType = System.Data.CommandType.Text;
                if (IsStoredProcedure)
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                }
                if (Parameters.Count > 0)
                {
                    foreach (SqlParameter param in Parameters)
                    {
                        cmd.Parameters.Add(param);
                    }
                }

                return cmd;
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        private SqlConnection CreateConnection()
        {
            try
            {
                SqlConnection conn = new SqlConnection(ConnectionString);
                return conn;
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        private static void CloseConnection(SqlConnection conn)
        {
            try
            {
                if (conn.State != System.Data.ConnectionState.Closed)
                {
                    conn.Close();
                }
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }
    }
}
