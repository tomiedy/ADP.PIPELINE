using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADP.Membership.Entity
{
    [Serializable]
    public class MembershipUserRole
    {
        public string Id_Role { get; set; }
        public string Id_User { get; set; }
        public string Nm_Role { get; set; }
        public string Username { get; set; }
    }
}
