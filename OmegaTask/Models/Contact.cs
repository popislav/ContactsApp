using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

namespace OmegaTask.Models
{
    public class Contact
    {
        //public Contact(string json)
        //{
        //    JObject jObject = JObject.Parse(json);
        //    JToken jUser = jObject["contact"];
        //    Name = (string)jUser["Name"];
        //    Surname = (string)jUser["Surname"];
        //    City = (string)jUser["City"];
        //    Info = (string)jUser["Info"];
        //    Image = (string)jUser["Image"];
        //    Number = jUser["Number"].ToObject<List<Number>>();
        //}

        public int Id { get; set; }

        [Required(ErrorMessage = "Contact Name is Required")]
        public string Name { get; set; }
        public string Surname { get; set; }
        public string City { get; set; }
        public string Image { get; set; }
        public string Info { get; set; }     
    }

    public class Number
    {
        public int Id { get; set; }
       
        [Required(ErrorMessage = "Contact Number is Required")]
        public string numb { get; set; }
        public string type { get; set; }
        public string desc { get; set; }
        [Key]
        public int ContactId { get; set; }
    }
}
