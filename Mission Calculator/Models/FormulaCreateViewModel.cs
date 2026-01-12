using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace FormulaUtility.Mvc.Models
{
    public class FormulaCreateViewModel
    {
        public FormulaCreateViewModel()
        {
            ElementList = new List<SelectListItem>();
            BoolList = new List<SelectListItem>();
        }

        public int FormulaId { get; set; }

        [Required]
        public string FormulaName { get; set; }

        [Required]
        public string FormulaDefinition { get; set; }

        public string SelectedElement { get; set; }
        public string SelectedBool { get; set; }

        public List<SelectListItem> ElementList { get; set; }
        public List<SelectListItem> BoolList { get; set; }

        public string ConstantValue { get; set; }
    }

}
