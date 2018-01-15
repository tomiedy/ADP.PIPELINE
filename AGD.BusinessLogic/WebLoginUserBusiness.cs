using ADP.BusinessLogic.Entity;
using ADP.DataAccess;
using System.Collections.Generic;
using System.Linq;

namespace ADP.BusinessLogic
{
    public class WebLoginUserBusiness
    {
        public static List<WebLoginUser> RetrieveWebLoginUserByUsername(string userName)
        {
            return WebLoginUserData.RetrieveWebLoginUserByUsername(userName).AsEnumerable<WebLoginUser>().ToList();
        }
    }
}
