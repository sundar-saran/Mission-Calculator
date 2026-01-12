using NCalc;
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Linq;


namespace FormulaUtility.Mvc.Services
{

    public static class FormulaValidator
    {

        public static string NormalizeFormula(string formula)
        {
            if (string.IsNullOrWhiteSpace(formula))
                return formula;

            formula = Regex.Replace(formula, @"\s+", " ").Trim();

            // Normalize booleans
            formula = Regex.Replace(formula, @"\bTRUE\b", "true", RegexOptions.IgnoreCase);
            formula = Regex.Replace(formula, @"\bFALSE\b", "false", RegexOptions.IgnoreCase);

            formula = Regex.Replace(
                formula,
                @"(\b[A-Za-z_][A-Za-z0-9_]*\b)\s*==\s*true",
                "$1 != 0",
                RegexOptions.IgnoreCase
            );

            formula = Regex.Replace(
                formula,
                @"(\b[A-Za-z_][A-Za-z0-9_]*\b)\s*==\s*false",
                "$1 == 0",
                RegexOptions.IgnoreCase
            );

            // Math functions
            formula = formula.Replace("Math.Min", "min")
                             .Replace("Math.Max", "max");

            formula = ConvertCaseToIf(formula);
            formula = ConvertTernaryToIf(formula);

            return formula;
        }

        public static void Validate(string formula, List<string> elements, List<string> bools)
        {

            if (string.IsNullOrWhiteSpace(formula))
                throw new Exception("Formula body cannot be empty");

            // Normalize
            var normalized = NormalizeFormula(formula);

            // ---------------- IDENTIFIER VALIDATION ----------------

            var identifiers = Regex.Matches(normalized, @"\b[A-Za-z_][A-Za-z0-9_]*\b")
                                   .Cast<Match>()
                                   .Select(m => m.Value)
                                   .Distinct(StringComparer.OrdinalIgnoreCase)
                                   .ToList();

            // Allowed system keywords / functions
            var allowedKeywords = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
            {
                "if", "min", "max", "true", "false",
                "case", "when", "then", "else", "end"
            };


            // Validate identifiers
            foreach (var id in identifiers)
            {
                if (allowedKeywords.Contains(id))
                    continue;

                if (elements.Any(e => e.Equals(id, StringComparison.OrdinalIgnoreCase)))
                    continue;

                if (bools.Any(b => b.Equals(id, StringComparison.OrdinalIgnoreCase)))
                    continue;

                throw new Exception($"Invalid element or boolean found: '{id}'");
            }

            // ---------------- NCalc Validation ----------------

            var exp = new Expression(normalized, EvaluateOptions.IgnoreCase);

            exp.EvaluateParameter += (name, args) =>
            {
                args.Result = 10;
            };

            exp.EvaluateFunction += (name, args) =>
            {
                if (name.Equals("min", StringComparison.OrdinalIgnoreCase))
                {
                    args.Result = Math.Min(
                        Convert.ToDouble(args.Parameters[0].Evaluate()),
                        Convert.ToDouble(args.Parameters[1].Evaluate())
                    );
                }

                if (name.Equals("max", StringComparison.OrdinalIgnoreCase))
                {
                    args.Result = Math.Max(
                        Convert.ToDouble(args.Parameters[0].Evaluate()),
                        Convert.ToDouble(args.Parameters[1].Evaluate())
                    );
                }
            };

            exp.Evaluate();
        }

        private static string ConvertTernaryToIf(string expr)
        {
            if (!expr.Contains("?"))
                return expr;

            // Normalize outer parentheses
            expr = Regex.Replace(expr, @"\s+", " ");

            while (expr.Contains("?"))
            {
                // Match the LAST ternary
                var match = Regex.Match(
                    expr,
                    @"(?<cond>\([^()]+\)|[^?:]+)\s*\?\s*(?<true>\([^()]+\)|[^?:]+)\s*:\s*(?<false>\([^()]+\)|[^?:]+)",
                    RegexOptions.RightToLeft
                );

                if (!match.Success)
                    break;

                var ifExpr =
                    $"if({match.Groups["cond"].Value}, {match.Groups["true"].Value}, {match.Groups["false"].Value})";

                expr =
                    expr.Substring(0, match.Index) +
                    ifExpr +
                    expr.Substring(match.Index + match.Length);
            }

            return expr;
        }

        private static string ConvertCaseToIf(string expr)
        {
            // Supports single WHEN only
            var pattern = new Regex(
                @"CASE\s+WHEN\s+(?<cond>.+?)\s+THEN\s+(?<true>.+?)\s+ELSE\s+(?<false>.+?)\s+END",
                RegexOptions.IgnoreCase | RegexOptions.Singleline
            );

            while (pattern.IsMatch(expr))
            {
                expr = pattern.Replace(expr, m =>
                    $"if({m.Groups["cond"].Value}, {m.Groups["true"].Value}, {m.Groups["false"].Value})"
                );
            }

            return expr;
        }

        public static object Evaluate(string formula, Dictionary<string, double> values)
        {
            var normalized = NormalizeFormula(formula);

            var exp = new Expression(normalized, EvaluateOptions.IgnoreCase);

            exp.EvaluateParameter += (name, args) =>
            {
                if (values.ContainsKey(name))
                    args.Result = values[name];
                else
                    args.Result = 0;
            };

            exp.EvaluateFunction += (name, args) =>
            {
                if (name.Equals("min", StringComparison.OrdinalIgnoreCase))
                    args.Result = Math.Min(
                        Convert.ToDouble(args.Parameters[0].Evaluate()),
                        Convert.ToDouble(args.Parameters[1].Evaluate())
                    );

                if (name.Equals("max", StringComparison.OrdinalIgnoreCase))
                    args.Result = Math.Max(
                        Convert.ToDouble(args.Parameters[0].Evaluate()),
                        Convert.ToDouble(args.Parameters[1].Evaluate())
                    );
            };

            return exp.Evaluate();
        }

    }
}
