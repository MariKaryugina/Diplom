import React, { useEffect } from "react";

import { Box, IconButton, CircularProgress, Modal, Typography, Card, CardContent } from "@mui/material";
import { TotalInfoRes, getAllInfo } from "../../../services";

import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

const Info = ({
  label,
  value,
  color,
}: { label: string; value: number, color: string }) => {
  return (
    <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Typography color={color} fontSize={22}>{value}</Typography>

      <Typography fontSize={14}>{label}</Typography>
    </Box>
  )
};

export const TotalInfo = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = React.useState(false);

  const [totalInfo, setTotalInfo] = React.useState<TotalInfoRes>();

  useEffect(() => {
    const load = async () => {
      const allInfo = await getAllInfo();

      setTotalInfo(allInfo);
    };

    load();
  }, []);

  return (
    <Box style={{ position: 'absolute', top: 0, left: 0, zIndex: 100 }}>
      <Box style={{ display: 'flex', gap: '12px' }}>
        <IconButton onClick={() => navigate('/')}>
          <ArrowBackIcon style={{ color: 'cornsilk' }} fontSize='large' />
        </IconButton>

        <IconButton onClick={() => setVisible(true)}>
          <InfoIcon style={{ color: 'cornsilk' }} fontSize='large' />
        </IconButton>
      </Box>

      <Modal
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Box style={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
          <Box>
            {!totalInfo && (
              <CircularProgress />
            )}

            {totalInfo && (
              <Card style={{ background: 'cornsilk' }}>
                <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Typography align="center" fontSize={24} fontWeight={700}>Информация по миру:</Typography>

                  <Typography>Обновлено: {new Date(totalInfo.updated).toLocaleString()}</Typography>
    
                  <Info color='#d83a00' label='случаев заражения' value={totalInfo.cases} />
    
                  <Info color='#2ec461' label='выздоровело' value={totalInfo.recovered} />
    
                  <Info color='#a8a7a7' label='умерло' value={totalInfo.deaths} />
    
                  <Info color='#1763a8' label='болеют на данный момент' value={totalInfo.active} />
                </CardContent>
            </Card>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};
