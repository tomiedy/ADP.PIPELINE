using ADP.CommandAdapter;
using System.Data;

namespace ADP.DataAccess
{
    public class ProjectData
    {
        public DataTable GetAllProject()
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"SELECT id,nama,kota,alamat,startdate,no_kontrak nokontrak,no_spk nospk,telp_spk telpspk
                        FROM adp_project";

            return cmd.GetTable();
        }
    }
}
