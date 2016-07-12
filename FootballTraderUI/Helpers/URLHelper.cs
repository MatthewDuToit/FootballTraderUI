namespace FootballTraderUI.Helpers
{
    public class URLHelper
    {
        public static string GetAbsoluteURL(string baseUrl, string url)
        {
            if (baseUrl.EndsWith("/"))
            {
                return baseUrl + url;
            }
            else
            {
                return baseUrl + "/" + url;
            }
        }
    }
}
