using ComputerStatusChecker.Server.classes;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace ComputerStatusChecker.Server
{
    [ApiController]
    [Route("[controller]")]
    public class ErrorController : ControllerBase
    {

        private readonly ILogger<ErrorController> _logger;
        private readonly IMongoDatabase _database;

        public ErrorController(ILogger<ErrorController> logger, IMongoDatabase database)
        {
            _logger = logger;
            _database = database;
        }

        [HttpGet("{id}", Name = "GetErrorsForComputer")]
        public async Task<IActionResult> GetErrorsForComputer([FromRoute] string id)
        {
            Console.WriteLine(id);
            var collection = _database.GetCollection<Error>("reports");
            var filter = Builders<Error>.Filter.Eq("name", id);
            var errors = await collection.Find(filter).ToListAsync();
            
            /*var errorDTOs = new List<ErrorDTO>();
            errors.ForEach(e => errorDTOs.Add(new ErrorDTO
            {
                ID = e._Id.ToString(),
                Name = e.name,
                ErrorMessage = e.errorMessage,
                Severity = e.severity
            }));*/

            return Ok(errors);
        }

        [HttpPost("addError", Name = "AddError")]
        public async Task<IActionResult> AddError([FromBody] Error error)
        {
            try
            {
                var collection = _database.GetCollection<Error>("reports");
                await collection.InsertOneAsync(error);
                return CreatedAtAction(nameof(GetErrorsForComputer), new { id = error._Id }, error);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding error");
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("deleteError/{errorId}", Name = "DeleteError")]
        public async Task<IActionResult> DeleteError([FromRoute] string errorId)
        {
            Console.WriteLine(errorId);
            var collection = _database.GetCollection<Error>("reports");
            var filter = Builders<Error>.Filter.Eq("_id", ObjectId.Parse(errorId));
            var result = await collection.DeleteOneAsync(filter);
            if (result.DeletedCount > 0)
            {
                return Ok();
            }
            return NotFound();
        }

    }
}
