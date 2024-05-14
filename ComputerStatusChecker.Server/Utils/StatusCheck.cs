using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace ComputerStatusChecker.Server.Utils
{
    public class StatusCheck
    {
        public static async Task<List<string>> GetDevicesInSameSubnetAsync()
        {
            List<string> deviceIPs = new List<string>();

            string subnet = "192.168.88"; // Hardcoded subnet to .88
            for (int i = 1; i < 255; i++)
            {
                string ip = $"{subnet}.{i}";
                deviceIPs.Add(ip);
            }

            return deviceIPs;
        }

        private static async Task<string> GetLocalIPAddressAsync()
        {
            string localIP = null;

            try
            {
                string hostName = Dns.GetHostName();
                IPHostEntry ipEntry = await Dns.GetHostEntryAsync(hostName);

                foreach (IPAddress ip in ipEntry.AddressList)
                {
                    if (ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                    {
                        localIP = ip.ToString();
                        break;
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error getting local IP address: {ex.Message}");
            }

            return localIP;
        }

        public static async Task<string> GetDeviceStatusAsync(string ip)
        {
            using (Ping ping = new Ping())
            {
                PingReply reply = await ping.SendPingAsync(ip, 100); // Adjust timeout as needed
                return reply.Status switch
                {
                    IPStatus.Success => "Operational",
                    IPStatus.TimedOut => "Timeout",
                    IPStatus.DestinationHostUnreachable => "Unreachable",
                    _ => "Unknown",
                };
            }
        }

        public static async Task GetDeviceLogsAsync(string ip)
        {
            List<string> logTypes = new List<string>() { "System", "Security", "Application" };
            foreach (string logType in logTypes)
            {
                try
                {
                    using (EventLog eventLog = new EventLog(logType, ip))
                    {
                        Console.WriteLine($"Event Log Name: {eventLog.Log}");
                        await Task.Run(() =>
                        {
                            foreach (EventLogEntry entry in eventLog.Entries)
                            {
                                Console.WriteLine($"Event ID: {entry.InstanceId}, Source: {entry.Source}, Message: {entry.Message}");
                            }
                        });
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error accessing Event Log '{logType}' on '{ip}': {ex.Message}");
                    // Handle the exception gracefully, log it, or take appropriate action
                }
                //todo fixx
            }
        }
    }
}
