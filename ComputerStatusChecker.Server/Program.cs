using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors.Infrastructure;
using MongoDB.Bson;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    const string connectionUri = "mongodb+srv://matej113a:3oPU1cDu1Oq3fxjp@cluster.nqrzfoz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";
    var settings = MongoClientSettings.FromConnectionString(connectionUri);
    settings.ServerApi = new ServerApi(ServerApiVersion.V1);
    var client = new MongoClient(settings);
    try
    {
        var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
        Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (Exception ex)
    {
        Console.WriteLine(ex);
    }
    var database = client.GetDatabase("sers");
    return database;
});

var app = builder.Build();

// Configure CORS to allow all origins, methods, and headers
app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
