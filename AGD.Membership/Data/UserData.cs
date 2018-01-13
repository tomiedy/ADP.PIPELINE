using ADP.CommandAdapter;
using ADP.DataAccess;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADP.Membership.Data
{
    [Serializable]
    public class UserData
    {
        public DataTable RetrieveUser(string uName)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateCommand();
            cmd.Query = @"SELECT *
                          FROM MST_USER
                          WHERE UPPER(USERNAME)=:uName";
            cmd.AddParameter("uName", ParameterDirection.Input, uName.ToUpper());

            return cmd.GetTable();
        }

        public DataTable RetrieveUser(string uName, string pass)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateCommand();
            cmd.Query = @"SELECT *
                          FROM MST_USER
                          WHERE UPPER(USERNAME)=:uName AND PASSWORD=:pass";
            cmd.AddParameter("uName", ParameterDirection.Input, uName.ToUpper());
            cmd.AddParameter("pass", ParameterDirection.Input, ADP.Encryption.CryptoTools.ActionEncrypt(pass.ToUpper()));
            return cmd.GetTable();
        }

        public DataTable RetrieveUserRoles(string username)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateCommand();
            cmd.Query = @"SELECT *
                          FROM MST_USER usr INNER JOIN MST_USER_ROLE uro " +
                        @"ON usr.id_role = uro.id_role";

            if (!string.IsNullOrEmpty(username))
            {
                cmd.Query += "WHERE UPPER(usr.username)";
                cmd.AddParameter("username", ParameterDirection.Input, username.ToUpper());
            }

            return cmd.GetTable();
        }
    }
}
