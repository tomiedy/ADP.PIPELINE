using AGD.DataAccess;

namespace ADP.BusinessLogic
{
    public class UserBusinessLogic
    {
        public static bool CreateEmployee(string nama, string tempLahir, string tglLahir, string noTlp, string email, string jabatan)
        {
            return new UserDataAccess().CreateEmployee(nama, tempLahir, tglLahir, noTlp, email, jabatan);
        }

        public static bool CreateUser(string Username, string Password, string IdRole)
        {
            return new UserDataAccess().CreateUser(Username, Password, IdRole);
        }

    }
}
