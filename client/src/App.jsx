import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import RouterGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDeshboardPage from "./pages/instructor";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import AddNewCoursePage from "./pages/instructor/add-new-course";

function App() {
  const { auth } = useContext(AuthContext);
  console.log("Auth State in App:", auth);
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <RouterGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={
          <RouterGuard
            element={<InstructorDeshboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/create-new-course"
        element={
          <RouterGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route 
      path="/"
      element ={
        <RouterGuard
        element={<StudentViewCommonLayout/>}
        authenticated={auth?.authenticate}
        user={auth?.user}
        />
      }
      >
        <Route  path="" element={<StudentHomePage/>}/>
        <Route  path="home" element={<StudentHomePage/>}/>
      </Route>
      <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
