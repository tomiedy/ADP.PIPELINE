using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace ADP.AdministratorTool
{
    internal class BaseCipher
    {
        #region Private variables and Constants
        private const string ENCRYPTION_KEY = "SurabayaPajak2017";

        private const string QUERY_PARTS_DELIMITOR = "&";
        private const string QUERY_PARAMS_DELIMITOR = "=";

        private readonly byte[] SALT = Encoding.ASCII.GetBytes(ENCRYPTION_KEY);
        private readonly byte[] key;
        private readonly byte[] iv;
        private readonly Rfc2898DeriveBytes keyGenerator;

        #endregion

        #region Constructor
        public BaseCipher()
        {
            keyGenerator = new Rfc2898DeriveBytes(ENCRYPTION_KEY, SALT);
            key = keyGenerator.GetBytes(32);
            iv = keyGenerator.GetBytes(16);
        }

        #endregion

        #region Encrypt/Decrypt Methods

        public string Encrypt(string inputText)
        {
            RijndaelManaged rijndaelCipher = new RijndaelManaged { Key = key, IV = iv };

            byte[] plainText = Encoding.Unicode.GetBytes(inputText);

            using (ICryptoTransform encryptor = rijndaelCipher.CreateEncryptor())
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                    {
                        cryptoStream.Write(plainText, 0, plainText.Length);
                        cryptoStream.FlushFinalBlock();
                        return Convert.ToBase64String(memoryStream.ToArray());
                    }
                }
            }
        }

        public string Decrypt(string inputText)
        {
            RijndaelManaged rijndaelCipher = new RijndaelManaged();
            byte[] encryptedData = Convert.FromBase64String(inputText);

            using (ICryptoTransform decryptor = rijndaelCipher.CreateDecryptor(key, iv))
            {
                using (MemoryStream memoryStream = new MemoryStream(encryptedData))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                    {
                        byte[] plainText = new byte[encryptedData.Length];
                        int decryptedCount = cryptoStream.Read(plainText, 0, plainText.Length);
                        return Encoding.Unicode.GetString(plainText, 0, decryptedCount);
                    }
                }
            }
        }

        #endregion
    }
}
