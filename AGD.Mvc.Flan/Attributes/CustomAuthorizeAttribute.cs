using ADP.Membership;
using System;
using System.Linq;
using System.Security.Principal;
using System.Web;
using System.Web.Mvc;

namespace ADP.Mvc.Flan.Attributes
{
    public class CustomAuthorizeAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException("httpContext");
            }

            IPrincipal user = httpContext.User;
            if (!LoginManager.Instance.IsLoggedIn)
            {
                return false;
            }

            string loggedUser = LoginManager.Instance.GetLoggedInUser().Username;
            string loggedUserRole = LoginManager.Instance.GetLoggedInUserRole().Nm_Role;

            if (IsUserInRole(loggedUserRole))
            {
                return true;
            }

            return false;
        }

        private bool IsUserInRole(string role)
        {
            string[] arrRoles = base.Roles.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);

            return arrRoles.Where(r => string.Compare(r.Trim(), role, true) == 0).Count() > 0;
        }
    }
}
