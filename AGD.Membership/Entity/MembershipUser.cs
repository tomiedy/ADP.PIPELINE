using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADP.Membership.Entity
{
    [Serializable]
    public class MembershipUser
    {
        public string Id_User { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Id_Role { get; set; }
    }
}
