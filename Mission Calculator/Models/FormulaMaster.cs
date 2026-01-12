using System;

namespace FormulaUtility.Mvc.Models
{
    public class FormulaMaster
    {
        public int FormulaId { get; set; }
        public string FormulaName { get; set; }
        public string FormulaDefinition { get; set; }
        public DateTime EffectiveDate { get; set; }
        public bool IsActive { get; set; }
    }
}
