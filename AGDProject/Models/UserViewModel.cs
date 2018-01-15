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
}