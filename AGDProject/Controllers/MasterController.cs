using ADPProject.Models;
using System.Web.Mvc;

namespace ADPProject.Controllers
{
    public class MasterController : Controller
    {
        // GET: Master
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Employee()
        {
            return View();
        }

        public ActionResult Project(ProjectModels model)
        {
            return View(model);
        }

        public ActionResult ProjectCustomer(ProjectCustomerModels model)
        {
            return View(model);
        }
    }
}