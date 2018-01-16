using ADP.BusinessLogic;
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
            RegisterUserModel model = new RegisterUserModel();
            return View(model);
        }
        [HttpPost]
        public ActionResult Employee(RegisterUserModel model)
        {
            if(ModelState.IsValid)
            {
                try
                {
                    //Insert Employee
                    UserBusinessLogic.CreateEmployee(model.Nama, model.TempatLahir, model.TanggalLahir, model.NoTelpon, model.Email, model.Jabatan);

                    //Insert User
                    UserBusinessLogic.CreateUser(model.Username, model.Password, model.IdRole);
                }
                catch (System.Exception ex)
                {

                    ModelState.AddModelError("", ex.Message);
                }               
            }

            //if(!string.IsNullOrEmpty(model.Username))
            //{
            //    ModelState.AddModelError("", "Username Tidak Ditemukan.");
            //}
            return View(model);
        }

    }
}