using ADP.CommandAdapter;
using System;
using System.Windows.Forms;

namespace TesDB
{
    public partial class frmTesKoneksi : Form
    {
        public frmTesKoneksi()
        {
            InitializeComponent();
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            Application.Exit();
        }

        private bool TesKoneksi(string Server, string Database, string UserId, string Password, out string pesanError)
        {
            pesanError = string.Empty;
            bool isSuccess = false;

            SqlCmdBuilder cmd = new SqlCmdBuilder(tbServer.Text, tbDB.Text, tbUser.Text, tbPassword.Text);
            cmd.TestConnection(out pesanError);
            if (string.IsNullOrEmpty(pesanError))
                isSuccess = true;

            return isSuccess;
        }

        private void btnTes_Click(object sender, EventArgs e)
        {
            string pesan = string.Empty;
            if (TesKoneksi(tbServer.Text, tbDB.Text, tbUser.Text, tbPassword.Text, out pesan))
                MessageBox.Show("Koneksi Berhasil", "Perhatian");
            else
                MessageBox.Show("Koneksi gagal, " + pesan, "Peringatan");
        }
    }
}
