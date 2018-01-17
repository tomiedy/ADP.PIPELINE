using ADP.BusinessLogic.Entity;
using ADP.DataAccess;
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
    }
}
