import DashboardCard from '../shared/DashboardCard'

export const ShakaPlayer = ({media}) => {
  
   return (
    <>
        <DashboardCard title="Aca va el reproductor" subtitle="info adicional (canal seleccionado)">
            Canal seleccionado: { !!media && media.name}
        </DashboardCard>
    </>
  )
}
