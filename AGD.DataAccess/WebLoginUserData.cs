using ADP.CommandAdapter;
using System.Data;

namespace ADP.DataAccess
{
    public class WebLoginUserData
    {
        public static DataTable RetrieveWebLoginUserByUsername(string uName)
        {            
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"SELECT USERNAME, PASSWORD
                          FROM ADP_USER
                          WHERE UPPER(Username)=@uName AND allow_login = 0";
            cmd.AddParameter("uName", SqlCmdParameterDirection.Input, uName.ToUpper());
            return cmd.GetTable();
        }


    }
}
