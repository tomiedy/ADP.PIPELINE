﻿using ADP.CommandAdapter;
using ADP.DataAccess;
using System.Data;

namespace ADP.Membership.Data
{
    public class RoleData
    {
        public DataTable RetrieveRoleById(string idRole)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateCommand();
            cmd.Query = @"SELECT *
                          FROM MST_USER_ROLE
                          WHERE ID_ROLE=:idRole";
            cmd.AddParameter("idRole", ParameterDirection.Input, idRole);

            return cmd.GetTable();
        }

        public DataTable RetrieveRoleByName(string name)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateCommand();
            cmd.Query = @"SELECT *
                          FROM MST_USER_ROLE
                          WHERE NM_ROLE=:name";
            cmd.AddParameter("name", ParameterDirection.Input, name);

            return cmd.GetTable();
        }
    }
}