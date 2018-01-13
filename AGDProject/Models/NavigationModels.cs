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
                
                #region Pendaftaran
                tempLinks.Add(new NavigationItem
                {
                    Id = "daftarId",
                    Text = "Pendaftaran",
                    Role = string.Empty,
                    ControllerName = "Pendaftaran",
                    ActionName = "Index",
                    Visible = true,
                    IsLoginNeed = true,
                    IconBootstrap = "fa fa-files-o"
                });
                #endregion


                #region Profil
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
                #endregion

                #region History
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