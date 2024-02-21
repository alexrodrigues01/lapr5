using DDDSample1.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace DDDSample1.Domain.Jogadores
{

    public enum Pais
    {
         Afghanistan,
        Albania,
        Algeria,
        Andorra,
        Angola,
        [Display(Name="Antigua and Barbuda")]
        Antigua,
        Argentina,
        Armenia,
        Australia,
        Austria,
        Azerbaijan,
        Bahamas,
        Bahrain,
        Bangladesh,
        Barbados,
        Belarus,
        Belgium,
        Belize,
        Benin,
        Bhutan,
        Bolivia,
        [Display(Name="Bosnia and Herzegovina")]
        Bosnia,
        Botswana,
        Brazil,
        Brunei,
        Bulgaria,
        [Display(Name="Burkina Faso")]
        Burkina,
        Burundi,
        [Display(Name="Côte d'Ivoire")]
        Côte,
        [Display(Name="Cabo Verde")]
        Cabo,
        Cambodia,
        Cameroon,
        Canada,
        [Display(Name="Central African Republic")]
        Central,
        Chad,
        Chile,
        China,
        Colombia,
        Comoros,
        [Display(Name="Congo-Brazzaville")]
        Congo,
        [Display(Name="Costa Rica")]
        Costa,
        Croatia,
        Cuba,
        Cyprus,
        [Display(Name="Czech Republic")]
        Czech,
        [Display(Name="Democratic Republic of the Congo	")]
        Democratic,
        Denmark,
        Djibouti,
        Dominica,
        [Display(Name="Dominican Republic")]
        Dominican,
        Ecuador,
        Egypt,
        [Display(Name="El Salvador")]
        Salvador,
        [Display(Name="Equatorial Guinea")]
        Equatorial,
        Eritrea,
        Estonia,
        Eswatini,
        Ethiopia,
        Fiji,
        Finland,
        France,
        Gabon,
        Gambia,
        Georgia,
        Germany,
        Ghana,
        Greece,
        Grenada,
        Guatemala,
        Guinea,
        GuineaBissau,
        Guyana,
        Haiti,
        [Display(Name="Holy See")]
        Holy,
        Honduras,
        Hungary,
        Iceland,
        India,
        Indonesia,
        Iran,
        Iraq,
        Ireland,
        Israel,
        Italy,
        Jamaica,
        Japan,
        Jordan,
        Kazakhstan,
        Kenya,
        Kiribati,
        Kuwait,
        Kyrgyzstan,
        Laos,
        Latvia,
        Lebanon,
        Lesotho,
        Liberia,
        Libya,
        Liechtenstein,
        Lithuania,
        Luxembourg,
        Madagascar,
        Malawi,
        Malaysia,
        Maldives,
        Mali,
        Malta,
        [Display(Name="Marshall Islands")]
        Marshall,
        Mauritania,
        Mauritius,
        Mexico,
        Micronesia,
        Moldova,
        Monaco,
        Mongolia,
        Montenegro,
        Morocco,
        Mozambique,
        Myanmar,
        Namibia,
        Nauru,
        Nepal,
        Netherlands,
        [Display(Name="New Zealand")]
        New,
        Nicaragua,
        Niger,
        Nigeria,
        [Display(Name="North Korea")]
        NorthKorea,
        [Display(Name="North Macedonia")]
        NorthMacedonia,
        Norway,
        Oman,
        Pakistan,
        Palau,
        [Display(Name="Palestine State")]
        Palestine,
        Panama,
        [Display(Name="Papua New Guinea")]
        Papua,
        Paraguay,
        Peru,
        Philippines,
        Poland,
        Portugal,
        Qatar,
        Romania,
        Russia,
        Rwanda,
        [Display(Name="Saint Kitts and Nevis")]
        SaintKitts,
        [Display(Name="Saint Lucia")]
        SaintLucia,
        [Display(Name="Saint Vincent and the Grenadines")]
        SaintVincent,
        Samoa,
        [Display(Name="San Marino")]
        SanMarino,
        [Display(Name="Sao Tome and Principe")]
        SaoTome,
        [Display(Name="Saudi Arabia	")]
        SaudiArabia,
        Senegal,
        Serbia,
        Seychelles,
        [Display(Name="Sierra Leone")]
        SierraLeone,
        Singapore,
        Slovakia,
        Slovenia,
        [Display(Name="Solomon Islands")]
        SolomonIslands,
        Somalia,
        [Display(Name="South Africa")]
        SouthAfrica,
        [Display(Name="South Korea")]
        SouthKorea,
        [Display(Name="South Sudan")]
        SouthSudan,
        Spain,
        [Display(Name="Sri Lanka")]
        SriLanka,
        Sudan,
        Suriname,
        Sweden,
        Switzerland,
        Syria,
        Tajikistan,
        Tanzania,
        Thailand,
        [Display(Name="Timor-Leste")]
        TimorLeste,
        Togo,
        Tonga,
        [Display(Name="	Trinidad and Tobago")]
        Trinidad,
        Tunisia,
        Turkey,
        Turkmenistan,
        Tuvalu,
        Uganda,
        Ukraine,
        [Display(Name="United Arab Emirates")]
        UnitedArabEmirates,
        [Display(Name="United Kingdom")]
        UnitedKingdom,
        [Display(Name="United States of America")]
        UnitedStatesofAmerica,
        Uruguay,
        Uzbekistan,
        Vanuatu,
        Venezuela,
        Vietnam,
        Yemen,
        Zambia,
        Zimbabwe
    }
    
    [Owned]
    public class Morada : IValueObject
    {
        public Pais _Pais { get; private set; }
        public string _Rua { get; private set; }
        public string _Localidade { get; private set; }
        public string _CodigoPostal { get; private set; }
        
        private Morada(){}

        public Morada(string pais,string rua, string localidade, string codigoPostal)
        {
            if (string.IsNullOrEmpty(rua) || string.IsNullOrEmpty(localidade) || string.IsNullOrEmpty(codigoPostal))
                throw new BusinessRuleValidationException("Precisa de introduzir a morada completa");
            this._Pais =  (Pais) Pais.Parse(typeof(Pais),pais,true);
            this._Rua = rua;
            this._Localidade = localidade;
            this._CodigoPostal = codigoPostal;
        }
    }
}