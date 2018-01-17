using System;

namespace ADP.BusinessLogic.Entity
{
    public class WebLoginUser
    {
        //public string Id_User { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public bool allow_login { get; set; }
        //public bool Is_Activated { get; set; }
        //public string Id_Role { get; set; }
        //public string Kd_Uptd { get; set; }
        //public string Nm_Role { get; set; }
    }

    public class Employee
    {   public string id_employee { get; set; }
        public string Nama { get; set; }
       // public string Username { get; set; }
       // public string Password { get; set; }
       // public string ConfirmPassword { get; set; }
        public string Tempat_Lahir { get; set; }
        public string tgl_lahir { get; set; }
        public string No_telp { get; set; }
        public string mail_address { get; set; }
        public string Jabatan { get; set; }
        public string is_active { get; set; }
    }

}
