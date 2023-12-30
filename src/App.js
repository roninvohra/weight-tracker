import logo from './logo.svg';
import './App.css';
import ReportWeight from './components/ReportWeight';
import ShowLogs from './components/ShowLogs';

function App() {
  return (
    <>
      <h1 className="flex text-3xl font-bold underline justify-center">
        Weight Tracker
      </h1>
      <div className = "flex justify-center">
        <ReportWeight />
      </div>
      <div className = "flex justify-center">
        <ShowLogs />
      </div>

    </>
  )
}

export default App;
