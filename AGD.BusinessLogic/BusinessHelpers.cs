using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;

namespace ADP.BusinessLogic
{
    public static class BusinessHelpers
    {

        public static Image ReziseImage(Image gambar, Size ukuran)
        {
            return (Image)(new Bitmap(gambar, ukuran));
        }
        /// <summary>
        /// Parse Object into Currency Rupiah
        /// </summary>
        /// <param name="value"></param>
        /// <returns>return DateTime value</returns>
        public static string AsCurrencyRp(this double price)
        {
            return String.Format(CultureInfo.CreateSpecificCulture("id-id"), "Rp. {0:N}", price);
        }

        public static string AsCurrencyNonRp(this double price)
        {
            return String.Format(CultureInfo.CreateSpecificCulture("id-id"), "{0:N}", price);
        }

        public static string GetString(this object obj)
        {
            string result = string.Empty;
            if (obj != DBNull.Value && obj != null)
            {
                result = obj.ToString();
            }
            return result;
        }

        /// <summary>
        /// Parse byte array into Base64String
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ToBase64String(this byte[] value)
        {
            string result = null;
            try
            {
                if (!value.Equals(DBNull.Value) && value != null)
                {
                    result = Convert.ToBase64String(value);
                }
            }
            catch { }
            return result;
        }

        /// <summary>
        /// Parse Base64String into byte array
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static byte[] FromBase64String(this string value)
        {
            byte[] result = null;
            try
            {
                if (!string.IsNullOrEmpty(value))
                {
                    result = Convert.FromBase64String(value);
                }
            }
            catch (Exception ex)
            {
            }
            return result;
        }

        /// <summary>
        /// Convert Base64String to Image
        /// </summary>
        /// <param name="base64String"></param>
        /// <returns></returns>
        public static Image FromBase64ToImage(this string base64String)
        {
            // Convert base 64 string to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            // Convert byte[] to Image
            using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
            {
                Image image = Image.FromStream(ms, true);
                return image;
            }
        }

        /// <summary>
        /// Convert Image To Base 64 String
        /// </summary>
        /// <param name="image"></param>
        /// <param name="format"></param>
        /// <returns></returns>
        public static string FromImageToBase64(this Image image, System.Drawing.Imaging.ImageFormat format)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                // Convert Image to byte[]
                image.Save(ms, format);
                byte[] imageBytes = ms.ToArray();

                // Convert byte[] to base 64 string
                string base64String = Convert.ToBase64String(imageBytes);
                return base64String;
            }
        }
        /// <summary>
        /// Convert Image To Byte Array
        /// </summary>
        /// <param name="imageIn"></param>
        /// <returns></returns>
        public static byte[] FromImageToByteArray(this System.Drawing.Image imageIn)
        {
            using (var ms = new MemoryStream())
            {
                imageIn.Save(ms, System.Drawing.Imaging.ImageFormat.Gif);
                return ms.ToArray();
            }
        }

        /// <summary>
        /// Parse object into DateTime
        /// </summary>
        /// <param name="value">Value To Parse</param>
        /// <returns>return DateTime value if success and DateTime.MinValue if failed</returns>
        public static DateTime AsDateTime(this object value)
        {
            DateTime result = DateTime.MinValue;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToDateTime(value);
                }
            }
            catch { }

            return result;
        }


        /// <summary>
        /// Parse object into Nullable DateTime
        /// </summary>
        /// <param name="value">Value To Parse</param>
        public static DateTime? AsNullableDateTime(this object value)
        {
            DateTime? result = (DateTime?)null;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToDateTime(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Parse object into Int32
        /// </summary>
        /// <param name="value">value To Parse</param>
        /// <returns>return int value if success and 0 if failed</returns>
        public static int AsInt32(this object value)
        {
            int result = 0;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToInt32(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Parse object into Nullable Int32
        /// </summary>
        /// <param name="value">value To Parse</param>
        public static int? AsNullableInt32(this object value)
        {
            int? result = (int?)null;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToInt32(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Parse object into Double
        /// </summary>
        /// <param name="value">value To Parse</param>
        /// <returns>return double value if success and 0 if failed</returns>
        public static double AsDouble(this object value)
        {
            double result = 0;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToDouble(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Parse object into Nullable Double
        /// </summary>
        /// <param name="value">value To Parse</param>
        public static double? AsNullableDouble(this object value)
        {
            double? result = null;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToDouble(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Parse object into Boolean
        /// </summary>
        /// <param name="value">value To Parse</param>
        /// <returns>return boolean value if success and false if failed</returns>
        public static bool AsBoolean(this object value)
        {
            bool result = false;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToBoolean(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Parse object into Nullable Boolean
        /// </summary>
        /// <param name="value">value To Parse</param>
        public static bool? AsNullableBoolean(this object value)
        {
            bool? result = null;
            try
            {
                if (value != DBNull.Value && value != null)
                {
                    result = Convert.ToBoolean(value);
                }
            }
            catch { }

            return result;
        }

        /// <summary>
        /// Map DataTable into generic Entity 
        /// </summary>
        /// <typeparam name="T">Generic Entity Class</typeparam>
        /// <param name="table">source table to map into "T"</param>
        /// <returns>IEnumerable "T"</returns>
        public static IEnumerable<T> AsEnumerable<T>(this System.Data.DataTable table) where T : new()
        {
            //check for table availability
            if (table == null)
                throw new NullReferenceException("DataTable");

            //grab property length
            int propertiesLength = typeof(T).GetProperties().Length;

            //if no properties stop
            if (propertiesLength == 0)
                throw new NullReferenceException("Properties");

            //create list to hold object T values
            var objList = new List<T>();

            //iterate thru rows of the datatable
            foreach (System.Data.DataRow row in table.Rows)
            {

                //create a new instance of our object T
                var obj = new T();

                //grab properties of object T
                System.Reflection.PropertyInfo[] objProperties = obj.GetType().GetProperties();

                //iterate thru and populate property values
                for (int i = 0; i < propertiesLength; i++)
                {
                    //grab current property
                    System.Reflection.PropertyInfo property = objProperties[i];

                    //check datatable to see if datacolumn exists
                    if (table.Columns.Contains(property.Name))
                    {
                        //get row cell value
                        object objValue = row[property.Name];

                        //check for nullable property type and handle
                        var propertyType = property.PropertyType;

                        if (propertyType.IsGenericType && propertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                            propertyType = propertyType.GetGenericArguments()[0];

                        //set property value
                        if (objValue != DBNull.Value)
                        {
                            objProperties[i].SetValue(obj, Convert.ChangeType(objValue, propertyType, System.Globalization.CultureInfo.CurrentCulture), null);
                        }
                        else
                        {
                            objProperties[i].SetValue(obj, null, null);
                        }
                    }

                }

                //add to obj list
                objList.Add(obj);

            }

            return objList;
        }
        /// <summary>
        /// Convert Terbilang from Double
        /// </summary>
        /// <param name="amount"></param>
        /// <returns></returns>
        public static string GetTerbilang(double amount)
        {
            string word = "";
            double divisor = 1000000000000.00; double large_amount = 0;
            double tiny_amount = 0;
            double dividen = 0; double dummy = 0;
            string weight1 = ""; string unit = ""; string follower = "";
            string[] prefix = { "SE", "DUA ", "TIGA ", "EMPAT ", "LIMA ", "ENAM ", "TUJUH ", "DELAPAN ", "SEMBILAN " };
            string[] sufix = { "SATU ", "DUA ", "TIGA ", "EMPAT ", "LIMA ", "ENAM ", "TUJUH ", "DELAPAN ", "SEMBILAN " };
            large_amount = Math.Abs(Math.Truncate(amount));
            tiny_amount = Math.Round((Math.Abs(amount) - large_amount) * 100);
            if (large_amount > divisor)
                return "OUT OF RANGE";
            while (divisor >= 1)
            {
                dividen = Math.Truncate(large_amount / divisor);
                large_amount = large_amount % divisor;
                unit = "";
                if (dividen > 0)
                {
                    if (divisor == 1000000000000.00)
                        unit = "TRILYUN ";
                    else
                        if (divisor == 1000000000.00)
                        unit = "MILYAR ";
                    else
                            if (divisor == 1000000.00)
                        unit = "JUTA ";
                    else
                                if (divisor == 1000.00)
                        unit = "RIBU ";
                }
                weight1 = "";
                dummy = dividen;
                if (dummy >= 100)
                    weight1 = prefix[(int)Math.Truncate(dummy / 100) - 1] + "RATUS ";
                dummy = dividen % 100;
                if (dummy < 10)
                {
                    if (dummy == 1 && unit == "RIBU ")
                        weight1 += "SE";
                    else
                        if (dummy > 0)
                        weight1 += sufix[(int)dummy - 1];
                }
                else
                    if (dummy >= 11 && dummy <= 19)
                {
                    weight1 += prefix[(int)(dummy % 10) - 1] + "BELAS ";
                }
                else
                {
                    weight1 += prefix[(int)Math.Truncate(dummy / 10) - 1] + "PULUH ";
                    if (dummy % 10 > 0)
                        weight1 += sufix[(int)(dummy % 10) - 1];
                }
                word += weight1 + unit;
                divisor /= 1000.00;
            }
            if (Math.Truncate(amount) == 0)
                word = "NOL ";
            follower = "";
            if (tiny_amount < 10)
            {
                if (tiny_amount > 0)
                    follower = "KOMA NOL " + sufix[(int)tiny_amount - 1];
            }
            else
            {
                follower = "KOMA " + sufix[(int)Math.Truncate(tiny_amount / 10) - 1];
                if (tiny_amount % 10 > 0)
                    follower += sufix[(int)(tiny_amount % 10) - 1];
            }
            word += follower;
            if (amount < 0)
            {
                word = "MINUS " + word + " RUPIAH";
            }
            else
            {
                word = word + "RUPIAH";
            }
            return word.Trim();
        }
    }
}
