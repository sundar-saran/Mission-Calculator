using FormulaUtility.Mvc.Models;
using NCalc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace FormulaUtility.Mvc.Repositories
{
    public static class FormulaRepository
    {
        private static List<FormulaMaster> _data = new List<FormulaMaster>
        {
            new FormulaMaster
            {
                FormulaId = 1,
                FormulaName = "Basic Salary",
                FormulaDefinition = "B + HRA",
                EffectiveDate = DateTime.Today.AddDays(-10),
                IsActive = true
            },
            new FormulaMaster
            {
                FormulaId = 2,
                FormulaName = "HRA",
                FormulaDefinition = "(B * 40) / 100",
                EffectiveDate = DateTime.Today.AddDays(-1),
                IsActive = true
            }
        };

        public static List<FormulaGridItem> Search(string search)
        {
            search = string.IsNullOrWhiteSpace(search)
                        ? null
                        : search.Trim().ToLower();

            return _data
                .Where(x =>
                    search == null ||
                    x.FormulaName.ToLower().Contains(search)
                )
                .Select(x => new FormulaGridItem
                {
                    FormulaId = x.FormulaId,
                    FormulaName = x.FormulaName,
                    EffectiveDate = x.EffectiveDate
                })
                .ToList();
        }

        public static FormulaMaster GetById(int id)
        {
            return _data.FirstOrDefault(x => x.FormulaId == id);
        }

        public static void Add(FormulaMaster model)
        {
            model.FormulaId = _data.Max(x => x.FormulaId) + 1;
            model.EffectiveDate = DateTime.Today;
            _data.Add(model);
        }

        public static void Update(FormulaMaster model)
        {
            var old = GetById(model.FormulaId);
            if (old == null) return;

            old.FormulaName = model.FormulaName;
            old.FormulaDefinition = model.FormulaDefinition;
            old.EffectiveDate = model.EffectiveDate;
        }

        public static void Delete(int id)
        {
            var obj = GetById(id);
            if (obj != null) _data.Remove(obj);
        }

        public static bool Validate(string formula, out string error)
        {
            error = null;

            try
            {
                // Normalize
                formula = NormalizeFormula(formula);

                var exp = new Expression(formula, EvaluateOptions.IgnoreCase);

                // Define allowed variables (dummy values)
                exp.EvaluateParameter += (name, args) =>
                {
                    args.Result = 1; // All variables numeric
                };

                // Define functions
                exp.EvaluateFunction += (name, args) =>
                {
                    if (name.Equals("min", StringComparison.OrdinalIgnoreCase))
                        args.Result = Math.Min(
                            Convert.ToDecimal(args.Parameters[0].Evaluate()),
                            Convert.ToDecimal(args.Parameters[1].Evaluate())
                        );

                    if (name.Equals("max", StringComparison.OrdinalIgnoreCase))
                        args.Result = Math.Max(
                            Convert.ToDecimal(args.Parameters[0].Evaluate()),
                            Convert.ToDecimal(args.Parameters[1].Evaluate())
                        );
                };

                exp.Evaluate();

                return true;
            }
            catch (Exception ex)
            {
                error = ex.Message;
                return false;
            }
        }

        private static string NormalizeFormula(string formula)
        {
            formula = formula.Replace("&&", " and ");
            formula = formula.Replace("||", " or ");
            formula = formula.Replace("True", "true");
            formula = formula.Replace("False", "false");
            formula = Regex.Replace(formula, @"Math\.Min", "min", RegexOptions.IgnoreCase);
            formula = Regex.Replace(formula, @"Math\.Max", "max", RegexOptions.IgnoreCase);

            // CASE → ternary (simple version)
            formula = Regex.Replace(
                formula,
                @"CASE\s+WHEN\s+(.*?)\s+THEN\s+(.*?)\s+ELSE\s+(.*?)\s+END",
                "($1 ? $2 : $3)",
                RegexOptions.IgnoreCase
            );

            return formula;
        }

    }
}
