using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Mission_Calculator.Models
{
    public class TestFormulaRequest
    {
        public string Formula { get; set; }
        public Dictionary<string, double> Values { get; set; }
    }

}