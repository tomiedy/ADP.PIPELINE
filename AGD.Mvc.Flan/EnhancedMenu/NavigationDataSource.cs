using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace ADP.Mvc.Flan.EnhancedMenu
{
    public static class NavigationDataSource
    {
        public static IEnumerable<NavigationItem> NavigationItems { get; set; }

        static NavigationDataSource()
        {
            NavigationItems = new List<NavigationItem>();
        }

        public static NavigationItem GetCurrentSelectedItem(this IEnumerable<NavigationItem> navItem, HtmlHelper helper)
        {
            string controller = helper.ViewContext.Controller.ValueProvider.GetValue("controller").RawValue.ToString();
            string action = helper.ViewContext.Controller.ValueProvider.GetValue("action").RawValue.ToString();

            NavigationItem result = null;
            List<NavigationItem> search = NavigationItems.Where(nav => string.Compare(nav.ControllerName, controller) == 0 &&
                string.Compare(nav.ActionName, action) == 0).ToList();
            if (search.Count > 0)
            {
                result = search[0];
            }

            return result;
        }
    }
}
