using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ComputerStatusChecker.Server.classes
{
    public class ErrorDTO
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string ErrorMessage { get; set; }
        public string Severity { get; set; }
    }
}
