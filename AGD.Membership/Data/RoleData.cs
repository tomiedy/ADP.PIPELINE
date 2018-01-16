using ADP.CommandAdapter;
using ADP.DataAccess;
using System.Data;

namespace ADP.Membership.Data
{
    public class RoleData
    {
        public DataTable RetrieveRoleById(string idRole)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"SELECT *
                          FROM ADP_ROLE
                          WHERE ID_ROLE=@idRole";
            cmd.AddParameter("idRole", SqlCmdParameterDirection.Input, idRole);

            return cmd.GetTable();
        }

        public DataTable RetrieveRoleByName(string name)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateCommand();
            cmd.Query = @"SELECT *
                          FROM ADP_ROLE
                          WHERE NAMA_ROLE=@name";
            cmd.AddParameter("name", SqlCmdParameterDirection.Input, name);

            return cmd.GetTable();
        }
    }
}
