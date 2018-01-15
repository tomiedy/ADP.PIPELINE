using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AGD.CommandAdapter
{
    [Serializable]
    public class SqlCmdParameterItem
    {
        public string Name { get; private set; }
        public string RawName { get; private set; }
        public SqlCmdParameterDirection Direction { get; private set; }
        public object Value { get; set; }

        public SqlCmdParameterItem(string name, SqlCmdParameterDirection direction, object value)
        {
            Name = name;
            RawName = ":" + name;
            Direction = direction;
            Value = value;
        }
    }
}
