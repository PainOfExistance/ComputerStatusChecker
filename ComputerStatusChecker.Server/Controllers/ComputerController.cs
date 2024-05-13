using ComputerStatusChecker.Server.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;

namespace ComputerStatusChecker.Server
{
    [ApiController]
    [Route("[controller]")]
    public class ComputerController : ControllerBase
    {

        private readonly ILogger<ComputerController> _logger;
        private readonly IMongoDatabase _database;

        public ComputerController(ILogger<ComputerController> logger, IMongoDatabase database)
        {
            _logger = logger;
            _database = database;
        }


        [HttpGet("{id}", Name = "GetComputers")]
        public async Task<IActionResult> GetComputers([FromRoute] string id)
        {
            var collection = _database.GetCollection<Computer>(id);
            var computers = await collection.FindAsync(new BsonDocument());
            var computerList = await computers.ToListAsync();
            return Ok(computerList);
        }
    }
}
