import { useSelector } from "react-redux";
import { RootState } from "./app/rootReducer";
import Questionnaire from "./components/Questionnaire";
import Recommendation from "./components/Recommendation";

function App() {
	const token = useSelector((state: RootState) => state.auth.token);
	return <>{token ? <Recommendation token={token} /> : <Questionnaire />}</>;
}

export default App;
