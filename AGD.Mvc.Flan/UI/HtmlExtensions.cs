using MvcContrib.UI.Grid;
using MvcContrib.UI.Grid.Syntax;

namespace ADP.Mvc.Flan.UI
{
    public static class HtmlExtensions
    {
        public static IGridWithOptions<T> RowAlternateColor<T>(this IGridWithOptions<T> grid) where T : class
        {
            grid.Model.Sections.RowStart(a => (a.IsAlternate) ? "<tr class='tr-alt-item'>" : "<tr>");
            return grid;
        }
    }
}
