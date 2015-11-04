using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.Entity;

namespace OmegaTask.Models
{
    public class ContactsAppContext:DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Number> Number { get; set; }

    }

}
