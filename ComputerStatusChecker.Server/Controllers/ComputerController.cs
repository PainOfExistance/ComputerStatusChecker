using ComputerStatusChecker.Server.Controllers;
using ComputerStatusChecker.Server.Utils;
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

        [HttpGet("status{classroomId}", Name = "GetStaus")]
        public Task<IActionResult> GetComputerStatus([FromRoute] string classroomId)
        {
            List<string> devicesInSubnet = StatusCheck.GetDevicesInSameSubnetAsync().Result.ToList();

            Console.WriteLine("Devices in the same subnet:");
            foreach (string deviceIP in devicesInSubnet)
            {
                Console.WriteLine($"Device IP: {deviceIP}");
            }

            foreach (string deviceIP in devicesInSubnet)
            {
                string status = StatusCheck.GetDeviceStatusAsync(deviceIP).Result.ToString();
                Console.WriteLine($"Device IP: {deviceIP}, Status: {status}");

                if (status != "Operational")
                {
                    Console.WriteLine($"Attempting to get logs for device with IP: {deviceIP}");
                    StatusCheck.GetDeviceLogsAsync(deviceIP);
                }
            }

            //fix 
            return Task.FromResult<IActionResult>(Ok(devicesInSubnet));
        }
    }
}
