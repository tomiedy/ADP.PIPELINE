using ADP.CommandAdapter;
using System.Data;

namespace ADP.DataAccess
{
    public class WebLoginUserData
    {
        public static DataTable RetrieveWebLoginUserByUsername(string uName)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"SELECT ID_USER, USERNAME, PASSWORD
                          FROM MST_USER
                          WHERE UPPER(Username)=?uName AND is_deleted = 0";
            cmd.AddParameter("uName", SqlCmdParameterDirection.Input, uName.ToUpper());
            return cmd.GetTable();
        }
    }
}
