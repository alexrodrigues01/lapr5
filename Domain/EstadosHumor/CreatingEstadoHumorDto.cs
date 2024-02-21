namespace DDDSample1.Domain.EstadosHumor
{
    public class CreatingEstadoHumorDto
    {
        public string Estado;

        public string DataEstado;


        public CreatingEstadoHumorDto(string estado, string dataEstado)
        {
            this.Estado = estado;
            this.DataEstado = dataEstado;
        }
    }
}