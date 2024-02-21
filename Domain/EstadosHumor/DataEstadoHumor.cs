using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using DDDSample1.Domain.Shared;
using Microsoft.CodeAnalysis.Text;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.EstadosHumor
{
    [ComplexType]
    
    public class DataEstadoHumor : IValueObject
    {
        public DateTime _DataEstadoHumor;

        private DataEstadoHumor(){}

        public DataEstadoHumor(string data)
        {
            var formats1 = new[] { "yyyy-M-d", "yyyy-M-dd", "yyyy-MM-d", "yyyy-MM-dd" };
            var formats = new[] { "d/M/yyyy", "dd/M/yyyy", "d/MM/yyyy", "dd/MM/yyyy" };
            DateTime dt;
            Console.WriteLine("DATA->"+data);
            if (DateTime.TryParseExact(data, formats, null, DateTimeStyles.None, out dt))
            {
                if (!string.IsNullOrEmpty(data))
                {
                    string[] dataArray = data.Split('/');
                    this._DataEstadoHumor = new DateTime(Convert.ToInt32(dataArray[2]), Convert.ToInt32(dataArray[1]),
                        Convert.ToInt32(dataArray[0]));
                }
            }
            else if (DateTime.TryParseExact(data, formats1, null, DateTimeStyles.None, out dt))
            {
                if (!string.IsNullOrEmpty(data))
                {
                    string[] dataArray = data.Split('-');
                    this._DataEstadoHumor = new DateTime(Convert.ToInt32(dataArray[0]), Convert.ToInt32(dataArray[1]),
                        Convert.ToInt32(dataArray[2]));
                }
            }
            else
            {
                throw new BusinessRuleValidationException("Data nascimento na forma incorreta");
            }
        }
    }
}