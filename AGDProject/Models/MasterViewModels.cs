using System;
using System.ComponentModel.DataAnnotations;

namespace ADPProject.Models
{
    public class ProjectModels
    {
        [Required(ErrorMessage = "Nama harus Diisi")]
        [Display(Name = "Nama")]
        public string Nama { get; set; }

        [Required(ErrorMessage = "Kota Harus Diisi")]
        [Display(Name = "Kota")]
        public string Kota { get; set; }

        [Required(ErrorMessage = "Alamat Harus Diisi")]        
        [Display(Name = "Alamat")]
        public string Alamat { get; set; }
                
        [Display(Name = "Start Date")]        
        public DateTime StartDate { get; set; }

        [Display(Name = "No. Kontrak")]
        public string NoKontrak { get; set; }

        [Display(Name = "No SPK")]
        public string NoSpk { get; set; }

        [Display(Name = "Telp SPK")]
        public string TelSpk { get; set; }        
    }

    public class ProjectCustomerModels
    {
        [Required(ErrorMessage = "Nama Harus Diisi")]
        [Display(Name = "Nama")]
        public string Nama { get; set; }

        [Required(ErrorMessage = "Alamat Harus Diisi")]
        [Display(Name = "Alamat")]
        public string Alamat { get; set; }

        [Required(ErrorMessage = "Kota Harus Diisi")]
        [Display(Name = "Kota")]
        public string Kota { get; set; }

        [Required(ErrorMessage = "Telp Harus Diisi")]
        [Display(Name = "Telp")]
        public string Telp { get; set; }

        [Required(ErrorMessage = "Email Harus Diisi")]
        [Display(Name = "Email")]
        public string Email { get; set; }

    }
}