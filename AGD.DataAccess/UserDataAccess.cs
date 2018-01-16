using System;
using ADP.DataAccess;
using System.Data;
using ADP.CommandAdapter;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGD.DataAccess
{
    class UserDataAccess
    {
        public static bool InsertUser (string username, string password)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"INSERT INTO adp_user (username, password)
                          values (@user, @pass)";


            cmd.AddParameter("user", SqlCmdParameterDirection.Input, username);
            cmd.AddParameter("pass", SqlCmdParameterDirection.Input, password);

            return cmd.ExecuteNonQuery() > 0;
        }


    }
}
