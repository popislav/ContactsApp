using System;
using Microsoft.Data.Entity;
using Microsoft.Data.Entity.Metadata;
using Microsoft.Data.Entity.Relational.Migrations.Infrastructure;
using OmegaTask.Models;

namespace OmegaTask.Migrations
{
    [ContextType(typeof(ContactsAppContext))]
    partial class ContactsAppContextModelSnapshot : ModelSnapshot
    {
        public override void BuildModel(ModelBuilder builder)
        {
            builder
                .Annotation("SqlServer:DefaultSequenceName", "DefaultSequence")
                .Annotation("SqlServer:Sequence:.DefaultSequence", "'DefaultSequence', '', '1', '10', '', '', 'Int64', 'False'")
                .Annotation("SqlServer:ValueGeneration", "Sequence");
            
            builder.Entity("OmegaTask.Models.Contact", b =>
                {
                    b.Property<int>("Id")
                        .GenerateValueOnAdd()
                        .StoreGeneratedPattern(StoreGeneratedPattern.Identity);
                    
                    b.Property<string>("City");
                    
                    b.Property<string>("Image");
                    
                    b.Property<string>("Info");
                    
                    b.Property<string>("Name");
                    
                    b.Property<string>("Surname");
                    
                    b.Key("Id");
                });
            
            builder.Entity("OmegaTask.Models.Number", b =>
                {
                    b.Property<int>("Id")
                        .GenerateValueOnAdd()
                        .StoreGeneratedPattern(StoreGeneratedPattern.Identity);
                    
                    b.Property<int>("ContactId");
                    
                    b.Property<string>("desc");
                    
                    b.Property<string>("numb");
                    
                    b.Property<string>("type");
                    
                    b.Key("Id");
                });
        }
    }
}
