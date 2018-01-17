using ADP.CommandAdapter;
using System;
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

        public bool InsertProject(string id, string nama, string kota, string alamat, DateTime startDate, string no_kontrak, string no_spk, string telp_spk)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"INSERT INTO adp_project (id,nama,kota,alamat,startdate,no_kontrak,no_spk,telp_spk)
                        VALUES(@id,@nama,@kota,@alamat,@startdate,@nokontrak,@nospk,@telpspk)";

            cmd.AddParameter("id", SqlCmdParameterDirection.Input, id);
            cmd.AddParameter("nama", SqlCmdParameterDirection.Input, nama);
            cmd.AddParameter("kota", SqlCmdParameterDirection.Input, kota);
            cmd.AddParameter("alamat", SqlCmdParameterDirection.Input, alamat);
            cmd.AddParameter("startdate", SqlCmdParameterDirection.Input, startDate);
            cmd.AddParameter("nokontrak", SqlCmdParameterDirection.Input, no_kontrak);
            cmd.AddParameter("nospk", SqlCmdParameterDirection.Input, no_spk);
            cmd.AddParameter("telpspk", SqlCmdParameterDirection.Input, telp_spk);

            return cmd.ExecuteNonQuery() > 0;
        }

        public bool UpdateProject(string id, string nama, string kota, string alamat, DateTime startDate, string no_kontrak, string no_spk, string telp_spk)
        {
            SqlCmdBuilder cmd = DataBaseHelpers.CreateADPPipelineCommand();
            cmd.Query = @"UPDATE adp_project SET nama=@nama,kota=@kota,alamat=@alamat,startDate=@startDate,no_kontrak=@noKontrak,no_spk=@noSpk,telp_spk=@telp
                        WHERE id=@id";
                        
            cmd.AddParameter("nama", SqlCmdParameterDirection.Input, nama);
            cmd.AddParameter("kota", SqlCmdParameterDirection.Input, kota);
            cmd.AddParameter("alamat", SqlCmdParameterDirection.Input, alamat);
            cmd.AddParameter("startDate", SqlCmdParameterDirection.Input, startDate);
            cmd.AddParameter("noKontrak", SqlCmdParameterDirection.Input, no_kontrak);
            cmd.AddParameter("noSpk", SqlCmdParameterDirection.Input, no_spk);
            cmd.AddParameter("telp", SqlCmdParameterDirection.Input, telp_spk);
            cmd.AddParameter("id", SqlCmdParameterDirection.Input, id);

            return cmd.ExecuteNonQuery() > 0;
        }
    }
}
