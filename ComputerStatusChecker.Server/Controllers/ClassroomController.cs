using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ComputerStatusChecker.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClassroomController : ControllerBase
    {
        private readonly ILogger<ClassroomController> _logger;
        private readonly IMongoDatabase _database;

        public ClassroomController(ILogger<ClassroomController> logger, IMongoDatabase database)
        {
            _logger = logger;
            _database = database;
        }

        [HttpGet(Name = "GetClassrooms")]
        public async Task<IActionResult> GetClassrooms()
        {
            try
            {
                var collections = await _database.ListCollectionNamesAsync();
                var collectionNames = await collections.ToListAsync();

                return Ok(collectionNames.Where(x=>x!="reports").ToList());
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving collection names: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
