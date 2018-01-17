using ADP.BusinessLogic.Entity;
using ADP.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ADP.BusinessLogic
{
    public class ProjectBusiness
    {
        public static List<Project> GetAllProject()
        {
            return new ProjectData().GetAllProject().AsEnumerable<Project>().ToList();
        }

        public static bool InsertProject(string nama, string kota, string alamat, DateTime startDate, string no_kontrak, string no_spk, string telp_spk)
        {
            return new ProjectData().InsertProject("1", nama, kota, alamat, startDate, no_kontrak, no_spk, telp_spk);
        }

        public static bool UpdateProject(string id, string nama, string kota, string alamat, DateTime startDate, string no_kontrak, string no_spk, string telp_spk)
        {
            return new ProjectData().UpdateProject(id, nama, kota, alamat, startDate, no_kontrak, no_spk, telp_spk);
        }
    }
}
