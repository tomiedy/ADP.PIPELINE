using System;

namespace ADP.BusinessLogic.Entity
{
    public class Project
    {
        public string Id { get; set; }
        public string Nama { get; set; }
        public string Kota { get; set; }
        public string Alamat { get; set; }
        public DateTime StartDate { get; set; }
        public string strStartDate
        {
            get
            {
                return StartDate.ToString("dd/MM/yyyy");
            }
        }
        public string NoKontrak { get; set; }
        public string NoSpk { get; set; }
        public string TelpSpk { get; set; }
    }

    public class ProjectCustomer
    {
        public string Id { get; set; }
        public string Nama { get; set; }
        public string Alamat { get; set; }
        public string Kota { get; set; }
        public string Telp { get; set; }
        public string Email { get; set; }

    }
}
