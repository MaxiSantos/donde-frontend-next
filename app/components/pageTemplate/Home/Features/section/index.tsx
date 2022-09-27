import { Container, Grid } from "@mui/material"
import Image from "next/image";
import { BoxTitle, BoxTitleWrapper } from "../../Typography";
import testImage from '../../../../../public/images/slider-bg-02.jpg';

const TitleBox = (props) => {
  const {title, image} = props;
  return <Container
  sx={{
    backgroundImage: `url(${image})`,
    backgroundPositionY: 'center',
    backgroundSize: 'cover',
    height:'150px',
    position: 'relative',
    width: '100%',
    ["&::before"]:{
      content: '""',
      position: "absolute",
      backgroundSize: "cover",
      background: "rgba(0,0,0,0.75)",
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
      opacity: 0.75,
    }
  }}
>
  <BoxTitle>{title}</BoxTitle>
</Container>
}

export const Section = (props) => {
  const { title, content, image, interpolate=false } = props;
  return  <Grid container rowSpacing={4}
    justifyContent="center"
    alignItems="center"  
    sx={{
      maxWidth:'700px', 
      marginLeft:'auto', 
      marginRight:'auto',
    }}>
    <Grid item md={6} xs={12}
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: "15px",
        marginBottom: "15px",
      }}
      >
        { 
          !interpolate ?
          <TitleBox title={title} alt={title} image={image} />
          :
          content
        }      
    </Grid>
    <Grid item md={6} xs={12}
      sx={{
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 2,
      }}
    >
      { 
        interpolate ?
        <TitleBox title={title} image={image} />
        :
        content
      }    
    </Grid>        
  </Grid>
}