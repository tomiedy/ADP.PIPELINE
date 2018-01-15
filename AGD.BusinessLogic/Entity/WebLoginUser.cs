namespace ADP.BusinessLogic.Entity
{
    public class WebLoginUser
    {
        public string Id_User { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool Is_Deleted { get; set; }
        public bool Is_Activated { get; set; }
        public string Id_Role { get; set; }
        public string Kd_Uptd { get; set; }
        public string Nm_Role { get; set; }
    }
}
