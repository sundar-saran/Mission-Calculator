using PagedList;
using System.Collections.Generic;

namespace SalaryFormulaUtility.Models
{
    public class FormulaSearchModel
    {
        public string SearchText { get; set; }
        public int PageSize { get; set; } = 10;
        public int CurrentPageNumber { get; set; } = 1;

        public IPagedList<FormulaModel> FormulaList { get; set; }
    }
}
