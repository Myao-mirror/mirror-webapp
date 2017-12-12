using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models;

namespace Server.Controllers
{
    public class TestController : Controller
    {
        public static bool TestDisplayBool;
        List<Component> displays = new List<Component> {
            new Component { Name = "test", DisplayBool = false },
        };

        [HttpGet("/api/display")]
        public IEnumerable<Component> TestDisplay()
        {
            return displays;
        }

        [HttpPost("/api/display")]
        public IActionResult UpdateDisplay([FromBody]Component desiredComponent)
        {
            Component controlledComponent = displays.FirstOrDefault(c => c.Name == desiredComponent.Name.ToLower());
            if (controlledComponent == null)
            {
                return NotFound();
            }

            TestDisplayBool = desiredComponent.DisplayBool;
            controlledComponent.DisplayBool = TestDisplayBool;
            return Ok(controlledComponent);
        }
    }
}
