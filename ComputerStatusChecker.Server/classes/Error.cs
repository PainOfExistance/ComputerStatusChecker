using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ComputerStatusChecker.Server.classes
{
    public class Error
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _Id { get; set; }
        public string name { get; set; }
        public string errorMessage { get; set; }
        public string severity { get; set; }
    }
}
