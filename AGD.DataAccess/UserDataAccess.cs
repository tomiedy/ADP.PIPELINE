using ADP.CommandAdapter;
using ADP.DataAccess;
using System;
using System.Data;

namespace AGD.DataAccess
{
    public class UserDataAccess
    {

        public bool CreateEmployee(string nama, string tempLahir, string tglLahir, string noTlp, string email, string jabatan)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"INSERT INTO ADP_EMPLOYEE (ID_EMPLOYEE, NAMA, TEMPAT_LAHIR, TGL_LAHIR, NO_TELP, MAIL_ADDRESS, JABATAN)
                        VALUES (@idemp, @nm, @tempLahir, @tglLahir, @notlp, @email, @jabatan)";
            cmd.AddParameter("idemp", SqlCmdParameterDirection.Input, Guid.NewGuid().ToString());
            cmd.AddParameter("nm", SqlCmdParameterDirection.Input, nama);
            cmd.AddParameter("tempLahir", SqlCmdParameterDirection.Input, tempLahir);
            cmd.AddParameter("tglLahir", SqlCmdParameterDirection.Input, tglLahir);
            cmd.AddParameter("notlp", SqlCmdParameterDirection.Input, noTlp);
            cmd.AddParameter("email", SqlCmdParameterDirection.Input, email);
            cmd.AddParameter("jabatan", SqlCmdParameterDirection.Input, jabatan);

            return cmd.ExecuteNonQuery() > 0;
        }

        public bool CreateUser(string Username, string Password, string IdRole)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"INSERT INTO ADP_USER (USERNAME, PASSWORD, ID_ROLE)" +
                         "VALUES (@user, @pass, @idrole)";
            cmd.AddParameter("user", SqlCmdParameterDirection.Input, Username);
            cmd.AddParameter("pass", SqlCmdParameterDirection.Input, Password);
            cmd.AddParameter("idrole", SqlCmdParameterDirection.Input, IdRole);

            return cmd.ExecuteNonQuery() > 0;

        }

        public DataTable GetEmployee()
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"SELECT ID_EMPLOYEE, NAMA, TEMPAT_LAHIR, TGL_LAHIR, NO_TELP, MAIL_ADDRESS, JABATAN, is_ACTIVE
                          from ADP_EMPLOYEE";                   
           
            return cmd.GetTable();
        }

    }
}
