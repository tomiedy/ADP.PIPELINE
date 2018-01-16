using ADP.Membership.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ADP.Membership
{
    public class LoginManager
    {
        private static volatile LoginManager instance;
        private static object locker = new object();
        public static LoginManager Instance
        {
            get
            {
                lock (locker)
                {
                    if (instance == null)
                    {
                        instance = new LoginManager();
                    }
                }
                return instance;
            }
        }

        private LoginManager() { }

        /// <summary>
        /// Validate username dan password
        /// </summary>
        /// <param name="username">Username</param>
        /// <param name="password">Password</param>
        /// <returns>Boolean</returns>
        public bool Login(string username, string password)
        {
            bool result = false;
            MembershipUser user = MembershipManager.Instance.GetUsers(username).FirstOrDefault();
            if (user != null)
            {
                if (string.Compare(password, ADP.Encryption.CryptoTools.ActionDecrypt(user.Password), false) == 0)
                {
                    result = true;
                    if (HttpContext.Current != null)
                    {
                        HttpContext.Current.Session.Add("Username", user.Username.ToUpper());
                        //HttpContext.Current.Session.Add("Name", user.Name);
                        HttpContext.Current.Session.Add("Token", ADP.Encryption.CryptoTools.ActionEncrypt(string.Format("{0}_{1}", user.Username.ToUpper(), user.Password)));
                    }
                }
            }

            return result;
        }

        public bool UpdateToken(string newPassword)
        {
            bool result = true;
            try
            {
                if (HttpContext.Current.Session["Username"] != null)
                {
                    HttpContext.Current.Session["Token"] = ADP.Encryption.CryptoTools.ActionEncrypt(HttpContext.Current.Session["Username"].ToString().ToUpper() + "_" +
                                                           ADP.Encryption.CryptoTools.ActionEncrypt(newPassword));
                }
            }
            catch
            {
                result = false;
            }

            return result;
        }

        /// <summary>
        /// Logout
        /// </summary>
        public void Logout()
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.Session.Abandon();
                HttpContext.Current.Session.Clear();
            }
        }

        /// <summary>
        /// Get logged in user
        /// </summary>
        /// <returns>MembershipUser</returns>
        public MembershipUser GetLoggedInUser()
        {
            MembershipUser result = null;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Session["Username"] != null)
                {
                    List<MembershipUser> users = MembershipManager.Instance.GetUsers(HttpContext.Current.Session["Username"].ToString());
                    if (users.Count > 0)
                    {
                        result = users[0];
                    }
                }
            }

            return result;
        }

        /// <summary>
        /// Get logged in user's role
        /// </summary>
        /// <returns>MembershipRole</returns>
        public MembershipRole GetLoggedInUserRole()
        {
            MembershipRole result = null;
            MembershipUser user = null;
            if (HttpContext.Current != null)
            {
                if (HttpContext.Current.Session["Username"] != null)
                {
                    List<MembershipUser> users = MembershipManager.Instance.GetUsers(HttpContext.Current.Session["Username"].ToString());
                    if (users.Count > 0)
                    {
                        user = users[0];
                        List<MembershipRole> roles = MembershipManager.Instance.GetRoles(user.Id_Role.ToString());
                        if (roles.Count > 0)
                        {
                            result = roles[0];
                        }
                    }
                }
            }

            return result;
        }

        public bool IsLoggedIn
        {
            get
            {
                bool loggedIn = false;
                if (HttpContext.Current != null)
                {
                    if (HttpContext.Current.Session["Token"] != null &&
                        HttpContext.Current.Session["Username"] != null)
                    {
                        string plainToken = ADP.Encryption.CryptoTools.ActionDecrypt(HttpContext.Current.Session["Token"].ToString());
                        List<MembershipUser> users = MembershipManager.Instance.GetUsers(HttpContext.Current.Session["Username"].ToString());
                        MembershipUser user = users.FirstOrDefault();
                        if (user != null)
                        {
                            string originalToken = String.Format("{0}_{1}", HttpContext.Current.Session["Username"].ToString().ToUpper(), user.Password);
                            if (string.Compare(plainToken, originalToken) == 0)
                            {
                                loggedIn = true;
                            }
                            else
                            {
                                Logout();
                            }
                        }
                        else
                        {
                            Logout();
                        }
                    }
                }

                return loggedIn;
            }
        }
    }
}
