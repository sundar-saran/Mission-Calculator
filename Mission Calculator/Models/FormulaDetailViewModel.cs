using System.Collections.Generic;

namespace FormulaUtility.Mvc.Models
{
    public class FormulaDetailViewModel
    {
        public string SearchText { get; set; }
        public int PageSize { get; set; } = 10;
        public int CurrentPage { get; set; } = 1;

        public List<FormulaGridItem> FormulaList { get; set; }
    }
}
