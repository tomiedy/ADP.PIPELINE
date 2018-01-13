using System;
using System.Web.Mvc;

namespace ADP.Mvc.Flan.Helpers
{
    public static class LocationHelper
    {
        public static bool IsCurrentControllerAndAction(string controllerName, string actionName, ViewContext viewContext)
        {
            bool result = false;
            string normalizedControllerName = controllerName.EndsWith("Controller") ? controllerName : String.Format("{0}Controller", controllerName);

            if (viewContext == null) return false;
            if (String.IsNullOrEmpty(actionName)) return false;

            if (viewContext.Controller.GetType().Name.Equals(normalizedControllerName, StringComparison.InvariantCultureIgnoreCase) &&
                viewContext.Controller.ValueProvider.GetValue("action").AttemptedValue.Equals(actionName, StringComparison.InvariantCultureIgnoreCase))
            {
                result = true;
            }

            return result;
        }
    }
}
