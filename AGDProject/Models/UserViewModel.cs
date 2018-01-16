using System.ComponentModel.DataAnnotations;

namespace ADPProject.Models
{
    public class UserViewModel
    {
        [Required(ErrorMessage = "Username harus diisi")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Password harus diisi")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        public string ReturnUrl { get; set; }
    }


    public class RegisterUserModel
    {
        [Required(ErrorMessage = "Nama harus Diisi")]
        [Display(Name = "Nama")]
        public string Nama { get; set; }

        [Required(ErrorMessage ="Username Harus Diisi")]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required(ErrorMessage ="Password Harus Diisi")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare ("Password" ,ErrorMessage ="Password dan Confirm Password Tidak Sama")]
        public string ConfirmPassword { get; set; }
                
        [Display(Name = "Tempat Lahir")]
        public string TempatLahir { get; set; }

        [Display(Name = "Tanggal Lahir")]
        public string TanggalLahir { get; set; }

        [Display (Name = "No Telpon")]
        public string NoTelpon { get; set; }

        [Required(ErrorMessage = "Email Harus Diisi dengan Format yang benar (contoh: nama@domain.com)")]
        [EmailAddress]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display (Name = "Jabatan")]
        public string Jabatan { get; set; }

        public string is_active { get; set; }
    }


}