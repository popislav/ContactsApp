using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using OmegaTask.Models;
using Microsoft.Data.Entity.Update;

namespace OmegaTask.API.Controllers
{
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly ContactsAppContext _dbContext;

        public ContactsController(ContactsAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Contact> Get()
        {
            return _dbContext.Contacts;
        }


        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var contact = _dbContext.Contacts.FirstOrDefault(c => c.Id == id);
            if (contact == null)
            {
                return new HttpNotFoundResult();
            }
            else
            {
                return new ObjectResult(contact);
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody]Contact contact)
        {
            if (ModelState.IsValid)
            {
                if (contact.Id == 0)
                {

                    _dbContext.Contacts.Add(contact);
                    _dbContext.SaveChanges();
                    return new ObjectResult(contact);
                }
                else
                {
                    var original = _dbContext.Contacts.FirstOrDefault(c => c.Id == contact.Id);
                    original.Name = contact.Name;
                    original.Surname = contact.Surname;
                    original.City = contact.City;
                    original.Info = contact.Info;
                    original.Image = contact.Image;
                    _dbContext.SaveChanges();
                    return new ObjectResult(original);
                }
            }
            return new BadRequestObjectResult(ModelState);

        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var contact = _dbContext.Contacts.FirstOrDefault(c => c.Id == id);
            _dbContext.Contacts.Remove(contact);
            _dbContext.SaveChanges();
            return new HttpStatusCodeResult(200);
        }
    }




    [Route("api/[controller]")]
    public class NumbersController : Controller
    {
        private readonly ContactsAppContext _dbContext;

        public NumbersController(ContactsAppContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<Number> Get()
        {
            return _dbContext.Number;
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var number = _dbContext.Number.Where(n => n.ContactId == id).ToList();
            if (number == null)
            {
                return new HttpNotFoundResult();
            }
            else
            {
                return new ObjectResult(number);
            }
        }

        [HttpPost]      
        public IActionResult Post([FromBody]Number number)
        {
            if (ModelState.IsValid)
            {
                if (number.Id == 0)
                {
                    _dbContext.Number.Add(number);
                    _dbContext.SaveChanges();
                    return new ObjectResult(number);
                }
                else
                {
                    var original = _dbContext.Number.FirstOrDefault(n => n.Id == number.Id);
                    original.numb = number.numb;
                    original.type = number.type;
                    original.desc = number.desc;
                    _dbContext.SaveChanges();
                    return new ObjectResult(original);
                }
            }
            return new BadRequestObjectResult(ModelState);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id, [FromBody]Number number)
        {   
            var numbers = _dbContext.Number.Where(n => n.ContactId == id);
            _dbContext.Number.RemoveRange(numbers);
            bool saveFailed;
            do
            {
                saveFailed = false;
                try
                {
                    _dbContext.SaveChanges();
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    saveFailed = true;
                    ex.Entries.Single().AcceptChanges();
                }

            } while (saveFailed);
            return new HttpStatusCodeResult(200);
        }
    }
}

