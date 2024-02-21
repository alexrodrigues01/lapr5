using System;
using System.Globalization;
using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Domain.Relacoes
{
    [Owned]
    public class DataRelacao : IValueObject
    {
        public DateTime _DataRelacao;
        private DataRelacao(){}

        public DataRelacao(string data)
        {
            var formats = new[] { "d/M/yyyy", "dd/M/yyyy", "d/MM/yyyy", "dd/MM/yyyy" };
            DateTime dt;
            if (DateTime.TryParseExact(data, formats, null, DateTimeStyles.None, out dt))
            {
                if (!string.IsNullOrEmpty(data))
                {
                    string[] dataArray = data.Split('/');
                    this._DataRelacao = new DateTime(Convert.ToInt32(dataArray[2]), Convert.ToInt32(dataArray[1]),
                        Convert.ToInt32(dataArray[0]));
                }
            }
            else
            {
                throw new BusinessRuleValidationException("Data na forma incorreta");
            }
        }
    }
}