import { Skeleton, Stack, useMediaQuery } from '@mui/material';
import React from 'react';

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery('(max-width: 600px');
  return (
    <>
      <Stack sx={{ mb: 2, mt: 2 }}>
        <Skeleton
          variant="rectangular"
          width={'200px'}
          height={'32px'}
          animation="wave"
        />
      </Stack>
      <Stack
        sx={{
          flexDirection: { sm: 'column', md: 'row' },
          gap: 2,
          mt: 2,
          mb: 2,
        }}
      >
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton animation="wave" variant="rounded" width={132} height={40} />
      </Stack>
      <Stack direction="row" justifyContent="center" flexWrap="wrap">
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <React.Fragment key={index}>
              <Stack flexDirection="column">
                <Skeleton
                  variant="rectangular"
                  width={'215px'}
                  height={'322px'}
                  animation="wave"
                />
                <Skeleton variant="text" animation="wave" width="120px" />
                <Skeleton variant="text" animation="wave" width="120px" />
              </Stack>
            </React.Fragment>
          ))}
      </Stack>
    </>
  );
}
