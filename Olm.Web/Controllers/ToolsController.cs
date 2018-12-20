using Microsoft.AspNetCore.Mvc;

namespace Olm.Web.Controllers
{
    public class ToolsController : Controller
    {
        public IActionResult GennerateAdslink()
        {
            return View();
        }
    }
}