
import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <div className='loader'>
      <p className="loader">Loading...</p>
      <CircularProgress />
    </div>
  );
}

// export default function Loader() {
//   return (
//     <p className="loader">Loading...</p>
//   );
// }
