using ADP.CommandAdapter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADP.DataAccess
{
    public class DataBaseHelpers
    {
        private static string ServerHost;
        private static string DatabaseName;
        private static string UserID;
        private static string Password;

        public static SqlCmdBuilder CreateCommand()
        {
            ServerHost = ADP.Encryption.CryptoTools.ActionDecrypt(System.Configuration.ConfigurationManager.AppSettings["AgdServer"]);
            DatabaseName = ADP.Encryption.CryptoTools.ActionDecrypt(System.Configuration.ConfigurationManager.AppSettings["AgdDatabase"]);
            UserID = ADP.Encryption.CryptoTools.ActionDecrypt(System.Configuration.ConfigurationManager.AppSettings["AgdUid"]);
            Password = ADP.Encryption.CryptoTools.ActionDecrypt(System.Configuration.ConfigurationManager.AppSettings["AgdPassword"]);

            return new SqlCmdBuilder(ServerHost, DatabaseName, UserID, Password);
        }

        public static SqlCmdBuilder CreateADPPipelineCommand()
        {
            ServerHost = AdministratorTool.StringCipher.Decrypt(System.Configuration.ConfigurationManager.AppSettings["PipelineServer"], "pipeline");
            DatabaseName = AdministratorTool.StringCipher.Decrypt(System.Configuration.ConfigurationManager.AppSettings["PipelineDatabase"], "pipeline");
            UserID = AdministratorTool.StringCipher.Decrypt(System.Configuration.ConfigurationManager.AppSettings["PipelineUid"], "pipeline");
            Password = AdministratorTool.StringCipher.Decrypt(System.Configuration.ConfigurationManager.AppSettings["PipelinePassword"], "pipeline");

            return new SqlCmdBuilder(ServerHost, DatabaseName, UserID, Password);
        }
    }
}
