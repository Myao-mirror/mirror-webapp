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

        [HttpGet("/api/display")]
        public IEnumerable<Component> TestDisplay()
        {
            List<string> componentNames = new List<string>();
            componentNames.Add("test");
            List<Component> displays = new List<Component>();
            // System.Console.WriteLine("************************** displays" + displays[0].Name);
            foreach (string name in componentNames)
            {
                if (!HttpContext.Session.Keys.Any(k => k == name))
                {
                    Component c = new Component {
                        Name = name,
                        DisplayBool = false, 
                    };
                    HttpContext.Session.SetObjectAsJson(name, c);
                }
            }

            foreach (string key in HttpContext.Session.Keys) {
                Component s = HttpContext.Session.GetObjectFromJson<Component>(key);
                System.Console.WriteLine("************************* get method, keys in session " + s.Name);
                System.Console.WriteLine("************************* get method, display bool in session " + s.DisplayBool);
                displays.Add(s);
            }

            return displays;
        }

        [HttpPost("/api/display")]
        public IActionResult UpdateDisplay([FromBody]Component desiredComponent)
        {
            Component controlledComponent = HttpContext.Session.GetObjectFromJson<Component>(desiredComponent.Name.ToLower());
            if (controlledComponent == null)
            {
                return NotFound();
            }
            controlledComponent.DisplayBool = desiredComponent.DisplayBool;
            HttpContext.Session.SetObjectAsJson(desiredComponent.Name, controlledComponent);
            return Ok(controlledComponent);
        }

        [HttpGet("/api/haha")]
        public IActionResult Haha()
        {
            Component c = HttpContext.Session.GetObjectFromJson<Component>("test");
            System.Console.WriteLine("***************** c" + c.DisplayBool);
            return Ok(c);
        }
    }
}
