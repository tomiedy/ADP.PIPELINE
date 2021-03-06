﻿using ADP.BusinessLogic;
using ADP.BusinessLogic.Entity;
using ADPProject.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
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
            if (ModelState.IsValid)
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

            return View(model);
        }

        public ActionResult Project()
        {
            ProjectModels model = new ProjectModels();
            model.StartDate = DateTime.Now.ToString();
            return View(model);
        }

        [HttpPost]
        public ActionResult Project(ProjectModels model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    DateTime tgl = Convert.ToDateTime(model.StartDate);
                    ProjectBusiness.InsertProject(model.Nama, model.Kota, model.Alamat, tgl, model.NoKontrak, model.NoSpk, model.TelpSpk);

                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

        public ActionResult Project()
        {
            ProjectModels model = new ProjectModels();
            model.StartDate = DateTime.Now.ToString();
            return View(model);
        }

        [HttpPost]
        public ActionResult Project(ProjectModels model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    DateTime tgl = Convert.ToDateTime(model.StartDate);
                    ProjectBusiness.InsertProject(model.Nama, model.Kota, model.Alamat, tgl, model.NoKontrak, model.NoSpk, model.TelpSpk);

                }
                catch (Exception ex)
                {
                    ModelState.AddModelError("", ex.Message);
                }
            }

            return View(model);
        }

        [HttpPost]
        public JsonResult GetProject(int jtStartIndex = 0, int jtPageSize = 0)
        {
            try
            {
                List<Project> lstProject = new List<Project>();
                //Get Data List Project From DB
                lstProject = ProjectBusiness.GetAllProject();

                //Paging
                var resultCount = lstProject.Count;
                if (resultCount > 0)
                    lstProject.OrderBy(m => m.Nama).Skip(jtStartIndex).Take(jtPageSize).ToList();

                return Json(new { Result = "OK", Records = lstProject, TotalRecordCount = resultCount });
            }
            catch (System.Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        [HttpPost]
        public JsonResult EditProject(string id, string nama, string kota, string alamat, string startDate, string noKontrak, string noSpk, string telpSpk)
        {
            try
            {
                //Edit Data
                DateTime tgl = Convert.ToDateTime(startDate);
                ProjectBusiness.UpdateProject(id, nama, kota, alamat, tgl, noKontrak, noSpk, telpSpk);
                return Json(new { Result = "OK", Message = "OK" });
            }
            catch (System.Exception ex)
            {
                return Json(new { Result = "ERROR", Message = ex.Message });
            }
        }

        public ActionResult ProjectCustomer(ProjectCustomerModels model)
        {
            return View(model);
        }
    }
}