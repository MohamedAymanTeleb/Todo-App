import { RouterProvider } from 'react-router-dom';
import { Router } from './RouterConfig';
import { UidProvider } from './Contexts/uidContext';
import { useState } from 'react';

function App() {
  const [uid, setUid] = useState("");
  return (
    <>
      <UidProvider value={{ uid, setUid }}>
        <RouterProvider router={Router} />
      </UidProvider>
    </>
  )
}

export default App
