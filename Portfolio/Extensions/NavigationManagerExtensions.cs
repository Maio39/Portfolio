using Microsoft.AspNetCore.Components;

namespace Portfolio.Extensions
{
    public static class NavigationManagerExtensions
    {
        public static void NavigateToCountry(this NavigationManager navigationManager, string countryName)
        {
            navigationManager.NavigateTo($"/{countryName}");
        }
    }
}
