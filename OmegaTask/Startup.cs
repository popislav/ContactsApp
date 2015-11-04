using Microsoft.AspNet.Hosting;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Data.Entity;
using OmegaTask.Models;
using Microsoft.AspNet.Builder;
using Microsoft.Framework.Runtime;
using Microsoft.Framework.Configuration;

namespace OmegaTask
{
    public class Startup
    {
        public Startup(IHostingEnvironment env, IApplicationEnvironment appEnv)
        {
            // Setup configuration sources.
            var builder = new ConfigurationBuilder(appEnv.ApplicationBasePath)
            .AddJsonFile("config.json")
            .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; set; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            // Register Entity Framework
            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<ContactsAppContext>(options =>
                {
                    options.UseSqlServer(Configuration.Get("Data:DefaultConnection:ConnectionString"));
                });                
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseMvc();
        }
    }    
}
