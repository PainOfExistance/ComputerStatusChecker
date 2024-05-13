using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace ComputerStatusChecker.Server
{
    public class Computer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _Id { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public string status { get; set; }

    }
}
