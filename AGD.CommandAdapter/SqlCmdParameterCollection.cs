using System.Collections.Generic;
using System.Runtime.Serialization;

namespace ADP.CommandAdapter
{
    public class SqlCmdParameterCollection  : Dictionary<string, SqlCmdParameterItem>
    {
        public SqlCmdParameterCollection()
        {

        }
        public SqlCmdParameterCollection(int capacity)
            : base(capacity)
        {

        }
        public SqlCmdParameterCollection(IEqualityComparer<string> comparer)
            : base(comparer)
        {

        }
        public SqlCmdParameterCollection(int capacity, IEqualityComparer<string> comparer)
            : base(capacity, comparer)
        {

        }
        public SqlCmdParameterCollection(IDictionary<string, SqlCmdParameterItem> dictionary)
            : base(dictionary)
        {

        }
        public SqlCmdParameterCollection(IDictionary<string, SqlCmdParameterItem> dictionary, IEqualityComparer<string> comparer)
            : base(dictionary, comparer)
        {

        }
        protected SqlCmdParameterCollection(SerializationInfo info, StreamingContext context)
            : base(info, context)
        {

        }
    }
}
