using FormulaUtility.Mvc.Models;
using FormulaUtility.Mvc.Repositories;
using FormulaUtility.Mvc.Services;
using Mission_Calculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web.Mvc;
namespace FormulaUtility.Mvc.Controllers
{
    public class FormulaController : Controller
    {
        public ActionResult Index()
        {
            var model = new FormulaDetailViewModel
            {
                FormulaList = FormulaRepository.Search(null)
            };
            return View(model);
        }

        [HttpPost]
        public ActionResult Search(FormulaDetailViewModel model)
        {
            model.SearchText = string.IsNullOrWhiteSpace(model.SearchText)
                                ? null
                                : model.SearchText.Trim();

            model.FormulaList = FormulaRepository.Search(model.SearchText);
            return PartialView("_SearchGrid", model);
        }

        // CREATE (GET)
        public ActionResult Create()
        {
            var model = new FormulaCreateViewModel();
            model.ElementList = GetDummyElements();
            model.BoolList = GetBool();

            return View(model);
        }

        [HttpPost]
        public JsonResult ValidateFormula(string formula)
        {
            try
            {
                // existing lists
                var elements = GetDummyElements()
                                .Select(x => x.Value)
                                .Where(x => !string.IsNullOrWhiteSpace(x))
                                .ToList();

                var bools = GetBool()
                                .Select(x => x.Value.ToLower())
                                .ToList();

                FormulaValidator.Validate(formula, elements, bools);

                return Json(new FormulaValidationResult { IsValid = true });
            }
            catch (Exception ex)
            {
                return Json(new FormulaValidationResult
                {
                    IsValid = false,
                    ErrorMessage = ex.Message
                });
            }
        }

        // CREATE (POST)
        [HttpPost]
        public ActionResult Create(FormulaCreateViewModel model)
        {
            model.FormulaName = model.FormulaName?.Trim();
            model.FormulaDefinition = model.FormulaDefinition?.Trim();

            if (string.IsNullOrEmpty(model.FormulaName))
            {
                ModelState.AddModelError("FormulaName", "Formula name is required");
            }

            if (string.IsNullOrEmpty(model.FormulaDefinition))
            {
                ModelState.AddModelError("FormulaDefinition", "Formula body is required");
            }

            if (!ModelState.IsValid)
            {
                model.ElementList = GetDummyElements();
                model.BoolList = GetBool();
                return View(model);
            }

            FormulaRepository.Add(new FormulaMaster
            {
                FormulaName = model.FormulaName,
                FormulaDefinition = model.FormulaDefinition,
                IsActive = true
            });

            return RedirectToAction("Index");
        }

        private List<SelectListItem> GetDummyElements()
        {
            return new List<SelectListItem>
            {
                new SelectListItem { Text = "Basic", Value = "B" },
                new SelectListItem { Text = "HRA", Value = "HRA" },
                new SelectListItem { Text = "Special Allowance", Value = "SP" },
                new SelectListItem { Text = "Meal Card", Value = "MC" },
                new SelectListItem { Text = "Conveyance", Value = "con" },
                new SelectListItem { Text = "PF ", Value = "PF" },
                new SelectListItem { Text = "ESIC", Value = "ESIC" }
            };
        }

        private List<SelectListItem> GetBool()
        {
            return new List<SelectListItem>
            {
                new SelectListItem { Text = "true", Value = "true" },
                new SelectListItem { Text = "false", Value = "false" }
            };
        }
        // GET
        public ActionResult Edit(int id)
        {
            var data = FormulaRepository.GetById(id);

            var model = new FormulaCreateViewModel
            {
                FormulaId = data.FormulaId,
                FormulaName = data.FormulaName,
                FormulaDefinition = data.FormulaDefinition,
                ElementList = GetDummyElements(),
                BoolList = GetBool()
            };

            return View(model);
        }

        [HttpPost]
        public ActionResult Edit(FormulaCreateViewModel model)
        {
            model.FormulaName = model.FormulaName?.Trim();
            model.FormulaDefinition = model.FormulaDefinition?.Trim();

            if (string.IsNullOrEmpty(model.FormulaName))
            {
                ModelState.AddModelError("FormulaName", "Formula name is required");
            }

            if (string.IsNullOrEmpty(model.FormulaDefinition))
            {
                ModelState.AddModelError("FormulaDefinition", "Formula body is required");
            }

            if (!ModelState.IsValid)
            {
                model.ElementList = GetDummyElements();
                model.BoolList = GetBool();
                return View(model);
            }

            FormulaRepository.Update(new FormulaMaster
            {
                FormulaId = model.FormulaId,
                FormulaName = model.FormulaName,
                FormulaDefinition = model.FormulaDefinition,
                IsActive = true
            });

            return RedirectToAction("Index");
        }

        [HttpPost]
        public JsonResult Delete(int id)
        {
            FormulaRepository.Delete(id);
            return Json(true);
        }

        [HttpPost]
        public JsonResult TestFormula(TestFormulaRequest model)
        {
            try
            {
                var result = FormulaValidator.Evaluate(
                    model.Formula,
                    model.Values
                );

                return Json(new { Result = result });
            }
            catch (Exception ex)
            {
                return Json(new { Result = "Error: " + ex.Message });
            }
        }

    }
}
