internal static class Globals
{
    internal const string OrderByAttributeKey = "OrderByAttribute";
    internal const string SearchFilterAttributeKey = "SearchFilterAttribute";
}

public enum SortOrder
{
    Descending,
    Ascending
}

public enum FilterType
{
    Equals,
    Contains
}