using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ADP.Mvc.Flan.EnhancedMenu
{
    public class NavigationItem
    {
        public string Id { get; set; }
        public string Role { get; set; }
        public string Text { get; set; }
        public string ActionName { get; set; }
        public string ControllerName { get; set; }
        public string IconBootstrap { get; set; }
        public NavigationItem Parent { get; set; }
        public int Level
        {
            get
            {
                int level = 1;
                if (this.Parent != null)
                {
                    level = Parent.Level + 1;
                }

                return level;
            }
        }
        public bool Visible { get; set; }
        public bool IsLoginNeed { get; set; }
    }
}
