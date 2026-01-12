using System;

namespace SalaryFormulaUtility.Models
{
    public class FormulaModel
    {
        public long FormulaId { get; set; }
        public string FormulaName { get; set; }
        public string FormulaDefinition { get; set; }
        public DateTime EffectiveDate { get; set; }
        public bool IsActive { get; set; }
    }
}
