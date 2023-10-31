import { Chip } from "@mui/material";
import { styled } from '@mui/system';

const SquareChip = styled(Chip)(({ theme, quality }) => ({
    color: (() => {
      if (quality === 'LOSSLESS' || quality === 'HI_RES') {
        return 'green';
      } else if (quality === 'HIGH') {
        return 'greenyellow';
      } else if (quality === 'LOW') {
        return 'yellow';
      }
      return 'defaultColor';
    })(),
    borderRadius: 3,
  }));

const customStyles = {
    // Estilos personalizados para el label del Chip
    marginLeft: 0.5,
    "& .MuiChip-label": {
      padding: '4px'
    }
  };

export const MusicQualityTag = ({format, quality}) => {
  
    const showTags = format && quality;
    const showQuality = !(format == "FLAC" && quality == "LOSSLESS") && !(format == "MP3" && quality == "HIGH");
    return (
        <>
            { showTags && <SquareChip sx={customStyles} label={format} quality={quality} variant="outlined" size="small" m={2}/> }
            { showTags && showQuality && <SquareChip sx={customStyles} label={quality} quality={quality} variant="outlined" size="small"/> }
        </>
  )
}
