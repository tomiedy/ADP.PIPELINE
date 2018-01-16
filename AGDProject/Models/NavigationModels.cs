using ADP.Membership;
using ADP.Mvc.Flan.EnhancedMenu;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ADPProject.Models
{
    public class NavigationModels
    {
        public static IEnumerable<NavigationItem> DataSource
        {
            get
            {
                List<NavigationItem> tempLinks = new List<NavigationItem>();

                #region initialize menu
                tempLinks.Add(new NavigationItem
                {
                    Id = "Master",
                    Text = "Master",
                    Role = string.Empty,
                    ControllerName = "Master",
                    ActionName = "Index",
                    Visible = true,
                    IsLoginNeed = true
                    //IconBootstrap = "fa fa-files-o"
                });

                tempLinks.Add(new NavigationItem
                {
                    Id = "daftarId",
                    Text = "Pendaftaran",
                    Role = string.Empty,
                    ControllerName = "Pendaftaran",
                    ActionName = "Index",
                    Visible = true,
                    IsLoginNeed = true
                    IconBootstrap = "fa fa-files-o"
                });

                tempLinks.Add(new NavigationItem
                {
                    Id = "profilId",
                    Text = "Profil",
                    Role = string.Empty,
                    ControllerName = "Home",
                    ActionName = "profil",
                    Visible = true,
                    IsLoginNeed = true,
                    IconBootstrap = "fa fa-users"
                });

                tempLinks.Add(new NavigationItem
                {
                    Id = "historyId",
                    Text = "History",
                    Role = string.Empty,
                    ControllerName = "History",
                    ActionName = "Index",
                    Visible = true,
                    IsLoginNeed = true,
                    IconBootstrap = "fa fa-list"
                });
                #endregion

                #region Master
                tempLinks.Add(new NavigationItem
                {
                    Id = "Employee",
                    Text = "Employee",
                    Role = string.Empty,
                    ControllerName = "Master",
                    ActionName = "Employee",
                    Visible = true,
                    IsLoginNeed = true,
                    IconBootstrap = "fa fa-list",
                    Parent = tempLinks.Where(nav => nav.Id == "Master").ToList()[0]
                });

                tempLinks.Add(new NavigationItem
                {
                    Id = "Project",
                    Text = "Project",
                    Role = string.Empty,
                    ControllerName = "Master",
                    ActionName = "Project",
                    Visible = true,
                    IsLoginNeed = true,
                    IconBootstrap = "fa fa-files-o",
                    Parent = tempLinks.Where(nav => nav.Id == "Master").ToList()[0]
                });
                #endregion                



                string role = string.Empty;
                if (LoginManager.Instance.IsLoggedIn)
                {
                    role = LoginManager.Instance.GetLoggedInUserRole().Nm_Role;
                }

                List<NavigationItem> result = null;
                if (string.IsNullOrEmpty(role))
                {
                    result = tempLinks.Where(m => string.IsNullOrEmpty(m.Role)).ToList();
                }
                else
                {
                    result = tempLinks.Where(m => m.Role.ToLower().Contains(role.ToLower()) || string.IsNullOrEmpty(m.Role)).ToList();
                }

                NavigationDataSource.NavigationItems = result;

                return NavigationDataSource.NavigationItems;
            }
        }
    }
}