// frontend/src/App.js
import React from 'react';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import styles from "./components/form.module.css";
function App() {
  return (
    <>
    <div >
     {/* <div className={styles.dashboard}>
      <button type="submit" className={styles.submitbutton}>Dashboard</button>
    </div> */}
      <Form />

    </div>
      <Dashboard />
      </>
  );
}

export default App;
