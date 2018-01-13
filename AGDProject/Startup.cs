using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ADPProject.Startup))]
namespace ADPProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
